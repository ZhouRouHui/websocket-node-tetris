var ws = require("nodejs-websocket");

const port = 8001;

// 连接数，做用户标识用
let connCount = 0;

// 广播函数，将内容广播给所有用户
function broadcast(str) {
  server.connections.forEach(function (conn) {
    conn.send(str);
  })
}

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
  console.log("New connection");

  connCount++;
  conn.nickName = 'user_' + connCount;
  let mes = {
    type: 'enter',
    data: conn.nickName + ' come in'
  };

  // 用户连接了，把新用户进入了广播给所有在连接的用户
  broadcast(JSON.stringify(mes)); // 将对象格式化为 json 字符串
  // 接收消息事件
  conn.on("text", function (str) {
    console.log("Receive " + str);
    let mes = {
      type: 'message',
      data: conn.nickName + ' says: ' + str
    };
    broadcast(JSON.stringify(mes));
  });
  // 关闭事件处理
  conn.on("close", function (code, reason) {
    console.log("Connection closed");
    let mes = {
      type: 'quit',
      data: conn.nickName + ' left'
    };
    broadcast(JSON.stringify(mes)); // 用户断开连接广播给所有在连接的用户
  });
  // 错误事件处理
  conn.on("error", function (err) {
    console.log("handler error");
    console.log(err);
  });
}).listen(port);

console.log("WebSocket is listening at port " + port);