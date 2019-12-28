var ws = require("nodejs-websocket");

const port = 8001;

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
  console.log("New connection");
  // 接收消息事件
  conn.on("text", function (str) {
    console.log("Received "+str);
    conn.sendText(str);
  });
  // 关闭事件处理
  conn.on("close", function (code, reason) {
    console.log("Connection closed");
  });
  // 错误事件处理
  conn.on("error", function (err) {
    console.log("handler error");
    console.log(err);
  });
}).listen(port);

console.log("WebSocket is listening at port " + port);