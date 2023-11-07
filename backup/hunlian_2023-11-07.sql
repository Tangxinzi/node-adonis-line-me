# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20058
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: 127.0.0.1 (MySQL 5.7.26)
# 数据库: hunlian
# 生成时间: 2023-11-07 10:24:21 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# 转储表 answer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `answer`;

CREATE TABLE `answer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `status` bigint(1) DEFAULT '1' COMMENT '发布状态 0 - 删除；1 - 发布；2 - 草稿',
  `recommend` bigint(1) DEFAULT '0' COMMENT '推荐状态 0 - 默认；1 - 推荐',
  `content` varchar(128) CHARACTER SET utf8mb4 NOT NULL COMMENT '描述',
  `user_id` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '发布人 User ID',
  `relation_question_id` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 Question ID',
  `introduce_name` varchar(100) DEFAULT NULL COMMENT '与推荐人关系的称呼 ["朋友", "亲戚", "伙伴", "同事", "其他"]',
  `introduce_openid` varchar(100) DEFAULT NULL COMMENT '推荐介绍人 Openid',
  `photos` longtext COMMENT '图片',
  `type` bigint(1) NOT NULL DEFAULT '0' COMMENT '问答类型：0 - 默认；1 - 他人为好友介绍',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;

INSERT INTO `answer` (`id`, `status`, `recommend`, `content`, `user_id`, `relation_question_id`, `introduce_name`, `introduce_openid`, `photos`, `type`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(3,1,0,'当然是拯救世界啦！','hl_a90915530','1',NULL,NULL,'[\"/uploads/files/OCPkev0TzsrSVPXgRcB1UhuT7oYx8lD7.jpg\"]',0,'2023-10-24 18:12:33','2023-10-24 18:12:33',NULL),
	(4,1,0,'拜托生活，少一些莫名其妙的不快乐','hl_a18254325','1',NULL,NULL,'[]',0,'2023-10-26 15:24:27','2023-10-26 15:24:27',NULL),
	(5,1,0,'吃辣星人','hl_a18254325','2',NULL,NULL,'[]',0,'2023-10-26 15:24:46','2023-10-26 15:24:46',NULL),
	(6,1,0,'高高帅帅，可可爱爱！','hl_a18254325','9',NULL,NULL,'[]',0,'2023-10-26 15:25:01','2023-10-26 15:25:01',NULL),
	(7,1,0,'大学本科','hl_a18254325','3',NULL,NULL,'[]',0,'2023-10-26 15:25:13','2023-10-26 15:25:13',NULL),
	(8,1,0,'父母双全，有个小弟。','hl_a18254325','3',NULL,NULL,'[]',0,'2023-10-26 15:25:34','2023-10-26 15:25:34',NULL),
	(9,1,0,'看电影听音乐','hl_a18254325','7',NULL,NULL,'[]',0,'2023-10-26 15:25:46','2023-10-26 15:25:46',NULL),
	(10,1,0,'甜酷','hl_a18254325','10',NULL,NULL,'[]',0,'2023-10-26 15:27:31','2023-10-26 15:27:31',NULL),
	(11,1,0,'天天都开心','hl_a45082499','1',NULL,NULL,'[]',0,'2023-10-26 15:31:02','2023-10-26 15:31:02',NULL),
	(12,1,0,'偶尔健健身','hl_a45082499','8',NULL,NULL,'[]',0,'2023-10-26 15:31:15','2023-10-26 15:31:15',NULL),
	(13,1,0,'每日晨跑','hl_a75816652','2',NULL,NULL,'[]',0,'2023-10-26 15:32:44','2023-10-26 15:32:44',NULL),
	(14,1,0,'风景照','hl_a19680457','11',NULL,NULL,'[]',0,'2023-10-26 15:33:15','2023-10-26 15:33:15',NULL),
	(15,1,0,'躺平','hl_a19680457','4',NULL,NULL,'[]',0,'2023-10-26 15:33:24','2023-10-26 15:33:24',NULL),
	(16,1,0,'学习','hl_a19680457','7',NULL,NULL,'[]',0,'2023-10-26 15:33:37','2023-10-26 15:33:37',NULL),
	(17,1,0,'不是很美好','hl_a19680457','6',NULL,NULL,'[]',0,'2023-10-26 15:33:50','2023-10-26 15:33:50',NULL),
	(18,1,0,'温柔多金善良','hl_a19680457','5',NULL,NULL,'[]',0,'2023-10-26 15:34:02','2023-10-26 15:34:02',NULL),
	(19,1,0,'喜欢跑步','hl_a19680457','8',NULL,NULL,'[]',0,'2023-10-26 15:34:10','2023-10-26 15:34:10',NULL),
	(20,1,0,'明年去哈尔滨旅游…','hl_a75816652','1',NULL,NULL,'[]',0,'2023-10-26 15:35:11','2023-10-26 15:35:11',NULL),
	(21,1,0,'快乐小狗','hl_a88076879','5',NULL,NULL,'[]',0,'2023-10-26 15:50:29','2023-10-26 15:50:29',NULL),
	(22,1,0,'快乐小狗','hl_a88076879','5',NULL,NULL,'[]',0,'2023-10-26 15:50:31','2023-10-26 15:50:31',NULL),
	(23,1,0,'喜欢音乐，旅游','hl_a35324426','7',NULL,NULL,'[]',0,'2023-10-26 16:10:39','2023-10-26 16:10:39',NULL),
	(24,1,0,'不健身，感觉太累了','hl_a35324426','8',NULL,NULL,'[]',0,'2023-10-26 16:10:51','2023-10-26 16:10:51',NULL),
	(25,1,0,'是自己','hl_a12419437','11',NULL,NULL,'[]',0,'2023-10-26 16:20:41','2023-10-26 16:20:41',NULL),
	(26,1,0,'是的','hl_a12419437','8',NULL,NULL,'[]',0,'2023-10-26 16:25:00','2023-10-26 16:25:00',NULL),
	(27,1,0,'成为富婆','hl_a34770909','1',NULL,NULL,'[]',0,'2023-10-26 17:14:47','2023-10-26 17:14:47',NULL),
	(28,1,0,'平安健康','hl_a16846511','1',NULL,NULL,'[]',0,'2023-10-27 10:25:38','2023-10-27 10:25:38','2023-10-31 04:35:30');

/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 articles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `articles`;

CREATE TABLE `articles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `article_author` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '作者',
  `article_title` varchar(128) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '标题',
  `article_detail` longtext CHARACTER SET utf8mb4 COMMENT '内容',
  `article_original_url` longtext CHARACTER SET utf8mb4 COMMENT '地址',
  `article_theme_url` varchar(150) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '封面',
  `status` int(1) DEFAULT '1' COMMENT '状态 0 - 删除；1 - 发布	',
  `ip` varchar(16) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;

