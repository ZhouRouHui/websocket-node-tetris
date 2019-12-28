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
  // 用户连接了，把新用户进入了广播给所有在连接的用户
  broadcast(conn.nickName + ' come in');
  // 接收消息事件
  conn.on("text", function (str) {
    console.log("Received " + str);
    broadcast(str);
  });
  // 关闭事件处理
  conn.on("close", function (code, reason) {
    console.log("Connection closed");
    broadcast(conn.nickName + ' left'); // 用户断开连接广播给所有在连接的用户
  });
  // 错误事件处理
  conn.on("error", function (err) {
    console.log("handler error");
    console.log(err);
  });
}).listen(port);

console.log("WebSocket is listening at port " + port);