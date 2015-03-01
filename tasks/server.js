var express = require('express');
var app = module.exports = express();

app.set('port', process.env.PORT || 8000);
app.use(express.compress());
app.use(express.static(process.cwd() + '/'));
app.use(express.errorHandler());

app.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});
