var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;

// 客户端计数
var clientCount = 0;

// 用来存储客户端 socket
var socketMap = {};

app.listen(PORT);

// 监听客户端发过来的事件
var bindListener = function (socket, event) {
  socket.on(event, function (data) {
    if (socket.clientNum % 2 === 0) {
      if (socketMap[socket.clientNum - 1]) {
        socketMap[socket.clientNum - 1].emit(event, data);
      }
    } else {
      if (socketMap[socket.clientNum + 1]) {
        socketMap[socket.clientNum + 1].emit(event, data);
      }
    }
  });
};

io.on('connection', function (socket) {

  clientCount = clientCount + 1;
  socket.clientNum = clientCount;
  socketMap[clientCount] = socket;

  // 客户端总数为基数时，显示等待信息
  if (clientCount % 2 === 1) {
    socket.emit('waiting', 'waiting for another person');
  } else {
    if (socketMap[(clientCount - 1)]) {
      socket.emit('start'); // 总数为偶数时，发送开始事件
      socketMap[(clientCount - 1)].emit('start');
    } else {
      socket.emit('leave');
    }
  }

  // 处理客户端发出的各种事件
  bindListener(socket, 'init');
  bindListener(socket, 'next');
  bindListener(socket, 'rotate');
  bindListener(socket, 'right');
  bindListener(socket, 'left');
  bindListener(socket, 'down');
  bindListener(socket, 'fall');
  bindListener(socket, 'fixed');
  bindListener(socket, 'line');
  bindListener(socket, 'time');
  bindListener(socket, 'lose');
  bindListener(socket, 'bottomLines');
  bindListener(socket, 'addTailLines');

  // 断开连接
  socket.on('disconnect', function () {
    if (socket.clientNum % 2 === 0) {
      if (socketMap[socket.clientNum - 1]) {
        socketMap[socket.clientNum - 1].emit('leave');
      }
    } else {
      if (socketMap[socket.clientNum + 1]) {
        socketMap[socket.clientNum + 1].emit('leave');
      }
    }
    delete(socketMap[socket.clientNum]);
  });
});

console.log('websocket listening on port ' + PORT);