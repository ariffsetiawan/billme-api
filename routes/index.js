var express = require('express');
var moment = require('moment');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/api',function(req,res){
    res.send('<center><h3>Welcome to BillMe API</h3></center>');
});

router.get('/about',function(req,res){
    res.send('<center><h3>About Page</h3></center>');
});

/*RESTful API Router*/

//all users
var users = router.route('/api/users');

// users.all(function(req,res,next){
//     console.log("You need to smth about Route ? Do it here");
//     console.log(req.params);
//     next();
// });

users.get(function(req,res,next){


    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT user_id as id, user_firstname as first_name, user_lastname as last_name, user_image as ava_url  FROM users',function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            // res.render('user',{title:"User Data",data:rows});
            res.json({"Error" : false, "Message" : "Success", "Users" : rows});


         });

    });

});

//post data to DB | POST
users.post(function(req,res,next){

	var now = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    //validation
    req.assert('first_name','First Name is required').notEmpty();
    req.assert('last_name','Last Name is required').notEmpty();
    req.assert('facebook_id','Facebook ID is required').notEmpty();
    req.assert('email','A valid email is required').isEmail();
    // req.assert('password','Enter a password 6 - 20').len(6,20);

    console.log(req.body);

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
        user_firstname:req.body.first_name,
        user_lastname:req.body.last_name,
        user_fbid:req.body.facebook_id,
        user_created_date:now,
        user_updated_date:now,
        user_email:req.body.email,
        // password:req.body.password
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("INSERT INTO users set ? ",data, function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });

     });

});

//single user
var user = router.route('/api/users/:user_id');

// user.all(function(req,res,next){
//     console.log("You need to smth about user Route ? Do it here");
//     console.log(req.params);
//     next();
// });

//get data to update
user.get(function(req,res,next){

    var user_id = req.params.user_id;

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM users WHERE user_id = ? ",[user_id],function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            // res.render('edit',{title:"Edit user",data:rows});

            res.json({"Error" : false, "Message" : "Success", "Users" : rows});
        });

    });

});

//update data
user.put(function(req,res,next){
    var user_id = req.params.user_id;

    //validation
    req.assert('name','Name is required').notEmpty();
    req.assert('email','A valid email is required').isEmail();
    // req.assert('password','Enter a password 6 - 20').len(6,20);

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
        name:req.body.name,
        email:req.body.email,
        // password:req.body.password
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE t_user set ? WHERE user_id = ? ",[data,user_id], function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });

     });

});

//delete data
user.delete(function(req,res,next){

    var user_id = req.params.user_id;

     req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("DELETE FROM users  WHERE user_id = ? ",[user_id], function(err, rows){

             if(err){
                console.log(err);
                return next("Mysql error, check your query");
             }

             res.sendStatus(200);

        });
        //console.log(query.sql);

     });
});


//all chats
var chats = router.route('/api/chats');

// users.all(function(req,res,next){
//     console.log("You need to smth about Route ? Do it here");
//     console.log(req.params);
//     next();
// });

chats.get(function(req,res,next){


    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM chats ORDER BY chat_updated_date DESC',function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            // res.render('user',{title:"User Data",data:rows});
            res.json({"Error" : false, "Message" : "Success", "Chats" : rows});


         });

    });

});

//post data to DB | POST
chats.post(function(req,res,next){

	var now = moment.utc().format('YYYY-MM-DD HH:mm:ss');
	// console.log(now);

    //validation
    req.assert('user_1','user 1 is required').notEmpty();
    req.assert('user_2','user 2 is required').notEmpty();

    // console.log(req.body);

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
        chat_user_1:req.body.user_1,
        chat_user_2:req.body.user_2,
        chat_url:req.body.user_1+"/"+req.body.user_2,
        chat_created_date:now,
        chat_updated_date:now,
        chat_read_status:0,
        
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("INSERT INTO chats set ? ",data, function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });

     });

});


//single chat

var chat = router.route('/api/chats/:friend_user_id');

// users.all(function(req,res,next){
//     console.log("You need to smth about Route ? Do it here");
//     console.log(req.params);
//     next();
// });

chat.get(function(req,res,next){

    var user_id = req.params.friend_user_id;

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM contents LEFT JOIN chats ON contents.content_chat_id=chats.chat_id WHERE (chat_user_1 = "+user_id+" OR chat_user_2="+user_id+" )",function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("Contents Not found");

            // res.render('edit',{title:"Edit user",data:rows});

            res.json({"Error" : false, "Message" : "Success", "Contents" : rows});
        });

    });

});


