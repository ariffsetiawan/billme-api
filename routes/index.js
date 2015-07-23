var express = require('express');
var moment = require('moment');
var shortid = require('shortid');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/',function(req,res){
    res.send('<center><h3>Welcome to BillMe API</h3></center>');
});

router.get('/about',function(req,res){
    res.send('<center><h3>About Page</h3></center>');
});

router.get('/p/:user_id/:friend_user_id', function(req, res, next) {
	var user_id = req.params.user_id;
	var friend_user_id = req.params.friend_user_id;

	var chat_url_1 = user_id+"/"+friend_user_id;
	var chat_url_2 = friend_user_id+"/"+user_id;


	req.getConnection(function(err,conn){

	        if (err) return next("Cannot Connect");

	        var query = conn.query("SELECT * FROM contents LEFT JOIN chats ON contents.content_chat_id=chats.chat_id LEFT JOIN users ON contents.content_user_id=users.user_id WHERE (chat_url = "+chat_url_1+" OR chat_url="+chat_url_2+" ) ORDER BY content_id",function(err,rows){

	            if(err){
	                console.log(err);
	                return next("Mysql error, check your query");
	            }

	            if(rows.length < 1){
	            	return res.send("User Not found")
	            } else {

			        res.render('share', {title : "Chat ", data : rows, moment: moment });

	            }

	         });

	    });
});

/*RESTful API Router*/

//all users
var users = router.route('/users');

// users.all(function(req,res,next){
//     //console.log("You need to smth about Route ? Do it here");
//     //console.log(req.params);

//     console.log(req.headers.authentification);

//     //validation
//     req.check('authentification','Auth is required').notEmpty();

//     var errors = req.validationErrors();
//     if(errors){
//         res.status(422).json(errors);
//         return;
//     } else{
//     	next();
//     }
    
// });

users.get(function(req,res,next){


	console.log(req.headers.authentification);

	var auth = req.headers.authentification;


	if (auth != "" && auth != undefined) {
		req.getConnection(function(err,conn){

	        if (err) return next("Cannot Connect");

	        var query = conn.query('SELECT user_id, user_firstname as first_name, user_lastname as last_name, user_image as ava_url FROM users WHERE user_access_token = ? ',[auth],function(err,rows){

	            if(err){
	                console.log(err);
	                return next("Mysql error, check your query");
	            }

	            if(rows.length < 1){
	            	return res.send("User Not found")
	            } else {

			        res.json({"Error" : false, "Message" : "Success", "User" : rows});

	            }

	         });

	    });
	} else {
		res.json({"Error" : true, "Message" : "Auth is required"});
	}

});

