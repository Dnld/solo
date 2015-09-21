var app = require('./server.js');

var port = process.env.PORT || 3000;

app.listen(port);

console.log('Server listening on port ' + port);
console.log('Use control + c to terminate');
