
## Installation
Clone to your machine then hit this :

	node server.js

## Configuration (database)

        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'billme'	

import billme.sql

##API Router

	User
		type : GET
		url : /users
		header : authentification
		params : -

		type : PUT
		url : /users/:user_id
		header : authentification
		params : ava_url

	Login
		type : POST
		url : /login/facebook
		header : -
		params : facebook_id, first_name, last_name, email, ava_url

	Chat
		type : GET
		url : /chats
		header : authentification
		params : -

		type : POST
		url : /chats/{friend_user_id}
		header : authentification
		params : text

		type : PUT
		url : /chats/{friend_user_id}/{chat_id}
		header : authentification
		params : action_status (0 = reject, 1 = accept)

		type : GET
		url : /chats/{friend_user_id}
		header : authentification
		params : -
