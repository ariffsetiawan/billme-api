# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.24)
# Database: billme
# Generation Time: 2015-07-15 18:54:00 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table balances
# ------------------------------------------------------------

DROP TABLE IF EXISTS `balances`;

CREATE TABLE `balances` (
  `balance_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `balance_user_id` int(11) DEFAULT NULL,
  `balance_value` varchar(255) DEFAULT NULL,
  `balance_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`balance_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table chats
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chats`;

CREATE TABLE `chats` (
  `chat_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `chat_user_1` int(11) DEFAULT NULL,
  `chat_user_2` int(11) DEFAULT NULL,
  `chat_created_date` timestamp NULL DEFAULT NULL,
  `chat_updated_date` timestamp NULL DEFAULT NULL,
  `chat_last_content` text,
  `chat_read_status` int(11) DEFAULT NULL,
  `chat_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`chat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;

INSERT INTO `chats` (`chat_id`, `chat_user_1`, `chat_user_2`, `chat_created_date`, `chat_updated_date`, `chat_last_content`, `chat_read_status`, `chat_url`)
VALUES
	(1,2,1,'2015-07-15 18:10:55','2015-07-15 18:50:29','njajal maning',0,'2/1'),
	(2,3,1,'2015-07-15 18:20:00','2015-07-15 18:20:00','40000',0,'3/1');

/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table contents
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contents`;

CREATE TABLE `contents` (
  `content_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content_chat_id` int(11) DEFAULT NULL,
  `content_user_id` int(11) DEFAULT NULL,
  `content_value` varchar(255) DEFAULT NULL,
  `content_date` timestamp NULL DEFAULT NULL,
  `content_status` int(11) DEFAULT NULL,
  PRIMARY KEY (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `contents` WRITE;
/*!40000 ALTER TABLE `contents` DISABLE KEYS */;

INSERT INTO `contents` (`content_id`, `content_chat_id`, `content_user_id`, `content_value`, `content_date`, `content_status`)
VALUES
	(1,1,2,'hello','2015-07-15 18:10:55',1),
	(2,1,2,'wkwkwk','2015-07-15 18:15:24',1),
	(3,1,2,'wkwkwk','2015-07-15 18:16:22',1),
	(4,1,2,'20000','2015-07-15 18:19:32',0),
	(5,2,3,'40000','2015-07-15 18:20:00',1),
	(6,1,2,'wew','2015-07-15 18:42:19',1),
	(7,1,2,'rapopo','2015-07-15 18:42:59',1),
	(8,1,2,'rapopo','2015-07-15 18:44:40',1),
	(9,1,2,'njajal','2015-07-15 18:49:20',1),
	(10,1,2,'njajal maning','2015-07-15 18:50:29',1);

/*!40000 ALTER TABLE `contents` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_fbid` int(11) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_firstname` varchar(255) DEFAULT NULL,
  `user_lastname` varchar(255) DEFAULT NULL,
  `user_gender` char(1) DEFAULT NULL,
  `user_birthdate` date DEFAULT NULL,
  `user_age` int(11) DEFAULT NULL,
  `user_image` text,
  `user_last_update` timestamp NULL DEFAULT NULL,
  `user_created_date` timestamp NULL DEFAULT NULL,
  `user_updated_date` timestamp NULL DEFAULT NULL,
  `user_access_token` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`user_id`, `user_fbid`, `user_email`, `user_password`, `user_firstname`, `user_lastname`, `user_gender`, `user_birthdate`, `user_age`, `user_image`, `user_last_update`, `user_created_date`, `user_updated_date`, `user_access_token`)
VALUES
	(1,123123456,'ariffsetiawan@gmail.com',NULL,'Arif','Setiawan','M','1990-04-11',NULL,NULL,NULL,NULL,NULL,NULL),
	(2,123789678,'hi@jokowi.com',NULL,'Joko','Widodo','M','1956-05-09',NULL,NULL,NULL,NULL,NULL,NULL),
	(3,567893679,'sahidfajar@gmail.com',NULL,'Sahid','Fajar',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