INSERT INTO `articles` (`id`, `article_author`, `article_title`, `article_detail`, `article_original_url`, `article_theme_url`, `status`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(1,'作者','1','<p>1</p>','12','',1,NULL,'2023-10-23 17:11:28','2023-10-23 17:11:28',NULL);

/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 chatroom
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chatroom`;

CREATE TABLE `chatroom` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `chat_id` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '聊天号 ID',
  `chat_users_id` varchar(500) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'User IDs',
  `chat_name` varchar(120) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT '名称',
  `chat_description` varchar(200) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT '简介',
  `type` int(2) DEFAULT '0' COMMENT '类型',
  `status` int(2) DEFAULT '1' COMMENT '状态 0 - 删除；1 - 发布',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='聊天';

LOCK TABLES `chatroom` WRITE;
/*!40000 ALTER TABLE `chatroom` DISABLE KEYS */;

INSERT INTO `chatroom` (`id`, `chat_id`, `chat_users_id`, `chat_name`, `chat_description`, `type`, `status`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(1,'8be9e13c-bf6e-4145-996c-f3d8818221d4','hl_a90915530,hl_a45943511,1','测试交流','Hello World',0,1,'2022-09-08 10:22:02','2023-11-04 12:53:13',NULL),
	(2,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530,hl_a77713707','测试交流','Hello World',0,1,'2022-09-08 10:42:02','2023-11-06 18:27:47',NULL),
	(3,'8be9e13c-bf6e-4145-996c-f3d8818221d6','hl_a90915530,hl_a09087583','测试交流','Hello World',0,1,'2022-09-08 10:42:02','2023-11-05 21:30:40',NULL),
	(4,'04c22a83-2428-4aba-b1eb-905446d200ff','1,2',NULL,NULL,0,1,'2023-11-07 17:35:38','2023-11-07 17:35:38',NULL);

/*!40000 ALTER TABLE `chatroom` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 chats
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chats`;

CREATE TABLE `chats` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `chat_id` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '房间 ID',
  `user_id` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '用户 ID',
  `chat_content` longtext COLLATE utf8mb4_unicode_520_ci COMMENT '聊天内容',
  `chat_content_type` longtext COLLATE utf8mb4_unicode_520_ci COMMENT '内容类型',
  `chat_read` int(1) DEFAULT '0' COMMENT '已读？',
  `chat_ip` varchar(15) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'IP',
  `status` int(2) DEFAULT '1' COMMENT '状态 0 - 删除；1 - 发布',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='聊天';

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;

INSERT INTO `chats` (`id`, `chat_id`, `user_id`, `chat_content`, `chat_content_type`, `chat_read`, `chat_ip`, `status`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(20,'8be9e13c-bf6e-4145-996c-f3d8818221d4','hl_a90915530','Hi','text',0,NULL,1,'2023-11-03 22:49:00',NULL,NULL),
	(21,'8be9e13c-bf6e-4145-996c-f3d8818221d4','hl_a90915530','/uploads/files/LFTDRp0aNmSwow2W48EnYiPUNeruNIvQ.png','image',0,NULL,1,'2023-11-03 23:06:54',NULL,NULL),
	(22,'8be9e13c-bf6e-4145-996c-f3d8818221d4','hl_a90915530','/uploads/files/iaBoS9YmGxswNtkvP6M36yUSu6keuOvw.jpg','image',0,NULL,1,'2023-11-03 23:25:42',NULL,NULL),
	(23,'8be9e13c-bf6e-4145-996c-f3d8818221d4','hl_a90915530','/uploads/files/F8E0BQ3V3RZxcKoSJ08gemljCdg8bAkg.jpg','image',0,NULL,1,'2023-11-03 23:30:50',NULL,NULL),
	(24,'8be9e13c-bf6e-4145-996c-f3d8818221d4','hl_a90915530','/uploads/files/0c2aQTrcisVvOfIKkX9UxiYZlTvYhHMe.jpg','image',0,NULL,1,'2023-11-03 23:31:54',NULL,NULL),
	(25,'8be9e13c-bf6e-4145-996c-f3d8818221d4','hl_a90915530','您好呀','text',0,'223.72.87.117',1,'2023-11-04 12:53:13',NULL,NULL),
	(26,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','hi','text',0,'223.72.87.117',1,'2023-11-05 11:27:14',NULL,NULL),
	(27,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','围棋','text',0,'223.72.87.117',1,'2023-11-05 11:27:27',NULL,NULL),
	(28,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','12','text',0,'223.72.87.117',1,'2023-11-05 11:27:34',NULL,NULL),
	(29,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','💄','text',0,'223.72.87.117',1,'2023-11-05 11:30:30',NULL,NULL),
	(30,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','12','text',0,'223.72.87.117',1,'2023-11-05 12:33:59','2023-11-05 12:33:59',NULL),
	(31,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','abc','text',0,'223.72.87.117',1,'2023-11-05 12:34:02','2023-11-05 12:34:02',NULL),
	(32,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','25','text',0,'223.72.37.208',1,'2023-11-05 14:28:56','2023-11-05 14:28:56',NULL),
	(33,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','uj','text',0,'223.72.37.208',1,'2023-11-05 14:30:43','2023-11-05 14:30:43',NULL),
	(34,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','ik','text',0,'223.72.37.208',1,'2023-11-05 14:31:18','2023-11-05 14:31:18',NULL),
	(35,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','12','text',0,'223.72.37.208',1,'2023-11-05 14:37:52','2023-11-05 14:37:52',NULL),
	(36,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','3','text',0,'223.72.37.208',1,'2023-11-05 15:12:29','2023-11-05 15:12:29',NULL),
	(37,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','hi','text',0,'223.72.37.208',1,'2023-11-05 15:13:24','2023-11-05 15:13:24',NULL),
	(38,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','hhh','text',0,'223.72.37.208',1,'2023-11-05 15:15:27','2023-11-05 15:15:27',NULL),
	(39,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','hh','text',0,'223.72.37.208',1,'2023-11-05 15:59:31','2023-11-05 15:59:31',NULL),
	(40,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','u','text',0,'223.72.37.208',1,'2023-11-05 16:00:44','2023-11-05 16:00:44',NULL),
	(41,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','12','text',0,'223.72.37.208',1,'2023-11-05 16:01:52','2023-11-05 16:01:52',NULL),
	(42,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','一','text',0,'223.72.37.208',1,'2023-11-05 16:02:29','2023-11-05 16:02:29',NULL),
	(43,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','p','text',0,'223.72.37.208',1,'2023-11-05 16:02:33','2023-11-05 16:02:33',NULL),
	(44,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','broadcast','text',0,'223.72.37.208',1,'2023-11-05 16:02:37','2023-11-05 16:02:37',NULL),
	(45,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','😑','text',0,'223.72.37.208',1,'2023-11-05 16:02:42','2023-11-05 16:02:42',NULL),
	(46,'8be9e13c-bf6e-4145-996c-f3d8818221d6','hl_a90915530','Hello World','text',0,'223.72.37.208',1,'2023-11-05 21:30:40','2023-11-05 21:30:40',NULL),
	(47,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','/uploads/files/pcxSVXeWJYUdjZ8Qguo1Rd0Wn1tZL9lF.png','image',0,'1.202.45.19',1,'2023-11-06 11:15:02','2023-11-06 11:15:02',NULL),
	(48,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','1','text',0,'1.202.45.19',1,'2023-11-06 14:50:02','2023-11-06 14:50:02',NULL),
	(49,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','我也','text',0,'1.202.45.19',1,'2023-11-06 14:51:50','2023-11-06 14:51:50',NULL),
	(50,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','我','text',0,'1.202.45.19',1,'2023-11-06 16:05:27','2023-11-06 16:05:27',NULL),
	(51,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','12','text',0,'1.202.45.19',1,'2023-11-06 16:05:55','2023-11-06 16:05:55',NULL),
	(52,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','12','text',0,'1.202.45.19',1,'2023-11-06 16:06:18','2023-11-06 16:06:18',NULL),
	(53,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','我也','text',0,'1.202.45.19',1,'2023-11-06 16:13:16','2023-11-06 16:13:16',NULL),
	(54,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','今天','text',0,'1.202.45.19',1,'2023-11-06 16:13:27','2023-11-06 16:13:27',NULL),
	(55,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','我','text',0,'1.202.45.19',1,'2023-11-06 16:14:06','2023-11-06 16:14:06',NULL),
	(56,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','不','text',0,'1.202.45.19',1,'2023-11-06 16:35:13','2023-11-06 16:35:13',NULL),
	(57,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','12','text',0,'1.202.45.19',1,'2023-11-06 16:41:46','2023-11-06 16:41:46',NULL),
	(58,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','12','text',0,'1.202.45.19',1,'2023-11-06 16:42:12','2023-11-06 16:42:12',NULL),
	(59,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','我也','text',0,'1.202.45.19',1,'2023-11-06 16:48:29','2023-11-06 16:48:29',NULL),
	(60,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','我在','text',0,'1.202.45.19',1,'2023-11-06 16:48:38','2023-11-06 16:48:38',NULL),
	(61,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','12','text',0,'1.202.45.19',1,'2023-11-06 16:48:41','2023-11-06 16:48:41',NULL),
	(62,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','12','text',0,'1.202.45.19',1,'2023-11-06 16:53:15','2023-11-06 16:53:15',NULL),
	(63,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','12','text',0,'1.202.45.19',1,'2023-11-06 16:53:28','2023-11-06 16:53:28',NULL),
	(64,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','23','text',0,'1.202.45.19',1,'2023-11-06 16:53:51','2023-11-06 16:53:51',NULL),
	(65,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','这些','text',0,'1.202.45.19',1,'2023-11-06 16:55:44','2023-11-06 16:55:44',NULL),
	(66,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','2','text',0,'1.202.45.19',1,'2023-11-06 16:57:11','2023-11-06 16:57:11',NULL),
	(67,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','你在','text',0,'1.202.45.19',1,'2023-11-06 17:39:01','2023-11-06 17:39:01',NULL),
	(68,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','我','text',0,'1.202.45.19',1,'2023-11-06 17:41:52','2023-11-06 17:41:52',NULL),
	(69,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','不','text',0,'1.202.45.19',1,'2023-11-06 17:41:58','2023-11-06 17:41:58',NULL),
	(70,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','你们','text',0,'1.202.45.19',1,'2023-11-06 17:42:02','2023-11-06 17:42:02',NULL),
	(71,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','我','text',0,'1.202.45.19',1,'2023-11-06 17:48:16','2023-11-06 17:48:16',NULL),
	(72,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','你在','text',0,'1.202.45.19',1,'2023-11-06 17:48:39','2023-11-06 17:48:39',NULL),
	(73,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','你的','text',0,'1.202.45.19',1,'2023-11-06 17:51:09','2023-11-06 17:51:09',NULL),
	(74,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','不','text',0,'1.202.45.19',1,'2023-11-06 17:57:28','2023-11-06 17:57:28',NULL),
	(75,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','我','text',0,'1.202.45.19',1,'2023-11-06 17:58:55','2023-11-06 17:58:55',NULL),
	(76,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','这里','text',0,'1.202.45.19',1,'2023-11-06 17:59:00','2023-11-06 17:59:00',NULL),
	(77,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','一点','text',0,'1.202.45.19',1,'2023-11-06 17:59:12','2023-11-06 17:59:12',NULL),
	(78,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','我','text',0,'1.202.45.19',1,'2023-11-06 18:03:31','2023-11-06 18:03:31',NULL),
	(79,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','我也','text',0,'1.202.45.19',1,'2023-11-06 18:05:23','2023-11-06 18:05:23',NULL),
	(80,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','其二官吏！','text',0,'1.202.45.19',1,'2023-11-06 18:27:14','2023-11-06 18:27:14',NULL),
	(81,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','你说了什么','text',0,'1.202.45.19',1,'2023-11-06 18:27:43','2023-11-06 18:27:43',NULL),
	(82,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','du','text',0,'1.202.45.19',1,'2023-11-06 18:27:46','2023-11-06 18:27:46',NULL),
	(83,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','uj','text',0,'1.202.45.19',1,'2023-11-06 18:27:47','2023-11-06 18:27:47',NULL);

/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 chats_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chats_log`;

CREATE TABLE `chats_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `chat_id` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '房间 ID',
  `user_id` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '用户 ID',
  `last_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='聊天日志';

LOCK TABLES `chats_log` WRITE;
/*!40000 ALTER TABLE `chats_log` DISABLE KEYS */;

INSERT INTO `chats_log` (`id`, `chat_id`, `user_id`, `last_at`)
VALUES
	(1,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','2023-11-06 17:38:46'),
	(2,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a77713707','2023-11-06 18:27:47'),
	(3,'8be9e13c-bf6e-4145-996c-f3d8818221d4','hl_a90915530','2023-11-06 17:19:17'),
	(4,'8be9e13c-bf6e-4145-996c-f3d8818221d6','hl_a90915530','2023-11-06 17:05:18');

/*!40000 ALTER TABLE `chats_log` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 comments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '发布状态 0 - 删除；1 - 发布；2 - 草稿',
  `recommend` int(1) NOT NULL DEFAULT '0' COMMENT '推荐状态 0 - 默认；1 - 推荐',
  `type` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 Type ID',
  `relation_type_id` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 Type ID',
  `user_id` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 User ID',
  `comment_content` varchar(128) CHARACTER SET utf8mb4 NOT NULL COMMENT '评论内容',
  `ip` varchar(16) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;

INSERT INTO `comments` (`id`, `status`, `recommend`, `type`, `relation_type_id`, `user_id`, `comment_content`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(2,1,0,'moment','2','hl_a90915530','天气真好哇 ☁️','10.0.8.14','2023-10-24 18:10:50','2023-10-24 18:10:50',NULL);

/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 customer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `status` bigint(1) DEFAULT '1' COMMENT '客户状态 0 - 删除；1 - 发布；2 - 草稿',
  `recommend` bigint(1) DEFAULT '0' COMMENT '推荐状态 0 - 默认；1 - 推荐',
  `user_id` varchar(255) DEFAULT NULL COMMENT '发布用户 ID',
  `relation_user_id` varchar(255) DEFAULT NULL COMMENT '关联 User ID',
  `relation` varchar(11) DEFAULT '0' COMMENT '与红娘关系 ["朋友", "亲戚", "伙伴", "同事", "其他"]',
  `relation_log_id` bigint(10) DEFAULT NULL COMMENT '关联 log ID',
  `introduction` longtext CHARACTER SET utf8mb4 COMMENT '红娘介绍客户信息',
  `userinfo` longtext CHARACTER SET utf8mb4 COMMENT '用户 JSON 数据',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;

INSERT INTO `customer` (`id`, `status`, `recommend`, `user_id`, `relation_user_id`, `relation`, `relation_log_id`, `introduction`, `userinfo`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(2,1,1,'hl_a90915530',NULL,'0',4,'我蠢蠢欲动的爱情，就要飞向你','{\"openid\":\"op02s4vhiiLffHPfdB7LKmpMdr_I\",\"relation\":\"0\",\"introduction\":\"人美心善的女孩\",\"photos\":[\"/uploads/files/TnXkHGqIOwkDCYZkX7xQ3t1fTSsT9V6c.jpg\"],\"type\":1,\"avatar\":\"http://tmp/bu6BqAYGGH6q3d363a6f448fec0e083d4b1acf8c84c2.jpg\",\"avatar_url\":\"/uploads/files/KGvDmQtTiDdmaiH6NI1vxQ7SAPLGxwdh.jpg\",\"nickname\":\"大聪明\",\"sex\":\"0\",\"height\":166,\"birthday\":\"1999-01-01\",\"work\":{\"key\":\"zhipin\",\"value\":[4,0]},\"files\":[\"http://tmp/0veo6Ezp6icZ094b50e2e03841797ff499c708fb5b97.jpg\"]}','2023-10-24 18:29:07','2023-10-24 18:29:07','2023-10-26 15:08:01'),
	(3,1,1,'hl_a90915530',NULL,'0',5,'在 USA 读博中，希望遇见一个喜欢的他。😘','','2023-10-24 18:29:07','2023-10-24 18:29:07',NULL),
	(4,1,1,'hl_a77713707',NULL,'0',6,'个性车模 😈 ','{\"openid\":\"op02s4vkWz17jyhDWsWuzDrV41_E\",\"relation\":\"0\",\"introduction\":\"个性车模 😈 \",\"photos\":[\"/uploads/files/2U5jTHFh1uzl30GyoGWlmWFGZ6JQbO2p.jpg\",\"/uploads/files/N13Y6VQl6Scb95sndrIKH3RkBGt62M1x.jpg\",\"/uploads/files/BVOFXMczZWxs7ne713gf8TkJgPp6hvik.jpg\",\"/uploads/files/Zwndgs60UNOGHQ2IkLmd90g23JY1wIVj.jpg\"],\"type\":1,\"nickname\":\"小甜甜\",\"sex\":\"0\",\"height\":173,\"birthday\":\"1995-01-01\",\"work\":{\"key\":\"zhipin\",\"value\":[11,5]},\"files\":[\"wxfile://tmp_724e6f82aaaa3704ac3ab22e7c66e8ecdae4c5ef4c1b2161.jpg\"]}','2023-10-25 18:10:01','2023-10-25 18:10:01',NULL),
	(6,1,0,'hl_a90915530','hl_a90915530','4',NULL,'介绍我自己咯','{\"id\":25,\"type\":2,\"user_id\":\"hl_a90915530\",\"nickname\":\"KMT 184.05\",\"avatar_url\":\"/uploads/files/OvvlGmKpIZWyNJP2EgZVGqRZAgkl6u99.jpeg\",\"birthday\":\"1997-02-01\",\"height\":173,\"sex\":1,\"work\":{\"key\":\"zhipin\",\"value\":[0,12],\"text\":\"社交网络\"},\"photos\":[\"/uploads/files/fWb1balGB2IQSWdccNXPVR44wFpyyBcR.png\",\"/uploads/files/pkfG33cwtPa2HiKpkdRhuqwufkCZaZV3.png\"],\"videos\":null,\"detail\":null,\"contact_wechat\":null,\"school\":null,\"company\":null,\"location\":null,\"realname\":null,\"phone\":null,\"wechat_union_id\":null,\"wechat_open_id\":\"op02s4vhiiLffHPfdB7LKmpMdr_I\",\"wechat_platform_open_id\":null,\"parent_id\":null,\"ip\":{\"ip\":\"10.0.8.14\",\"pro\":\"\",\"proCode\":\"999999\",\"city\":\"\",\"cityCode\":\"0\",\"region\":\"\",\"regionCode\":\"0\",\"addr\":\" 局域网IP\",\"regionNames\":\"\",\"err\":\"noprovince\"},\"online_at\":\"2023-10-30T07:55:46.000Z\",\"created_at\":\"2023-10-24T09:48:25.000Z\",\"modified_at\":\"2023-10-24T09:50:28.000Z\",\"deleted_at\":null,\"zodiac_sign\":\"双鱼座\",\"age\":26,\"number\":{\"message\":0,\"introduction\":0,\"visitor\":0,\"moment\":1,\"answer\":1,\"customer\":2}}','2023-10-30 16:02:45','2023-10-30 16:02:45','2023-10-30 16:55:20'),
	(7,1,1,'hl_a45943511',NULL,'0',15,'165绝世大美女！！！22岁 95斤 有意者请联系我！','{\"openid\":\"op02s4vK7NqYrMGoluds8GWRCt0c\",\"relation\":\"0\",\"introduction\":\"165绝世大美女！！！22岁 95斤 有意者请联系我！\",\"photos\":[\"/uploads/files/vv5HsRxMQAtfVJ8qb8MFws7OKNvob7Td.jpg\"],\"type\":1,\"nickname\":\"板板\",\"avatar\":\"wxfile://tmp_71b1d12fb9eff1289f86083cc0871543.jpg\",\"avatar_url\":\"/uploads/files/tRGlAJ610weOrxTJdC3xEw3evEaVkuGp.jpg\",\"sex\":\"0\",\"height\":165,\"birthday\":\"2001-01-13\",\"work\":{\"key\":\"zhipin\",\"value\":[2,2]},\"files\":[\"wxfile://tmp_7b7a13c5f0936f599d797545ae56c3ad.jpg\"]}','2023-11-01 09:14:36','2023-11-01 09:14:36',NULL);

/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 customer_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer_log`;

CREATE TABLE `customer_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(40) DEFAULT NULL COMMENT '用户ID',
  `nickname` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '昵称',
  `avatar_url` varchar(256) DEFAULT NULL COMMENT '头像',
  `birthday` varchar(12) DEFAULT NULL COMMENT '生日',
  `height` int(11) unsigned DEFAULT NULL COMMENT '身高',
  `sex` int(1) DEFAULT NULL COMMENT '性别',
  `work` varchar(50) DEFAULT '{}' COMMENT '职业工作',
  `photos` varchar(1000) DEFAULT '[]' COMMENT '图片集',
  `videos` varchar(500) DEFAULT NULL COMMENT '介绍视频',
  `detail` longtext COMMENT '个人介绍',
  `contact_wechat` varchar(50) DEFAULT NULL COMMENT '联系方式 - wechat',
  `location` varchar(255) DEFAULT NULL COMMENT '所在地址信息',
  `realname` varchar(50) DEFAULT NULL COMMENT '真实姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机',
  `wechat_union_id` varchar(255) DEFAULT NULL COMMENT '微信 UNION ID',
  `wechat_open_id` varchar(255) DEFAULT NULL COMMENT '小程序 OPEN ID',
  `wechat_platform_open_id` varchar(255) DEFAULT NULL COMMENT '公号 OPEN ID',
  `parent_id` int(11) DEFAULT NULL COMMENT '父级 ID',
  `ip` varchar(16) DEFAULT NULL COMMENT 'IP 地址',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `customer_log` WRITE;
/*!40000 ALTER TABLE `customer_log` DISABLE KEYS */;

INSERT INTO `customer_log` (`id`, `user_id`, `nickname`, `avatar_url`, `birthday`, `height`, `sex`, `work`, `photos`, `videos`, `detail`, `contact_wechat`, `location`, `realname`, `phone`, `wechat_union_id`, `wechat_open_id`, `wechat_platform_open_id`, `parent_id`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(4,NULL,'大聪明','/uploads/files/KGvDmQtTiDdmaiH6NI1vxQ7SAPLGxwdh.jpg','1999-01-01',166,0,'{\"key\":\"zhipin\",\"value\":[4,0]}','[\"/uploads/files/2GQ6uwNXugR6eWD8AYm5eCH6aZ0UDzg0.jpg\",\"/uploads/files/TnXkHGqIOwkDCYZkX7xQ3t1fTSsT9V6c.jpg\",\"/uploads/files/rMp4Y9km65FkpIC3XOYpQovkcyieSqUo.jpg\",\"/uploads/files/I4MbhatLDwwTtwNVG97ym5jRQ0VmKsK0.jpg\",\"/uploads/files/FbPVlAFTnTMEwz1H2HpW5XDGcG5bTShB.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-24 18:29:07','2023-10-24 18:29:07',NULL),
	(5,NULL,'是小欢子呀','/uploads/files/qYLHcgYxr63cRITMfNs2d80ikGgIbAVE.jpg','1998-05-07',174,0,'{\"key\":\"zhipin\",\"value\":[3,1]}','[\"/uploads/files/5HaneJfTWus4eL17O4z4sgGne63pSfTO.jpg\",\"/uploads/files/15CJwN177y2cF2FOLi7rKfY4Ug94WB7y.jpg\",\"/uploads/files/w1W1BFoMug8kFCpnDWBdyUpvhx0eOlQa.jpg\",\"/uploads/files/cqMR1HKMdnD59wffDowvObsUwruoORCZ.jpg\",\"/uploads/files/Zf1gUqYuw3G7133xuC7fBCDXh3lXvFMT.jpg\",\"/uploads/files/6dJ83B9JsOlVKHOIOZL70xkbWbzWhp7Z.jpg\"]',NULL,NULL,'1126638303',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-25 09:33:25','2023-10-25 09:33:25',NULL),
	(6,NULL,'小甜甜','/uploads/normal-avatars/sex-014.png','1995-01-01',173,0,'{\"key\":\"zhipin\",\"value\":[11,5]}','[\"/uploads/files/2U5jTHFh1uzl30GyoGWlmWFGZ6JQbO2p.jpg\",\"/uploads/files/N13Y6VQl6Scb95sndrIKH3RkBGt62M1x.jpg\",\"/uploads/files/BVOFXMczZWxs7ne713gf8TkJgPp6hvik.jpg\",\"/uploads/files/Zwndgs60UNOGHQ2IkLmd90g23JY1wIVj.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-25 18:10:01','2023-10-25 18:10:01',NULL),
	(7,NULL,'12','/uploads/normal-avatars/sex-016.png','2002-01-01',165,0,'{\"key\":\"zhipin\",\"value\":[4,0]}','[\"/uploads/files/UNNXhHU81D9CuEtdtqNdD3RTO2IwODDE.png\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-30 21:10:24','2023-10-30 21:10:24',NULL),
	(8,NULL,'12','/uploads/files/YrRiY3q8OkK7hFh8ZIcixcBeB9QdQEeg.png','2000-01-01',168,0,'{\"key\":\"zhipin\",\"value\":[0,2]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-30 21:19:29','2023-10-30 21:19:29',NULL),
	(9,NULL,'12','/uploads/normal-avatars/sex-013.png','2000-01-01',157,0,'{\"key\":\"zhipin\",\"value\":[0,3]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-30 21:28:32','2023-10-30 21:28:32',NULL),
	(10,NULL,'1212','/uploads/files/P7CWPKTDOK2gDtU8fcrtaKDoNjkssZ3O.png','2002-01-01',161,0,'{\"key\":\"zhipin\",\"value\":[3,0]}','[\"/uploads/files/Pj5D2p1mpboGAZM35TPDEN8D37PIshXI.png\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-31 09:18:27','2023-10-31 09:18:27',NULL),
	(11,NULL,'12','/uploads/files/3y7SMTeyhh1hvuV4ln9vzDytE3MgFGYW.png','2000-01-01',163,0,'{\"key\":\"zhipin\",\"value\":[3,0]}','[\"/uploads/files/lMJLQ0sbUAVa5MYK5HinCYQI7lWqBH3V.png\",\"/uploads/files/rx2rkY2MV4z8v8DHteMDUwsPJuA7q68A.jpg\",\"/uploads/files/woJe8fZDe8ECc215GTi9FG4T3c89hE4j.jpeg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-31 10:59:53','2023-10-31 10:59:53',NULL),
	(12,NULL,'12','/uploads/files/JTbpZMwInsFCMJUn9DCv4pq0D4kqyu4k.jpeg','2000-01-01',166,0,'{\"key\":\"zhipin\",\"value\":[2,0]}','[\"/uploads/files/I9YgjIkWS7vH7DZMLVOROBXVpCjVEehr.png\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-31 11:48:24','2023-10-31 11:48:24',NULL),
	(13,NULL,'1212','/uploads/files/k4l3y5jcqY6TJfWuId5L9eWDKt50MABF.jpeg','2000-01-01',157,0,'{\"key\":\"zhipin\",\"value\":[2,0]}','[\"/uploads/files/SH2IsYgBgAAZTgwBFlxwjW2qnfsQKmNC.png\",\"/uploads/files/Pt5THF9Z29FbbKWJjZHSRopGoUd70Elh.png\",\"/uploads/files/CrVYuEFexGNuc8hrplFMdCgxI6g15EX9.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-31 12:22:23','2023-10-31 12:22:23',NULL),
	(14,NULL,'12','/uploads/files/5wCY81k7nIkG6NMZsuzZHtu1DLnx5hgL.png','2000-01-01',161,0,'{\"key\":\"zhipin\",\"value\":[0,2]}','[\"/uploads/files/HsOCHv9lEWCPj2n6SOd3kjt7k67clz3E.png\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-31 12:28:53','2023-10-31 12:28:53',NULL),
	(15,NULL,'板板','/uploads/files/tRGlAJ610weOrxTJdC3xEw3evEaVkuGp.jpg','2001-01-13',165,0,'{\"key\":\"zhipin\",\"value\":[2,2]}','[\"/uploads/files/vv5HsRxMQAtfVJ8qb8MFws7OKNvob7Td.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-01 09:14:36','2023-11-01 09:14:36',NULL);

/*!40000 ALTER TABLE `customer_log` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 designers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `designers`;

CREATE TABLE `designers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '昵称',
  `avatar_url` varchar(150) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '头像',
  `sex` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '性别',
  `works` varchar(128) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '作品集',
  `labels` longtext CHARACTER SET utf8mb4 COMMENT '标签集',
  `detail` longtext CHARACTER SET utf8mb4 COMMENT '内容',
  `status` int(1) DEFAULT '1' COMMENT '状态 0 - 删除；1 - 发布	',
  `ip` varchar(16) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `designers` WRITE;
/*!40000 ALTER TABLE `designers` DISABLE KEYS */;

INSERT INTO `designers` (`id`, `nickname`, `avatar_url`, `sex`, `works`, `labels`, `detail`, `status`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(2,'韩伟','/uploads/avatars/sfIc0ZcC9LNUu81zjgDC4RVqYmQQNYp6.jpeg','1','1','中央美术学院学士,装配式资深设计师,高级工程师','至今主持参与工程项目300万平米\\r\\n主持项目：国家会议中心、中国国家博物馆--复兴之路、北辰洲际酒店、北京市教委、北京文化部、海淀国土局、海淀地税局',1,NULL,'2023-10-23 17:01:31','2023-10-23 17:01:31',NULL),
	(3,'颜世俊','/uploads/avatars/OVmJOjiJMzGRFPGP36DiI5drr5qqJoSV.jpeg','1',NULL,'辽宁广电大学学士,前木棉中国设计总监','主案办公设计项目60万平米、青岛宜家办公楼设计顾问成员、办公设计落地项目40万平米',0,NULL,'2023-10-23 17:05:56','2023-10-23 17:05:56',NULL),
	(4,'贾鹦','/uploads/avatars/iRryyn5zNXwq2ldyMl4c0oCCnGjZQso9.jpg','0',NULL,'设计师,色彩搭配师',NULL,1,NULL,'2023-10-23 17:15:35','2023-10-23 17:15:35',NULL);

/*!40000 ALTER TABLE `designers` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 files
# ------------------------------------------------------------

DROP TABLE IF EXISTS `files`;

CREATE TABLE `files` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `status` bigint(1) DEFAULT '1' COMMENT '发布状态 0 - 删除；1 - 发布；2 - 草稿',
  `related_user_id` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `clientName` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `fileName` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `filePath` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `fieldName` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `size` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `type` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `subtype` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `ip` varchar(16) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `extname` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `describe` varchar(250) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='文件';

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;

INSERT INTO `files` (`id`, `status`, `related_user_id`, `clientName`, `fileName`, `filePath`, `fieldName`, `size`, `type`, `subtype`, `ip`, `extname`, `describe`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(8,1,'','tmp_487f8e794f22785120cce75370469415.jpg','FzaDvK9aZkAkakLwfDEWroDs0jMGCoWd.jpg','/uploads/files/FzaDvK9aZkAkakLwfDEWroDs0jMGCoWd.jpg','files','3331','image','jpeg',NULL,'jpg','','2023-10-31 18:00:09',NULL,NULL),
	(9,1,'','tmp_98337dfa41db1e5a4ded0740f2497763.jpg','xI6nk0yplmAs7nMo7Wfr2EuqYrZ9TbN2.jpg','/uploads/files/xI6nk0yplmAs7nMo7Wfr2EuqYrZ9TbN2.jpg','files','7524','image','jpeg',NULL,'jpg','','2023-10-31 18:00:50',NULL,NULL),
	(10,1,'','tmp_d89bcf5b5ffbbd3cc144eac89a9a03df.jpg','H51sDQyo5YLuiU5r31Ig4dvsajkhv0Rg.jpg','/uploads/files/H51sDQyo5YLuiU5r31Ig4dvsajkhv0Rg.jpg','files','3332','image','jpeg',NULL,'jpg','','2023-10-31 18:02:38',NULL,NULL),
	(11,1,'hl_a45943511','tmp_eb33f3e042d8cd5376f8872e727f2d16.jpg','JA3Sc2RocqrGEZKyMwZbJFyqxsxKamYj.jpg','/uploads/files/JA3Sc2RocqrGEZKyMwZbJFyqxsxKamYj.jpg','files','7524','image','jpeg',NULL,'jpg','','2023-10-31 18:03:18',NULL,NULL),
	(12,1,'hl_a45943511','tmp_4499fc1b95260430ad4495eee6e742f7.jpg','evSh5Md7ALlm6zGXjjasO693d7xHcBsu.jpg','/uploads/files/evSh5Md7ALlm6zGXjjasO693d7xHcBsu.jpg','files','363666','image','jpeg',NULL,'jpg','','2023-10-31 18:04:08',NULL,NULL),
	(13,1,'hl_a90915530','tmp_492e882c004bd23748bb64cc5b3ba21f.jpg','TGgCSHkqsLstgkne0FuewabXMyGIrjE9.jpg','/uploads/files/TGgCSHkqsLstgkne0FuewabXMyGIrjE9.jpg','files','5108','image','jpeg',NULL,'jpg','','2023-10-31 18:19:30',NULL,NULL),
	(14,1,'hl_a45943511','tmp_71b1d12fb9eff1289f86083cc0871543.jpg','tRGlAJ610weOrxTJdC3xEw3evEaVkuGp.jpg','/uploads/files/tRGlAJ610weOrxTJdC3xEw3evEaVkuGp.jpg','files','249807','image','jpeg',NULL,'jpg','','2023-11-01 09:13:46',NULL,NULL),
	(15,1,'hl_a45943511','tmp_7b7a13c5f0936f599d797545ae56c3ad.jpg','vv5HsRxMQAtfVJ8qb8MFws7OKNvob7Td.jpg','/uploads/files/vv5HsRxMQAtfVJ8qb8MFws7OKNvob7Td.jpg','files','359188','image','jpeg',NULL,'jpg','','2023-11-01 09:14:34',NULL,NULL),
	(16,1,'hl_a90915530','p56YwST690dm74ef14d44c3d6c5156310fc2dc553a88.png','bIaFhFYcUbRVqFTlsNMsewx6XphU7OQp.png','/uploads/files/bIaFhFYcUbRVqFTlsNMsewx6XphU7OQp.png','files','68127','image','png',NULL,'png','','2023-11-03 23:06:02',NULL,NULL),
	(17,1,'hl_a90915530','QO7iGmSRwF6X74ef14d44c3d6c5156310fc2dc553a88.png','LFTDRp0aNmSwow2W48EnYiPUNeruNIvQ.png','/uploads/files/LFTDRp0aNmSwow2W48EnYiPUNeruNIvQ.png','files','68127','image','png',NULL,'png','','2023-11-03 23:06:54',NULL,NULL),
	(18,1,'hl_a90915530','tmp_5e06a3c15229b3a2ffdbccaef0295340.jpg','iaBoS9YmGxswNtkvP6M36yUSu6keuOvw.jpg','/uploads/files/iaBoS9YmGxswNtkvP6M36yUSu6keuOvw.jpg','files','46887','image','jpeg',NULL,'jpg','','2023-11-03 23:25:42',NULL,NULL),
	(19,1,'hl_a90915530','tmp_ae7dd779feea6a09d75b5446ca63cd9d.jpg','F8E0BQ3V3RZxcKoSJ08gemljCdg8bAkg.jpg','/uploads/files/F8E0BQ3V3RZxcKoSJ08gemljCdg8bAkg.jpg','files','387139','image','jpeg',NULL,'jpg','','2023-11-03 23:30:50',NULL,NULL),
	(20,1,'hl_a90915530','tmp_f4a0bf9f3eeaf7efa8644c08e748c671.jpg','0c2aQTrcisVvOfIKkX9UxiYZlTvYhHMe.jpg','/uploads/files/0c2aQTrcisVvOfIKkX9UxiYZlTvYhHMe.jpg','files','260385','image','jpeg',NULL,'jpg','','2023-11-03 23:31:53',NULL,NULL),
	(21,1,'hl_a90915530','D60W0lE6CnhO74ef14d44c3d6c5156310fc2dc553a88.png','pcxSVXeWJYUdjZ8Qguo1Rd0Wn1tZL9lF.png','/uploads/files/pcxSVXeWJYUdjZ8Qguo1Rd0Wn1tZL9lF.png','files','68127','image','png',NULL,'png','','2023-11-06 11:15:02',NULL,NULL);

/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 likes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `likes`;

CREATE TABLE `likes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(140) NOT NULL DEFAULT '' COMMENT '类型 moment introduce answer',
  `relation_type_id` varchar(10) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 Type ID',
  `user_id` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 User ID',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 0 - 删除；1 - 发布',
  `ip` varchar(16) DEFAULT NULL COMMENT 'IP 地址',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '提交时间',
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='喜欢';

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;

INSERT INTO `likes` (`id`, `type`, `relation_type_id`, `user_id`, `status`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(3,'moment','2','hl_a90915530',1,'10.0.8.14','2023-10-24 17:56:28','2023-10-24 17:56:28',NULL),
	(4,'answer','3','hl_a90915530',1,'10.0.8.14','2023-10-24 18:22:08','2023-10-24 18:22:08',NULL),
	(5,'answer','27','hl_a90915530',0,'10.0.8.14','2023-10-27 09:18:22','2023-10-27 09:18:23',NULL),
	(6,'answer','24','hl_a90915530',1,'10.0.8.14','2023-10-27 10:11:43','2023-10-27 10:11:43',NULL),
	(7,'answer','28','hl_a90915530',1,'10.0.8.14','2023-10-27 11:04:15','2023-10-27 11:04:15',NULL),
	(8,'moment','9','hl_a90915530',0,'10.0.8.14','2023-11-04 21:25:24','2023-11-04 21:25:25',NULL),
	(9,'moment','9','hl_a77713707',1,'10.0.8.14','2023-11-06 14:52:53','2023-11-06 14:52:53',NULL);

/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 moments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `moments`;

CREATE TABLE `moments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `status` bigint(1) DEFAULT '1' COMMENT '发布状态 0 - 删除；1 - 发布；2 - 草稿',
  `recommend` bigint(1) DEFAULT '0' COMMENT '推荐状态 0 - 默认；1 - 推荐',
  `user_id` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '发布 User ID',
  `content` varchar(128) CHARACTER SET utf8mb4 NOT NULL COMMENT '描述',
  `photos` longtext CHARACTER SET utf8mb4 NOT NULL COMMENT '照片',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `moments` WRITE;
/*!40000 ALTER TABLE `moments` DISABLE KEYS */;

INSERT INTO `moments` (`id`, `status`, `recommend`, `user_id`, `content`, `photos`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(2,1,1,'hl_a90915530','秋来，叶落 🍂','[\"/uploads/files/u7a8GJxhd4Nedd4BjOZlThwWns9xJ9cT.jpg\"]','2023-10-24 17:55:40','2023-10-24 17:55:40',NULL),
	(3,1,0,'hl_a10140140','超级无敌喜欢吃火锅的！','[]','2023-10-26 15:27:57','2023-10-26 15:27:57',NULL),
	(4,1,0,'hl_a45082499','日落尤其温柔，人间皆是浪漫','[]','2023-10-26 15:31:53','2023-10-26 15:31:53',NULL),
	(5,1,0,'hl_a19680457','一个人最好的样子是被宠出来的','[]','2023-10-26 15:32:59','2023-10-26 15:32:59',NULL),
	(6,1,0,'hl_a75816652','你好………','[]','2023-10-26 15:34:18','2023-10-26 15:34:18',NULL),
	(7,1,0,'hl_a88076879','咕噜咕噜冒个泡','[]','2023-10-26 16:02:14','2023-10-26 16:02:14',NULL),
	(8,1,0,'hl_a35324426','今天天气很不错','[]','2023-10-26 16:09:12','2023-10-26 16:09:12',NULL),
	(9,1,0,'hl_a12419437','你好，秋天🍂','[]','2023-10-26 16:24:43','2023-10-26 16:24:43',NULL);

/*!40000 ALTER TABLE `moments` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 questions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(1) NOT NULL COMMENT '类型',
  `sex` varchar(1) NOT NULL COMMENT '性别',
  `title` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '标题',
  `description` varchar(128) CHARACTER SET utf8mb4 NOT NULL COMMENT '描述',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;

INSERT INTO `questions` (`id`, `type`, `sex`, `title`, `description`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(1,'0','2','我的愿望','我只愿面朝大海，春暖花开','2023-10-05 21:27:03','2023-10-05 21:27:03',NULL),
	(2,'1','2','我的生活习惯','作息时间、饮食偏好、日常活动等','2023-10-05 21:28:40','2023-10-05 21:28:40',NULL),
	(3,'0','2','关于我','我的家庭、教育、父母职业','2023-10-05 21:49:38','2023-10-05 21:49:38',NULL),
	(4,'0','2','我的人生目标','我的愿望是拯救世界！！！','2023-10-05 21:49:48','2023-10-05 21:49:48',NULL),
	(5,'2','2','对另一方的性格？','快乐小狗','2023-10-05 22:08:26','2023-10-05 22:08:26',NULL),
	(6,'0','2','过去的感情经历','曾经的恋爱经历','2023-10-05 22:26:02','2023-10-05 22:26:02',NULL),
	(7,'1','2','喜欢做什么？','运动、书籍、电影、音乐','2023-10-06 16:24:10','2023-10-06 16:24:10',NULL),
	(8,'0','2','平时健身吗？','😁','2023-10-06 23:26:07','2023-10-06 23:26:07',NULL),
	(9,'2','2','你希望的 ta 是什么样？','我希望的意中人是个盖世英雄……','2023-10-06 23:27:51','2023-10-06 23:27:51',NULL),
	(10,'1','2','我喜欢的穿搭风格','穿梭在街头，分享自己的穿搭日常','2023-10-12 16:14:05','2023-10-12 16:14:05',NULL),
	(11,'0','2','最近拍到的最喜欢的一张照片是什么？','是自己！！！','2023-10-13 10:42:22','2023-10-13 10:42:22',NULL);

/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` int(1) DEFAULT '1' COMMENT '身份 1用户 2红娘',
  `user_id` varchar(40) DEFAULT NULL COMMENT '用户ID',
  `nickname` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '昵称',
  `avatar_url` varchar(256) DEFAULT NULL COMMENT '头像',
  `birthday` varchar(12) DEFAULT NULL COMMENT '生日',
  `height` int(11) unsigned DEFAULT NULL COMMENT '身高',
  `sex` int(1) DEFAULT NULL COMMENT '性别',
  `work` varchar(50) DEFAULT '{}' COMMENT '职业工作',
  `photos` varchar(1000) DEFAULT '[]' COMMENT '图片集',
  `videos` varchar(500) DEFAULT NULL COMMENT '介绍视频',
  `detail` longtext COMMENT '个人介绍',
  `contact_wechat` varchar(50) DEFAULT NULL COMMENT '联系方式 - wechat',
  `school` varchar(255) DEFAULT NULL COMMENT '学校',
  `company` varchar(255) DEFAULT NULL COMMENT '公司',
  `location` varchar(255) DEFAULT NULL COMMENT '所在地',
  `realname` varchar(50) DEFAULT NULL COMMENT '真实姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机',
  `wechat_union_id` varchar(255) DEFAULT NULL COMMENT '微信 UNION ID',
  `wechat_open_id` varchar(255) DEFAULT NULL COMMENT '小程序 OPEN ID',
  `wechat_platform_open_id` varchar(255) DEFAULT NULL COMMENT '公号 OPEN ID',
  `parent_id` int(11) DEFAULT NULL COMMENT '父级红娘 ID',
  `ip` varchar(16) DEFAULT NULL COMMENT 'IP 地址',
  `online_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '最近上线时间',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `type`, `user_id`, `nickname`, `avatar_url`, `birthday`, `height`, `sex`, `work`, `photos`, `videos`, `detail`, `contact_wechat`, `school`, `company`, `location`, `realname`, `phone`, `wechat_union_id`, `wechat_open_id`, `wechat_platform_open_id`, `parent_id`, `ip`, `online_at`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(25,2,'hl_a90915530','KMT 184.05','/uploads/files/TGgCSHkqsLstgkne0FuewabXMyGIrjE9.jpg','1997-02-01',173,1,'{\"key\":\"zhipin\",\"value\":[0,12]}','[\"/uploads/files/fWb1balGB2IQSWdccNXPVR44wFpyyBcR.png\",\"/uploads/files/pkfG33cwtPa2HiKpkdRhuqwufkCZaZV3.png\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vhiiLffHPfdB7LKmpMdr_I',NULL,NULL,'10.0.8.14','2023-11-06 18:11:31','2023-10-24 17:48:25','2023-10-24 17:50:28',NULL),
	(29,2,'hl_a77713707','💐','/uploads/files/iU8zhMAB2cAKEfC83YrkpJ68rA1vtWFO.jpg','1997-01-01',167,0,'{\"key\":\"zhipin\",\"value\":[5,0]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vkWz17jyhDWsWuzDrV41_E',NULL,NULL,'10.0.8.14','2023-11-06 17:59:05','2023-10-25 18:05:17','2023-10-25 18:06:13',NULL),
	(30,1,'hl_a94942316',NULL,NULL,NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4mdlhDDXIVKQE2sg3kf_lcI',NULL,NULL,NULL,'2023-10-26 13:46:48','2023-10-26 13:46:48','2023-10-26 13:46:48',NULL),
	(31,1,'hl_a45082499','与月亮私奔',NULL,NULL,162,NULL,'{\"key\":\"zhipin\",\"value\":[4,1]}','[]',NULL,'日落即是温柔，人间浪漫',NULL,'陕西科技大学','空军军医大学第一附属医院',NULL,NULL,'18523584230',NULL,'op02s4t9pXQZwBdxtCfToEHwIaTY',NULL,NULL,'10.0.8.14','2023-10-26 16:04:35','2023-10-26 15:17:37','2023-10-26 15:17:37',NULL),
	(32,1,'hl_a79908519','热爱山海',NULL,NULL,165,NULL,'{\"key\":\"zhipin\",\"value\":[0,0]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'19860918085',NULL,'op02s4gT-Hr2uxbC_vEHOjf234dE',NULL,NULL,'10.0.8.14','2023-10-26 16:02:08','2023-10-26 15:17:56','2023-10-26 15:17:56',NULL),
	(33,1,'hl_a18254325','南浔',NULL,NULL,170,NULL,'{}','[]',NULL,'众你寻他千百度',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4n4Vhg4zFvnVbKzSC6bnf1Y',NULL,NULL,'10.0.8.14','2023-10-30 11:32:28','2023-10-26 15:18:15','2023-10-26 15:18:15',NULL),
	(34,1,'hl_a64615905',NULL,NULL,NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4qcZqUCpoYq75ny0h8-EV_E',NULL,NULL,'10.0.8.14','2023-10-26 16:04:10','2023-10-26 15:18:49','2023-10-26 15:18:49',NULL),
	(35,1,'hl_a10140140','babada','/uploads/normal-avatars/sex-017.png','1999-02-25',155,0,'{\"key\":\"zhipin\",\"value\":[6,3]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4gGwaOLEdT2Asy2fI87RhLg',NULL,NULL,'10.0.8.14','2023-10-26 15:41:52','2023-10-26 15:19:50','2023-10-26 15:24:04',NULL),
	(36,1,'hl_a28939076',NULL,NULL,NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4iEsvekWPMwPAXKjkAxAbYM',NULL,NULL,NULL,'2023-10-26 15:20:01','2023-10-26 15:20:01','2023-10-26 15:20:01',NULL),
	(37,1,'hl_a19680457','绿洲','/uploads/normal-avatars/sex-011.png','1999-01-01',166,0,'{\"key\":\"zhipin\",\"value\":[3,3]}','[]',NULL,'日照金山',NULL,'南京大学','华为',NULL,NULL,'18822073831',NULL,'op02s4jp3Cncjf5YZjraTnHLkDmQ',NULL,NULL,'10.0.8.14','2023-10-26 15:42:17','2023-10-26 15:24:37','2023-10-26 15:26:09',NULL),
	(38,1,'hl_a75816652','bsa','/uploads/normal-avatars/sex-015.png','2001-01-04',164,0,'{\"key\":\"zhipin\",\"value\":[2,0]}','[]',NULL,'寻找一片云',NULL,'山东科技大学','兴业银行',NULL,NULL,'19906405498',NULL,'op02s4npunh0azL11_2Yg_BEy8Mg',NULL,NULL,'10.0.8.14','2023-10-27 16:58:27','2023-10-26 15:27:57','2023-10-27 16:53:58',NULL),
	(39,1,'hl_a16846511','pumpkin','/uploads/normal-avatars/sex-015.png','2000-01-29',168,0,'{\"key\":\"zhipin\",\"value\":[2,0]}','[]',NULL,'11',NULL,'0','无',NULL,NULL,'13820328675',NULL,'op02s4merBxXTrbYLriYPcIffJHg',NULL,NULL,'10.0.8.14','2023-10-27 10:26:28','2023-10-26 15:34:11','2023-10-26 15:35:14',NULL),
	(40,1,'hl_a34770909','耶','/uploads/normal-avatars/sex-015.png','1999-11-13',159,0,'{\"key\":\"zhipin\",\"value\":[3,1]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4tlL5X5oLEim4T-j5r43tpE',NULL,NULL,'10.0.8.14','2023-10-26 17:16:07','2023-10-26 15:35:01','2023-10-26 15:36:58',NULL),
	(41,1,'hl_a88076879','Ostrich','/uploads/normal-avatars/sex-015.png','2001-02-01',161,0,'{\"key\":\"zhipin\",\"value\":[1,0]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4i2kATw38yViGlJE_pYkchs',NULL,NULL,'10.0.8.14','2023-10-26 18:02:05','2023-10-26 15:45:53','2023-10-26 15:47:35',NULL),
	(42,2,'hl_a35324426','一颗盐粒子','/uploads/normal-avatars/sex-013.png',NULL,NULL,0,'{\"key\":\"zhipin\",\"value\":[0,20]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4tpkddBtuQFf8TKWFKtKVuQ',NULL,NULL,'10.0.8.14','2023-10-26 16:11:42','2023-10-26 16:06:59','2023-10-26 16:07:52',NULL),
	(43,1,'hl_a12419437','晴天','/uploads/normal-avatars/sex-013.png','1994-03-22',160,0,'{\"key\":\"zhipin\",\"value\":[11,0]}','[]',NULL,'两岸猿声啼不住 轻舟已过万重山',NULL,'0','机器人',NULL,NULL,'13134109977',NULL,'op02s4hqkkfbDD1quIULQ8E9TwRU',NULL,NULL,'10.0.8.14','2023-10-27 14:47:31','2023-10-26 16:11:03','2023-10-26 16:13:12',NULL),
	(44,1,'hl_a56624573',NULL,NULL,NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4szQy1a_qqnDNBIt643bih4',NULL,NULL,NULL,'2023-10-30 10:08:33','2023-10-30 10:08:33','2023-10-30 10:08:33',NULL),
	(45,2,'hl_a54461571','111','/uploads/normal-avatars/sex-012.png',NULL,NULL,0,'{\"key\":\"zhipin\",\"value\":[2,0]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4nmSNPbmJ8iwqcCRl-H74dI',NULL,NULL,'10.0.8.14','2023-10-31 15:24:31','2023-10-30 17:39:42','2023-10-30 17:40:04',NULL),
	(46,2,'hl_a09087583','Charles正泉','/uploads/normal-avatars/sex-115.png',NULL,NULL,1,'{\"key\":\"zhipin\",\"value\":[0,2]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vllnME96C7JPHus0K0IjGE',NULL,NULL,'223.104.41.22','2023-10-30 20:08:55','2023-10-30 20:06:32','2023-10-30 20:07:31',NULL),
	(47,2,'hl_a45943511','槙岛圣护','/uploads/files/JA3Sc2RocqrGEZKyMwZbJFyqxsxKamYj.jpg','2001-08-13',158,0,'{\"key\":\"zhipin\",\"value\":[0,0]}','[\"/uploads/files/evSh5Md7ALlm6zGXjjasO693d7xHcBsu.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vK7NqYrMGoluds8GWRCt0c',NULL,NULL,'10.0.8.14','2023-11-01 09:15:03','2023-10-31 18:02:55','2023-10-31 18:04:11',NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 works
# ------------------------------------------------------------

DROP TABLE IF EXISTS `works`;

CREATE TABLE `works` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '名称',
  `location` varchar(150) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '地点',
  `theme_url` varchar(150) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '主题图片',
  `area` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '面积',
  `work_time` varchar(128) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '作品时间',
  `introduction` longtext CHARACTER SET utf8mb4 COMMENT '设计理念',
  `detail` longtext CHARACTER SET utf8mb4 COMMENT '内容',
  `status` int(1) DEFAULT '1' COMMENT '状态 0 - 删除；1 - 发布	',
  `ip` varchar(16) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `works` WRITE;
/*!40000 ALTER TABLE `works` DISABLE KEYS */;

INSERT INTO `works` (`id`, `title`, `location`, `theme_url`, `area`, `work_time`, `introduction`, `detail`, `status`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(1,'作品名称','北京','','1000','2023-10-25','设计理念','<p>图片集合</p>',1,NULL,'2023-10-25 08:14:08','2023-10-25 08:14:08',NULL);

/*!40000 ALTER TABLE `works` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
