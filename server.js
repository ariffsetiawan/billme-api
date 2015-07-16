var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');


/*Set EJS template Engine*/
// app.set('views','./views');
// app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(

    connection(mysql,{
        host     : 'http://billme-v0.ciag9ijvhpze.ap-southeast-1.rds.amazonaws.com',
        user     : 'billmeroot',
        password : 'billmepassword',
        database : 'billmedb',
        debug    : true //set true if you wanna see debug logger
    },'request')

);

var routes = require('./routes/index');

//now we need to apply our router here
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//start Server
var server = app.listen(3000,function(){

   console.log("Listening to port %s",server.address().port);

});