//post data to DB | POST
chat.post(function(req,res,next){

	var now = moment.utc().format('YYYY-MM-DD HH:mm:ss');

	//validation
    // req.assert('friend_user_id','user ID is required').notEmpty();

    console.log(req.headers.authentification);

    // var errors = req.validationErrors();
    // if(errors){
    //     res.status(422).json(errors);
    //     return;
    // }
    var friend_user_id = req.params.friend_user_id;
    // var friend_user_id = req.body.friend_user_id;
    var user_id = req.body.user_id;
    var chat_id = "";

	req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM chats WHERE (chat_user_1 = "+friend_user_id+" AND chat_user_2="+user_id+") OR (chat_user_1 = "+user_id+" AND chat_user_2="+friend_user_id+")",function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if chat not exist
            if(rows.length < 1){
                //return res.send("Contents Not found");
                //get data
			    var chat_data = {
			        chat_user_1:user_id,
			        chat_user_2:friend_user_id,
			        chat_url:user_id+"/"+friend_user_id,
			        chat_created_date:now,
			        chat_updated_date:now,
			        chat_read_status:0,
			        
			     };

			     var query = conn.query("INSERT INTO chats set ? ",chat_data, function(err, rows){

		           if(err){
		                console.log(err);
		                return next("Mysql error, check your query");
		           }

		          //res.sendStatus(200);

		          var query = conn.query('SELECT MAX(chat_id) as chat_id FROM chats',function(err,rows){

		            if(err){
		                console.log(err);
		                return next("Mysql error, check your query");
		            }

		            // res.render('user',{title:"User Data",data:rows});
		            //res.json({"Error" : false, "Message" : "Success", "Chats" : rows});

		            chat_id = rows[0].chat_id;

		            //insert chat contents

		            //get data
				    var data = {
				        content_chat_id:chat_id,
				        content_user_id:user_id,
				        content_value:req.body.text,
				        content_date:now,
				        content_status:1,
				        
				     };

				     var chat_update_data = {
				     	chat_last_content:req.body.text,
				     	chat_updated_date:now
				     }

				    //inserting into mysql
				    req.getConnection(function (err, conn){

				        if (err) return next("Cannot Connect");

				        var query = conn.query("INSERT INTO contents set ? ",data, function(err, rows){

				           if(err){
				                console.log(err);
				                return next("Mysql error, check your query");
				           }

				          //res.sendStatus(200);

				          var query = conn.query("UPDATE chats set ? WHERE chat_id = ? ",[chat_update_data,chat_id], function(err, rows){

					           if(err){
					                console.log(err);
					                return next("Mysql error, check your query");
					           }

					          res.sendStatus(200);

					        });


				        });

				     });


		         });

		        });



            } else {

            	// res.render('edit',{title:"Edit user",data:rows});

	            //res.json({"Error" : false, "Message" : "Success", "Contents" : rows});


	            chat_id = rows[0].chat_id;

	            //insert chat contents

	            //get data
			    var data = {
			        content_chat_id:chat_id,
			        content_user_id:user_id,
			        content_value:req.body.text,
			        content_date:now,
			        content_status:1,
			        
			     };

			     var chat_update_data = {
				     	chat_last_content:req.body.text,
				     	chat_updated_date:now
				 }

			    //inserting into mysql
			    req.getConnection(function (err, conn){

			        if (err) return next("Cannot Connect");

			        var query = conn.query("INSERT INTO contents set ? ",data, function(err, rows){

			           if(err){
			                console.log(err);
			                return next("Mysql error, check your query");
			           }

			          //res.sendStatus(200);

			          var query = conn.query("UPDATE chats set ? WHERE chat_id = ? ",[chat_update_data,chat_id], function(err, rows){

					           if(err){
					                console.log(err);
					                return next("Mysql error, check your query");
					           }

					          res.sendStatus(200);

					        });

			        });

			     });

            }

            
        });

    });


});

var chatcontent = router.route('/api/chats/:friend_user_id/:chat_id');
//update chat content
chatcontent.put(function(req,res,next){
    var friend_user_id = req.params.friend_user_id;
    var content_id = req.params.chat_id;

    //validation
    req.assert('friend_user_id','friend ID is required').notEmpty();
    req.assert('chat_id','chat ID is required').notEmpty();
    

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
        content_status:req.body.action_status,
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE contents set ? WHERE content_id = ? ",[data,content_id], function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });

     });

});



var balances = router.route('/api/balances/:friend_user_id');

// users.all(function(req,res,next){
//     console.log("You need to smth about Route ? Do it here");
//     console.log(req.params);
//     next();
// });

balances.get(function(req,res,next){

    var user_id = req.params.friend_user_id;

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM balances LEFT JOIN users ON balances.balance_user_id=users.user_id WHERE chat_user_1 = ? ORDER BY balance_id DESC",[user_id],function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("Contents Not found");

            // res.render('edit',{title:"Edit user",data:rows});

            res.json({"Error" : false, "Message" : "Success", "Balances" : rows});
        });

    });

});

var balanceshare = router.route('/api/balances/share');

// users.all(function(req,res,next){
//     console.log("You need to smth about Route ? Do it here");
//     console.log(req.params);
//     next();
// });

balanceshare.get(function(req,res,next){

    var user_id = req.body.user_id;

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM balances LEFT JOIN users ON balances.balance_user_id=users.user_id WHERE chat_user_1 = ? ",[user_id],function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("Contents Not found");

            // res.render('edit',{title:"Edit user",data:rows});

            res.json({"Error" : false, "Message" : "Success", "Balances" : rows});
        });

    });

});


module.exports = router;
