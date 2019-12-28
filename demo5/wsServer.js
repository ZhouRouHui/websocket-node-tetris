/**
 * 本案例使用 websocket 的框架 socket.io
 */
let app = require('http').createServer();
let io = require('socket.io')(app);

const port = 8001;

// 连接数，做用户标识用
let connCount = 0;

app.listen(port); // 监听端口

/**
 * 使用 socket.io 框架实现聊天室服务器
 */
io.on('connection', function (socket) {
  connCount++;
  socket.nickName = 'user_' + connCount;
  io.emit('enter', socket.nickName + ' comes in');  // 用户进入广播给其他用户

  // 接收消息事件
  socket.on('message', function (str) {
    io.emit('message', socket.nickName + ' says：' + str);
  });

  // 关闭连接事件
  socket.on('disconnect', function () {
    io.emit('quit', socket.nickName + ' left');
  });
});
console.log("WebSocket is listening at port " + port);