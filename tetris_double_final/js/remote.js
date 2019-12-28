var Remote = function (socket) {
  // 游戏对象
  var game;
  var bindEvents = function () {
    // 处理服务端的 init 事件
    socket.on('init', function (data) {
      start(data.type, data.dir);
    });

    // 处理服务端的 next 事件
    socket.on('next', function (data) {
      game.performNext(data.type, data.dir);
    });

    // 处理服务端的 rotate 事件
    socket.on('rotate', function (data) {
      game.rotate();
    });

    // 处理服务端的 right 事件
    socket.on('right', function (data) {
      game.right();
    });

    // 处理服务端的 left 事件
    socket.on('left', function (data) {
      game.left();
    });

    // 处理服务端的 down 事件
    socket.on('down', function (data) {
      game.down();
    });

    // 处理服务端的 fall 事件
    socket.on('fall', function (data) {
      game.fall();
    });

    // 处理服务端的 fixed 事件
    socket.on('fixed', function (data) {
      game.fixed();
    });

    // 处理服务端的 line 事件
    socket.on('line', function (data) {
      game.checkClear();
      game.addScore(data);
    });

    // 处理服务端的 time 事件
    socket.on('time', function (data) {
      game.setTime(data);
    });

    // 处理服务端的 lose 事件
    socket.on('lose', function (data) {
      game.gameover(false);
    });

    // 处理服务端的 addTailLines 事件
    socket.on('addTailLines', function (data) {
      game.addTailLines(data);
    });

  };
  // 开始
  var start = function (type, dir) {
    var doms = {
      gameDiv: document.getElementById('remote_game'),
      nextDiv: document.getElementById('remote_next'),
      timeDiv: document.getElementById('remote_time'),
      scoreDiv: document.getElementById('remote_score'),
      resultDiv: document.getElementById('remote_gameover')
    };
    game = new Game();
    game.init(doms, type, dir);
  };

  bindEvents();
};