//post data to DB | POST
users.post(function(req,res,next){

	var now = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    //validation
    req.assert('first_name','First Name is required').notEmpty();
    req.assert('last_name','Last Name is required').notEmpty();
    req.assert('facebook_id','Facebook ID is required').notEmpty();
    req.assert('email','A valid email is required').isEmail();

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
var user = router.route('/users/:user_id');

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

var facebookLogin = router.route('/login/facebook');

//post data to DB | POST
facebookLogin.post(function(req,res,next){

	var now = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    //validation
    req.assert('first_name','First Name is required').notEmpty();
    req.assert('last_name','Last Name is required').notEmpty();
    req.assert('facebook_id','Facebook ID is required').notEmpty();
    req.assert('email','A valid email is required').isEmail();

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    var access_token = shortid.generate();
    var facebook_id = req.body.facebook_id;

    //get data
    var data = {
        user_firstname:req.body.first_name,
        user_lastname:req.body.last_name,
        user_fbid:req.body.facebook_id,
        user_created_date:now,
        user_updated_date:now,
        user_last_update:now,
        user_email:req.body.email,
        user_access_token:access_token,
     };

    req.getConnection(function (err, conn){

		if (err) return next("Cannot Connect");


    	var query = conn.query('SELECT user_fbid FROM users WHERE user_fbid = ?',[facebook_id],function(err,rows){

		    if(err){
		        console.log(err);
		        return next("Mysql error, check your query");
		    }

		    //if user not found
			if(rows.length < 1) {

			    //inserting into mysql
			    

			        var query = conn.query("INSERT INTO users set ? ",data, function(err, rows){

			           if(err){
			                console.log(err);
			                return next("Mysql error, check your query");
			           } else {

			           		// res.sendStatus(200);
			           		var query = conn.query('SELECT user_id, user_access_token as auth FROM users WHERE user_access_token = ?',[access_token],function(err,rows){

				            if(err){
				                console.log(err);
				                return next("Mysql error, check your query");
				            }

				            //if user not found
			            	if(rows.length < 1)
			                	return res.send("User Not found");

				            res.json({"Error" : false, "Message" : "Success", "User" : rows});

				         });
			           }   

			        });

			     	
			} else {
				res.json({"Error" : true, "Message" : "User already exist", "User" : rows});
			}

		});
	});
    	


});

//all chats
var chats = router.route('/chats');

// users.all(function(req,res,next){
//     console.log("You need to smth about Route ? Do it here");
//     console.log(req.params);
//     next();
// });

// chats.get(function(req,res,next){


//     req.getConnection(function(err,conn){

//         if (err) return next("Cannot Connect");

//         var query = conn.query('SELECT * FROM chats ORDER BY chat_updated_date DESC',function(err,rows){

//             if(err){
//                 console.log(err);
//                 return next("Mysql error, check your query");
//             }

//             // res.render('user',{title:"User Data",data:rows});
//             res.json({"Error" : false, "Message" : "Success", "Chats" : rows});


//          });

//     });

// });

chats.get(function(req,res,next){

	var auth = req.headers.authentification;
	var user_id = "";

	if (auth != "" && auth != undefined) {
		req.getConnection(function(err,conn){

	        if (err) return next("Cannot Connect");

	        var query = conn.query('SELECT user_id FROM users WHERE user_access_token = ? ',[auth],function(err,rows){

	            if(err){
	                console.log(err);
	                return next("Mysql error, check your query");
	            }

	            if(rows.length < 1){
	            	return res.send("User Not found")
	            } else {


	            	user_id = rows[0].user_id;

			        var query = conn.query("SELECT * FROM chats WHERE (chat_user_1 = "+user_id+" OR chat_user_2="+user_id+" ) ORDER BY chat_updated_date DESC",function(err,rows){

			            if(err){
			                console.log(err);
			                return next("Mysql error, check your query");
			            }

			            res.json({"Error" : false, "Message" : "Success", "Chats" : rows});


			         });

	            }

	         });

	    });
	} else {
		res.json({"Error" : true, "Message" : "Auth is required"});
	}

});

//single chat

var chat = router.route('/chats/:friend_user_id');

// users.all(function(req,res,next){
//     console.log("You need to smth about Route ? Do it here");
//     console.log(req.params);
//     next();
// });

chat.get(function(req,res,next){

    var user_id = req.params.friend_user_id;

    var auth = req.headers.authentification;
	var user_id = "";

	if (auth != "" && auth != undefined) {
		req.getConnection(function(err,conn){

	        if (err) return next("Cannot Connect");

	        var query = conn.query('SELECT user_id FROM users WHERE user_access_token = ? ',[auth],function(err,rows){

	            if(err){
	                console.log(err);
	                return next("Mysql error, check your query");
	            }

	            if(rows.length < 1){
	            	return res.send("User Not found")
	            } else {

			        user_id = rows[0].user_id;

			        var query = conn.query("SELECT * FROM contents LEFT JOIN chats ON contents.content_chat_id=chats.chat_id WHERE (chat_user_1 = "+user_id+" OR chat_user_2="+user_id+" ) ORDER BY content_id",function(err,rows){

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
     

	            }

	         });
	    
	    });
	
	} else {
		res.json({"Error" : true, "Message" : "Auth is required"});
	}

});


//post data to DB | POST
chat.post(function(req,res,next){

	var now = moment.utc().format('YYYY-MM-DD HH:mm:ss');

	var auth = req.headers.authentification;

	//validation
    req.assert('friend_user_id','user ID is required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    var friend_user_id = req.params.friend_user_id;
    // var friend_user_id = req.body.friend_user_id;
    // var user_id = req.body.user_id;
    var user_id = "";
    var chat_id = "";


	if (auth != "" && auth != undefined) {
		req.getConnection(function(err,conn){

	        if (err) return next("Cannot Connect");

	        var query = conn.query('SELECT user_id FROM users WHERE user_access_token = ? ',[auth],function(err,rows){

	            if(err){
	                console.log(err);
	                return next("Mysql error, check your query");
	            }

	            if(rows.length < 1){
	            	return res.send("User Not found")
	            } else {

			        user_id = rows[0].user_id;

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

									          //res.sendStatus(200);

									          var query = conn.query("SELECT * FROM chats WHERE chat_id = ?",[chat_id],function(err,rows){

										            if(err){
										                console.log(err);
										                return next("Mysql error, check your query");
										            }

										            //if user not found
										            if(rows.length < 1)
										                return res.send("Contents Not found");

										            res.json({"Error" : false, "Message" : "Success", "Contents" : rows});
										        });

									      

									        });


								        });

								     });


						         });

						        });



				            } else {


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

									          // res.sendStatus(200);

									          var query = conn.query("SELECT * FROM chats WHERE chat_id = ?",[chat_id],function(err,rows){

										            if(err){
										                console.log(err);
										                return next("Mysql error, check your query");
										            }

										            //if user not found
										            if(rows.length < 1)
										                return res.send("Contents Not found");

										            res.json({"Error" : false, "Message" : "Success", "Contents" : rows});
										        });

									        });

							        });

							     });

				            }

				            
				        });


	            }

	         });




	    });
	 }  else {
		res.json({"Error" : true, "Message" : "Auth is required"});
	}
    


});

var chatcontent = router.route('/chats/:friend_user_id/:chat_id');
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


    var auth = req.headers.authentification;
	var user_id = "";

	if (auth != "" && auth != undefined) {
		req.getConnection(function(err,conn){

	        if (err) return next("Cannot Connect");

	        var query = conn.query('SELECT user_id FROM users WHERE user_access_token = ? ',[auth],function(err,rows){

	            if(err){
	                console.log(err);
	                return next("Mysql error, check your query");
	            }

	            if(rows.length < 1){
	            	return res.send("User Not found")
	            } else {

			        user_id = rows[0].user_id;

			        var query = conn.query("UPDATE contents set ? WHERE content_id = ? ",[data,content_id], function(err, rows){

			           if(err){
			                console.log(err);
			                return next("Mysql error, check your query");
			           }

			          // res.sendStatus(200);

			          var query = conn.query("SELECT * FROM contents WHERE content_id = ?",[content_id],function(err,rows){

				            if(err){
				                console.log(err);
				                return next("Mysql error, check your query");
				            }

				            //if user not found
				            if(rows.length < 1)
				                return res.send("Contents Not found");

				            res.json({"Error" : false, "Message" : "Success", "Contents" : rows});
				        });

			        });

	            }

	         });


	    });
	 } else {
		res.json({"Error" : true, "Message" : "Auth is required"});
	}

});



var balances = router.route('/balances/:friend_user_id');

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

var balanceshare = router.route('/balances/share');

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
