# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.24)
# Database: billme
# Generation Time: 2015-07-12 14:59:37 +0000
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



# Dump of table contents
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contents`;

CREATE TABLE `contents` (
  `content_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content_user_id` int(11) DEFAULT NULL,
  `content_value` varchar(255) DEFAULT NULL,
  `content_date` timestamp NULL DEFAULT NULL,
  `content_status` int(11) DEFAULT NULL,
  PRIMARY KEY (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



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




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
