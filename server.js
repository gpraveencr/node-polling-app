var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require("morgan");
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;

var User = require('./models/User');
var engines = require('consolidate');

app.set('views', __dirname + '/public');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
mongoose.connect('mongodb://localhost:27017/polling');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
  Authorization');
    next();
});

app.use(morgan('dev'));

app.get('/', function(req, res) {
   res.send('Welcome to the home page!');
});

var apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
    console.log('Request is in API page.');
    next();
});

apiRouter.route('/users')
    .get(function(req, res) {
        User.find(function(err, users) {
            if(err) {
                res.send(err);
            }
            res.json(users);
        });
    })
    .post(function(req, res) {
        var user = new User();

        if(req.body.fullname)   user.fullname = req.body.fullname;
        if(req.body.email)   user.email = req.body.email;
        if(req.body.password)   user.password = req.body.password;

        user.save(function(err) {
           if(err) {
               if(err.code == 11000) {
                   return res.json({message : 'User already exists!'});
               }
               else {
                   return res.send(err);
               }
           }
           res.send({message : 'User successfully created!'});
        });

    })

apiRouter.route('/users/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if(err) {
                res.send(err);
            }
            res.json(user);
        });
    })

apiRouter.route('/users/:user_id/polls')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if(err) {
                res.send(err);
            }
            res.json(user.polls);
        });
    })
    .post(function(req, res) {
        User.findByIdAndUpdate(req.params.user_id,
            {$push: {"polls" : req.body.polls}},
            {safe : true, upsert : true},
            function(err, user) {
                if(err) {
                    res.send(err);
                }
                res.json(user);
            });
    })
    .delete(function(req, res) {
        User.findByIdAndUpdate(req.params.user_id,
            {$pop: {"polls" : req.body.polls}},
            {safe : true, upsert : true},
            function(err, user) {
                if(err) {
                    res.send(err);
                }
                res.json(user);
            });
    })

app.set('view engine', 'html');
app.use('/api', apiRouter);

app.listen(port);
console.log('app is running on port ' + port);