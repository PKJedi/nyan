
var http = require('http');
var async = require('async');

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('trololo');
});

var io = require('socket.io').listen(server);
io.configure('production', function() {
  io.enable('browser client etag');
  io.enable('browser client minification');
  io.enable('browser client gzip');
  io.set('log level', 1);

  io.set('transports', [
    'websocket'
  , 'flashsocket'
  , 'htmlfile'
  , 'xhr-polling'
  , 'jsonp-polling'
  ]);

  io.set('origins', '*:*');
});

server.listen(8082);

var nyan = (function() {
  var screens = [];
  var now = null;

  return {
    addScreen: function(screen) {
      screens.push(screen);

      if (screens.length < 2) {
        nyan.hop();
      }

      return nyan;
    },
    removeScreen: function(screen) {
      var index = screens.indexOf(screen);
      screens.splice(index, 1);
      if (screen === now)
      {
        nyan.hop();
      }
      return nyan;
    },
    moveScreen: function(screen, pos) {
      screens.splice(screens.indexOf(screen), 1);
      screens.splice(pos, 0, screen);
      return nyan;
    },
    hasScreen: function(screen) {
      return screens.indexOf(screen) !== -1;
    },
    hop: function(screen) {
      if (screen && screen !== now) {
        console.log('invalid from ' + screens.indexOf(screen) + ' should be ' + screens.indexOf(now));
        return;
      }
      var lastPos = screens.indexOf(now);
      now = screens.length ? screens[(lastPos + 1) % screens.length] : null;
      nyan.nyan();
      return nyan;
    },
    nyan: function() {
      if (now && screens.length > 0) {
        console.log('sending to ' + screens.indexOf(now) + ' of ' + screens.length);
        now.emit('nyan', {});
      }
      return nyan;
    },
    sendScreens: function() {
      async.map(screens, function(screen, callback) {
        screen.get('size', function(err, size) {
          callback(null, (typeof(size) === 'object' && size) ? size : {});
        });
      }, function(err, sizes) {
        for (var i in screens){
          screens[i].emit('screens', {you: parseInt(i, 10), screens: sizes});
        }
      });
    }
  };
}());

io.sockets.on('connection', function(socket) {
  socket.on('size', function(data) {
    socket.set('size', data, function() {
      if (!nyan.hasScreen(socket)) {
        nyan.addScreen(socket);
        socket.on('disconnect', function(data) {
          nyan.removeScreen(socket);
          nyan.sendScreens();
        });
        socket.on('next', function(data) {
          nyan.hop(socket);
        });
        socket.on('move', function(data) {
          nyan.moveScreen(socket, parseInt(data.to, 10));
          nyan.sendScreens();
        });
      }
      nyan.sendScreens();

    });
  });
});

