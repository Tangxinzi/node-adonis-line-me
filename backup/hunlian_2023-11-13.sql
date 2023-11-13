# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20058
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: localhost (MySQL 5.7.34)
# 数据库: hunlian
# 生成时间: 2023-11-13 10:19:16 +0000
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
  `type` bigint(1) DEFAULT '0' COMMENT '问答类型：0 - 默认；1 - 他人为好友介绍',
  `ip` varchar(16) CHARACTER SET utf8mb4 DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;

INSERT INTO `answer` (`id`, `status`, `recommend`, `content`, `user_id`, `relation_question_id`, `introduce_name`, `introduce_openid`, `photos`, `type`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(3,1,0,'当然是拯救世界啦！','hl_a90915530','1',NULL,NULL,'[\"/uploads/files/OCPkev0TzsrSVPXgRcB1UhuT7oYx8lD7.jpg\"]',0,'','2023-10-24 18:12:33','2023-10-24 18:12:33',NULL),
	(4,1,0,'拜托生活，少一些莫名其妙的不快乐','hl_a18254325','1',NULL,NULL,'[]',0,'','2023-10-26 15:24:27','2023-10-26 15:24:27',NULL),
	(5,1,0,'吃辣星人','hl_a18254325','2',NULL,NULL,'[]',0,'','2023-10-26 15:24:46','2023-10-26 15:24:46',NULL),
	(6,1,0,'高高帅帅，可可爱爱！','hl_a18254325','9',NULL,NULL,'[]',0,'','2023-10-26 15:25:01','2023-10-26 15:25:01',NULL),
	(7,1,0,'大学本科','hl_a18254325','3',NULL,NULL,'[]',0,'','2023-10-26 15:25:13','2023-10-26 15:25:13',NULL),
	(8,1,0,'父母双全，有个小弟。','hl_a18254325','3',NULL,NULL,'[]',0,'','2023-10-26 15:25:34','2023-10-26 15:25:34',NULL),
	(9,1,0,'看电影听音乐','hl_a18254325','7',NULL,NULL,'[]',0,'','2023-10-26 15:25:46','2023-10-26 15:25:46',NULL),
	(10,1,0,'甜酷','hl_a18254325','10',NULL,NULL,'[]',0,'','2023-10-26 15:27:31','2023-10-26 15:27:31',NULL),
	(11,1,0,'天天都开心','hl_a45082499','1',NULL,NULL,'[]',0,'','2023-10-26 15:31:02','2023-10-26 15:31:02',NULL),
	(12,1,0,'偶尔健健身','hl_a45082499','8',NULL,NULL,'[]',0,'','2023-10-26 15:31:15','2023-10-26 15:31:15',NULL),
	(13,1,0,'每日晨跑','hl_a75816652','2',NULL,NULL,'[]',0,'','2023-10-26 15:32:44','2023-10-26 15:32:44',NULL),
	(14,1,0,'风景照','hl_a19680457','11',NULL,NULL,'[]',0,'','2023-10-26 15:33:15','2023-10-26 15:33:15',NULL),
	(15,1,0,'躺平','hl_a19680457','4',NULL,NULL,'[]',0,'','2023-10-26 15:33:24','2023-10-26 15:33:24',NULL),
	(16,1,0,'学习','hl_a19680457','7',NULL,NULL,'[]',0,'','2023-10-26 15:33:37','2023-10-26 15:33:37',NULL),
	(17,1,0,'不是很美好','hl_a19680457','6',NULL,NULL,'[]',0,'','2023-10-26 15:33:50','2023-10-26 15:33:50',NULL),
	(18,1,0,'温柔多金善良','hl_a19680457','5',NULL,NULL,'[]',0,'','2023-10-26 15:34:02','2023-10-26 15:34:02',NULL),
	(19,1,0,'喜欢跑步','hl_a19680457','8',NULL,NULL,'[]',0,'','2023-10-26 15:34:10','2023-10-26 15:34:10',NULL),
	(20,1,0,'明年去哈尔滨旅游…','hl_a75816652','1',NULL,NULL,'[]',0,'','2023-10-26 15:35:11','2023-10-26 15:35:11',NULL),
	(21,1,0,'快乐小狗','hl_a88076879','5',NULL,NULL,'[]',0,'','2023-10-26 15:50:29','2023-10-26 15:50:29',NULL),
	(22,1,0,'快乐小狗','hl_a88076879','5',NULL,NULL,'[]',0,'','2023-10-26 15:50:31','2023-10-26 15:50:31',NULL),
	(23,1,0,'喜欢音乐，旅游','hl_a35324426','7',NULL,NULL,'[]',0,'','2023-10-26 16:10:39','2023-10-26 16:10:39',NULL),
	(24,1,0,'不健身，感觉太累了','hl_a35324426','8',NULL,NULL,'[]',0,'','2023-10-26 16:10:51','2023-10-26 16:10:51',NULL),
	(25,1,0,'是自己','hl_a12419437','11',NULL,NULL,'[]',0,'','2023-10-26 16:20:41','2023-10-26 16:20:41',NULL),
	(26,1,0,'是的','hl_a12419437','8',NULL,NULL,'[]',0,'','2023-10-26 16:25:00','2023-10-26 16:25:00',NULL),
	(27,1,0,'成为富婆','hl_a34770909','1',NULL,NULL,'[]',0,'','2023-10-26 17:14:47','2023-10-26 17:14:47',NULL),
	(28,1,0,'平安健康','hl_a16846511','1',NULL,NULL,'[]',0,'','2023-10-27 10:25:38','2023-10-27 10:25:38','2023-10-31 04:35:30'),
	(29,1,0,'111','hl_a90915530','5',NULL,NULL,'[]',0,NULL,'2023-11-11 20:11:13','2023-11-11 20:11:13',NULL),
	(30,1,0,'冻死了，一天天的','hl_a73199741','2',NULL,NULL,'[]',0,NULL,'2023-11-11 20:11:57','2023-11-11 20:11:57',NULL),
	(31,1,0,'打游戏，听歌，看电影🙉','hl_a73199741','7',NULL,NULL,'[]',0,NULL,'2023-11-11 20:12:31','2023-11-11 20:12:31',NULL),
	(32,1,0,'简单点的穿搭','hl_a73199741','10',NULL,NULL,'[]',0,NULL,'2023-11-11 20:12:51','2023-11-11 20:12:51',NULL),
	(33,1,0,'音乐🎵🎵','hl_a24559452','7',NULL,NULL,'[\"/uploads/files/3MnLpQa50tmEopxaMlabEMOgj2yual5n.jpg\"]',0,NULL,'2023-11-11 20:14:44','2023-11-11 20:14:44',NULL),
	(34,1,0,'音乐🎵🎵','hl_a24559452','7',NULL,NULL,'[\"/uploads/files/3MnLpQa50tmEopxaMlabEMOgj2yual5n.jpg\"]',0,NULL,'2023-11-11 20:14:44','2023-11-11 20:14:44',NULL),
	(35,1,0,'每天好心情','hl_a24559452','1',NULL,NULL,'[\"/uploads/files/e28RTDX02Gpw4whMLp35bs5J3IVkVvgU.jpg\"]',0,NULL,'2023-11-11 20:16:01','2023-11-11 20:16:01',NULL),
	(36,1,1,'是和好朋友一起去恰饭','hl_a22603795','11',NULL,NULL,'[\"/uploads/files/Gg6lqtZ6G6O9xGnZtD6sUe9VLeakTtNG.jpg\"]',0,NULL,'2023-11-11 20:16:43','2023-11-11 20:16:43',NULL),
	(37,1,1,'生活总要休闲一点','hl_a24559452','10',NULL,NULL,'[\"/uploads/files/pAH0oO1dHV1Jc3lpkBDwndHDHAABqnXj.jpg\"]',0,NULL,'2023-11-11 20:17:14','2023-11-11 20:17:14',NULL),
	(38,1,1,'是和好朋友一起去恰饭','hl_a22603795','11',NULL,NULL,'[\"/uploads/files/Gg6lqtZ6G6O9xGnZtD6sUe9VLeakTtNG.jpg\"]',0,NULL,'2023-11-11 20:17:27','2023-11-11 20:17:27',NULL),
	(39,1,1,'是雪','hl_a21751174','11',NULL,NULL,'[\"/uploads/files/ZXVRCPGiTUQjZJ7k9OLxINnqRTmt8E2Q.jpg\"]',0,NULL,'2023-11-11 20:18:54','2023-11-11 20:18:54',NULL),
	(40,1,1,'面朝大海，春暖花开','hl_a22603795','1',NULL,NULL,'[\"/uploads/files/yKcx8KKe3XDpQYxV35GrqZycndOp3G71.jpg\"]',0,NULL,'2023-11-11 20:19:05','2023-11-11 20:19:05',NULL),
	(41,1,1,'人生最爱美食','hl_a21751174','7',NULL,NULL,'[\"/uploads/files/6Q3ayu6R9ONJ7fooYrx8UFcqvc4joJWv.jpg\"]',0,NULL,'2023-11-11 20:19:26','2023-11-11 20:19:26',NULL),
	(42,1,1,'一天不吃我浑身难受','hl_a21751174','2',NULL,NULL,'[\"/uploads/files/kP4nt2FU46FwyTp8UNfFAOuH8S5a4Nqh.jpg\"]',0,NULL,'2023-11-11 20:19:59','2023-11-11 20:19:59',NULL),
	(43,1,1,'美丽温柔','hl_a47851358','5',NULL,NULL,'[\"/uploads/files/NLbKul8xqofv57CA6K6DVRBAOFlQCmU3.jpg\"]',0,NULL,'2023-11-11 20:27:39','2023-11-11 20:27:39',NULL),
	(44,1,1,'和老婆','hl_a47851358','11',NULL,NULL,'[\"/uploads/files/nWzbfO2ZaWuFjVEPJk3iW9PL1JKOULlh.jpg\",\"/uploads/files/9hlh5CRFMrKboxB3eiM8Wl3HskhBhLu0.jpg\"]',0,NULL,'2023-11-11 20:28:25','2023-11-11 20:28:25',NULL),
	(45,1,1,'必须健身啊','hl_a47851358','8',NULL,NULL,'[\"/uploads/files/scWLYJ1ElfNhMO9Iup5ZnzuANX3THS9l.jpg\"]',0,NULL,'2023-11-11 20:28:56','2023-11-11 20:28:56',NULL),
	(46,1,0,'降温了  记得添衣','hl_a57190617','11',NULL,NULL,'[\"/uploads/files/Cl6eIgQxEwlMQzfJx1mbprpgz50TqR76.jpg\"]',0,NULL,'2023-11-11 20:44:53','2023-11-11 20:44:53',NULL),
	(47,1,0,'我喜欢听音乐，因为音乐将一切平凡的画面赋予深厚意义。','hl_a57190617','7',NULL,NULL,'[]',0,NULL,'2023-11-11 20:55:03','2023-11-11 20:55:03',NULL),
	(48,1,0,'健身','hl_a57190617','8',NULL,NULL,'[]',0,NULL,'2023-11-11 20:57:28','2023-11-11 20:57:28',NULL),
	(49,1,0,'性格好，口吐芬芳','hl_a87121976','5',NULL,NULL,'[\"/uploads/files/Tmymx9hiqVPejxt5FDcy2GALoEw0jdW3.jpg\"]',0,NULL,'2023-11-11 21:17:16','2023-11-11 21:17:16',NULL),
	(50,1,0,'运动，看书，听音乐','hl_a87121976','7',NULL,NULL,'[\"/uploads/files/PJYWIZKr73OCShoVQ63IwbF9pLS4Rh6O.jpg\"]',0,NULL,'2023-11-11 21:17:57','2023-11-11 21:17:57',NULL),
	(51,1,0,'雪的浪漫','hl_a87121976','11',NULL,NULL,'[\"/uploads/files/j6FNWqU19UWBfceu99AjX5bNhDtFqnxf.jpg\"]',0,NULL,'2023-11-11 21:18:17','2023-11-11 21:18:17',NULL),
	(52,1,0,'不健身','hl_a16337054','8',NULL,NULL,'[]',0,NULL,'2023-11-11 21:27:25','2023-11-11 21:27:25',NULL),
	(53,1,0,'宽松','hl_a16337054','10',NULL,NULL,'[]',0,NULL,'2023-11-11 21:27:46','2023-11-11 21:27:46',NULL),
	(54,1,0,'自己最喜欢','hl_a16337054','11',NULL,NULL,'[\"/uploads/files/LXXFebf0bRn0mveGR9F8EsVniXKNrTwE.jpg\"]',0,NULL,'2023-11-11 21:28:14','2023-11-11 21:28:14',NULL),
	(55,1,0,'温柔大方聪明伶俐','hl_a96886310','9',NULL,NULL,'[]',0,NULL,'2023-11-11 21:28:20','2023-11-11 21:28:20',NULL),
	(56,1,0,'有过3段恋爱','hl_a96886310','6',NULL,NULL,'[]',0,NULL,'2023-11-11 21:28:41','2023-11-11 21:28:41',NULL),
	(57,1,0,'发财发财发财','hl_a96886310','1',NULL,NULL,'[]',0,NULL,'2023-11-11 21:28:55','2023-11-11 21:28:55',NULL),
	(58,1,0,'人美心善 责任心强 人见人爱花见花开车见车爆胎','','','王子','op02s4ssz0v3OReTVkyRiiFiAb-0','[]',1,'10.0.8.14','2023-11-11 21:29:11','2023-11-11 21:29:11',NULL),
	(59,1,0,'人美心善 责任心强 人见人爱花见花开车见车爆胎','','','王子','op02s4ssz0v3OReTVkyRiiFiAb-0','[]',1,'10.0.8.14','2023-11-11 21:29:16','2023-11-11 21:29:16',NULL),
	(60,1,0,'军事风','hl_a96886310','10',NULL,NULL,'[\"/uploads/files/msPRpMJNWwQXHV8QvrEvL2E00GAvpMe9.jpg\"]',0,NULL,'2023-11-11 21:34:33','2023-11-11 21:34:33',NULL),
	(61,1,0,'搞笑','hl_a96886310','7',NULL,NULL,'[\"/uploads/files/28FEC5uDtZ3TJXz9uykBoeztY2wOesAN.jpg\"]',0,NULL,'2023-11-11 21:34:55','2023-11-11 21:34:55',NULL),
	(62,1,0,'吃饭','hl_a96886310','4',NULL,NULL,'[\"/uploads/files/8QGyB0aRrJlvvpJmt942SXhzzL3eICLq.jpg\"]',0,NULL,'2023-11-11 21:35:19','2023-11-11 21:35:19',NULL),
	(63,1,0,'快乐小狗','hl_a54411643','5',NULL,NULL,'[\"/uploads/files/VEUU5nbK4IeEoQwDTpvntrxFpxdBAndg.jpg\"]',0,NULL,'2023-11-11 21:45:38','2023-11-11 21:45:38',NULL),
	(64,1,0,'好吃的螺蛳粉','hl_a54411643','11',NULL,NULL,'[\"/uploads/files/CJDxv6MPzJc8ihzAKopkT5dy9h4lg1vX.jpg\"]',0,NULL,'2023-11-11 21:46:21','2023-11-11 21:46:21',NULL),
	(65,1,0,'游戏狂魔','hl_a54411643','2',NULL,NULL,'[\"/uploads/files/Ld78fUGVlNVIv3YwN4A6bUo78oWUShRq.jpg\"]',0,NULL,'2023-11-11 21:47:48','2023-11-11 21:47:48',NULL),
	(66,1,0,'自己最喜欢的，喜欢自己每一天😘😘','hl_a16337054','11',NULL,NULL,'[\"/uploads/files/LXXFebf0bRn0mveGR9F8EsVniXKNrTwE.jpg\"]',0,NULL,'2023-11-11 22:00:30','2023-11-11 22:00:30',NULL),
	(67,1,0,'不健身，因为不喜欢，太懒了，嘻嘻嘻嘻','hl_a16337054','8',NULL,NULL,'[]',0,NULL,'2023-11-11 22:00:54','2023-11-11 22:00:54',NULL),
	(68,1,0,'不健身，因为太懒了，嘻嘻嘻，不喜欢健身','hl_a16337054','8',NULL,NULL,'[]',0,NULL,'2023-11-11 22:01:36','2023-11-11 22:01:36',NULL),
	(69,1,0,'宽松，舒服就可以了，简单的吧','hl_a16337054','10',NULL,NULL,'[]',0,NULL,'2023-11-11 22:02:05','2023-11-11 22:02:05',NULL),
	(70,1,0,'我是超人','hl_a21409999','3',NULL,NULL,'[]',0,NULL,'2023-11-11 22:05:41','2023-11-11 22:05:41',NULL),
	(71,1,0,'健身','hl_a04144909','8',NULL,NULL,'[]',0,NULL,'2023-11-11 22:15:55','2023-11-11 22:15:55',NULL),
	(72,1,0,'如果没有课晚上睡觉2点，早上11点起床，有课的话就12点睡觉，7点起床','hl_a16337054','2',NULL,NULL,'[]',0,NULL,'2023-11-12 11:37:38','2023-11-12 11:37:38',NULL),
	(73,1,0,'喜欢听音乐，追剧，看小说，喜欢热闹，逛街，购物','hl_a16337054','7',NULL,NULL,'[]',0,NULL,'2023-11-12 11:39:54','2023-11-12 11:39:54',NULL),
	(74,1,0,'我的家庭是一个四口之家，我有一个妹妹，爸爸妈妈都是普普通通的上班族，妹妹现在还在上高中','hl_a16337054','3',NULL,NULL,'[]',0,NULL,'2023-11-12 11:40:53','2023-11-12 11:40:53',NULL),
	(75,1,0,'秋季天高风急、地气清凉肃寂，人的起居应该早睡早起使神志安宁，使自身的状态顺应秋天的平定之气','hl_a57190617','2',NULL,NULL,'[]',0,NULL,'2023-11-12 13:03:27','2023-11-12 13:03:27',NULL),
	(76,1,0,'上进且有毅力，对感情专一，心地善良温柔','hl_a57190617','5',NULL,NULL,'[]',0,NULL,'2023-11-12 13:06:23','2023-11-12 13:06:23',NULL),
	(77,1,0,'我的愿望很简单，把你写进我的生活里，写了清晨的日出，写了傍晚的日落','hl_a57190617','1',NULL,NULL,'[]',0,NULL,'2023-11-12 13:08:21','2023-11-12 13:08:21',NULL),
	(78,1,0,'钱多钱多钱多','hl_a47851358','1',NULL,NULL,'[]',0,NULL,'2023-11-12 13:13:56','2023-11-12 13:13:56',NULL),
	(79,1,0,'挣大钱挣一个小目标','hl_a47851358','4',NULL,NULL,'[]',0,NULL,'2023-11-12 13:14:18','2023-11-12 13:14:18',NULL),
	(80,1,0,'打游戏','hl_a47851358','7',NULL,NULL,'[]',0,NULL,'2023-11-12 13:14:27','2023-11-12 13:14:27',NULL);

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
	(4,'04c22a83-2428-4aba-b1eb-905446d200ff','1,2',NULL,NULL,0,1,'2023-11-07 17:35:38','2023-11-07 17:35:38',NULL),
	(5,'62dd9d2b-efe2-4d88-b533-9eef2687d253','hl_a57190617,hl_a90915530',NULL,NULL,0,1,'2023-11-11 19:50:22','2023-11-11 19:57:52',NULL),
	(6,'85d117f0-541f-4c6f-a6bb-0c8eaa114ebd','hl_a90915530,hl_a24559452',NULL,NULL,0,1,'2023-11-11 23:15:35','2023-11-11 23:15:35',NULL);

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
	(46,'8be9e13c-bf6e-4145-996c-f3d8818221d6','hl_a90915530','Hello World','text',0,'223.72.37.208',1,'2023-11-05 21:30:40','2023-11-05 21:30:40',NULL),
	(47,'8be9e13c-bf6e-4145-996c-f3d8818221d5','hl_a90915530','/uploads/files/pcxSVXeWJYUdjZ8Qguo1Rd0Wn1tZL9lF.png','image',0,'1.202.45.19',1,'2023-11-06 11:15:02','2023-11-06 11:15:02',NULL),
	(48,'62dd9d2b-efe2-4d88-b533-9eef2687d253','hl_a90915530','di','text',0,'223.72.37.208',1,'2023-11-11 19:57:52','2023-11-11 19:57:52',NULL);

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
	(4,'8be9e13c-bf6e-4145-996c-f3d8818221d6','hl_a90915530','2023-11-06 17:05:18'),
	(5,'undefined','hl_a68726129','2023-11-09 09:07:31'),
	(6,'undefined','hl_a68726129','2023-11-09 09:07:31'),
	(7,'62dd9d2b-efe2-4d88-b533-9eef2687d253','hl_a57190617','2023-11-11 21:16:38'),
	(8,'62dd9d2b-efe2-4d88-b533-9eef2687d253','hl_a90915530','2023-11-11 19:57:52'),
	(9,'85d117f0-541f-4c6f-a6bb-0c8eaa114ebd','hl_a90915530','2023-11-12 07:54:43');

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
	(2,1,1,'hl_a90915530',NULL,'0',4,'愿得一人心，白首不分离','{\"openid\":\"op02s4vhiiLffHPfdB7LKmpMdr_I\",\"relation\":\"0\",\"introduction\":\"人美心善的女孩\",\"photos\":[\"/uploads/files/TnXkHGqIOwkDCYZkX7xQ3t1fTSsT9V6c.jpg\"],\"type\":1,\"avatar\":\"http://tmp/bu6BqAYGGH6q3d363a6f448fec0e083d4b1acf8c84c2.jpg\",\"avatar_url\":\"/uploads/files/KGvDmQtTiDdmaiH6NI1vxQ7SAPLGxwdh.jpg\",\"nickname\":\"大聪明\",\"sex\":\"0\",\"height\":166,\"birthday\":\"1999-01-01\",\"work\":{\"key\":\"zhipin\",\"value\":[4,0]},\"files\":[\"http://tmp/0veo6Ezp6icZ094b50e2e03841797ff499c708fb5b97.jpg\"]}','2023-10-24 18:29:07','2023-10-24 18:29:07','2023-10-26 15:08:01'),
	(3,1,1,'hl_a90915530',NULL,'0',5,'在 USA 读博中，希望遇见一个喜欢的他。😘','','2023-10-24 18:29:07','2023-10-24 18:29:07',NULL),
	(4,1,1,'hl_a77713707',NULL,'0',6,'个性车模 😈 ','{\"openid\":\"op02s4vkWz17jyhDWsWuzDrV41_E\",\"relation\":\"0\",\"introduction\":\"个性车模 😈 \",\"photos\":[\"/uploads/files/2U5jTHFh1uzl30GyoGWlmWFGZ6JQbO2p.jpg\",\"/uploads/files/N13Y6VQl6Scb95sndrIKH3RkBGt62M1x.jpg\",\"/uploads/files/BVOFXMczZWxs7ne713gf8TkJgPp6hvik.jpg\",\"/uploads/files/Zwndgs60UNOGHQ2IkLmd90g23JY1wIVj.jpg\"],\"type\":1,\"nickname\":\"小甜甜\",\"sex\":\"0\",\"height\":173,\"birthday\":\"1995-01-01\",\"work\":{\"key\":\"zhipin\",\"value\":[11,5]},\"files\":[\"wxfile://tmp_724e6f82aaaa3704ac3ab22e7c66e8ecdae4c5ef4c1b2161.jpg\"]}','2023-10-25 18:10:01','2023-10-25 18:10:01',NULL),
	(6,1,0,'hl_a90915530','hl_a90915530','4',NULL,'介绍我自己咯','{\"id\":25,\"type\":2,\"user_id\":\"hl_a90915530\",\"nickname\":\"KMT 184.05\",\"avatar_url\":\"/uploads/files/OvvlGmKpIZWyNJP2EgZVGqRZAgkl6u99.jpeg\",\"birthday\":\"1997-02-01\",\"height\":173,\"sex\":1,\"work\":{\"key\":\"zhipin\",\"value\":[0,12],\"text\":\"社交网络\"},\"photos\":[\"/uploads/files/fWb1balGB2IQSWdccNXPVR44wFpyyBcR.png\",\"/uploads/files/pkfG33cwtPa2HiKpkdRhuqwufkCZaZV3.png\"],\"videos\":null,\"detail\":null,\"contact_wechat\":null,\"school\":null,\"company\":null,\"location\":null,\"realname\":null,\"phone\":null,\"wechat_union_id\":null,\"wechat_open_id\":\"op02s4vhiiLffHPfdB7LKmpMdr_I\",\"wechat_platform_open_id\":null,\"parent_id\":null,\"ip\":{\"ip\":\"10.0.8.14\",\"pro\":\"\",\"proCode\":\"999999\",\"city\":\"\",\"cityCode\":\"0\",\"region\":\"\",\"regionCode\":\"0\",\"addr\":\" 局域网IP\",\"regionNames\":\"\",\"err\":\"noprovince\"},\"online_at\":\"2023-10-30T07:55:46.000Z\",\"created_at\":\"2023-10-24T09:48:25.000Z\",\"modified_at\":\"2023-10-24T09:50:28.000Z\",\"deleted_at\":null,\"zodiac_sign\":\"双鱼座\",\"age\":26,\"number\":{\"message\":0,\"introduction\":0,\"visitor\":0,\"moment\":1,\"answer\":1,\"customer\":2}}','2023-10-30 16:02:45','2023-10-30 16:02:45','2023-10-30 16:55:20'),
	(7,1,0,'hl_a45943511',NULL,'0',15,'165绝世大美女！！！22岁 95斤 有意者请联系我！','{\"openid\":\"op02s4vK7NqYrMGoluds8GWRCt0c\",\"relation\":\"0\",\"introduction\":\"165绝世大美女！！！22岁 95斤 有意者请联系我！\",\"photos\":[\"/uploads/files/vv5HsRxMQAtfVJ8qb8MFws7OKNvob7Td.jpg\"],\"type\":1,\"nickname\":\"板板\",\"avatar\":\"wxfile://tmp_71b1d12fb9eff1289f86083cc0871543.jpg\",\"avatar_url\":\"/uploads/files/tRGlAJ610weOrxTJdC3xEw3evEaVkuGp.jpg\",\"sex\":\"0\",\"height\":165,\"birthday\":\"2001-01-13\",\"work\":{\"key\":\"zhipin\",\"value\":[2,2]},\"files\":[\"wxfile://tmp_7b7a13c5f0936f599d797545ae56c3ad.jpg\"]}','2023-11-01 09:14:36','2023-11-01 09:14:36',NULL),
	(8,1,1,'hl_a22603795',NULL,'0',16,'性格善良，人品好，热爱学习','{\"openid\":\"op02s4qGTCUrJnrrptRy8puvQhxA\",\"relation\":\"0\",\"relation_sign\":\"15094727441\",\"userinfo\":\"\",\"introduction\":\"性格善良，人品好\",\"photos\":[\"/uploads/files/gOsesJrNCJba0W0r73hlaTjjpfZQpjjF.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_76ea5365fe23dac913220d05e5d241419ca6fff65745a694.jpg\",\"avatar_url\":\"/uploads/files/cLBq9FCSsWr5su4wgXUkUzt67s3pXUpL.jpg\",\"nickname\":\"11\",\"sex\":\"0\",\"height\":160,\"birthday\":\"2003-10-16\",\"work\":{\"key\":\"zhipin\",\"value\":[3,1]},\"files\":[\"wxfile://tmp_b5c1dcca77c9de0b023903f81fb6948957e72cb69c792378.jpg\"]}','2023-11-11 20:38:07','2023-11-11 20:38:07',NULL),
	(9,1,1,'hl_a22603795','','0',17,'性格好，团结友爱','{\"openid\":\"op02s4qGTCUrJnrrptRy8puvQhxA\",\"relation\":\"0\",\"relation_sign\":\"18765213748\",\"userinfo\":\"\",\"introduction\":\"性格好\",\"photos\":[\"/uploads/files/gV47bmXD4aIvHc38Wj8iIRezWRmsQyZZ.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_d41a0cca7332eb1a3bd1e9c1ecee2684cba2309836ecafbc.jpg\",\"nickname\":\"Yy\",\"sex\":\"0\",\"height\":168,\"birthday\":\"2003-11-15\",\"work\":{\"key\":\"zhipin\",\"value\":[3,2]},\"files\":[\"wxfile://tmp_df2af5e002e9607198d7af9544d10d818761d2614c31eba2.jpg\"]}','2023-11-11 20:46:07','2023-11-11 20:46:07',NULL),
	(10,1,1,'hl_a24559452','hl_a68441203','0',NULL,'喜欢剧本杀 逻辑性强思维清楚','','2023-11-11 20:55:07','2023-11-11 20:46:07',NULL),
	(11,1,1,'hl_a22603795',NULL,'0',18,'人挺好的','{\"openid\":\"op02s4qGTCUrJnrrptRy8puvQhxA\",\"relation\":\"0\",\"relation_sign\":\"15729262067\",\"userinfo\":\"\",\"introduction\":\"人挺好的\",\"photos\":[\"/uploads/files/A0kES6g2R4nbUX1OAyFgTKHhRZiwArj3.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_953be5e8b358ac2992b2ffe3b06b4d96a04b3431f9e04c4c.jpg\",\"avatar_url\":\"/uploads/files/mUsvQln2Dw2zzpXzMPhKdtdV2vTolwuT.jpg\",\"nickname\":\"起风了\",\"sex\":\"1\",\"height\":170,\"birthday\":\"2004-11-09\",\"work\":{\"key\":\"zhipin\",\"value\":[2,3]},\"files\":[\"wxfile://tmp_6fc508a74bff0ae5ba24e0e1344b09f41b3e2aeba3951a41.jpg\"]}','2023-11-11 20:59:40','2023-11-11 20:59:40',NULL),
	(12,1,1,'hl_a22603795',NULL,'0',19,'性格善良','{\"openid\":\"op02s4qGTCUrJnrrptRy8puvQhxA\",\"relation\":\"0\",\"relation_sign\":\"17864211555\",\"userinfo\":\"\",\"introduction\":\"性格善良\",\"photos\":[\"/uploads/files/wMwgN32UpHMtjGuKdRPQFxKZ4jZ4SNZ4.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_23807a5f86fbda7b2379a811c42dccb145358e00372a6d08.jpg\",\"avatar_url\":\"/uploads/files/AhxBkQ219dO4RJCedcN6YKtrK1Pyjg9Q.jpg\",\"nickname\":\"Zhang\",\"sex\":\"1\",\"height\":180,\"birthday\":\"1992-01-01\",\"work\":{\"key\":\"zhipin\",\"value\":[0,2]},\"files\":[\"wxfile://tmp_d82cef53252e0d09f4c1b010bb6c42100327ecfa6856876e.jpg\"]}','2023-11-11 21:01:17','2023-11-11 21:01:17',NULL),
	(13,1,1,'hl_a24559452','hl_a72530367','0',NULL,'喜欢旅行 喜欢美食 喜欢尝试新鲜事物','','2023-11-11 21:18:07','2023-11-11 21:18:07',NULL),
	(14,1,1,'hl_a16337054',NULL,'0',20,'用心主动独立工作潜质强，并有良好的交际技能。\n上进心强又可靠者，并且身体健康、性格开朗。','{\"openid\":\"op02s4p8eupfXYWGdmHf_32EeGHs\",\"relation\":\"0\",\"relation_sign\":\"18105422952\",\"userinfo\":\"\",\"introduction\":\"可爱，美丽，善良\",\"photos\":[\"/uploads/files/Vm9Imvj5VdDWWXaHPjatUraLPkZy87QX.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_228e2b9b1e322cc7a6539b09847b0fdcf803b579ef81e4eb.jpg\",\"avatar_url\":\"/uploads/files/fegLNgiW7aPTXbn5nHH5bQgYJGd3FItF.jpg\",\"nickname\":\"qq\",\"sex\":\"0\",\"height\":169,\"birthday\":\"2003-11-09\",\"work\":{\"key\":\"zhipin\",\"value\":[0,1]},\"files\":[\"wxfile://tmp_5bf2da3c354bbfc21fd48fb011682706406abce93a510580.jpg\"]}','2023-11-11 21:32:17','2023-11-11 21:32:17',NULL),
	(15,1,1,'hl_a54411643',NULL,'0',21,'热爱学习，性格开朗活泼，待人友善 很好相处，和她相处会很舒服，大胆自由','{\"openid\":\"op02s4iazh4o5JhbP6rlGBnydtqM\",\"relation\":\"0\",\"relation_sign\":\"18105422952\",\"userinfo\":\"\",\"introduction\":\"可爱美丽温柔大方\",\"photos\":[\"/uploads/files/s2UU9JoVnGxDwnoJanVzaKo3jkYuZemy.jpg\"],\"type\":1,\"nickname\":\"+7\",\"avatar\":\"wxfile://tmp_82135379e0f618362b6cd0df25dc0f0641d7f46dbab8868a.jpg\",\"avatar_url\":\"/uploads/files/HyQT8RjMF27Tc4bvAL6F8rQSCkENEI6H.jpg\",\"sex\":\"0\",\"height\":169,\"birthday\":\"2003-11-09\",\"work\":{\"key\":\"zhipin\",\"value\":[0,2]},\"files\":[\"wxfile://tmp_9bcdb759b30da56bd87d2ff53508e15227bf4ec6e502e76d.jpg\"]}','2023-11-11 21:34:33','2023-11-11 21:34:33',NULL),
	(16,1,1,'hl_a16337054',NULL,'0',22,'上进心强，为人可靠，善良大方，美丽动人，彬彬有礼','{\"openid\":\"op02s4p8eupfXYWGdmHf_32EeGHs\",\"relation\":\"0\",\"relation_sign\":\"18963581025\",\"userinfo\":\"\",\"introduction\":\".美丽，善良动人，大方\",\"photos\":[\"/uploads/files/289qwzk6c5GbRR8uVKIez1KNNkHS2Xzb.jpg\"],\"type\":1,\"nickname\":\"xx\",\"avatar\":\"wxfile://tmp_2cb104480a11e0067a5dd3cb7846ba0e0139cb0e5dee44dc.jpg\",\"avatar_url\":\"/uploads/files/Y3BDWEIbZkf5XfwjoFn1pnDbDfGCAilq.jpg\",\"sex\":\"0\",\"height\":165,\"birthday\":\"2004-06-04\",\"work\":{\"key\":\"zhipin\",\"value\":[0,1]},\"files\":[\"wxfile://tmp_6506070cea83ce1a9f75f2941c8c5dce830f02750334bea1.jpg\"]}','2023-11-11 21:35:20','2023-11-11 21:35:20',NULL),
	(17,1,1,'hl_a54411643',NULL,'0',23,'很照顾别人，做事踏实认真，积极努力，很爱笑，是一位值得交朋友的姑娘，','{\"openid\":\"op02s4iazh4o5JhbP6rlGBnydtqM\",\"relation\":\"0\",\"relation_sign\":\"18765213748\",\"userinfo\":\"\",\"introduction\":\"温柔可爱美丽\",\"photos\":[\"/uploads/files/COgJUnfvv0siIXupcdiQBQ1oYNnjHoF7.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_464409e9ceffece3b6dc2d760dd8d5966dd268c0ba355860.jpg\",\"avatar_url\":\"/uploads/files/pfplAjC06lA4MIGbt9l1g1xdnCxG5VG0.jpg\",\"nickname\":\"yy^ω^\",\"sex\":\"0\",\"height\":168,\"birthday\":\"2003-11-14\",\"work\":{\"key\":\"zhipin\",\"value\":[0,3]},\"files\":[\"wxfile://tmp_5c308d346f56d657b2bcf87f5110b875c6b9b13b5762c2a2.jpg\"]}','2023-11-11 21:38:56','2023-11-11 21:38:56',NULL),
	(18,1,1,'hl_a16337054',NULL,'0',24,'思想成熟上进心强，并具极丰富的人际关联技巧。\n上进心强，为人可靠，身体健康','{\"openid\":\"op02s4p8eupfXYWGdmHf_32EeGHs\",\"relation\":\"0\",\"relation_sign\":\"15192784154\",\"userinfo\":\"\",\"introduction\":\"可爱，美丽，善良\",\"photos\":[\"/uploads/files/z21D1fSwDoUVsWupV1BKlDtKoa4fK0Lm.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_fe3311c3c89d47c611e39b11e7e4dd7f602dd1bdb740ec60.jpg\",\"avatar_url\":\"/uploads/files/IWGujXSMawSHw5G75R4WpSmjVSeZAZP0.jpg\",\"nickname\":\"aa\",\"sex\":\"0\",\"height\":160,\"birthday\":\"2003-12-24\",\"work\":{\"key\":\"zhipin\",\"value\":[0,2]},\"files\":[\"wxfile://tmp_55787b3d667396daab0f8e3a9cfc5b49d0a144d6ca2d8037.jpg\"]}','2023-11-11 21:41:29','2023-11-11 21:41:29',NULL),
	(19,1,1,'hl_a54411643',NULL,'0',25,'性格开朗，感性且性感，很爱学习，也喜欢 帮助别人一块学习，喜欢运动游戏','{\"openid\":\"op02s4iazh4o5JhbP6rlGBnydtqM\",\"relation\":\"0\",\"relation_sign\":\"15192784154\",\"userinfo\":\"\",\"introduction\":\"落落大方 倾国倾城\",\"photos\":[\"/uploads/files/OF2xlIm1XKXEpy05t8azYCZN5pvqBkai.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_efb0f4aacd7a0dd2b1997cf6d4d3ea96d4beb4ec0ec62734.jpg\",\"avatar_url\":\"/uploads/files/SzOFc1hRThb9oZvqwvGTVXhKjcvQgQmd.jpg\",\"nickname\":\"aai\",\"sex\":\"0\",\"height\":164,\"birthday\":\"2003-11-24\",\"work\":{\"key\":\"zhipin\",\"value\":[0,4]},\"files\":[\"wxfile://tmp_b24d2313beb49178b40d0d5638ea66dba03878d3f9ef5a9a.jpg\"]}','2023-11-11 21:43:28','2023-11-11 21:43:28',NULL),
	(20,1,1,'hl_a16337054',NULL,'0',26,'用心主动独立工作潜质强，并有良好的交际技能。\n上进，努力，善良','{\"openid\":\"op02s4p8eupfXYWGdmHf_32EeGHs\",\"relation\":\"0\",\"relation_sign\":\"13791926264\",\"userinfo\":\"\",\"introduction\":\"可爱，善良\",\"photos\":[\"/uploads/files/pzflVDTZFRucBZSG5PbJ9Kp1uBIBLSDh.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_3a512b24e3e853855f08d8bb145cf314e18a3ba30f712c36.jpg\",\"avatar_url\":\"/uploads/files/H4LuO7dtD2wOPukZNwZJ1eJR30U27nis.jpg\",\"nickname\":\"jj\",\"sex\":\"0\",\"height\":170,\"birthday\":\"2006-01-13\",\"work\":{\"key\":\"zhipin\",\"value\":[0,1]},\"files\":[\"wxfile://tmp_2c39b98631f8d4898ef474fb504b290f93ef15e32f7971da.jpg\"]}','2023-11-11 21:45:17','2023-11-11 21:45:17',NULL),
	(21,1,1,'hl_a54411643',NULL,'0',27,' 一位巨可爱的甜妹儿，喜欢唱歌喜欢游戏，性格开朗大方，是一位非常有耐心有爱心的小姑娘','{\"openid\":\"op02s4iazh4o5JhbP6rlGBnydtqM\",\"relation\":\"0\",\"relation_sign\":\"15953076011\",\"userinfo\":\"\",\"introduction\":\"可爱 可爱巨可爱\",\"photos\":[\"/uploads/files/aHfRE4B3aHx7CDNkAjIyNa1rO8yRC6UE.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_20365d6ef8754509fd940f9c21b6e941f457e3dce5241e12.jpg\",\"avatar_url\":\"/uploads/files/1XIwVMwsm9enlsI0SItYdkmzCTb0l6Ye.jpg\",\"nickname\":\"爱妻*\",\"sex\":\"0\",\"height\":158,\"birthday\":\"2004-02-14\",\"work\":{\"key\":\"zhipin\",\"value\":[0,1]},\"files\":[\"wxfile://tmp_39fdc8c3d8c055c05501ca54c0857091046a81095720abf2.jpg\"]}','2023-11-11 21:50:13','2023-11-11 21:50:13',NULL),
	(22,1,1,'hl_a16337054',NULL,'0',28,'年轻、聪明、精力充沛，善良，可爱，温柔','{\"openid\":\"op02s4p8eupfXYWGdmHf_32EeGHs\",\"relation\":\"0\",\"relation_sign\":\"17864992144\",\"userinfo\":\"\",\"introduction\":\"可爱，善良\",\"photos\":[\"/uploads/files/ihGqJDI3PFMjVGxjcwkuRz2GVqVUEe7l.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_2e92b03ea7c6eea846363145a11dc49123dea3e6dded272d.jpg\",\"avatar_url\":\"/uploads/files/r3fhQkmOPLuO00ieMS6eAqdNNsRAwjkg.jpg\",\"nickname\":\"xxx\",\"sex\":\"1\",\"height\":170,\"birthday\":\"2004-07-16\",\"work\":{\"key\":\"zhipin\",\"value\":[0,4]},\"files\":[\"wxfile://tmp_c80bad9f0e6037b2f562c45fa2025c0b4dd8f92d5b59ea8a.jpg\"]}','2023-11-11 21:50:45','2023-11-11 21:50:45',NULL),
	(23,1,1,'hl_a24559452','hl_a21409999','0',NULL,'好看的皮囊千篇一律 有趣的灵魂万里挑一 ','','2023-11-11 22:18:07','2023-11-11 21:18:07',NULL),
	(24,1,1,'hl_a24559452','hl_a04144909','0',NULL,'喜欢旅游 专业计算机科学技术等待认识更多有趣的人','','2023-11-11 22:19:07','2023-11-11 21:18:07',NULL),
	(25,1,1,'hl_a24559452','hl_a79349105','0',NULL,'在特定时间遇到特定的人 喜欢自己一个人','','2023-11-11 22:22:07','2023-11-11 21:18:07',NULL),
	(26,1,1,'hl_a16337054',NULL,'0',29,'锲而不舍、持之以恒、大公无私、拾金不昧、文质彬彬\n温文尔雅、助人为乐、足智多谋、兢兢业业','{\"openid\":\"op02s4p8eupfXYWGdmHf_32EeGHs\",\"relation\":\"0\",\"relation_sign\":\"15725271561\",\"userinfo\":\"\",\"introduction\":\"锲而不舍、持之以恒、大公无私、拾金不昧、文质彬彬\\n温文尔雅、助人为乐、足智多谋、兢兢业业\",\"photos\":[\"/uploads/files/fJ03svfTRMUYlbblNYZyDeRHyaoEoVUu.jpg\",\"/uploads/files/9TaH4rhJh9SS67v75MlMspZaGPGTGCll.jpg\",\"/uploads/files/xL3OY6pTqfhgeLfbROvxUV9dxGOVYQUQ.jpg\",\"/uploads/files/hUq0CZQM2uMaaPeNPTilTbS1c8LzPn4j.jpg\",\"/uploads/files/QeOC5Ud5VW26YzD4PFOxlZxNQYd4d0nQ.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_b9089b738df157fd9545727c7e28e43f862ad5a03cede97d.jpg\",\"avatar_url\":\"/uploads/files/A43KDuwNok5emkBkAoAINFBvngVY5Kb1.jpg\",\"nickname\":\"zx\",\"sex\":\"0\",\"height\":168,\"birthday\":\"2004-02-27\",\"work\":{\"key\":\"zhipin\",\"value\":[0,3]},\"files\":[\"wxfile://tmp_975570878e70555c71de2b182b9f5d36ba5a093302fbed3a.jpg\"]}','2023-11-12 11:30:40','2023-11-12 11:30:40',NULL),
	(27,1,0,'hl_a57190617',NULL,'0',30,'成熟稳重，待人温柔','{\"openid\":\"op02s4igUQag_uUnmM3ioxYCeCGI\",\"relation\":\"0\",\"introduction\":\"成熟稳重，待人温柔\",\"photos\":[\"/uploads/files/Z0t8QY6aIQghJT9AlFDuUz0iYLIcp1rx.jpg\",\"/uploads/files/cCtGeXzj05riKLSxXPx0lbvJDCcf2WQv.jpg\",\"/uploads/files/2wSqdxhl2jZe7MIPUZ8zh271qMhEqDYi.jpg\",\"/uploads/files/qsmhRUIuNLuCGXPFUb1tdC7m4lEDSc2Q.jpg\",\"/uploads/files/8jlxhzwAphVrycemyth1ADF442Twwsgy.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_c336ba3cba5e117badf1738da8a05366011f308ed44841d1.jpg\",\"avatar_url\":\"/uploads/files/z0mRjfsHP6YB5reg82L5rrZv6Tn9aJj6.jpg\",\"nickname\":\"胖达龙\",\"sex\":\"1\",\"height\":186,\"birthday\":\"2003-06-01\",\"work\":{\"key\":\"zhipin\",\"value\":[0,1]},\"files\":[\"wxfile://tmp_697cdcde1e4d21057a1720e1477af9f7d0dcbdc6b8338953.jpg\"]}','2023-11-13 09:07:54','2023-11-13 09:07:54',NULL),
	(28,1,0,'hl_a47851358',NULL,'0',31,'18岁阳光大男孩','{\"openid\":\"op02s4hwQ1jEmyDeyodH5mlAm6bY\",\"relation\":\"0\",\"introduction\":\"18岁阳光大男孩\",\"photos\":[\"/uploads/files/CQELrxqDDO3ZUU2aIztXCAm2mD0vsmoF.jpg\",\"/uploads/files/IclSBF49ipUFvFODwUg7JCqA8Nv0GroL.jpg\",\"/uploads/files/jwQV4e165jV4s8yMe9uEcDePWNEhStgX.jpg\",\"/uploads/files/GFVQQOfFiMFGsen9GuvXlMv3cVXB0yKp.jpg\",\"/uploads/files/G8g5B4WJNevgSaRlQMKNPmHjeewqAb68.jpg\"],\"type\":1,\"avatar\":\"wxfile://tmp_5cede48e297ec0429ead478877a22c23.jpg\",\"avatar_url\":\"/uploads/files/pqlxnKonqdLQ6w9416Zk0XOLocBbvlxr.jpg\",\"nickname\":\"\",\"sex\":\"1\",\"height\":180,\"birthday\":\"1999-08-01\",\"work\":{\"key\":\"zhipin\",\"value\":[0,1]},\"files\":[\"wxfile://tmp_0c0cf9161d46d0e4fe5ea53cc8dcba48.jpg\"]}','2023-11-13 09:37:00','2023-11-13 09:37:00',NULL);

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
	(4,NULL,'大聪明','/uploads/files/KGvDmQtTiDdmaiH6NI1vxQ7SAPLGxwdh.jpg','1999-01-01',166,0,'{\"key\":\"zhipin\",\"value\":[3,1],\"text\":\"制药\"}','[\"/uploads/files/2GQ6uwNXugR6eWD8AYm5eCH6aZ0UDzg0.jpg\",\"/uploads/files/TnXkHGqIOwkDCYZkX7xQ3t1fTSsT9V6c.jpg\",\"/uploads/files/rMp4Y9km65FkpIC3XOYpQovkcyieSqUo.jpg\",\"/uploads/files/I4MbhatLDwwTtwNVG97ym5jRQ0VmKsK0.jpg\",\"/uploads/files/FbPVlAFTnTMEwz1H2HpW5XDGcG5bTShB.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-24 18:29:07','2023-10-24 18:29:07',NULL),
	(5,NULL,'是小欢子呀','/uploads/files/qYLHcgYxr63cRITMfNs2d80ikGgIbAVE.jpg','1998-05-07',174,0,'{\"key\":\"zhipin\",\"value\":[3,1]}','[\"/uploads/files/5HaneJfTWus4eL17O4z4sgGne63pSfTO.jpg\",\"/uploads/files/15CJwN177y2cF2FOLi7rKfY4Ug94WB7y.jpg\",\"/uploads/files/w1W1BFoMug8kFCpnDWBdyUpvhx0eOlQa.jpg\",\"/uploads/files/cqMR1HKMdnD59wffDowvObsUwruoORCZ.jpg\",\"/uploads/files/Zf1gUqYuw3G7133xuC7fBCDXh3lXvFMT.jpg\",\"/uploads/files/6dJ83B9JsOlVKHOIOZL70xkbWbzWhp7Z.jpg\"]',NULL,NULL,'1126638303',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-25 09:33:25','2023-10-25 09:33:25',NULL),
	(6,NULL,'小甜甜','/uploads/normal-avatars/sex-014.png','1995-01-01',173,0,'{\"key\":\"zhipin\",\"value\":[11,5]}','[\"/uploads/files/2U5jTHFh1uzl30GyoGWlmWFGZ6JQbO2p.jpg\",\"/uploads/files/N13Y6VQl6Scb95sndrIKH3RkBGt62M1x.jpg\",\"/uploads/files/BVOFXMczZWxs7ne713gf8TkJgPp6hvik.jpg\",\"/uploads/files/Zwndgs60UNOGHQ2IkLmd90g23JY1wIVj.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-25 18:10:01','2023-10-25 18:10:01',NULL),
	(15,NULL,'板板','/uploads/files/tRGlAJ610weOrxTJdC3xEw3evEaVkuGp.jpg','2001-01-13',165,0,'{\"key\":\"zhipin\",\"value\":[2,2]}','[\"/uploads/files/vv5HsRxMQAtfVJ8qb8MFws7OKNvob7Td.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-01 09:14:36','2023-11-01 09:14:36',NULL),
	(16,NULL,'11','/uploads/files/cLBq9FCSsWr5su4wgXUkUzt67s3pXUpL.jpg','2003-10-16',160,0,'{\"key\":\"zhipin\",\"value\":[3,1]}','[\"/uploads/files/gOsesJrNCJba0W0r73hlaTjjpfZQpjjF.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-11 20:38:07','2023-11-11 20:38:07',NULL),
	(17,NULL,'Yy','/uploads/normal-avatars/sex-012.png','2003-11-15',168,0,'{\"key\":\"zhipin\",\"value\":[3,2]}','[\"/uploads/files/gV47bmXD4aIvHc38Wj8iIRezWRmsQyZZ.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-11 20:46:07','2023-11-11 20:46:07',NULL),
	(18,NULL,'起风了','/uploads/files/mUsvQln2Dw2zzpXzMPhKdtdV2vTolwuT.jpg','2004-11-09',170,1,'{\"key\":\"zhipin\",\"value\":[2,3]}','[\"/uploads/files/A0kES6g2R4nbUX1OAyFgTKHhRZiwArj3.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-11 20:59:40','2023-11-11 20:59:40',NULL),
	(19,NULL,'Zhang','/uploads/files/AhxBkQ219dO4RJCedcN6YKtrK1Pyjg9Q.jpg','1992-01-01',180,1,'{\"key\":\"zhipin\",\"value\":[0,2]}','[\"/uploads/files/wMwgN32UpHMtjGuKdRPQFxKZ4jZ4SNZ4.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-11 21:01:17','2023-11-11 21:01:17',NULL),
	(20,NULL,'qq','/uploads/files/mStZi9hHbFeGyqxvHOdvdgj3hEdGofMz.jpg','2003-11-09',169,0,'{\"key\":\"zhipin\",\"value\":[0,1]}','[\"/uploads/files/Vm9Imvj5VdDWWXaHPjatUraLPkZy87QX.jpg\",\"/uploads/files/33PGL6iQIkF8tNawtR1QFCNjROnK3B8J.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-11 21:32:17','2023-11-11 21:32:17',NULL),
	(21,NULL,'+7','/uploads/files/GTqQLClpn2zitWxCCMX0Fpqeu5SjBbq3.jpg','2003-11-09',169,0,'{\"key\":\"zhipin\",\"value\":[0,2]}','[\"/uploads/files/s2UU9JoVnGxDwnoJanVzaKo3jkYuZemy.jpg\",\"/uploads/files/SxmAo7oqZvMCMppteQSBlPK0t4xUT53B.jpg\",\"/uploads/files/GkNTjGnu74oW61dEJz0r66nVMwLXhg7j.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-11 21:34:33','2023-11-11 21:34:33',NULL),
	(22,NULL,'xx','/uploads/files/Y3ungdjsa7aqOe5PLdiuLrqHtBEByUZR.jpg','2004-06-04',165,0,'{\"key\":\"zhipin\",\"value\":[0,1]}','[\"/uploads/files/289qwzk6c5GbRR8uVKIez1KNNkHS2Xzb.jpg\",\"/uploads/files/DkdRQ2dYUv7t6p4oDqmm0aH0ASHaaUOa.jpg\",\"/uploads/files/CGWwzlSwVnV0ygDEjkdSQTomfXbg2WtZ.jpg\",\"/uploads/files/g5bIFTwS64taOTZtLoibket1gMtkPrM5.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-11 21:35:20','2023-11-11 21:35:20',NULL),
	(23,NULL,'yy^ω^','/uploads/files/mLVzn6QnXR288MwRFt54RdxQ0fguiIAC.jpg','2003-11-14',168,0,'{\"key\":\"zhipin\",\"value\":[0,3]}','[\"/uploads/files/COgJUnfvv0siIXupcdiQBQ1oYNnjHoF7.jpg\",\"/uploads/files/Ap9cdlN4eIFuEMGaXwNy0ccFObT5Qfh2.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-11 21:38:56','2023-11-11 21:38:56',NULL),
	(24,NULL,'aa','/uploads/files/JI4m3lj5joJpWh8t0M0ScapHFxPxZscN.jpg','2003-12-24',160,0,'{\"key\":\"zhipin\",\"value\":[0,2]}','[\"/uploads/files/z21D1fSwDoUVsWupV1BKlDtKoa4fK0Lm.jpg\",\"/uploads/files/J7Zurla7EG4ib7MTw3Pwu1rFZ6gIcmr6.jpg\",\"/uploads/files/mShm2z5VaukMsUwdoui5T6jUMlOIJI3E.jpg\",\"/uploads/files/b86EQ1af3wQCat0DO81NZRTT2nkLBNzW.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-11 21:41:29','2023-11-11 21:41:29',NULL),
	(25,NULL,'aai','/uploads/files/Uh1nPYgHsRLcqf4zqCipsTIJvWkBApPS.jpg','2003-11-24',164,0,'{\"key\":\"zhipin\",\"value\":[0,4]}','[\"/uploads/files/OF2xlIm1XKXEpy05t8azYCZN5pvqBkai.jpg\",\"/uploads/files/gp86tL2ILKqk1E9VODy62Se2Sx63GC7R.jpg\",\"/uploads/files/8USbt6vVLVILquYsgF69F7SCZwDygJLK.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-11 21:43:28','2023-11-11 21:43:28',NULL),
	(26,NULL,'jj','/uploads/files/peAEtPBRcGbGsgt0hbar7zhFMiRVkzBi.jpg','2006-01-15',170,0,'{\"key\":\"zhipin\",\"value\":[0,1]}','[\"/uploads/files/L0RGoitECHWBUhYRavgDC0qUHRJksme2.jpg\",\"/uploads/files/qYOrhuxyM3NDD1QK99ZLVgNtzLkROYGM.jpg\",\"/uploads/files/dcoYDXfqyxN131WXvgTbdQHqpD8MazqW.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-11 21:45:17','2023-11-11 21:45:17',NULL),
	(27,NULL,'爱妻*','/uploads/files/9pAS0fk02wgKyGSXSUBZc2BPhJV7aG8G.jpg','2004-02-14',158,0,'{\"key\":\"zhipin\",\"value\":[0,1]}','[\"/uploads/files/aHfRE4B3aHx7CDNkAjIyNa1rO8yRC6UE.jpg\",\"/uploads/files/FT48h1spOeRkgksxzQwCyVm35WGQbq7y.jpg\",\"/uploads/files/crAxaxjBvxi7NENbcjA8TbSW5WPUZF3K.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-11 21:50:13','2023-11-11 21:50:13',NULL),
	(28,NULL,'xxx','/uploads/files/MD4a18DrQfumFydLQNBNSCKznmU3jjY2.jpg','2004-07-16',170,1,'{\"key\":\"zhipin\",\"value\":[0,4]}','[\"/uploads/files/ihGqJDI3PFMjVGxjcwkuRz2GVqVUEe7l.jpg\",\"/uploads/files/XK9mFjuBRzjSNbDiifGa87kqegtU8FdP.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-11 21:50:45','2023-11-11 21:50:45',NULL),
	(29,NULL,'zx','/uploads/files/A43KDuwNok5emkBkAoAINFBvngVY5Kb1.jpg','2004-02-27',168,0,'{\"key\":\"zhipin\",\"value\":[0,3]}','[\"/uploads/files/fJ03svfTRMUYlbblNYZyDeRHyaoEoVUu.jpg\",\"/uploads/files/9TaH4rhJh9SS67v75MlMspZaGPGTGCll.jpg\",\"/uploads/files/xL3OY6pTqfhgeLfbROvxUV9dxGOVYQUQ.jpg\",\"/uploads/files/hUq0CZQM2uMaaPeNPTilTbS1c8LzPn4j.jpg\",\"/uploads/files/QeOC5Ud5VW26YzD4PFOxlZxNQYd4d0nQ.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-12 11:30:40','2023-11-12 11:30:40',NULL),
	(30,NULL,'胖达龙','/uploads/files/z0mRjfsHP6YB5reg82L5rrZv6Tn9aJj6.jpg','2003-06-01',186,1,'{\"key\":\"zhipin\",\"value\":[0,1]}','[\"/uploads/files/Z0t8QY6aIQghJT9AlFDuUz0iYLIcp1rx.jpg\",\"/uploads/files/cCtGeXzj05riKLSxXPx0lbvJDCcf2WQv.jpg\",\"/uploads/files/2wSqdxhl2jZe7MIPUZ8zh271qMhEqDYi.jpg\",\"/uploads/files/qsmhRUIuNLuCGXPFUb1tdC7m4lEDSc2Q.jpg\",\"/uploads/files/8jlxhzwAphVrycemyth1ADF442Twwsgy.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-13 09:07:54','2023-11-13 09:07:54',NULL),
	(31,NULL,'','/uploads/files/pqlxnKonqdLQ6w9416Zk0XOLocBbvlxr.jpg','1999-08-01',180,1,'{\"key\":\"zhipin\",\"value\":[0,1]}','[\"/uploads/files/CQELrxqDDO3ZUU2aIztXCAm2mD0vsmoF.jpg\",\"/uploads/files/IclSBF49ipUFvFODwUg7JCqA8Nv0GroL.jpg\",\"/uploads/files/jwQV4e165jV4s8yMe9uEcDePWNEhStgX.jpg\",\"/uploads/files/GFVQQOfFiMFGsen9GuvXlMv3cVXB0yKp.jpg\",\"/uploads/files/G8g5B4WJNevgSaRlQMKNPmHjeewqAb68.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-13 09:37:00','2023-11-13 09:37:00',NULL);

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
	(21,1,'hl_a90915530','D60W0lE6CnhO74ef14d44c3d6c5156310fc2dc553a88.png','pcxSVXeWJYUdjZ8Qguo1Rd0Wn1tZL9lF.png','/uploads/files/pcxSVXeWJYUdjZ8Qguo1Rd0Wn1tZL9lF.png','files','68127','image','png',NULL,'png','','2023-11-06 11:15:02',NULL,NULL),
	(22,1,'hl_a20353909','tmp_b2a8d5356eb6b4f9e1e65fbae0f602c6.jpg','2pOGyuRXYSxx0pgb2h3fWKgogufYsqjx.jpg','/uploads/files/2pOGyuRXYSxx0pgb2h3fWKgogufYsqjx.jpg','files','2604','image','jpeg',NULL,'jpg','','2023-11-09 08:35:34',NULL,NULL),
	(23,1,'hl_a20353909','tmp_408555bb084e9d2359360fe9b0e6099a.jpg','yHaHKlWhZmgEHbhqhIUuM262QrnWTE6q.jpg','/uploads/files/yHaHKlWhZmgEHbhqhIUuM262QrnWTE6q.jpg','files','296067','image','jpeg',NULL,'jpg','','2023-11-09 08:36:14',NULL,NULL),
	(24,1,'hl_a20353909','tmp_486ad5327adf69efde48bd5861285957.jpg','fo6RJtXjjje4EDPps4zg49tB1lZNbsI6.jpg','/uploads/files/fo6RJtXjjje4EDPps4zg49tB1lZNbsI6.jpg','files','268274','image','jpeg',NULL,'jpg','','2023-11-09 08:36:38',NULL,NULL),
	(25,1,'hl_a90915530','tmp_69391e17f5ccc0fb5a2ef4b36cb03d88.jpg','XJw47YeEk5J1BlnjkDsEdd99yk4p9TkN.jpg','/uploads/files/XJw47YeEk5J1BlnjkDsEdd99yk4p9TkN.jpg','files','97221','image','jpeg',NULL,'jpg','','2023-11-09 18:34:49',NULL,NULL),
	(26,1,'hl_a87121976','tmp_e363e700ec701b87d8ed4a83d90c22ee5ec5b8ff431c500d.jpg','xezFHPBcl53OSOmtk9cK2m5jRte9bNCK.jpg','/uploads/files/xezFHPBcl53OSOmtk9cK2m5jRte9bNCK.jpg','files','8608','image','jpeg',NULL,'jpg','','2023-11-11 19:30:33',NULL,NULL),
	(27,1,'hl_a73199741','tmp_718f26edbb23c1a0b746b569e48f1b044663c9bcbafdf338.jpg','xZw8Lie7EUFpXk5m5NJ4injEGFzeM8G3.jpg','/uploads/files/xZw8Lie7EUFpXk5m5NJ4injEGFzeM8G3.jpg','files','4795','image','jpeg',NULL,'jpg','','2023-11-11 19:30:46',NULL,NULL),
	(28,1,'hl_a40734152','tmp_92c97887944014eb34acde8c84828f77a9e184a0a18d0c4e.jpg','AWOlqQWSqMHMZAAnV0I3QWB6q0p5q7Fx.jpg','/uploads/files/AWOlqQWSqMHMZAAnV0I3QWB6q0p5q7Fx.jpg','files','9208','image','jpeg',NULL,'jpg','','2023-11-11 19:31:04',NULL,NULL),
	(29,1,'hl_a24559452','tmp_435c8e79b551fe18b5706df8fcc3edbe.jpg','ayciLgvN9Mfxj5tezVvQI0qB2IWoTBJp.jpg','/uploads/files/ayciLgvN9Mfxj5tezVvQI0qB2IWoTBJp.jpg','files','5295','image','jpeg',NULL,'jpg','','2023-11-11 19:31:42',NULL,NULL),
	(30,1,'hl_a16392021','tmp_f6d8d57f83d87ddcaaf24459c3ed6ac9.jpg','P03brR4Ka4NgHbKmZsTHMab2ARuIbHyr.jpg','/uploads/files/P03brR4Ka4NgHbKmZsTHMab2ARuIbHyr.jpg','files','5026','image','jpeg',NULL,'jpg','','2023-11-11 19:32:10',NULL,NULL),
	(31,1,'hl_a73199741','tmp_07498757452b55b4b3ec36c1cf5be73b1b0e94f2c96939bf.png','mnVmkLx7Bu5DFqczg4825I5XdIODetj6.png','/uploads/files/mnVmkLx7Bu5DFqczg4825I5XdIODetj6.png','files','1065389','image','png',NULL,'png','','2023-11-11 19:32:53',NULL,NULL),
	(32,1,'hl_a16392021','tmp_91b6150fd4f14b6aece385f03b36cc8f.jpg','Psvo5u0zNmWZ0d3stkbaTEANpRn19dEp.jpg','/uploads/files/Psvo5u0zNmWZ0d3stkbaTEANpRn19dEp.jpg','files','450230','image','jpeg',NULL,'jpg','','2023-11-11 19:32:56',NULL,NULL),
	(33,1,'','tmp_0e2053db9e78d92e6a3e3855126f9f47.jpg','JDnU1GCpBqcpaGJ93cuA6VCRKc01VHnK.jpg','/uploads/files/JDnU1GCpBqcpaGJ93cuA6VCRKc01VHnK.jpg','files','4976','image','jpeg',NULL,'jpg','','2023-11-11 19:33:23',NULL,NULL),
	(34,1,'hl_a21751174','tmp_90c5938880bf2da28166c61b87d1fd0d.jpg','0QrCF3frC6J3E6P0axsvorznocMBGVML.jpg','/uploads/files/0QrCF3frC6J3E6P0axsvorznocMBGVML.jpg','files','4976','image','jpeg',NULL,'jpg','','2023-11-11 19:35:29',NULL,NULL),
	(35,1,'hl_a73199741','tmp_5c9ad91a15e575f37a71d29be1cf70c192fd73b7d358555f.jpg','n1vAkm7GMPn8GEPqq99SBySOVrL03FCk.jpg','/uploads/files/n1vAkm7GMPn8GEPqq99SBySOVrL03FCk.jpg','files','23704','image','jpeg',NULL,'jpg','','2023-11-11 19:35:36',NULL,NULL),
	(36,1,'hl_a73199741','tmp_6038024cedf25c045094b91f353d675442fdebcce7cfce17.jpg','Eq63i6vIXh9RzmgEvj3rEBDzcHwzwO5y.jpg','/uploads/files/Eq63i6vIXh9RzmgEvj3rEBDzcHwzwO5y.jpg','files','23711','image','jpeg',NULL,'jpg','','2023-11-11 19:35:36',NULL,NULL),
	(37,1,'hl_a21751174','tmp_377ae7fd9eff147a978ae561e2924b07.jpg','OJYnl3Sv7TilJF2U0zbXo1UDcSmO050n.jpg','/uploads/files/OJYnl3Sv7TilJF2U0zbXo1UDcSmO050n.jpg','files','4976','image','jpeg',NULL,'jpg','','2023-11-11 19:36:19',NULL,NULL),
	(38,1,'hl_a45097638','tmp_1ca66380f060b7d9259912cc97407c25.jpg','ASCOEESNiXzLnMhatE5KPDJsGoTIFeig.jpg','/uploads/files/ASCOEESNiXzLnMhatE5KPDJsGoTIFeig.jpg','files','382579','image','jpeg',NULL,'jpg','','2023-11-11 19:36:49',NULL,NULL),
	(39,1,'hl_a47851358','tmp_32dcc67a72207d05351a0b3fa5ffe46b.jpg','JXOw4KmkFur7pIz618WZNgYjjIhBvHrn.jpg','/uploads/files/JXOw4KmkFur7pIz618WZNgYjjIhBvHrn.jpg','files','4944','image','jpeg',NULL,'jpg','','2023-11-11 19:36:54',NULL,NULL),
	(40,1,'hl_a45097638','tmp_7899e6ef33b71193b9310ac8bb997b69.jpg','VPv9scOzxbcaCVPtUGXnJPNl2tNGYBSu.jpg','/uploads/files/VPv9scOzxbcaCVPtUGXnJPNl2tNGYBSu.jpg','files','7876','image','jpeg',NULL,'jpg','','2023-11-11 19:37:13',NULL,NULL),
	(41,1,'hl_a53724151','tmp_d4464a86c8f9b88be8bc1ab6769193b3052afaa4cd0e275b.jpg','wxzihTMXVU7b4M44qPJvOjQOVo07nNNm.jpg','/uploads/files/wxzihTMXVU7b4M44qPJvOjQOVo07nNNm.jpg','files','5304','image','jpeg',NULL,'jpg','','2023-11-11 19:37:17',NULL,NULL),
	(42,1,'hl_a21751174','tmp_1baff6ba920d8250ca2015f85ff3b814.jpg','tpoTwD42OiSzrKzcOQI4XUkRAzKiIRbg.jpg','/uploads/files/tpoTwD42OiSzrKzcOQI4XUkRAzKiIRbg.jpg','files','210180','image','jpeg',NULL,'jpg','','2023-11-11 19:37:31',NULL,NULL),
	(43,1,'hl_a47851358','tmp_a8c18825e8ab53db4038edb9b5caa1a8.jpg','9tN95poxz1RO7QyL4nIjBhxP0l9KPgBf.jpg','/uploads/files/9tN95poxz1RO7QyL4nIjBhxP0l9KPgBf.jpg','files','5398','image','jpeg',NULL,'jpg','','2023-11-11 19:38:02',NULL,NULL),
	(44,1,'hl_a21751174','tmp_0628f292cd291b05f916f34aa3433826.jpg','yTN2bSn5q69AN5ZU40AjdmiwHZ6yOupy.jpg','/uploads/files/yTN2bSn5q69AN5ZU40AjdmiwHZ6yOupy.jpg','files','134419','image','jpeg',NULL,'jpg','','2023-11-11 19:40:05',NULL,NULL),
	(45,1,'hl_a24559452','tmp_c700261ee920d04907ded9fb992ca404.jpg','YEII8QIXTiTiBlSqlsxEv2dOkbtS8y4r.jpg','/uploads/files/YEII8QIXTiTiBlSqlsxEv2dOkbtS8y4r.jpg','files','644827','image','jpeg',NULL,'jpg','','2023-11-11 19:40:51',NULL,NULL),
	(46,1,'hl_a24559452','tmp_76a0bf926fdfaf3b8033584af545f13e.jpg','wcCgl8FxjV28XRkMVvK7QevTvh4IFzfI.jpg','/uploads/files/wcCgl8FxjV28XRkMVvK7QevTvh4IFzfI.jpg','files','400780','image','jpeg',NULL,'jpg','','2023-11-11 19:41:03',NULL,NULL),
	(47,1,'hl_a24559452','tmp_7040f564464e108943a88de87fe08e0b.jpg','uLjNOA7Wtfq7Oeyx8Zvz4a3TELRSs7Xf.jpg','/uploads/files/uLjNOA7Wtfq7Oeyx8Zvz4a3TELRSs7Xf.jpg','files','442482','image','jpeg',NULL,'jpg','','2023-11-11 19:41:05',NULL,NULL),
	(48,1,'hl_a24559452','tmp_0ac369a8195b8faaab77b8d2ce7eaf74.jpg','hVi7oLMTfWWnXOsPZre7n7sxmBSgsW8V.jpg','/uploads/files/hVi7oLMTfWWnXOsPZre7n7sxmBSgsW8V.jpg','files','566326','image','jpeg',NULL,'jpg','','2023-11-11 19:41:06',NULL,NULL),
	(49,1,'hl_a45097638','tmp_35b3ffa09c196e7a2c95f9c248e87bb3.jpg','Qj1rBRDWNgdbaCBWXOYZoq6DqlLZYwPD.jpg','/uploads/files/Qj1rBRDWNgdbaCBWXOYZoq6DqlLZYwPD.jpg','files','382579','image','jpeg',NULL,'jpg','','2023-11-11 19:43:44',NULL,NULL),
	(50,1,'hl_a21751174','tmp_986618933041277b2ada7ef3290f7004.jpg','a7ZOnhK6Il1cT5ZKda5n4i81NdU4JYsV.jpg','/uploads/files/a7ZOnhK6Il1cT5ZKda5n4i81NdU4JYsV.jpg','files','207178','image','jpeg',NULL,'jpg','','2023-11-11 19:44:30',NULL,NULL),
	(51,1,'hl_a21751174','tmp_02939213a76369c1874ac9f6bab34e84.jpg','ojBC2g1YQ72TTabvknchfdasnjf5Kxqr.jpg','/uploads/files/ojBC2g1YQ72TTabvknchfdasnjf5Kxqr.jpg','files','192218','image','jpeg',NULL,'jpg','','2023-11-11 19:44:30',NULL,NULL),
	(52,1,'hl_a22603795','tmp_4cbff9cb8f9ec469fd1dd74f8b4122588ee29ba86fe26f1e.jpg','tVKUIJdw2w32jiA13yBOZCntRRhc0pNy.jpg','/uploads/files/tVKUIJdw2w32jiA13yBOZCntRRhc0pNy.jpg','files','3519','image','jpeg',NULL,'jpg','','2023-11-11 19:45:29',NULL,NULL),
	(53,1,'hl_a24559452','tmp_99eb4633df0e2bf2e60f58df1acc3aa1.jpg','RAGYvOKWq73Zj9wD1QsnJRqSxuzVhLKU.jpg','/uploads/files/RAGYvOKWq73Zj9wD1QsnJRqSxuzVhLKU.jpg','files','317520','image','jpeg',NULL,'jpg','','2023-11-11 19:46:18',NULL,NULL),
	(54,1,'hl_a24559452','tmp_f66e0dfc6712b461ab8fc33685abac32.jpg','cBvwVDF1oAn70c3JstjcQcQGMw6Lm24R.jpg','/uploads/files/cBvwVDF1oAn70c3JstjcQcQGMw6Lm24R.jpg','files','603328','image','jpeg',NULL,'jpg','','2023-11-11 19:47:42',NULL,NULL),
	(55,1,'hl_a21751174','tmp_47bfa00d5b6412a3ff8658b6e62336b3.jpg','6iGiqf9IfCICGngFcFpDewG9GqFyKKxF.jpg','/uploads/files/6iGiqf9IfCICGngFcFpDewG9GqFyKKxF.jpg','files','83720','image','jpeg',NULL,'jpg','','2023-11-11 19:47:55',NULL,NULL),
	(56,1,'hl_a21751174','tmp_f66e1b2b70cd67f9c015f9f4d1c9cf26.jpg','ZJErwHC0DaAw0q7PNcQfUyKcXGQwShIq.jpg','/uploads/files/ZJErwHC0DaAw0q7PNcQfUyKcXGQwShIq.jpg','files','272870','image','jpeg',NULL,'jpg','','2023-11-11 19:47:55',NULL,NULL),
	(57,1,'hl_a87121976','tmp_1338917072f7bf40e24f67d26699e8ed01010fbf4a5d705b.jpg','BKMN7WbBwhNRIe6WGYbIfKkPO4cEBzA9.jpg','/uploads/files/BKMN7WbBwhNRIe6WGYbIfKkPO4cEBzA9.jpg','files','28105','image','jpeg',NULL,'jpg','','2023-11-11 19:48:04',NULL,NULL),
	(58,1,'hl_a57190617','tmp_af871bbe5ba3954b703795fee0d41bf29e9f1863fad3fd59.jpg','yVJLIVmO8Hmpo0xadLiie4oq2EsaVwXa.jpg','/uploads/files/yVJLIVmO8Hmpo0xadLiie4oq2EsaVwXa.jpg','files','9369','image','jpeg',NULL,'jpg','','2023-11-11 19:48:25',NULL,NULL),
	(59,1,'hl_a16392021','tmp_76eb96192463ac30c80a5475fd507fa8.jpg','M5g9eVehTjkuwpnC3CjZmoVENDDPaDZf.jpg','/uploads/files/M5g9eVehTjkuwpnC3CjZmoVENDDPaDZf.jpg','files','137297','image','jpeg',NULL,'jpg','','2023-11-11 19:48:27',NULL,NULL),
	(60,1,'hl_a16392021','tmp_30aa8cf7c3157717c287cb72c278d84b.jpg','2kNVMY2DI2B3fIR4mqjk6j2LO0TTdJuo.jpg','/uploads/files/2kNVMY2DI2B3fIR4mqjk6j2LO0TTdJuo.jpg','files','333555','image','jpeg',NULL,'jpg','','2023-11-11 19:48:27',NULL,NULL),
	(61,1,'hl_a16392021','tmp_8c22658002ed59a186d7395479d227d6.jpg','QhCJq6pqjmHhlxBBCjHOTQN9BJ5Kb55h.jpg','/uploads/files/QhCJq6pqjmHhlxBBCjHOTQN9BJ5Kb55h.jpg','files','450230','image','jpeg',NULL,'jpg','','2023-11-11 19:48:27',NULL,NULL),
	(62,1,'hl_a21751174','tmp_8a74786ce7b5180d0266e9d768976cc9.jpg','LSNGrIyHPl9Y9gfHdLBp1Uk3LMyd4Mkz.jpg','/uploads/files/LSNGrIyHPl9Y9gfHdLBp1Uk3LMyd4Mkz.jpg','files','813592','image','jpeg',NULL,'jpg','','2023-11-11 19:49:23',NULL,NULL),
	(63,1,'hl_a16392021','tmp_c32b73500945d2f02d27c9f7fe004cd4.jpg','KT18pyKXnXnL9T09e5wSOqWXq4In5HJO.jpg','/uploads/files/KT18pyKXnXnL9T09e5wSOqWXq4In5HJO.jpg','files','450230','image','jpeg',NULL,'jpg','','2023-11-11 19:49:36',NULL,NULL),
	(64,1,'hl_a21751174','tmp_14a9849d3babf6f75c57a5c140fa0eb0.jpg','i3qOz7CFfx3xueznAD4WpZFKgNkQbbwE.jpg','/uploads/files/i3qOz7CFfx3xueznAD4WpZFKgNkQbbwE.jpg','files','518951','image','jpeg',NULL,'jpg','','2023-11-11 19:51:03',NULL,NULL),
	(65,1,'hl_a87121976','tmp_32d1b565cc2208c6ffa23abefe795c1cd9b59815d0d604e3.jpg','810nIwV28aWkGjdiehLL9aG0zlq7a2Ty.jpg','/uploads/files/810nIwV28aWkGjdiehLL9aG0zlq7a2Ty.jpg','files','34182','image','jpeg',NULL,'jpg','','2023-11-11 19:51:11',NULL,NULL),
	(66,1,'hl_a24559452','tmp_d70fc37f9eb8542aaec298a484f29033.jpg','cyKbRl5CA3gyO1ekdawNiAQpw3cSQmTB.jpg','/uploads/files/cyKbRl5CA3gyO1ekdawNiAQpw3cSQmTB.jpg','files','187716','image','jpeg',NULL,'jpg','','2023-11-11 19:52:27',NULL,NULL),
	(67,1,'hl_a24559452','tmp_c39f1c2d74cc021c72f6dc433f3a64fc.jpg','s6gavjd3bEIgjcQbhuv3DXzLtY6zULPy.jpg','/uploads/files/s6gavjd3bEIgjcQbhuv3DXzLtY6zULPy.jpg','files','211453','image','jpeg',NULL,'jpg','','2023-11-11 19:52:32',NULL,NULL),
	(68,1,'hl_a24559452','tmp_92ea3e8a45a5c73963fa1e469d083132.jpg','yxqcu8Z6BVpUP9h94kKCMm6UxOwFDhmi.jpg','/uploads/files/yxqcu8Z6BVpUP9h94kKCMm6UxOwFDhmi.jpg','files','319813','image','jpeg',NULL,'jpg','','2023-11-11 19:52:35',NULL,NULL),
	(69,1,'hl_a87121976','tmp_36a88b9a9c25f626cab3d204e615a29f74f958ad21b24ce7.jpg','xQVynQvykVKARTValmCVUT1qX8Fiy0wt.jpg','/uploads/files/xQVynQvykVKARTValmCVUT1qX8Fiy0wt.jpg','files','56197','image','jpeg',NULL,'jpg','','2023-11-11 19:53:26',NULL,NULL),
	(70,1,'hl_a24559452','tmp_c1c79041a4a922afc7720adc2589320a.jpg','J2HIo35bgd2zNXkgyNBQeuqsXO82oFX2.jpg','/uploads/files/J2HIo35bgd2zNXkgyNBQeuqsXO82oFX2.jpg','files','231505','image','jpeg',NULL,'jpg','','2023-11-11 19:53:57',NULL,NULL),
	(71,1,'hl_a24559452','tmp_a9281479ca00a989fdfeeb084d11571b.jpg','68gNeM0ba8DuwrG6VnUGo7HAtjfx1xaO.jpg','/uploads/files/68gNeM0ba8DuwrG6VnUGo7HAtjfx1xaO.jpg','files','317520','image','jpeg',NULL,'jpg','','2023-11-11 19:53:58',NULL,NULL),
	(72,1,'hl_a24559452','tmp_a7110d899c30330bed810d4b0f8756b1.jpg','Lh4ZaROxjS4P4jJir6dCP3xFXvp4KVUc.jpg','/uploads/files/Lh4ZaROxjS4P4jJir6dCP3xFXvp4KVUc.jpg','files','731596','image','jpeg',NULL,'jpg','','2023-11-11 19:54:02',NULL,NULL),
	(73,1,'hl_a24559452','tmp_a4b9a27224fcabce62ec14cc7e353f7c.jpg','V5gMJ4vNjQqGW0XNX0EA6F55prmEGXMP.jpg','/uploads/files/V5gMJ4vNjQqGW0XNX0EA6F55prmEGXMP.jpg','files','338171','image','jpeg',NULL,'jpg','','2023-11-11 19:55:26',NULL,NULL),
	(74,1,'hl_a87121976','tmp_4ef8499926bef8cafaf1954fcbee76a858cdf9be551f2e4b.jpg','idLyRCuk1IPw0YvSLx0lciATWthhaPCc.jpg','/uploads/files/idLyRCuk1IPw0YvSLx0lciATWthhaPCc.jpg','files','8609','image','jpeg',NULL,'jpg','','2023-11-11 19:55:32',NULL,NULL),
	(75,1,'hl_a21751174','tmp_115b883bd1f5835dd5d966ab397cbd13.jpg','NwUtVhw9uzBUtMAgOxJGX9rDUC7lE0q5.jpg','/uploads/files/NwUtVhw9uzBUtMAgOxJGX9rDUC7lE0q5.jpg','files','813592','image','jpeg',NULL,'jpg','','2023-11-11 19:55:37',NULL,NULL),
	(76,1,'hl_a24559452','tmp_7d6199bba5732cc1617dee0e3f243a6b.jpg','iRSq5HywCviNN5DMVGuKyWINrWDsMEto.jpg','/uploads/files/iRSq5HywCviNN5DMVGuKyWINrWDsMEto.jpg','files','383310','image','jpeg',NULL,'jpg','','2023-11-11 19:56:14',NULL,NULL),
	(77,1,'hl_a21751174','tmp_b347a8a2e5f338bdc8f1bfa2fac3e656.jpg','owK9tRxNOK01ago15ODpucxi4VHxqBrK.jpg','/uploads/files/owK9tRxNOK01ago15ODpucxi4VHxqBrK.jpg','files','813592','image','jpeg',NULL,'jpg','','2023-11-11 19:56:27',NULL,NULL),
	(78,1,'hl_a22603795','tmp_ae3e4cbab6df0eaec7d5168618349e838f8bebffa9974e07.jpg','mWn3poH7Itm787EDXy8V0tFphXtMECFn.jpg','/uploads/files/mWn3poH7Itm787EDXy8V0tFphXtMECFn.jpg','files','30960','image','jpeg',NULL,'jpg','','2023-11-11 19:58:24',NULL,NULL),
	(79,1,'hl_a22603795','tmp_692fc942384df8612b674513a4b481b65902d43d19f01914.jpg','tJDobQE3XnJjg883mUJcjGnM53FM0e1v.jpg','/uploads/files/tJDobQE3XnJjg883mUJcjGnM53FM0e1v.jpg','files','3519','image','jpeg',NULL,'jpg','','2023-11-11 19:58:33',NULL,NULL),
	(80,1,'hl_a73199741','tmp_ad7607ae6d715a7652e559a8a76e356993b2a3f1363b975d.jpg','ZMVNOcoEPLsAu7hz2hrhHBbRX5knfFkE.jpg','/uploads/files/ZMVNOcoEPLsAu7hz2hrhHBbRX5knfFkE.jpg','files','27682','image','jpeg',NULL,'jpg','','2023-11-11 20:00:03',NULL,NULL),
	(81,1,'hl_a57190617','tmp_5c16a536eb397c485307a97937b9380f52706044582259a7.jpg','WCLHohcWuhGAyR4GMG22NANKnmW8JArq.jpg','/uploads/files/WCLHohcWuhGAyR4GMG22NANKnmW8JArq.jpg','files','4055048','image','jpeg',NULL,'jpg','','2023-11-11 20:00:31',NULL,NULL),
	(82,1,'hl_a57190617','tmp_595afc9840b347a06acc4734c195f51fede0cffc3d3ea132.jpg','58DLPAqx141tvG6VCQmSvkGDBbqDvh2E.jpg','/uploads/files/58DLPAqx141tvG6VCQmSvkGDBbqDvh2E.jpg','files','19398648','image','jpeg',NULL,'jpg','','2023-11-11 20:00:46',NULL,NULL),
	(83,1,'hl_a24559452','tmp_772e53ce0031ce604446fb15c5c855a4.jpg','GOr6albNCwdhHfE4AOq07807ON90rEAs.jpg','/uploads/files/GOr6albNCwdhHfE4AOq07807ON90rEAs.jpg','files','383310','image','jpeg',NULL,'jpg','','2023-11-11 20:00:51',NULL,NULL),
	(84,1,'hl_a22603795','tmp_9ec20ceb28b406d662bd2573ab81a1dfe6cbda19dc098891.jpg','xRKcSZk9GWkbBXEr4unUMk0DF6NztnEB.jpg','/uploads/files/xRKcSZk9GWkbBXEr4unUMk0DF6NztnEB.jpg','files','43795','image','jpeg',NULL,'jpg','','2023-11-11 20:01:44',NULL,NULL),
	(85,1,'hl_a73199741','tmp_b1f050191f5cd3a18d0d7f3f22e952ae6071f554cbcd776f.jpg','7xjSDZavsl3pYMANkrLJnLkMOwo2hd7f.jpg','/uploads/files/7xjSDZavsl3pYMANkrLJnLkMOwo2hd7f.jpg','files','18704','image','jpeg',NULL,'jpg','','2023-11-11 20:01:47',NULL,NULL),
	(86,1,'hl_a47851358','tmp_9499e195031f7022905f642b09b930e3.jpg','c6nruqzdi4hTFAoFYM8ZPlhC6AGwZv4P.jpg','/uploads/files/c6nruqzdi4hTFAoFYM8ZPlhC6AGwZv4P.jpg','files','261956','image','jpeg',NULL,'jpg','','2023-11-11 20:04:56',NULL,NULL),
	(87,1,'hl_a47851358','tmp_0d73da5da53c93e8c216d8cd4e5f78b0.jpg','N3Jact6Avezv1v0JT430Q3dsGfpE2Pue.jpg','/uploads/files/N3Jact6Avezv1v0JT430Q3dsGfpE2Pue.jpg','files','291803','image','jpeg',NULL,'jpg','','2023-11-11 20:04:56',NULL,NULL),
	(88,1,'hl_a60125001','tmp_692b92695409cdffde112ff0d7b4aeb2.jpg','AdOb0leY8BjxjbFAS5NiGqoSHmDtpMzD.jpg','/uploads/files/AdOb0leY8BjxjbFAS5NiGqoSHmDtpMzD.jpg','files','3991','image','jpeg',NULL,'jpg','','2023-11-11 20:08:01',NULL,NULL),
	(89,1,'hl_a21751174','tmp_de3d7e546e55a109177600b93e46045e.jpg','wHwJCcY5JTfrzXvKcews12gkfFw7BQcK.jpg','/uploads/files/wHwJCcY5JTfrzXvKcews12gkfFw7BQcK.jpg','files','362942','image','jpeg',NULL,'jpg','','2023-11-11 20:08:21',NULL,NULL),
	(90,1,'hl_a24559452','tmp_d3bee4ab3bcbc61071aa0498130ad2c9.jpg','zLQ8CkznLKv5R6vB4Moj7h9SuGh5Q9rz.jpg','/uploads/files/zLQ8CkznLKv5R6vB4Moj7h9SuGh5Q9rz.jpg','files','383310','image','jpeg',NULL,'jpg','','2023-11-11 20:08:38',NULL,NULL),
	(91,1,'hl_a21751174','tmp_f0bd152a79c87ed110830ccb7b88e871.jpg','i7Vij4U050vZpY3Uolp83JQimrGZ2vNk.jpg','/uploads/files/i7Vij4U050vZpY3Uolp83JQimrGZ2vNk.jpg','files','521740','image','jpeg',NULL,'jpg','','2023-11-11 20:09:20',NULL,NULL),
	(92,1,'hl_a60125001','tmp_360b42f592e86a287df570506adaace7.jpg','vFF7Gq6yvzgOVMdDSfefIirvGeiD9DHc.jpg','/uploads/files/vFF7Gq6yvzgOVMdDSfefIirvGeiD9DHc.jpg','files','345636','image','jpeg',NULL,'jpg','','2023-11-11 20:09:20',NULL,NULL),
	(93,1,'hl_a22603795','tmp_f67f35408d4054e12e4d1b0d0e72e553fb1c647a9d21ff4d.jpg','QHbYRugpjf9MLsviF5qVUWDqKgqZmKAf.jpg','/uploads/files/QHbYRugpjf9MLsviF5qVUWDqKgqZmKAf.jpg','files','57339','image','jpeg',NULL,'jpg','','2023-11-11 20:09:56',NULL,NULL),
	(94,1,'hl_a22603795','tmp_691c5f7e43e627e108e52e10457cda750ea50c71b40d3dbb.jpg','ADRtwTtdi0UVjxVGInYGa50e9FE6Dswn.jpg','/uploads/files/ADRtwTtdi0UVjxVGInYGa50e9FE6Dswn.jpg','files','60105','image','jpeg',NULL,'jpg','','2023-11-11 20:09:56',NULL,NULL),
	(95,1,'hl_a60125001','tmp_6bc9a9fb3e558f4bd4c9faa40e89216f.jpg','DfQ85OEAac7X50zWlzqykVygrQNzIGSI.jpg','/uploads/files/DfQ85OEAac7X50zWlzqykVygrQNzIGSI.jpg','files','345636','image','jpeg',NULL,'jpg','','2023-11-11 20:10:25',NULL,NULL),
	(96,1,'hl_a22603795','tmp_ad5c181f35ab4523d16ed8f9454ab1862f930c7d888bc23c.jpg','6MqM9C0II49AtipPvKBlfAZmxQ60hQbR.jpg','/uploads/files/6MqM9C0II49AtipPvKBlfAZmxQ60hQbR.jpg','files','54425','image','jpeg',NULL,'jpg','','2023-11-11 20:10:44',NULL,NULL),
	(97,1,'hl_a57190617','tmp_d59296ef46f81d2f24f9ddcd6d6f5a88b53a40155bf8b475.jpg','FHARTiunjg9gk1pOyZxHAXVPrx6SCJWR.jpg','/uploads/files/FHARTiunjg9gk1pOyZxHAXVPrx6SCJWR.jpg','files','898083','image','jpeg',NULL,'jpg','','2023-11-11 20:13:06',NULL,NULL),
	(98,1,'hl_a57190617','tmp_54e13cac3ed97ee9f225595471ead1dd3d0285c6ab986381.jpg','KEsHgMNNWUSV4Upf64OLubKVMiODX5FV.jpg','/uploads/files/KEsHgMNNWUSV4Upf64OLubKVMiODX5FV.jpg','files','868026','image','jpeg',NULL,'jpg','','2023-11-11 20:13:06',NULL,NULL),
	(99,1,'hl_a24559452','tmp_bcabbd7f02f8c96ca0f254ebdf0d7519.jpg','3MnLpQa50tmEopxaMlabEMOgj2yual5n.jpg','/uploads/files/3MnLpQa50tmEopxaMlabEMOgj2yual5n.jpg','files','383310','image','jpeg',NULL,'jpg','','2023-11-11 20:14:39',NULL,NULL),
	(100,1,'hl_a24559452','tmp_18ef731abb4e2991fcf070a5a1888e29.jpg','e28RTDX02Gpw4whMLp35bs5J3IVkVvgU.jpg','/uploads/files/e28RTDX02Gpw4whMLp35bs5J3IVkVvgU.jpg','files','173484','image','jpeg',NULL,'jpg','','2023-11-11 20:15:59',NULL,NULL),
	(101,1,'hl_a22603795','tmp_42800e45534de4071a0f463d91c0ca7056c8960025f9dbc5.jpg','Gg6lqtZ6G6O9xGnZtD6sUe9VLeakTtNG.jpg','/uploads/files/Gg6lqtZ6G6O9xGnZtD6sUe9VLeakTtNG.jpg','files','60105','image','jpeg',NULL,'jpg','','2023-11-11 20:16:29',NULL,NULL),
	(102,1,'hl_a47851358','tmp_025140df6de66160129103366c4c2675.jpg','mWo1CexUeC7MjEJgkgSkO5DYawuOjZFu.jpg','/uploads/files/mWo1CexUeC7MjEJgkgSkO5DYawuOjZFu.jpg','files','333673','image','jpeg',NULL,'jpg','','2023-11-11 20:16:35',NULL,NULL),
	(103,1,'hl_a24559452','tmp_b6e388d0ae99c04e56b77fc7360d9873.jpg','pAH0oO1dHV1Jc3lpkBDwndHDHAABqnXj.jpg','/uploads/files/pAH0oO1dHV1Jc3lpkBDwndHDHAABqnXj.jpg','files','500473','image','jpeg',NULL,'jpg','','2023-11-11 20:16:49',NULL,NULL),
	(104,1,'hl_a21751174','tmp_2f889c9c346c241d1cdfd258b4b4256a.jpg','ZXVRCPGiTUQjZJ7k9OLxINnqRTmt8E2Q.jpg','/uploads/files/ZXVRCPGiTUQjZJ7k9OLxINnqRTmt8E2Q.jpg','files','813592','image','jpeg',NULL,'jpg','','2023-11-11 20:18:48',NULL,NULL),
	(105,1,'hl_a22603795','tmp_0fa2a39f443e1d49bf2d3f5a59bbaa8f912f78c899a9933e.jpg','yKcx8KKe3XDpQYxV35GrqZycndOp3G71.jpg','/uploads/files/yKcx8KKe3XDpQYxV35GrqZycndOp3G71.jpg','files','71723','image','jpeg',NULL,'jpg','','2023-11-11 20:18:55',NULL,NULL),
	(106,1,'hl_a21751174','tmp_6a4f573a89ed6491ec16308436b2b097.jpg','6Q3ayu6R9ONJ7fooYrx8UFcqvc4joJWv.jpg','/uploads/files/6Q3ayu6R9ONJ7fooYrx8UFcqvc4joJWv.jpg','files','432519','image','jpeg',NULL,'jpg','','2023-11-11 20:19:13',NULL,NULL),
	(107,1,'hl_a22603795','tmp_cd55bfbdafb58af0e3cfd939e7e9e29ea80972ff202af9d2.jpg','FVa4KXRttOTJcgYxa3NsHr47IF0FD8rX.jpg','/uploads/files/FVa4KXRttOTJcgYxa3NsHr47IF0FD8rX.jpg','files','30780','image','jpeg',NULL,'jpg','','2023-11-11 20:19:23',NULL,NULL),
	(108,1,'hl_a21751174','tmp_76e762db0fd4f9cff53fa9ab2fa6b6e5.jpg','kP4nt2FU46FwyTp8UNfFAOuH8S5a4Nqh.jpg','/uploads/files/kP4nt2FU46FwyTp8UNfFAOuH8S5a4Nqh.jpg','files','515336','image','jpeg',NULL,'jpg','','2023-11-11 20:19:53',NULL,NULL),
	(109,1,'hl_a20696176','tmp_9cff9703893fe5275ca5122b39ce950a3029b337e6eee198.jpg','GfM6wzcH7rizkTuyoctyHYq5GDoh1B5X.jpg','/uploads/files/GfM6wzcH7rizkTuyoctyHYq5GDoh1B5X.jpg','files','3106','image','jpeg',NULL,'jpg','','2023-11-11 20:26:02',NULL,NULL),
	(110,1,'hl_a47851358','tmp_74c94634706fea3fbce3503733286849.jpg','JeX73KAKmqibnhrKjYcrmigjjT1t1Sbm.jpg','/uploads/files/JeX73KAKmqibnhrKjYcrmigjjT1t1Sbm.jpg','files','255668','image','jpeg',NULL,'jpg','','2023-11-11 20:26:17',NULL,NULL),
	(111,1,'hl_a47851358','tmp_ccdccc4b82b0173669a24395ec4af307.jpg','GpRtroLwm3sDJZabtuTda8pGpubgLf7u.jpg','/uploads/files/GpRtroLwm3sDJZabtuTda8pGpubgLf7u.jpg','files','299977','image','jpeg',NULL,'jpg','','2023-11-11 20:26:17',NULL,NULL),
	(112,1,'hl_a20696176','tmp_ff9219a0b2f1a4212688658991454a54991276da05cf5978.jpg','KONxjeWw2jc8Ld358FGylVDGgHTvmfMp.jpg','/uploads/files/KONxjeWw2jc8Ld358FGylVDGgHTvmfMp.jpg','files','3109','image','jpeg',NULL,'jpg','','2023-11-11 20:26:52',NULL,NULL),
	(113,1,'hl_a22603795','tmp_5400800af522d71e987cd10d8f85d7c31151850b4d3eb6d4.jpg','3EBku3DuT03RU9PT86MJTDCtTisqZ8Lx.jpg','/uploads/files/3EBku3DuT03RU9PT86MJTDCtTisqZ8Lx.jpg','files','55409','image','jpeg',NULL,'jpg','','2023-11-11 20:27:06',NULL,NULL),
	(114,1,'hl_a20696176','tmp_21a5db3abf9ee5c495f838954b308915a9f9dda09d49c8df.jpg','vKG8RR2zjnkwqLVdLhnltPZvI9bBAio8.jpg','/uploads/files/vKG8RR2zjnkwqLVdLhnltPZvI9bBAio8.jpg','files','74198','image','jpeg',NULL,'jpg','','2023-11-11 20:27:20',NULL,NULL),
	(115,1,'hl_a47851358','tmp_297444e881f71af177ee369ea621b64a.jpg','NLbKul8xqofv57CA6K6DVRBAOFlQCmU3.jpg','/uploads/files/NLbKul8xqofv57CA6K6DVRBAOFlQCmU3.jpg','files','289942','image','jpeg',NULL,'jpg','','2023-11-11 20:27:37',NULL,NULL),
	(116,1,'hl_a47851358','tmp_82aa0538226642ce6196152b3ffd0fb6.jpg','nWzbfO2ZaWuFjVEPJk3iW9PL1JKOULlh.jpg','/uploads/files/nWzbfO2ZaWuFjVEPJk3iW9PL1JKOULlh.jpg','files','570579','image','jpeg',NULL,'jpg','','2023-11-11 20:28:03',NULL,NULL),
	(117,1,'hl_a47851358','tmp_f6c1b680df85c61821c39cbf5255060b.jpg','9hlh5CRFMrKboxB3eiM8Wl3HskhBhLu0.jpg','/uploads/files/9hlh5CRFMrKboxB3eiM8Wl3HskhBhLu0.jpg','files','174932','image','jpeg',NULL,'jpg','','2023-11-11 20:28:19',NULL,NULL),
	(118,1,'hl_a47851358','tmp_02c1809b6f59731b2e1254f6bda3792d.jpg','scWLYJ1ElfNhMO9Iup5ZnzuANX3THS9l.jpg','/uploads/files/scWLYJ1ElfNhMO9Iup5ZnzuANX3THS9l.jpg','files','352722','image','jpeg',NULL,'jpg','','2023-11-11 20:28:54',NULL,NULL),
	(119,1,'hl_a73199741','tmp_722cba53a27ced811cbac856296baf0513707e63ba549103.jpg','SoaZ2PUii8NGqf4quxEG2ibJUtPqyOLq.jpg','/uploads/files/SoaZ2PUii8NGqf4quxEG2ibJUtPqyOLq.jpg','files','223163','image','jpeg',NULL,'jpg','','2023-11-11 20:30:55',NULL,NULL),
	(120,1,'hl_a22603795','tmp_76ea5365fe23dac913220d05e5d241419ca6fff65745a694.jpg','cLBq9FCSsWr5su4wgXUkUzt67s3pXUpL.jpg','/uploads/files/cLBq9FCSsWr5su4wgXUkUzt67s3pXUpL.jpg','files','51262','image','jpeg',NULL,'jpg','','2023-11-11 20:37:36',NULL,NULL),
	(121,1,'hl_a57190617','tmp_d5524d2f96bb1b9fe92af107626a6b837d1c8eee38ce638a.jpg','sM0ZiaCpfeMOOTqYRzERf0E6qEaWU3Sh.jpg','/uploads/files/sM0ZiaCpfeMOOTqYRzERf0E6qEaWU3Sh.jpg','files','155942','image','jpeg',NULL,'jpg','','2023-11-11 20:38:03',NULL,NULL),
	(122,1,'hl_a57190617','tmp_dc6bb1bc970158972bef085ce1fcaaae99f7266405357489.jpg','i8oNtrwD4r7yeUFaFqSCdFqobxL4yiX7.jpg','/uploads/files/i8oNtrwD4r7yeUFaFqSCdFqobxL4yiX7.jpg','files','167504','image','jpeg',NULL,'jpg','','2023-11-11 20:38:03',NULL,NULL),
	(123,1,'hl_a57190617','tmp_c22f2737651d259a2d64068403421a1278cee9b804e4d26a.jpg','1bW4r40KzU4Klrldn1IsjLG4LUfpjorF.jpg','/uploads/files/1bW4r40KzU4Klrldn1IsjLG4LUfpjorF.jpg','files','506913','image','jpeg',NULL,'jpg','','2023-11-11 20:38:03',NULL,NULL),
	(124,1,'hl_a22603795','tmp_b5c1dcca77c9de0b023903f81fb6948957e72cb69c792378.jpg','gOsesJrNCJba0W0r73hlaTjjpfZQpjjF.jpg','/uploads/files/gOsesJrNCJba0W0r73hlaTjjpfZQpjjF.jpg','files','60845','image','jpeg',NULL,'jpg','','2023-11-11 20:38:06',NULL,NULL),
	(125,1,'hl_a22603795','tmp_27c214271ce894e50804f52e6acd14af2779e5608477bb2f.jpg','kRh5AJhl3cbXQ2QmtbM3u18Cz2LimWE9.jpg','/uploads/files/kRh5AJhl3cbXQ2QmtbM3u18Cz2LimWE9.jpg','files','92344','image','jpeg',NULL,'jpg','','2023-11-11 20:44:06',NULL,NULL),
	(126,1,'hl_a57190617','tmp_914653f9c2cc4ef851ee517bd578c9b7931c26b5d74712e1.jpg','Cl6eIgQxEwlMQzfJx1mbprpgz50TqR76.jpg','/uploads/files/Cl6eIgQxEwlMQzfJx1mbprpgz50TqR76.jpg','files','506913','image','jpeg',NULL,'jpg','','2023-11-11 20:44:25',NULL,NULL),
	(127,1,'hl_a22603795','tmp_df2af5e002e9607198d7af9544d10d818761d2614c31eba2.jpg','gV47bmXD4aIvHc38Wj8iIRezWRmsQyZZ.jpg','/uploads/files/gV47bmXD4aIvHc38Wj8iIRezWRmsQyZZ.jpg','files','54347','image','jpeg',NULL,'jpg','','2023-11-11 20:46:05',NULL,NULL),
	(128,1,'hl_a22603795','tmp_953be5e8b358ac2992b2ffe3b06b4d96a04b3431f9e04c4c.jpg','mUsvQln2Dw2zzpXzMPhKdtdV2vTolwuT.jpg','/uploads/files/mUsvQln2Dw2zzpXzMPhKdtdV2vTolwuT.jpg','files','40105','image','jpeg',NULL,'jpg','','2023-11-11 20:58:51',NULL,NULL),
	(129,1,'hl_a22603795','tmp_6fc508a74bff0ae5ba24e0e1344b09f41b3e2aeba3951a41.jpg','A0kES6g2R4nbUX1OAyFgTKHhRZiwArj3.jpg','/uploads/files/A0kES6g2R4nbUX1OAyFgTKHhRZiwArj3.jpg','files','33026','image','jpeg',NULL,'jpg','','2023-11-11 20:59:38',NULL,NULL),
	(130,1,'hl_a68441203','tmp_8eeaf5420503e9766cfbbb5d8c7b5dca.jpg','azrzPgtq1MlkSC6Nq9zolffJ3G0fFUnz.jpg','/uploads/files/azrzPgtq1MlkSC6Nq9zolffJ3G0fFUnz.jpg','files','3800','image','jpeg',NULL,'jpg','','2023-11-11 21:00:15',NULL,NULL),
	(131,1,'hl_a22603795','tmp_23807a5f86fbda7b2379a811c42dccb145358e00372a6d08.jpg','AhxBkQ219dO4RJCedcN6YKtrK1Pyjg9Q.jpg','/uploads/files/AhxBkQ219dO4RJCedcN6YKtrK1Pyjg9Q.jpg','files','40768','image','jpeg',NULL,'jpg','','2023-11-11 21:00:33',NULL,NULL),
	(132,1,'hl_a68441203','tmp_4620fed17aba2e4a226e553e24168239.jpg','09cKGsqzz1wMjiutCJXK0x664e8bCk4H.jpg','/uploads/files/09cKGsqzz1wMjiutCJXK0x664e8bCk4H.jpg','files','410495','image','jpeg',NULL,'jpg','','2023-11-11 21:00:56',NULL,NULL),
	(133,1,'hl_a22603795','tmp_d82cef53252e0d09f4c1b010bb6c42100327ecfa6856876e.jpg','wMwgN32UpHMtjGuKdRPQFxKZ4jZ4SNZ4.jpg','/uploads/files/wMwgN32UpHMtjGuKdRPQFxKZ4jZ4SNZ4.jpg','files','99548','image','jpeg',NULL,'jpg','','2023-11-11 21:01:15',NULL,NULL),
	(134,1,'hl_a68441203','tmp_e98d6b82ec4a52ebe01d4cca4226f965.jpg','FT9kuAg4LhmPFbLR0j7tPCh3nbscw3qN.jpg','/uploads/files/FT9kuAg4LhmPFbLR0j7tPCh3nbscw3qN.jpg','files','633742','image','jpeg',NULL,'jpg','','2023-11-11 21:02:38',NULL,NULL),
	(135,1,'hl_a79349105','tmp_d882da97c06cdf5b93e20c9c744d731f9483c18402a86610.jpg','DaaoNrDZbhfBnRWDhMCI8Rv6MINYXQeY.jpg','/uploads/files/DaaoNrDZbhfBnRWDhMCI8Rv6MINYXQeY.jpg','files','3091','image','jpeg',NULL,'jpg','','2023-11-11 21:10:05',NULL,NULL),
	(136,1,'hl_a72530367','tmp_30f0bbd8f9d8a69a0773dbdc8712686d.jpg','1bg0qTuxy8I1kbXyF1By96EAfdcOIOWx.jpg','/uploads/files/1bg0qTuxy8I1kbXyF1By96EAfdcOIOWx.jpg','files','4317','image','jpeg',NULL,'jpg','','2023-11-11 21:10:32',NULL,NULL),
	(137,1,'hl_a57190617','tmp_f71296b3c9e248571c92e2698a0f8330b9542e317da7d0f7.jpg','Z7gfp1O1jPgEYoGr11JJxhcxwunGR3G7.jpg','/uploads/files/Z7gfp1O1jPgEYoGr11JJxhcxwunGR3G7.jpg','files','114102','image','jpeg',NULL,'jpg','','2023-11-11 21:13:37',NULL,NULL),
	(138,1,'hl_a58894817','tmp_dd8bee1ec757c3f91b834e15b81234073e8a1bd2e2fdeef9.jpg','KUmQDRmZd0RvkXVM6nNzgPcA5xMHsRdS.jpg','/uploads/files/KUmQDRmZd0RvkXVM6nNzgPcA5xMHsRdS.jpg','files','3383','image','jpeg',NULL,'jpg','','2023-11-11 21:13:40',NULL,NULL),
	(139,1,'hl_a57190617','tmp_0d95b4a6bc13cfd3bb0e501f94ecc424d2e30f421b504246.jpg','be3aqYUupBy79Yy3hmGIpLRcRk8b6mIO.jpg','/uploads/files/be3aqYUupBy79Yy3hmGIpLRcRk8b6mIO.jpg','files','114102','image','jpeg',NULL,'jpg','','2023-11-11 21:15:47',NULL,NULL),
	(140,1,'hl_a59873898','tmp_fdd66aad877566e091d899f2566f453acd855bdbadaabc5f.jpg','upy7WKMODrEpmuJ2RnN0ZY4D6K4qcENo.jpg','/uploads/files/upy7WKMODrEpmuJ2RnN0ZY4D6K4qcENo.jpg','files','3970','image','jpeg',NULL,'jpg','','2023-11-11 21:16:06',NULL,NULL),
	(141,1,'hl_a87121976','tmp_c17f7e091d77795bf1dd30aca6648caede9c71fa071f48c3.jpg','Tmymx9hiqVPejxt5FDcy2GALoEw0jdW3.jpg','/uploads/files/Tmymx9hiqVPejxt5FDcy2GALoEw0jdW3.jpg','files','28105','image','jpeg',NULL,'jpg','','2023-11-11 21:16:36',NULL,NULL),
	(142,1,'hl_a59873898','tmp_abed3afb7515dfb1afefc952aa271da13eafd97b21765e10.jpg','lmuYDBiQ09BJQAnLyQB6WQUmZBeIHvBj.jpg','/uploads/files/lmuYDBiQ09BJQAnLyQB6WQUmZBeIHvBj.jpg','files','3970','image','jpeg',NULL,'jpg','','2023-11-11 21:16:41',NULL,NULL),
	(143,1,'hl_a77205715','tmp_5c216f7c263d9c6a522ec0db92bdd978.jpg','TH0ydLB2h39lyNUZ0TYDowEsIZyr4trN.jpg','/uploads/files/TH0ydLB2h39lyNUZ0TYDowEsIZyr4trN.jpg','files','4015','image','jpeg',NULL,'jpg','','2023-11-11 21:16:47',NULL,NULL),
	(144,1,'hl_a57190617','tmp_e87f73902502277f4f286a684240ea7c79d4e614bc855416.jpg','V6A6xmh6JRv8YvtdFrGHw2cVb9BESquX.jpg','/uploads/files/V6A6xmh6JRv8YvtdFrGHw2cVb9BESquX.jpg','files','114102','image','jpeg',NULL,'jpg','','2023-11-11 21:17:40',NULL,NULL),
	(145,1,'hl_a87121976','tmp_d79e53a25b502d4205dcfedf4521d473862b68988b22e7c4.jpg','PJYWIZKr73OCShoVQ63IwbF9pLS4Rh6O.jpg','/uploads/files/PJYWIZKr73OCShoVQ63IwbF9pLS4Rh6O.jpg','files','66103','image','jpeg',NULL,'jpg','','2023-11-11 21:17:44',NULL,NULL),
	(146,1,'hl_a79349105','tmp_25066f5f711f4cfb67cd2e72f8c4429d30f20f03e44c5754.jpg','rp901zWFTeg6FKoqfZw3g0F41eEpGaOn.jpg','/uploads/files/rp901zWFTeg6FKoqfZw3g0F41eEpGaOn.jpg','files','3091','image','jpeg',NULL,'jpg','','2023-11-11 21:17:58',NULL,NULL),
	(147,1,'hl_a59873898','tmp_087187da38cd6f60f4388c601cd42ca2f648e1d7c2c7c0f0.jpg','oUcF8f7wVTPiYkZJOQikCk5CbiMnWdeW.jpg','/uploads/files/oUcF8f7wVTPiYkZJOQikCk5CbiMnWdeW.jpg','files','3970','image','jpeg',NULL,'jpg','','2023-11-11 21:18:01',NULL,NULL),
	(148,1,'hl_a87121976','tmp_a0b8dee86538cd62b9c890c595255e1e3da3f5836968dbf3.jpg','j6FNWqU19UWBfceu99AjX5bNhDtFqnxf.jpg','/uploads/files/j6FNWqU19UWBfceu99AjX5bNhDtFqnxf.jpg','files','97920','image','jpeg',NULL,'jpg','','2023-11-11 21:18:13',NULL,NULL),
	(149,1,'hl_a57190617','tmp_1fa66a51e554db862c15d2e1437a7291a31dbc9e3b7ae672.jpg','PYwcU0WO171hN1NBzQZfImJTgc7zNVTF.jpg','/uploads/files/PYwcU0WO171hN1NBzQZfImJTgc7zNVTF.jpg','files','114102','image','jpeg',NULL,'jpg','','2023-11-11 21:18:27',NULL,NULL),
	(150,1,'hl_a59873898','tmp_b315a85ff0b0a0b6cd9f43841435a6fd51d5c924110cebc9.jpg','Mvm8RKxnPtZMm4nFuyaNkbYVkGUOvUld.jpg','/uploads/files/Mvm8RKxnPtZMm4nFuyaNkbYVkGUOvUld.jpg','files','3970','image','jpeg',NULL,'jpg','','2023-11-11 21:18:55',NULL,NULL),
	(151,1,'hl_a77205715','tmp_fae54eed31721cd2239d4a04c7099202.jpg','TavJhqB7spIRsUQO4gqjaJjuZtqrpJHD.jpg','/uploads/files/TavJhqB7spIRsUQO4gqjaJjuZtqrpJHD.jpg','files','24305','image','jpeg',NULL,'jpg','','2023-11-11 21:19:41',NULL,NULL),
	(152,1,'hl_a57190617','tmp_07867417f8ddca503a803a3d4ae3d7cdfb3e2343b6a1d6b6.jpg','0qry91X1b6hCbZLKRemKiIZHty8YZqPO.jpg','/uploads/files/0qry91X1b6hCbZLKRemKiIZHty8YZqPO.jpg','files','114102','image','jpeg',NULL,'jpg','','2023-11-11 21:19:41',NULL,NULL),
	(153,1,'hl_a57190617','tmp_0174a9fdaa48e5477f5cecb83385f06c18fe75f38019b719.jpg','nWs1wVGbh1tvE5nsRNVIa5OEmdCcQudJ.jpg','/uploads/files/nWs1wVGbh1tvE5nsRNVIa5OEmdCcQudJ.jpg','files','9367','image','jpeg',NULL,'jpg','','2023-11-11 21:21:17',NULL,NULL),
	(154,1,'hl_a57190617','tmp_11cd4885b54752ac54246fca531f087dd6564ffbb7d743ac.jpg','BQAZNeoVOYD8mhv1IvGs1Zua2I0AfcBs.jpg','/uploads/files/BQAZNeoVOYD8mhv1IvGs1Zua2I0AfcBs.jpg','files','114102','image','jpeg',NULL,'jpg','','2023-11-11 21:22:13',NULL,NULL),
	(155,1,'hl_a16337054','tmp_1c9acd886f515d3cc9a77193eabcdb1f7def96a41d575905.jpg','uQ2OFjF3UAnqjAJtoBXC59lFdYKMcckq.jpg','/uploads/files/uQ2OFjF3UAnqjAJtoBXC59lFdYKMcckq.jpg','files','4054','image','jpeg',NULL,'jpg','','2023-11-11 21:22:29',NULL,NULL),
	(156,1,'hl_a54411643','tmp_55a7f3ae7cb5e4c96eefe2a058ec92049d1bf4745cb14729.jpg','gRFzei6LG4ywemR2fKO6NbGhMeNvoRuW.jpg','/uploads/files/gRFzei6LG4ywemR2fKO6NbGhMeNvoRuW.jpg','files','4170','image','jpeg',NULL,'jpg','','2023-11-11 21:22:31',NULL,NULL),
	(157,1,'hl_a54411643','tmp_96a64178fce9897a8cb682cc4c05b41bb6011f1a0f81378e.jpg','HFMGM89oPAM9VjOg78n2ogyWcdBQYJHq.jpg','/uploads/files/HFMGM89oPAM9VjOg78n2ogyWcdBQYJHq.jpg','files','4442','image','jpeg',NULL,'jpg','','2023-11-11 21:22:51',NULL,NULL),
	(158,1,'hl_a59873898','tmp_ee97dd952840251248d04002f30a0870cebed68676c875f0.jpg','TpDCnuY8Jt7Xy428WhMnmOntOz1KjHtZ.jpg','/uploads/files/TpDCnuY8Jt7Xy428WhMnmOntOz1KjHtZ.jpg','files','86909','image','jpeg',NULL,'jpg','','2023-11-11 21:23:28',NULL,NULL),
	(159,1,'hl_a54411643','tmp_7021f91f570b04b891b5f3df1aa7466cf917d9284fb89b37.jpg','AZEdsoalPblFlDUvOUKqnIZFwUJoJGTK.jpg','/uploads/files/AZEdsoalPblFlDUvOUKqnIZFwUJoJGTK.jpg','files','61848','image','jpeg',NULL,'jpg','','2023-11-11 21:23:47',NULL,NULL),
	(160,1,'hl_a16337054','tmp_f115711bfeb051ac68d732ab48fa4ae487811182a015176a.jpg','TbrWGFCrDZXr6iK2nDtfZoNWKNnzZic7.jpg','/uploads/files/TbrWGFCrDZXr6iK2nDtfZoNWKNnzZic7.jpg','files','40910','image','jpeg',NULL,'jpg','','2023-11-11 21:23:48',NULL,NULL),
	(161,1,'hl_a54411643','tmp_999e005120d1e4c96eb161a1b01bb080474ac4676ecb8a3d.jpg','SaLKNtP3x7rMWoKErylyy5OCYPYfQCNX.jpg','/uploads/files/SaLKNtP3x7rMWoKErylyy5OCYPYfQCNX.jpg','files','61848','image','jpeg',NULL,'jpg','','2023-11-11 21:24:18',NULL,NULL),
	(162,1,'hl_a54411643','tmp_120eade4c5bb8b01d0a4114491e43685f4d6699c2ab749e1.jpg','5I545kwUHcYmU6tIytCSskTeMROlYDbz.jpg','/uploads/files/5I545kwUHcYmU6tIytCSskTeMROlYDbz.jpg','files','65342','image','jpeg',NULL,'jpg','','2023-11-11 21:24:18',NULL,NULL),
	(163,1,'hl_a16337054','tmp_e3b97480049ce4b548e70948238ef9116590f51d9908fec9.jpg','sxzcl02J4jNzOpm2eb7EdG7NYFhFYJaN.jpg','/uploads/files/sxzcl02J4jNzOpm2eb7EdG7NYFhFYJaN.jpg','files','40910','image','jpeg',NULL,'jpg','','2023-11-11 21:24:34',NULL,NULL),
	(164,1,'hl_a96886310','tmp_065e60b4c47cdbe0528baf1f26f6a8e799d7f69e1c50eae6.jpg','6459hjV1WEV4i1dbVQRtgLTqwXOpMOJO.jpg','/uploads/files/6459hjV1WEV4i1dbVQRtgLTqwXOpMOJO.jpg','files','2491','image','jpeg',NULL,'jpg','','2023-11-11 21:25:28',NULL,NULL),
	(165,1,'hl_a04893937','tmp_2716e4215f3f39b0fa695716769722c383c1f6db4e4fee7e.jpg','czCr5DozigYS3wU2M6M0DnNOfEMlK7Ct.jpg','/uploads/files/czCr5DozigYS3wU2M6M0DnNOfEMlK7Ct.jpg','files','5054','image','jpeg',NULL,'jpg','','2023-11-11 21:25:43',NULL,NULL),
	(166,1,'hl_a26608468','tmp_8416451298a2d140b1c0dc8410c1d134.jpg','GTNGBhajrtiLUiBvMzlNFXNp4Oa8ZTX9.jpg','/uploads/files/GTNGBhajrtiLUiBvMzlNFXNp4Oa8ZTX9.jpg','files','3952','image','jpeg',NULL,'jpg','','2023-11-11 21:25:47',NULL,NULL),
	(167,1,'hl_a16337054','tmp_8dd7224f435d44bade968b2395383b2749c6a33a4868a5e8.jpg','Nx9PlnqqbDIKIfXksZkL2Zaspvy8UUoO.jpg','/uploads/files/Nx9PlnqqbDIKIfXksZkL2Zaspvy8UUoO.jpg','files','39992','image','jpeg',NULL,'jpg','','2023-11-11 21:26:11',NULL,NULL),
	(168,1,'hl_a96886310','tmp_a005a2b46400fae5aa765da0a0a296e7b4faefe33299aac9.jpg','mxtdPEeHQV40l5LOD1j4ceEzUkMliaES.jpg','/uploads/files/mxtdPEeHQV40l5LOD1j4ceEzUkMliaES.jpg','files','36779','image','jpeg',NULL,'jpg','','2023-11-11 21:26:13',NULL,NULL),
	(169,1,'hl_a04893937','tmp_ca915d60bf4531df2a82d39c00dd69250ce78aa3d62b5e84.jpg','m9gr3cDcmn2p0EUnOPsejr5lxTw006pz.jpg','/uploads/files/m9gr3cDcmn2p0EUnOPsejr5lxTw006pz.jpg','files','49522','image','jpeg',NULL,'jpg','','2023-11-11 21:26:43',NULL,NULL),
	(170,1,'hl_a96886310','tmp_658d42d203503e1883219aa1bc03a1fe4256443c38ddd2fa.jpg','DUhxxVCM76LsMxjsu7pR9gqY8P4qsePH.jpg','/uploads/files/DUhxxVCM76LsMxjsu7pR9gqY8P4qsePH.jpg','files','28303','image','jpeg',NULL,'jpg','','2023-11-11 21:26:43',NULL,NULL),
	(171,1,'hl_a96886310','tmp_42097f93f4d97942d349ee8da783f0c7553c9e8a2c1317bf.jpg','9VKkIZ7UzLewQNOj24mraRVV7pfLi86l.jpg','/uploads/files/9VKkIZ7UzLewQNOj24mraRVV7pfLi86l.jpg','files','30441','image','jpeg',NULL,'jpg','','2023-11-11 21:26:43',NULL,NULL),
	(172,1,'hl_a16337054','tmp_daaa57605c28e0e4346cdfb272ef82fb5af2c97ddc3c0915.jpg','gj5XP8xUsdtUHCdrNfdlpdk88awMTbfE.jpg','/uploads/files/gj5XP8xUsdtUHCdrNfdlpdk88awMTbfE.jpg','files','39992','image','jpeg',NULL,'jpg','','2023-11-11 21:26:49',NULL,NULL),
	(173,1,'hl_a26608468','tmp_e25f62de0b919e202887e6e603e0f34d.jpg','NncGEIBoYM6Nf26awazXA331n2S8tDBI.jpg','/uploads/files/NncGEIBoYM6Nf26awazXA331n2S8tDBI.jpg','files','401140','image','jpeg',NULL,'jpg','','2023-11-11 21:27:07',NULL,NULL),
	(174,1,'hl_a96886310','tmp_a27eaddab22b8011e5a875113dcf780eb413ef2fb7579977.jpg','ks88nU1NKd0Ca5lEeoDSKdXNsgNoanid.jpg','/uploads/files/ks88nU1NKd0Ca5lEeoDSKdXNsgNoanid.jpg','files','50468','image','jpeg',NULL,'jpg','','2023-11-11 21:27:14',NULL,NULL),
	(175,1,'hl_a96886310','tmp_d995edf672c017917beefeecf38eba294cf0734a54ec00bb.jpg','LeW6Lz8NHrwWe0VWuyBuSjaJUE4WnArG.jpg','/uploads/files/LeW6Lz8NHrwWe0VWuyBuSjaJUE4WnArG.jpg','files','52339','image','jpeg',NULL,'jpg','','2023-11-11 21:27:14',NULL,NULL),
	(176,1,'hl_a80271710','tmp_5a6ed9c0b00aca4096c5c123af56bcb93783ea9ff2a0b0bf.jpg','AwLuhPRPEvkp9CzogcOheOh3mvITaM9z.jpg','/uploads/files/AwLuhPRPEvkp9CzogcOheOh3mvITaM9z.jpg','files','4677','image','jpeg',NULL,'jpg','','2023-11-11 21:27:15',NULL,NULL),
	(177,1,'hl_a57190617','tmp_1f9e4d9a8ad9f2c36015230901fbfde5b1054f02e8563c13.jpg','fHi9TibmmZEa8l3a4r1GioARl1hpCBfn.jpg','/uploads/files/fHi9TibmmZEa8l3a4r1GioARl1hpCBfn.jpg','files','114102','image','jpeg',NULL,'jpg','','2023-11-11 21:27:16',NULL,NULL),
	(178,1,'hl_a45675875','tmp_d9ff578664ca05f5e91625075d35a7ec605599192d1660ff.jpg','gIcu4c1MyPE2RM62IHtPpCLxbx2xexbT.jpg','/uploads/files/gIcu4c1MyPE2RM62IHtPpCLxbx2xexbT.jpg','files','7314','image','jpeg',NULL,'jpg','','2023-11-11 21:27:16',NULL,NULL),
	(179,1,'hl_a80271710','tmp_a13cf303f4a8efb190e6f71bfc967b480ecf77ee063df667.jpg','nG301F9djbd8j7hTJnYG0j7E23rYmZqa.jpg','/uploads/files/nG301F9djbd8j7hTJnYG0j7E23rYmZqa.jpg','files','61060','image','jpeg',NULL,'jpg','','2023-11-11 21:27:59',NULL,NULL),
	(180,1,'hl_a16337054','tmp_fe62c81c33ead0fa28e39183adb85d953a4bb15c211853d9.jpg','LXXFebf0bRn0mveGR9F8EsVniXKNrTwE.jpg','/uploads/files/LXXFebf0bRn0mveGR9F8EsVniXKNrTwE.jpg','files','39992','image','jpeg',NULL,'jpg','','2023-11-11 21:28:04',NULL,NULL),
	(181,1,'hl_a54411643','tmp_cc2ea9e87997bb04aa7fc897d9713385e31f8a69f46add37.jpg','GJbgi0g0812b4iozMF2mIKUo3kukLAx1.jpg','/uploads/files/GJbgi0g0812b4iozMF2mIKUo3kukLAx1.jpg','files','73474','image','jpeg',NULL,'jpg','','2023-11-11 21:28:33',NULL,NULL),
	(182,1,'hl_a54411643','tmp_8889831c9e08299db9433e66f7180bf3c4bd858c345a4a16.jpg','kv0M92GK7mRcjH2RKCKcNMQOncUQgWsP.jpg','/uploads/files/kv0M92GK7mRcjH2RKCKcNMQOncUQgWsP.jpg','files','86991','image','jpeg',NULL,'jpg','','2023-11-11 21:29:02',NULL,NULL),
	(183,1,'hl_a16337054','tmp_228e2b9b1e322cc7a6539b09847b0fdcf803b579ef81e4eb.jpg','fegLNgiW7aPTXbn5nHH5bQgYJGd3FItF.jpg','/uploads/files/fegLNgiW7aPTXbn5nHH5bQgYJGd3FItF.jpg','files','21455','image','jpeg',NULL,'jpg','','2023-11-11 21:30:51',NULL,NULL),
	(184,1,'hl_a79349105','tmp_8121559217013eae6b7340fd0147b4d2fcfca8e19fdc4455.jpg','zMa9vPy0vvA3VqegZsSB5G9AXnKMNPux.jpg','/uploads/files/zMa9vPy0vvA3VqegZsSB5G9AXnKMNPux.jpg','files','1272113','image','jpeg',NULL,'jpg','','2023-11-11 21:31:01',NULL,NULL),
	(185,1,'hl_a57190617','tmp_3c161bba87c20c154345b571f1409e1d1e785f01bb2cf780.jpg','tV4qnMYB9NAHJFgq4KxCJNBo0Fkp3gYr.jpg','/uploads/files/tV4qnMYB9NAHJFgq4KxCJNBo0Fkp3gYr.jpg','files','114102','image','jpeg',NULL,'jpg','','2023-11-11 21:31:56',NULL,NULL),
	(186,1,'hl_a16337054','tmp_5bf2da3c354bbfc21fd48fb011682706406abce93a510580.jpg','Vm9Imvj5VdDWWXaHPjatUraLPkZy87QX.jpg','/uploads/files/Vm9Imvj5VdDWWXaHPjatUraLPkZy87QX.jpg','files','42225','image','jpeg',NULL,'jpg','','2023-11-11 21:32:15',NULL,NULL),
	(187,1,'hl_a54411643','tmp_b033b9d76e1bf49f32d94fbd8251c0aacfd1b5bfd48f2f8a.jpg','KeWApaANmQYjA9rEzsVknvZUCuwrhayy.jpg','/uploads/files/KeWApaANmQYjA9rEzsVknvZUCuwrhayy.jpg','files','55139','image','jpeg',NULL,'jpg','','2023-11-11 21:33:39',NULL,NULL),
	(188,1,'hl_a54411643','tmp_82135379e0f618362b6cd0df25dc0f0641d7f46dbab8868a.jpg','HyQT8RjMF27Tc4bvAL6F8rQSCkENEI6H.jpg','/uploads/files/HyQT8RjMF27Tc4bvAL6F8rQSCkENEI6H.jpg','files','30440','image','jpeg',NULL,'jpg','','2023-11-11 21:33:58',NULL,NULL),
	(189,1,'hl_a96886310','tmp_502743e2effac7e18b0287360276821410cf6a99443ff6c0.jpg','msPRpMJNWwQXHV8QvrEvL2E00GAvpMe9.jpg','/uploads/files/msPRpMJNWwQXHV8QvrEvL2E00GAvpMe9.jpg','files','52287','image','jpeg',NULL,'jpg','','2023-11-11 21:34:26',NULL,NULL),
	(190,1,'hl_a54411643','tmp_9bcdb759b30da56bd87d2ff53508e15227bf4ec6e502e76d.jpg','s2UU9JoVnGxDwnoJanVzaKo3jkYuZemy.jpg','/uploads/files/s2UU9JoVnGxDwnoJanVzaKo3jkYuZemy.jpg','files','42225','image','jpeg',NULL,'jpg','','2023-11-11 21:34:32',NULL,NULL),
	(191,1,'hl_a16337054','tmp_2cb104480a11e0067a5dd3cb7846ba0e0139cb0e5dee44dc.jpg','Y3BDWEIbZkf5XfwjoFn1pnDbDfGCAilq.jpg','/uploads/files/Y3BDWEIbZkf5XfwjoFn1pnDbDfGCAilq.jpg','files','32671','image','jpeg',NULL,'jpg','','2023-11-11 21:34:44',NULL,NULL),
	(192,1,'hl_a96886310','tmp_4ab23913ebc75dc9789a8876847369f3a345d06583d0d133.jpg','28FEC5uDtZ3TJXz9uykBoeztY2wOesAN.jpg','/uploads/files/28FEC5uDtZ3TJXz9uykBoeztY2wOesAN.jpg','files','53614','image','jpeg',NULL,'jpg','','2023-11-11 21:34:51',NULL,NULL),
	(193,1,'hl_a96886310','tmp_12e2762cbab71364f68ee153a309637f8609d20e9e3059cc.jpg','8QGyB0aRrJlvvpJmt942SXhzzL3eICLq.jpg','/uploads/files/8QGyB0aRrJlvvpJmt942SXhzzL3eICLq.jpg','files','60330','image','jpeg',NULL,'jpg','','2023-11-11 21:35:15',NULL,NULL),
	(194,1,'hl_a16337054','tmp_6506070cea83ce1a9f75f2941c8c5dce830f02750334bea1.jpg','289qwzk6c5GbRR8uVKIez1KNNkHS2Xzb.jpg','/uploads/files/289qwzk6c5GbRR8uVKIez1KNNkHS2Xzb.jpg','files','57149','image','jpeg',NULL,'jpg','','2023-11-11 21:35:18',NULL,NULL),
	(195,1,'hl_a45675875','tmp_e93fee374b46ecea444f3ec238dfe4f3b5eabae2ed276345.jpg','dR54IdRuTMCJMyRX8GgeihtZ1bs21z4d.jpg','/uploads/files/dR54IdRuTMCJMyRX8GgeihtZ1bs21z4d.jpg','files','41572','image','jpeg',NULL,'jpg','','2023-11-11 21:35:33',NULL,NULL),
	(196,1,'hl_a45675875','tmp_b22239b6ea224a66f639baf7de5f08693e7948bea5434b4e.jpg','SR5I21iw6gjHo8RCzuqRpMRcDMi2iJNh.jpg','/uploads/files/SR5I21iw6gjHo8RCzuqRpMRcDMi2iJNh.jpg','files','91350','image','jpeg',NULL,'jpg','','2023-11-11 21:35:33',NULL,NULL),
	(197,1,'hl_a45675875','tmp_9cdeb9490fcc7e887207723eb7e14714baeccb1eeaa22452.jpg','SgjTttr4gZYokwTAuGgJnQ5oow4um5PR.jpg','/uploads/files/SgjTttr4gZYokwTAuGgJnQ5oow4um5PR.jpg','files','118206','image','jpeg',NULL,'jpg','','2023-11-11 21:35:33',NULL,NULL),
	(198,1,'hl_a45675875','tmp_bfa4d7360b86f7690c581e2121628b3876cfd43f0795c8e4.jpg','35IwmC0TgvtIFZVoTjKqQLsny2bInk5e.jpg','/uploads/files/35IwmC0TgvtIFZVoTjKqQLsny2bInk5e.jpg','files','71933','image','jpeg',NULL,'jpg','','2023-11-11 21:35:33',NULL,NULL),
	(199,1,'hl_a54411643','tmp_ba42e446612ad359397dbc3ba13b89953d99f7cec3a0023e.jpg','42LJf1ZEQrnriWDufZu3Hk792CNcFlXY.jpg','/uploads/files/42LJf1ZEQrnriWDufZu3Hk792CNcFlXY.jpg','files','51615','image','jpeg',NULL,'jpg','','2023-11-11 21:36:20',NULL,NULL),
	(200,1,'hl_a57190617','tmp_adef032a6803adbe96bd68d5a816e307ef5e40159cecf398.jpg','a9p0DlgsOPG0DN1T5pKuvde6BOm6x2JT.jpg','/uploads/files/a9p0DlgsOPG0DN1T5pKuvde6BOm6x2JT.jpg','files','114102','image','jpeg',NULL,'jpg','','2023-11-11 21:38:16',NULL,NULL),
	(201,1,'hl_a54411643','tmp_464409e9ceffece3b6dc2d760dd8d5966dd268c0ba355860.jpg','pfplAjC06lA4MIGbt9l1g1xdnCxG5VG0.jpg','/uploads/files/pfplAjC06lA4MIGbt9l1g1xdnCxG5VG0.jpg','files','30858','image','jpeg',NULL,'jpg','','2023-11-11 21:38:25',NULL,NULL),
	(202,1,'hl_a96886310','tmp_217dcaf860e6f14c1704588eaec2795f8360a76b9a204dea.jpg','rZZ1TSZ6logefjilW5d0hOKT2vtGUN8l.jpg','/uploads/files/rZZ1TSZ6logefjilW5d0hOKT2vtGUN8l.jpg','files','156182','image','jpeg',NULL,'jpg','','2023-11-11 21:38:42',NULL,NULL),
	(203,1,'hl_a54411643','tmp_5c308d346f56d657b2bcf87f5110b875c6b9b13b5762c2a2.jpg','COgJUnfvv0siIXupcdiQBQ1oYNnjHoF7.jpg','/uploads/files/COgJUnfvv0siIXupcdiQBQ1oYNnjHoF7.jpg','files','39121','image','jpeg',NULL,'jpg','','2023-11-11 21:38:55',NULL,NULL),
	(204,1,'hl_a16337054','tmp_fe3311c3c89d47c611e39b11e7e4dd7f602dd1bdb740ec60.jpg','IWGujXSMawSHw5G75R4WpSmjVSeZAZP0.jpg','/uploads/files/IWGujXSMawSHw5G75R4WpSmjVSeZAZP0.jpg','files','247942','image','jpeg',NULL,'jpg','','2023-11-11 21:38:55',NULL,NULL),
	(205,1,'hl_a96886310','tmp_e79eac840441efcdff5a989e04a059cc62647b017c2e0b81.jpg','I1nzGcgS2NP3nnrE32r0VCHDK4NaRAw1.jpg','/uploads/files/I1nzGcgS2NP3nnrE32r0VCHDK4NaRAw1.jpg','files','156182','image','jpeg',NULL,'jpg','','2023-11-11 21:39:29',NULL,NULL),
	(206,1,'hl_a96886310','tmp_79c7277fc92d449a9960dcdad0aaf67100c9200923ec2304.jpg','CbdOTF87TfjHJFWaeyGBPMJS4OGVLLsc.jpg','/uploads/files/CbdOTF87TfjHJFWaeyGBPMJS4OGVLLsc.jpg','files','156182','image','jpeg',NULL,'jpg','','2023-11-11 21:40:12',NULL,NULL),
	(207,1,'hl_a54411643','tmp_efb0f4aacd7a0dd2b1997cf6d4d3ea96d4beb4ec0ec62734.jpg','SzOFc1hRThb9oZvqwvGTVXhKjcvQgQmd.jpg','/uploads/files/SzOFc1hRThb9oZvqwvGTVXhKjcvQgQmd.jpg','files','50827','image','jpeg',NULL,'jpg','','2023-11-11 21:40:19',NULL,NULL),
	(208,1,'hl_a16337054','tmp_55787b3d667396daab0f8e3a9cfc5b49d0a144d6ca2d8037.jpg','z21D1fSwDoUVsWupV1BKlDtKoa4fK0Lm.jpg','/uploads/files/z21D1fSwDoUVsWupV1BKlDtKoa4fK0Lm.jpg','files','43968','image','jpeg',NULL,'jpg','','2023-11-11 21:41:27',NULL,NULL),
	(209,1,'hl_a54411643','tmp_b24d2313beb49178b40d0d5638ea66dba03878d3f9ef5a9a.jpg','OF2xlIm1XKXEpy05t8azYCZN5pvqBkai.jpg','/uploads/files/OF2xlIm1XKXEpy05t8azYCZN5pvqBkai.jpg','files','53067','image','jpeg',NULL,'jpg','','2023-11-11 21:43:27',NULL,NULL),
	(210,1,'hl_a16337054','tmp_3a512b24e3e853855f08d8bb145cf314e18a3ba30f712c36.jpg','H4LuO7dtD2wOPukZNwZJ1eJR30U27nis.jpg','/uploads/files/H4LuO7dtD2wOPukZNwZJ1eJR30U27nis.jpg','files','24685','image','jpeg',NULL,'jpg','','2023-11-11 21:43:57',NULL,NULL),
	(211,1,'hl_a16337054','tmp_2c39b98631f8d4898ef474fb504b290f93ef15e32f7971da.jpg','pzflVDTZFRucBZSG5PbJ9Kp1uBIBLSDh.jpg','/uploads/files/pzflVDTZFRucBZSG5PbJ9Kp1uBIBLSDh.jpg','files','30780','image','jpeg',NULL,'jpg','','2023-11-11 21:45:15',NULL,NULL),
	(212,1,'hl_a54411643','tmp_eb2b4f1c31d5ea566f6568b6e222ce8964d07bc0a2b7e23b.jpg','VEUU5nbK4IeEoQwDTpvntrxFpxdBAndg.jpg','/uploads/files/VEUU5nbK4IeEoQwDTpvntrxFpxdBAndg.jpg','files','31535','image','jpeg',NULL,'jpg','','2023-11-11 21:45:37',NULL,NULL),
	(213,1,'hl_a54411643','tmp_d269074641f41575288f0c8d032f7d690d5d630f2225d4db.jpg','CJDxv6MPzJc8ihzAKopkT5dy9h4lg1vX.jpg','/uploads/files/CJDxv6MPzJc8ihzAKopkT5dy9h4lg1vX.jpg','files','70608','image','jpeg',NULL,'jpg','','2023-11-11 21:46:14',NULL,NULL),
	(214,1,'hl_a54411643','tmp_c91775568bbe47897cb15b41ee23036f87fa6ecb20a821e2.jpg','Ld78fUGVlNVIv3YwN4A6bUo78oWUShRq.jpg','/uploads/files/Ld78fUGVlNVIv3YwN4A6bUo78oWUShRq.jpg','files','132278','image','jpeg',NULL,'jpg','','2023-11-11 21:47:41',NULL,NULL),
	(215,1,'hl_a54411643','tmp_20365d6ef8754509fd940f9c21b6e941f457e3dce5241e12.jpg','1XIwVMwsm9enlsI0SItYdkmzCTb0l6Ye.jpg','/uploads/files/1XIwVMwsm9enlsI0SItYdkmzCTb0l6Ye.jpg','files','59702','image','jpeg',NULL,'jpg','','2023-11-11 21:49:11',NULL,NULL),
	(216,1,'hl_a16337054','tmp_2e92b03ea7c6eea846363145a11dc49123dea3e6dded272d.jpg','r3fhQkmOPLuO00ieMS6eAqdNNsRAwjkg.jpg','/uploads/files/r3fhQkmOPLuO00ieMS6eAqdNNsRAwjkg.jpg','files','77459','image','jpeg',NULL,'jpg','','2023-11-11 21:49:56',NULL,NULL),
	(217,1,'hl_a54411643','tmp_39fdc8c3d8c055c05501ca54c0857091046a81095720abf2.jpg','aHfRE4B3aHx7CDNkAjIyNa1rO8yRC6UE.jpg','/uploads/files/aHfRE4B3aHx7CDNkAjIyNa1rO8yRC6UE.jpg','files','71705','image','jpeg',NULL,'jpg','','2023-11-11 21:50:12',NULL,NULL),
	(218,1,'hl_a16337054','tmp_c80bad9f0e6037b2f562c45fa2025c0b4dd8f92d5b59ea8a.jpg','ihGqJDI3PFMjVGxjcwkuRz2GVqVUEe7l.jpg','/uploads/files/ihGqJDI3PFMjVGxjcwkuRz2GVqVUEe7l.jpg','files','55323','image','jpeg',NULL,'jpg','','2023-11-11 21:50:44',NULL,NULL),
	(219,1,'hl_a04893937','tmp_b232f4c35d3688fd97193f59777efc4a6ac53999a3c6711d.jpg','XacGmhsibZnMS2P28IZQpLpos9XzrOYj.jpg','/uploads/files/XacGmhsibZnMS2P28IZQpLpos9XzrOYj.jpg','files','51116','image','jpeg',NULL,'jpg','','2023-11-11 21:50:53',NULL,NULL),
	(220,1,'hl_a21409999','tmp_b0a510b62c902a8ad2252226a0566126e9ca8b2d0634aecf.jpg','KsYWLxVPZN1RAMkBh5JYSpCGFgGRNzRB.jpg','/uploads/files/KsYWLxVPZN1RAMkBh5JYSpCGFgGRNzRB.jpg','files','2976','image','jpeg',NULL,'jpg','','2023-11-11 21:58:48',NULL,NULL),
	(221,1,'hl_a21409999','tmp_1feab14dbf1ab596edc33230e3ed0cd93720df8d34690824.jpg','BIH2Vr6n0CBmQbGXeDRSVXguSsImOted.jpg','/uploads/files/BIH2Vr6n0CBmQbGXeDRSVXguSsImOted.jpg','files','42617','image','jpeg',NULL,'jpg','','2023-11-11 21:59:40',NULL,NULL),
	(222,1,'hl_a54411643','tmp_32296b4e1918cdf2edb07a00de0545d5e1a8161e59fe9317.jpg','9pAS0fk02wgKyGSXSUBZc2BPhJV7aG8G.jpg','/uploads/files/9pAS0fk02wgKyGSXSUBZc2BPhJV7aG8G.jpg','files','81479','image','jpeg',NULL,'jpg','','2023-11-11 22:00:34',NULL,NULL),
	(223,1,'hl_a54411643','tmp_72b7b0223e213597d71b76ce1d59938480ef66abb19b55c3.jpg','Uh1nPYgHsRLcqf4zqCipsTIJvWkBApPS.jpg','/uploads/files/Uh1nPYgHsRLcqf4zqCipsTIJvWkBApPS.jpg','files','38084','image','jpeg',NULL,'jpg','','2023-11-11 22:02:04',NULL,NULL),
	(224,1,'hl_a54411643','tmp_5707823693cea3577e5aea16747a7a683b6a75a361e04f1d.jpg','mLVzn6QnXR288MwRFt54RdxQ0fguiIAC.jpg','/uploads/files/mLVzn6QnXR288MwRFt54RdxQ0fguiIAC.jpg','files','39121','image','jpeg',NULL,'jpg','','2023-11-11 22:02:15',NULL,NULL),
	(225,1,'hl_a54411643','tmp_8ffe75f90aed007834e7597d67191e70239cd3ac92e6f915.jpg','GTqQLClpn2zitWxCCMX0Fpqeu5SjBbq3.jpg','/uploads/files/GTqQLClpn2zitWxCCMX0Fpqeu5SjBbq3.jpg','files','42225','image','jpeg',NULL,'jpg','','2023-11-11 22:02:28',NULL,NULL),
	(226,1,'hl_a04893937','tmp_eb6d8a9ca913321b69be7cf3a49aa8a114187727b87f3148.jpg','cSncFm1EdRF8N1FXDrEp0PKDHMPdtZIE.jpg','/uploads/files/cSncFm1EdRF8N1FXDrEp0PKDHMPdtZIE.jpg','files','52177','image','jpeg',NULL,'jpg','','2023-11-11 22:03:01',NULL,NULL),
	(227,1,'hl_a16337054','tmp_ff8dc689d28588daef2da28f83fe55dc67cf5cda20ba5c24.jpg','BzqXzGPE3nNXLJuSHdaedCXhwBd9Bdgm.jpg','/uploads/files/BzqXzGPE3nNXLJuSHdaedCXhwBd9Bdgm.jpg','files','39992','image','jpeg',NULL,'jpg','','2023-11-11 22:04:12',NULL,NULL),
	(228,1,'hl_a16337054','tmp_23b2be74734bd49d1a5f6fa10173daea38034cfb7f8e9634.jpg','412rPDTgu2LMOGTlYazUpJEriim8Bf9U.jpg','/uploads/files/412rPDTgu2LMOGTlYazUpJEriim8Bf9U.jpg','files','40910','image','jpeg',NULL,'jpg','','2023-11-11 22:04:59',NULL,NULL),
	(229,1,'hl_a16337054','tmp_3bf3b31448096157a656b794fb2f104ac6a06df569eaf5fa.jpg','t01r1nABaLZR2l0uRrucvX5tHU4sjyLT.jpg','/uploads/files/t01r1nABaLZR2l0uRrucvX5tHU4sjyLT.jpg','files','44138','image','jpeg',NULL,'jpg','','2023-11-11 22:06:03',NULL,NULL),
	(230,1,'hl_a16337054','tmp_8a228fb9f9341742487fbb767d3224a6c782e185c9c66c9e.jpg','MD4a18DrQfumFydLQNBNSCKznmU3jjY2.jpg','/uploads/files/MD4a18DrQfumFydLQNBNSCKznmU3jjY2.jpg','files','55323','image','jpeg',NULL,'jpg','','2023-11-11 22:08:34',NULL,NULL),
	(231,1,'hl_a04144909','tmp_cfa0ca32c6f9a8ca8daac628c89802332271899abca1a718.jpg','cBsMiGy74ZynnO1Nvfy6gkZxgiWOATKi.jpg','/uploads/files/cBsMiGy74ZynnO1Nvfy6gkZxgiWOATKi.jpg','files','4588','image','jpeg',NULL,'jpg','','2023-11-11 22:09:26',NULL,NULL),
	(232,1,'hl_a16337054','tmp_76c903a3d98f1f65e4420260f8ef1931892183e7ef3892d3.jpg','yqaGhjVFNjCs5VceqdAVtu5WmZe7Vbtc.jpg','/uploads/files/yqaGhjVFNjCs5VceqdAVtu5WmZe7Vbtc.jpg','files','30780','image','jpeg',NULL,'jpg','','2023-11-11 22:10:13',NULL,NULL),
	(233,1,'hl_a04144909','tmp_d127000604ff7a9499c85b1591a39a75fb5633c0a43bff19.jpg','0lLQms0ytyK06Eov1gZaZ3TVcWl5i6gP.jpg','/uploads/files/0lLQms0ytyK06Eov1gZaZ3TVcWl5i6gP.jpg','files','2764722','image','jpeg',NULL,'jpg','','2023-11-11 22:10:18',NULL,NULL),
	(234,1,'hl_a16337054','tmp_b84eadfa9ceb3920790fd2b646f09c42bf02699113b106c0.jpg','JI4m3lj5joJpWh8t0M0ScapHFxPxZscN.jpg','/uploads/files/JI4m3lj5joJpWh8t0M0ScapHFxPxZscN.jpg','files','43968','image','jpeg',NULL,'jpg','','2023-11-11 22:11:26',NULL,NULL),
	(235,1,'hl_a16337054','tmp_d4449f0fd5a526f8bbd60498b618f0bb2636e650897f4699.jpg','Y3ungdjsa7aqOe5PLdiuLrqHtBEByUZR.jpg','/uploads/files/Y3ungdjsa7aqOe5PLdiuLrqHtBEByUZR.jpg','files','57149','image','jpeg',NULL,'jpg','','2023-11-11 22:12:04',NULL,NULL),
	(236,1,'hl_a16337054','tmp_bdfb46378c0c6e6b539f95d349e0b1820343d494b6a7d621.jpg','mStZi9hHbFeGyqxvHOdvdgj3hEdGofMz.jpg','/uploads/files/mStZi9hHbFeGyqxvHOdvdgj3hEdGofMz.jpg','files','42225','image','jpeg',NULL,'jpg','','2023-11-11 22:13:05',NULL,NULL),
	(237,1,'hl_a04144909','tmp_62eebe7758255a4056c063961ecda3b2f41b4ae9132221e1.jpg','XiStMjsu2L2jOUbttTrVcVJov3h3HuM9.jpg','/uploads/files/XiStMjsu2L2jOUbttTrVcVJov3h3HuM9.jpg','files','2410745','image','jpeg',NULL,'jpg','','2023-11-11 22:15:57',NULL,NULL),
	(238,1,'hl_a21409999','tmp_f3c428adc82354793fdeae4fbf3c77f116830d7c06bacbbd.jpg','yf6449n0cUbuEEsHsxDXMnB3gqSPZqzX.jpg','/uploads/files/yf6449n0cUbuEEsHsxDXMnB3gqSPZqzX.jpg','files','63713','image','jpeg',NULL,'jpg','','2023-11-11 22:16:16',NULL,NULL),
	(239,1,'hl_a54411643','tmp_e5179a0f3f6c7ff4aed61f959edae75d0533bf3726637e36.jpg','FT48h1spOeRkgksxzQwCyVm35WGQbq7y.jpg','/uploads/files/FT48h1spOeRkgksxzQwCyVm35WGQbq7y.jpg','files','32700','image','jpeg',NULL,'jpg','','2023-11-11 22:24:57',NULL,NULL),
	(240,1,'hl_a54411643','tmp_9fc814b2d4bca8d1433c0403d1cce5ceefe2a48bb70a22b8.jpg','crAxaxjBvxi7NENbcjA8TbSW5WPUZF3K.jpg','/uploads/files/crAxaxjBvxi7NENbcjA8TbSW5WPUZF3K.jpg','files','95306','image','jpeg',NULL,'jpg','','2023-11-11 22:24:57',NULL,NULL),
	(241,1,'hl_a54411643','tmp_bf296f074608386a2b665e00cc4d9aef85989552604f4b10.jpg','gp86tL2ILKqk1E9VODy62Se2Sx63GC7R.jpg','/uploads/files/gp86tL2ILKqk1E9VODy62Se2Sx63GC7R.jpg','files','41040','image','jpeg',NULL,'jpg','','2023-11-11 22:27:56',NULL,NULL),
	(242,1,'hl_a54411643','tmp_40dbd927fae8987cf7d6ae387e82fbc5947d5bc4184c8bb7.jpg','8USbt6vVLVILquYsgF69F7SCZwDygJLK.jpg','/uploads/files/8USbt6vVLVILquYsgF69F7SCZwDygJLK.jpg','files','62582','image','jpeg',NULL,'jpg','','2023-11-11 22:27:56',NULL,NULL),
	(243,1,'hl_a04144909','tmp_a2ef0e0dcb5acd9bde615d34b88a533884083eca5066a05a.jpg','ftWKVGjQpigTYcbEEZhtqs7C4rffY4Lv.jpg','/uploads/files/ftWKVGjQpigTYcbEEZhtqs7C4rffY4Lv.jpg','files','3355436','image','jpeg',NULL,'jpg','','2023-11-11 22:29:00',NULL,NULL),
	(244,1,'hl_a04144909','tmp_ac2344d82aefcc39e0ff4358eb101463d59c18a0dcfcc0e8.jpg','DA5Eoh2lthjhGUrFxKAYwe6F8oaRYEpy.jpg','/uploads/files/DA5Eoh2lthjhGUrFxKAYwe6F8oaRYEpy.jpg','files','2513012','image','jpeg',NULL,'jpg','','2023-11-11 22:29:07',NULL,NULL),
	(245,1,'hl_a04144909','tmp_ee0b6ea44a8075dd382c72b8a27e19b8c49b4a9e6280355b.jpg','a1TbwYsuXA9MC4Kya5e7JOgr52N7ijR7.jpg','/uploads/files/a1TbwYsuXA9MC4Kya5e7JOgr52N7ijR7.jpg','files','3725774','image','jpeg',NULL,'jpg','','2023-11-11 22:29:13',NULL,NULL),
	(246,1,'hl_a04144909','tmp_9056d818fa366dd84addcd416ff3ef2cfc1ef6f378524e63.jpg','T092irHo2hJQYlBqbvW5HByrAUrrCEWa.jpg','/uploads/files/T092irHo2hJQYlBqbvW5HByrAUrrCEWa.jpg','files','3012923','image','jpeg',NULL,'jpg','','2023-11-11 22:29:13',NULL,NULL),
	(247,1,'hl_a79349105','tmp_4e530b0f1bef6919b2136fe1a1f400560db6cd76ffe379ae.jpg','m8A5kxZbtOKc4gArWS6QvQVAxUjtW8RK.jpg','/uploads/files/m8A5kxZbtOKc4gArWS6QvQVAxUjtW8RK.jpg','files','347498','image','jpeg',NULL,'jpg','','2023-11-11 22:29:52',NULL,NULL),
	(248,1,'hl_a79349105','tmp_b2c433c47be69ed33b035d164ae37e8dd39f8ed4ba344123.jpg','8NgFIZIu9odkffA3ClQEM5jRWEDFHRsT.jpg','/uploads/files/8NgFIZIu9odkffA3ClQEM5jRWEDFHRsT.jpg','files','1707535','image','jpeg',NULL,'jpg','','2023-11-11 22:29:56',NULL,NULL),
	(249,1,'hl_a79349105','tmp_e7c53bf1841791076f077f6a6a1e5dac1ff4de2490db6e93.jpg','mqLGQr4PfqzYGkBpUQaw36DYHkvNHP1m.jpg','/uploads/files/mqLGQr4PfqzYGkBpUQaw36DYHkvNHP1m.jpg','files','2197481','image','jpeg',NULL,'jpg','','2023-11-11 22:30:00',NULL,NULL),
	(250,1,'hl_a79349105','tmp_0cf326ce6cb02358b84987f80e792a3e4e171a975bdd2936.jpg','8H3R1X61cJMrL8FiaqG9uIO9gbgoTfHl.jpg','/uploads/files/8H3R1X61cJMrL8FiaqG9uIO9gbgoTfHl.jpg','files','2470864','image','jpeg',NULL,'jpg','','2023-11-11 22:30:01',NULL,NULL),
	(251,1,'hl_a79349105','tmp_5954c3970a7e9f956ef2b6447b30e47b412b4d8957256bca.jpg','ZTBFG2n1kagCWOlutWnZqxHIs4cuzOa5.jpg','/uploads/files/ZTBFG2n1kagCWOlutWnZqxHIs4cuzOa5.jpg','files','2198686','image','jpeg',NULL,'jpg','','2023-11-11 22:30:01',NULL,NULL),
	(252,1,'hl_a54411643','tmp_53a99c1856c8aba1589321847ac55acb951bc5ef010eea3b.jpg','GkNTjGnu74oW61dEJz0r66nVMwLXhg7j.jpg','/uploads/files/GkNTjGnu74oW61dEJz0r66nVMwLXhg7j.jpg','files','34279','image','jpeg',NULL,'jpg','','2023-11-11 22:30:40',NULL,NULL),
	(253,1,'hl_a54411643','tmp_b954d735100a7fc4e437a66ea64e49f598c920bda0b0d02b.jpg','SxmAo7oqZvMCMppteQSBlPK0t4xUT53B.jpg','/uploads/files/SxmAo7oqZvMCMppteQSBlPK0t4xUT53B.jpg','files','51571','image','jpeg',NULL,'jpg','','2023-11-11 22:30:40',NULL,NULL),
	(254,1,'hl_a68441203','tmp_8597d65e50b148069aae4a8d4fbae1a2.jpg','bCSDkf7H9pREsV5qnBUMStyQgOP2kAsB.jpg','/uploads/files/bCSDkf7H9pREsV5qnBUMStyQgOP2kAsB.jpg','files','332171','image','jpeg',NULL,'jpg','','2023-11-11 22:30:50',NULL,NULL),
	(255,1,'hl_a68441203','tmp_e2fc0e52c4b045b8489517254b01458a.jpg','T75XZREcUGBdTu7ENnMDMXMLjI8tcdKw.jpg','/uploads/files/T75XZREcUGBdTu7ENnMDMXMLjI8tcdKw.jpg','files','446922','image','jpeg',NULL,'jpg','','2023-11-11 22:30:50',NULL,NULL),
	(256,1,'hl_a68441203','tmp_55c081e333457e344db3f3730096bcf2.jpg','1nQDg3Q1K64YiniHks7y7i5wfmd5cst2.jpg','/uploads/files/1nQDg3Q1K64YiniHks7y7i5wfmd5cst2.jpg','files','529165','image','jpeg',NULL,'jpg','','2023-11-11 22:30:50',NULL,NULL),
	(257,1,'hl_a68441203','tmp_26add44d64205018618169730fae9edc.jpg','XJA07qix7199VDsjaJdoGrGWa2M0tveH.jpg','/uploads/files/XJA07qix7199VDsjaJdoGrGWa2M0tveH.jpg','files','633742','image','jpeg',NULL,'jpg','','2023-11-11 22:30:52',NULL,NULL),
	(258,1,'hl_a68441203','tmp_8d012e91357091f155120bac4f6218ec.jpg','8PgEtojU2ospiErjZpSkSfExm8Kk86gp.jpg','/uploads/files/8PgEtojU2ospiErjZpSkSfExm8Kk86gp.jpg','files','1020355','image','jpeg',NULL,'jpg','','2023-11-11 22:30:53',NULL,NULL),
	(259,1,'hl_a68441203','tmp_155416224fbca348eb6f82e4367148c2.jpg','9bilSd6u215G0XuHBQYcT79whTlfTymX.jpg','/uploads/files/9bilSd6u215G0XuHBQYcT79whTlfTymX.jpg','files','1061413','image','jpeg',NULL,'jpg','','2023-11-11 22:30:54',NULL,NULL),
	(260,1,'hl_a21409999','tmp_b2de2d10f6a86605aa485fd10e3a28be6e4547dab994b917.jpg','KwXwWXZoRLHaDpI6wLCgdSIp8U4wo6Sx.jpg','/uploads/files/KwXwWXZoRLHaDpI6wLCgdSIp8U4wo6Sx.jpg','files','40882','image','jpeg',NULL,'jpg','','2023-11-11 22:31:08',NULL,NULL),
	(261,1,'hl_a21409999','tmp_93b7d27342998479d837843de61b3c2fb6fa305273d8a2b0.jpg','qaS5BscQpTu61ezB2U1aOvFtdRXRLyQG.jpg','/uploads/files/qaS5BscQpTu61ezB2U1aOvFtdRXRLyQG.jpg','files','48431','image','jpeg',NULL,'jpg','','2023-11-11 22:31:08',NULL,NULL),
	(262,1,'hl_a21409999','tmp_0d29e0e928648df8113ab2feb9b560c7e9ca0c93a045b4fb.jpg','bM1spg2k2mP7iZmCQn6FPsIOxzNZqdRu.jpg','/uploads/files/bM1spg2k2mP7iZmCQn6FPsIOxzNZqdRu.jpg','files','86908','image','jpeg',NULL,'jpg','','2023-11-11 22:31:08',NULL,NULL),
	(263,1,'hl_a21409999','tmp_edf701294fb17af23429f76b3f76e4d8b728a73c369b404d.jpg','sbhORk5rslKQiWsJz5LOOYlPw6SCeHcG.jpg','/uploads/files/sbhORk5rslKQiWsJz5LOOYlPw6SCeHcG.jpg','files','90102','image','jpeg',NULL,'jpg','','2023-11-11 22:31:08',NULL,NULL),
	(264,1,'hl_a54411643','tmp_bfd3465e1c3cfc878ad50684d97a5e37a0325cee5c113496.jpg','Ap9cdlN4eIFuEMGaXwNy0ccFObT5Qfh2.jpg','/uploads/files/Ap9cdlN4eIFuEMGaXwNy0ccFObT5Qfh2.jpg','files','49712','image','jpeg',NULL,'jpg','','2023-11-11 22:33:40',NULL,NULL),
	(265,1,'hl_a24559452','tmp_57cfb59f9df73c7aac8b4f28c848fc1d.jpg','cxfnY6pjbpuJw9EnuyWlEnOVDH6uQbCN.jpg','/uploads/files/cxfnY6pjbpuJw9EnuyWlEnOVDH6uQbCN.jpg','files','5299','image','jpeg',NULL,'jpg','','2023-11-11 22:37:01',NULL,NULL),
	(266,1,'hl_a72530367','tmp_f7746305faa52b24eb5b6398a6ec4aa1.jpg','3Y5Nbk7tloFIwJlwdiL44EtDhvcRrwSn.jpg','/uploads/files/3Y5Nbk7tloFIwJlwdiL44EtDhvcRrwSn.jpg','files','518409','image','jpeg',NULL,'jpg','','2023-11-11 22:38:36',NULL,NULL),
	(267,1,'hl_a72530367','tmp_f3f32f01320c06edb2c9ce071ec0a1a6.jpg','tqhnLt9dJshozNqrpucRXjUhWD3y2bhg.jpg','/uploads/files/tqhnLt9dJshozNqrpucRXjUhWD3y2bhg.jpg','files','505666','image','jpeg',NULL,'jpg','','2023-11-11 22:38:36',NULL,NULL),
	(268,1,'hl_a72530367','tmp_37ddeb9ab4d89701616c89b02bd17e4e.jpg','2o9UwfWYbQ0nyy5wFMhTtt6QUcJ0dLAb.jpg','/uploads/files/2o9UwfWYbQ0nyy5wFMhTtt6QUcJ0dLAb.jpg','files','521958','image','jpeg',NULL,'jpg','','2023-11-11 22:38:38',NULL,NULL),
	(269,1,'hl_a72530367','tmp_bbefded1f775352e1b3d9469e0aba69b.jpg','35Y1qUaIxZGzOWhUKDS2k2jlAp25lPgU.jpg','/uploads/files/35Y1qUaIxZGzOWhUKDS2k2jlAp25lPgU.jpg','files','517664','image','jpeg',NULL,'jpg','','2023-11-11 22:38:38',NULL,NULL),
	(270,1,'hl_a72530367','tmp_00f4f69128efb2181831db800c7b3342.jpg','Ach46ArzqcnNw8gI4JpOFL4EGCSIxsNr.jpg','/uploads/files/Ach46ArzqcnNw8gI4JpOFL4EGCSIxsNr.jpg','files','557343','image','jpeg',NULL,'jpg','','2023-11-11 22:38:38',NULL,NULL),
	(271,1,'hl_a79349105','tmp_0d31e44142f95f3b61244c9f290720ccdde2553a03f89d61.jpg','s7INagWVcR2WdAf8tu7E6hNESqBE1UIO.jpg','/uploads/files/s7INagWVcR2WdAf8tu7E6hNESqBE1UIO.jpg','files','5501468','image','jpeg',NULL,'jpg','','2023-11-11 22:39:54',NULL,NULL),
	(272,1,'hl_a16337054','tmp_c61d3c6e75dca2a1d583e3324dbb3d0724f5dbfc2cf73631.jpg','XK9mFjuBRzjSNbDiifGa87kqegtU8FdP.jpg','/uploads/files/XK9mFjuBRzjSNbDiifGa87kqegtU8FdP.jpg','files','51396','image','jpeg',NULL,'jpg','','2023-11-11 22:41:09',NULL,NULL),
	(273,1,'hl_a16337054','tmp_c4a7fe1e34f3313bbb0d9f56356f47d8eb78e63da80fa8f1.jpg','dxWjYooDBC3H6JFmSn7jO8DTw1bR80Ir.jpg','/uploads/files/dxWjYooDBC3H6JFmSn7jO8DTw1bR80Ir.jpg','files','192000','image','jpeg',NULL,'jpg','','2023-11-11 22:41:09',NULL,NULL),
	(274,1,'hl_a72530367','tmp_6057148c3c7be9002ead7d9ff91ebdeb.jpg','OiOpPwStUKyYT4Oz2327Nmblo0deONgo.jpg','/uploads/files/OiOpPwStUKyYT4Oz2327Nmblo0deONgo.jpg','files','272156','image','jpeg',NULL,'jpg','','2023-11-11 22:41:50',NULL,NULL),
	(275,1,'hl_a72530367','tmp_cf8566ce25a74f74c61d4da06b57f463.jpg','4qCosQ59lv37wK6XgzcyBIUmgsr17CVc.jpg','/uploads/files/4qCosQ59lv37wK6XgzcyBIUmgsr17CVc.jpg','files','433688','image','jpeg',NULL,'jpg','','2023-11-11 22:41:50',NULL,NULL),
	(276,1,'hl_a16337054','tmp_cd507414d8c74bb3b2b07ee39727071c929c8d62285937ed.jpg','L0RGoitECHWBUhYRavgDC0qUHRJksme2.jpg','/uploads/files/L0RGoitECHWBUhYRavgDC0qUHRJksme2.jpg','files','49379','image','jpeg',NULL,'jpg','','2023-11-11 22:41:51',NULL,NULL),
	(277,1,'hl_a16337054','tmp_88c99116d9aad597130ba30e2e807ba19da43283aa1a5ddc.jpg','qYOrhuxyM3NDD1QK99ZLVgNtzLkROYGM.jpg','/uploads/files/qYOrhuxyM3NDD1QK99ZLVgNtzLkROYGM.jpg','files','56317','image','jpeg',NULL,'jpg','','2023-11-11 22:41:51',NULL,NULL),
	(278,1,'hl_a72530367','tmp_84b6340adfc27627b53af549a862afee.jpg','kJNusMmXmKWgz0dyEZzpkJAbaJITfZ7u.jpg','/uploads/files/kJNusMmXmKWgz0dyEZzpkJAbaJITfZ7u.jpg','files','699740','image','jpeg',NULL,'jpg','','2023-11-11 22:41:52',NULL,NULL),
	(279,1,'hl_a16337054','tmp_a27063a0ecd32df340f356d3544abec28a980ca381d0209b.jpg','dcoYDXfqyxN131WXvgTbdQHqpD8MazqW.jpg','/uploads/files/dcoYDXfqyxN131WXvgTbdQHqpD8MazqW.jpg','files','39088','image','jpeg',NULL,'jpg','','2023-11-11 22:41:52',NULL,NULL),
	(280,1,'hl_a72530367','tmp_7936c9ebbd97bdcea89b0c0189fa3ae9.jpg','XlGxbJ7P6pflQO2fWdO0Nv4yMOTNXtA0.jpg','/uploads/files/XlGxbJ7P6pflQO2fWdO0Nv4yMOTNXtA0.jpg','files','815125','image','jpeg',NULL,'jpg','','2023-11-11 22:41:52',NULL,NULL),
	(281,1,'hl_a16337054','tmp_4710a3c8398817985a04e34d70cfb105599e8eb4455c7b5e.jpg','DkdRQ2dYUv7t6p4oDqmm0aH0ASHaaUOa.jpg','/uploads/files/DkdRQ2dYUv7t6p4oDqmm0aH0ASHaaUOa.jpg','files','73484','image','jpeg',NULL,'jpg','','2023-11-11 22:42:14',NULL,NULL),
	(282,1,'hl_a16337054','tmp_fffb301431796d0dda76295996d3edf1f9cfd4e1e47538fd.jpg','33PGL6iQIkF8tNawtR1QFCNjROnK3B8J.jpg','/uploads/files/33PGL6iQIkF8tNawtR1QFCNjROnK3B8J.jpg','files','50911','image','jpeg',NULL,'jpg','','2023-11-11 22:42:34',NULL,NULL),
	(283,1,'hl_a79349105','tmp_f753107ebe6290e13939fd9c39d8f958abdf4553dde424c7.jpg','5bBykpsSDLCyyOBxKhX16AezerwC3WKA.jpg','/uploads/files/5bBykpsSDLCyyOBxKhX16AezerwC3WKA.jpg','files','347498','image','jpeg',NULL,'jpg','','2023-11-11 22:43:11',NULL,NULL),
	(284,1,'hl_a79349105','tmp_5c9c9881d9519fd43921d22a291a6baca521a33c8fc5b84f.jpg','VBQMQviwJ9y9QXCcwuPFVNTHpmqJutWg.jpg','/uploads/files/VBQMQviwJ9y9QXCcwuPFVNTHpmqJutWg.jpg','files','1272113','image','jpeg',NULL,'jpg','','2023-11-11 22:43:13',NULL,NULL),
	(285,1,'hl_a79349105','tmp_2b8bc4a5f7e84121dfaefd4e8cbb43836a491e934d83771c.jpg','yiGdZwEEDU2nxZz4X9UWhx7031LK17p7.jpg','/uploads/files/yiGdZwEEDU2nxZz4X9UWhx7031LK17p7.jpg','files','296284','image','jpeg',NULL,'jpg','','2023-11-11 22:43:13',NULL,NULL),
	(286,1,'hl_a79349105','tmp_96328a918b6eafb67d5dd4e384bc51f66ff4c6ab454a3292.jpg','3gITUBWp3HZrWmgFAErM6Q2G5Q9mTovY.jpg','/uploads/files/3gITUBWp3HZrWmgFAErM6Q2G5Q9mTovY.jpg','files','3107615','image','jpeg',NULL,'jpg','','2023-11-11 22:43:16',NULL,NULL),
	(287,1,'hl_a16337054','tmp_50f87b29c381db3c83809edaf8fc5d28d9f4ad4afbfed226.jpg','J7Zurla7EG4ib7MTw3Pwu1rFZ6gIcmr6.jpg','/uploads/files/J7Zurla7EG4ib7MTw3Pwu1rFZ6gIcmr6.jpg','files','45981','image','jpeg',NULL,'jpg','','2023-11-11 22:43:34',NULL,NULL),
	(288,1,'hl_a16337054','tmp_72bc7f8eacbbf2002f1c5c8573df54298e30ec4b5721f637.jpg','mShm2z5VaukMsUwdoui5T6jUMlOIJI3E.jpg','/uploads/files/mShm2z5VaukMsUwdoui5T6jUMlOIJI3E.jpg','files','38047','image','jpeg',NULL,'jpg','','2023-11-11 22:43:35',NULL,NULL),
	(289,1,'hl_a16337054','tmp_dc487d9d6d92f130cb458a9b919c6908987c04d76216b91e.jpg','b86EQ1af3wQCat0DO81NZRTT2nkLBNzW.jpg','/uploads/files/b86EQ1af3wQCat0DO81NZRTT2nkLBNzW.jpg','files','34332','image','jpeg',NULL,'jpg','','2023-11-11 22:43:35',NULL,NULL),
	(290,1,'hl_a16337054','tmp_158eb16bba97b9d674ec3e43e7436f09ba0b70c0c57ad0fc.jpg','peAEtPBRcGbGsgt0hbar7zhFMiRVkzBi.jpg','/uploads/files/peAEtPBRcGbGsgt0hbar7zhFMiRVkzBi.jpg','files','56317','image','jpeg',NULL,'jpg','','2023-11-11 22:43:54',NULL,NULL),
	(291,1,'hl_a16337054','tmp_70f35960c000a0d02be32e4e0cbb6585f3094f0d200e2881.jpg','CGWwzlSwVnV0ygDEjkdSQTomfXbg2WtZ.jpg','/uploads/files/CGWwzlSwVnV0ygDEjkdSQTomfXbg2WtZ.jpg','files','75152','image','jpeg',NULL,'jpg','','2023-11-11 22:45:35',NULL,NULL),
	(292,1,'hl_a16337054','tmp_fcaae3f7062687ccf4b22aeab2081f4c744d8b053e03776a.jpg','g5bIFTwS64taOTZtLoibket1gMtkPrM5.jpg','/uploads/files/g5bIFTwS64taOTZtLoibket1gMtkPrM5.jpg','files','128588','image','jpeg',NULL,'jpg','','2023-11-11 22:45:35',NULL,NULL),
	(293,1,'hl_a68441203','tmp_072ccd873e596ee373eafc8153d6b971.jpg','2hbnitlsDPxhNftZetcZVSVzUtsIhjiT.jpg','/uploads/files/2hbnitlsDPxhNftZetcZVSVzUtsIhjiT.jpg','files','253524','image','jpeg',NULL,'jpg','','2023-11-11 22:46:16',NULL,NULL),
	(294,1,'hl_a72530367','tmp_84ab70a288c283da862b0d6d5796e323.jpg','e2DhJplxXHnpNzu1M8sDzmaO2iEBr98c.jpg','/uploads/files/e2DhJplxXHnpNzu1M8sDzmaO2iEBr98c.jpg','files','183802','image','jpeg',NULL,'jpg','','2023-11-11 22:46:23',NULL,NULL),
	(295,1,'hl_a16337054','tmp_b9089b738df157fd9545727c7e28e43f862ad5a03cede97d.jpg','A43KDuwNok5emkBkAoAINFBvngVY5Kb1.jpg','/uploads/files/A43KDuwNok5emkBkAoAINFBvngVY5Kb1.jpg','files','68045','image','jpeg',NULL,'jpg','','2023-11-12 11:28:08',NULL,NULL),
	(296,1,'hl_a16337054','tmp_2c2632e80bbddbbf60d94ca2c4df4c2bf2e1f78e9e78963c.jpg','hUq0CZQM2uMaaPeNPTilTbS1c8LzPn4j.jpg','/uploads/files/hUq0CZQM2uMaaPeNPTilTbS1c8LzPn4j.jpg','files','14583','image','jpeg',NULL,'jpg','','2023-11-12 11:30:34',NULL,NULL),
	(297,1,'hl_a16337054','tmp_975570878e70555c71de2b182b9f5d36ba5a093302fbed3a.jpg','fJ03svfTRMUYlbblNYZyDeRHyaoEoVUu.jpg','/uploads/files/fJ03svfTRMUYlbblNYZyDeRHyaoEoVUu.jpg','files','38688','image','jpeg',NULL,'jpg','','2023-11-12 11:30:34',NULL,NULL),
	(298,1,'hl_a16337054','tmp_5639a50148a85a59196a6514588d2ad87d36793acfbea472.jpg','9TaH4rhJh9SS67v75MlMspZaGPGTGCll.jpg','/uploads/files/9TaH4rhJh9SS67v75MlMspZaGPGTGCll.jpg','files','30722','image','jpeg',NULL,'jpg','','2023-11-12 11:30:34',NULL,NULL),
	(299,1,'hl_a16337054','tmp_09c574b48a61712fd12c0b57eeb7f88ad205f4336808605d.jpg','xL3OY6pTqfhgeLfbROvxUV9dxGOVYQUQ.jpg','/uploads/files/xL3OY6pTqfhgeLfbROvxUV9dxGOVYQUQ.jpg','files','68045','image','jpeg',NULL,'jpg','','2023-11-12 11:30:34',NULL,NULL),
	(300,1,'hl_a16337054','tmp_5c03b03735b79c865b2c7d59d91047d20894e175ab0dbf99.jpg','QeOC5Ud5VW26YzD4PFOxlZxNQYd4d0nQ.jpg','/uploads/files/QeOC5Ud5VW26YzD4PFOxlZxNQYd4d0nQ.jpg','files','110143','image','jpeg',NULL,'jpg','','2023-11-12 11:30:35',NULL,NULL),
	(301,1,'hl_a16337054','tmp_078e637673f21110b47747356ad882cc3eca36bab7dfdd20.jpg','YVDvBPnLxb8L48JTGeRAHOu2z9CZu9cs.jpg','/uploads/files/YVDvBPnLxb8L48JTGeRAHOu2z9CZu9cs.jpg','files','42983','image','jpeg',NULL,'jpg','','2023-11-12 11:32:28',NULL,NULL),
	(302,1,'hl_a16337054','tmp_cf27b090993d3ea0231fe916120b60adfd3cc36086a5a52a.jpg','NBPWIUlowzCND8mpNc8gwQt3Ockzr6Dx.jpg','/uploads/files/NBPWIUlowzCND8mpNc8gwQt3Ockzr6Dx.jpg','files','55458','image','jpeg',NULL,'jpg','','2023-11-12 11:33:36',NULL,NULL),
	(303,1,'hl_a16337054','tmp_7da84483d0d88b6a3402ae32beca7785a7b68c9f3724c71e.jpg','SCdODb6a4p7o31vx7R8Am2rflTEo4THr.jpg','/uploads/files/SCdODb6a4p7o31vx7R8Am2rflTEo4THr.jpg','files','44138','image','jpeg',NULL,'jpg','','2023-11-12 11:35:08',NULL,NULL),
	(304,1,'hl_a57190617','tmp_0125f5bbd08abc769f520ec4ca402790ac0c306d2bf16be0.jpg','DuGtJnXimodtl7BrCJ2EtZk7OweZc0Ow.jpg','/uploads/files/DuGtJnXimodtl7BrCJ2EtZk7OweZc0Ow.jpg','files','2419303','image','jpeg',NULL,'jpg','','2023-11-12 12:09:50',NULL,NULL),
	(305,1,'hl_a57190617','tmp_f2712424d680b13aa18ad9d22c70505b2e6901891090a349.jpg','opYdohiNgnj7Wg6GedoGqTkokurPyeSz.jpg','/uploads/files/opYdohiNgnj7Wg6GedoGqTkokurPyeSz.jpg','files','3205071','image','jpeg',NULL,'jpg','','2023-11-12 12:09:50',NULL,NULL),
	(306,1,'hl_a57190617','tmp_f83c81c4a4892fdfe00808695e3a61e4fce12838fb948b60.jpg','ZyGKf6jBRCk9VETqdaNFudr9tLm2LYAz.jpg','/uploads/files/ZyGKf6jBRCk9VETqdaNFudr9tLm2LYAz.jpg','files','2706146','image','jpeg',NULL,'jpg','','2023-11-12 12:09:51',NULL,NULL),
	(307,1,'hl_a57190617','tmp_252a6beb8c52ab576904f58e67c8b4a3ac95387d0ad47e42.jpg','6Wvwqmz4mfwqItdvvhfZPycOGxsMCy66.jpg','/uploads/files/6Wvwqmz4mfwqItdvvhfZPycOGxsMCy66.jpg','files','5934372','image','jpeg',NULL,'jpg','','2023-11-12 12:17:26',NULL,NULL),
	(308,1,'hl_a57190617','tmp_e42497f97e6a99c452f8b8f3ea86df8812b8495e07a0aac2.jpg','LvSStqOT0cDXw3KBihRPY0Mv8oj60ast.jpg','/uploads/files/LvSStqOT0cDXw3KBihRPY0Mv8oj60ast.jpg','files','5658160','image','jpeg',NULL,'jpg','','2023-11-12 12:22:58',NULL,NULL),
	(309,1,'hl_a57190617','tmp_d8b750d76f929954f2475ddcc2236cfcd9e3b71019d521c8.jpg','3a7Fkj7oBURpbLyaxYkHeYzNaNven24Y.jpg','/uploads/files/3a7Fkj7oBURpbLyaxYkHeYzNaNven24Y.jpg','files','4144773','image','jpeg',NULL,'jpg','','2023-11-12 12:22:59',NULL,NULL),
	(310,1,'hl_a57190617','tmp_b45423f8e87a5d04e082aafddf1bc98e9ae7ee90fc7ff577.jpg','RYK3XcTEXxRLd6j3QS6ErB8YyBLHbgOe.jpg','/uploads/files/RYK3XcTEXxRLd6j3QS6ErB8YyBLHbgOe.jpg','files','5382341','image','jpeg',NULL,'jpg','','2023-11-12 12:23:03',NULL,NULL),
	(311,1,'hl_a47851358','tmp_e1874a5379d41876b24ae721dfa03d77.jpg','3CveM8Kg5kgHemf5ggNoboPNCUwc4taL.jpg','/uploads/files/3CveM8Kg5kgHemf5ggNoboPNCUwc4taL.jpg','files','576049','image','jpeg',NULL,'jpg','','2023-11-12 13:11:06',NULL,NULL),
	(312,1,'hl_a47851358','tmp_f191fabda5e22951e2f10c101210238e.jpg','0AXkrwpIes1cpQ6garLjkgCrrkfvZyLd.jpg','/uploads/files/0AXkrwpIes1cpQ6garLjkgCrrkfvZyLd.jpg','files','361082','image','jpeg',NULL,'jpg','','2023-11-12 13:12:00',NULL,NULL),
	(313,1,'hl_a47851358','tmp_1e5eb55b1e5860e941a65986c236ea25.jpg','h51FJiyMWYFPP7pXlfBnC8zqnOIurB7G.jpg','/uploads/files/h51FJiyMWYFPP7pXlfBnC8zqnOIurB7G.jpg','files','378210','image','jpeg',NULL,'jpg','','2023-11-12 13:12:47',NULL,NULL),
	(314,1,'','oLUabr3SSyR0110d2b54ef79667bc1b6544d1ede707e.jpeg','NHHI7az3XqqSjCfhOqxYtn2nwtmy4krk.jpeg','/uploads/files/NHHI7az3XqqSjCfhOqxYtn2nwtmy4krk.jpeg','files','5108','image','jpeg',NULL,'jpeg','','2023-11-12 22:42:39',NULL,NULL),
	(315,1,'','AtWzBoYiWqZG20f9a50493a50a146457e3bf129dd573.jpeg','RyvIXU9L109XmEPSjLOzI2oH2TdhteJu.jpeg','/uploads/files/RyvIXU9L109XmEPSjLOzI2oH2TdhteJu.jpeg','files','5108','image','jpeg',NULL,'jpeg','','2023-11-12 22:54:29',NULL,NULL),
	(316,1,'','NNB82pJUIDrg00ff77182058e58057cfb468f243fddb.jpeg','a3SM6XdKWKPcETJjnSl8PKjW3CWHapD0.jpeg','/uploads/files/a3SM6XdKWKPcETJjnSl8PKjW3CWHapD0.jpeg','files','5108','image','jpeg',NULL,'jpeg','','2023-11-12 22:57:56',NULL,NULL),
	(317,1,'hl_a57190617','tmp_a59d1ef3b1c9b081b5c86c9dde52fd827f00bab9f5b083fd.jpg','nhVoeogWZc4OelbSzH59k70XBXiiEB82.jpg','/uploads/files/nhVoeogWZc4OelbSzH59k70XBXiiEB82.jpg','files','482656','image','jpeg',NULL,'jpg','','2023-11-13 09:02:49',NULL,NULL),
	(318,1,'hl_a57190617','tmp_a4c275d43dc6dbcfaaee663c81eccbc8b160a753676faa93.jpg','3vnjKwQ7Iovj2QfutelWWKSApr4y2GBg.jpg','/uploads/files/3vnjKwQ7Iovj2QfutelWWKSApr4y2GBg.jpg','files','40170','image','jpeg',NULL,'jpg','','2023-11-13 09:03:26',NULL,NULL),
	(319,1,'hl_a57190617','tmp_c336ba3cba5e117badf1738da8a05366011f308ed44841d1.jpg','z0mRjfsHP6YB5reg82L5rrZv6Tn9aJj6.jpg','/uploads/files/z0mRjfsHP6YB5reg82L5rrZv6Tn9aJj6.jpg','files','371386','image','jpeg',NULL,'jpg','','2023-11-13 09:06:30',NULL,NULL),
	(320,1,'hl_a57190617','tmp_4127d4c84f68bef149b47edae96c6cab142a8fa079c2a67f.jpg','8jlxhzwAphVrycemyth1ADF442Twwsgy.jpg','/uploads/files/8jlxhzwAphVrycemyth1ADF442Twwsgy.jpg','files','181069','image','jpeg',NULL,'jpg','','2023-11-13 09:07:48',NULL,NULL),
	(321,1,'hl_a57190617','tmp_697cdcde1e4d21057a1720e1477af9f7d0dcbdc6b8338953.jpg','Z0t8QY6aIQghJT9AlFDuUz0iYLIcp1rx.jpg','/uploads/files/Z0t8QY6aIQghJT9AlFDuUz0iYLIcp1rx.jpg','files','176778','image','jpeg',NULL,'jpg','','2023-11-13 09:07:49',NULL,NULL),
	(322,1,'hl_a57190617','tmp_e75426b08e2ac1840245d66a0e1c3ed78677f418c47e79ac.jpg','cCtGeXzj05riKLSxXPx0lbvJDCcf2WQv.jpg','/uploads/files/cCtGeXzj05riKLSxXPx0lbvJDCcf2WQv.jpg','files','177591','image','jpeg',NULL,'jpg','','2023-11-13 09:07:49',NULL,NULL),
	(323,1,'hl_a57190617','tmp_b36bc177a2d66a1efce28892315ef187f41713cd2728eba2.jpg','2wSqdxhl2jZe7MIPUZ8zh271qMhEqDYi.jpg','/uploads/files/2wSqdxhl2jZe7MIPUZ8zh271qMhEqDYi.jpg','files','196803','image','jpeg',NULL,'jpg','','2023-11-13 09:07:49',NULL,NULL),
	(324,1,'hl_a57190617','tmp_cab4b0e2809c187b7e64f4a0505dd44a818a343aab4a1be6.jpg','qsmhRUIuNLuCGXPFUb1tdC7m4lEDSc2Q.jpg','/uploads/files/qsmhRUIuNLuCGXPFUb1tdC7m4lEDSc2Q.jpg','files','199619','image','jpeg',NULL,'jpg','','2023-11-13 09:07:49',NULL,NULL),
	(325,1,'hl_a47851358','tmp_fbca36214bed2f96d75611be4e605406.jpg','3vbpYVgNBWx6xSyITZHXtKaHnvOYZeGs.jpg','/uploads/files/3vbpYVgNBWx6xSyITZHXtKaHnvOYZeGs.jpg','files','203079','image','jpeg',NULL,'jpg','','2023-11-13 09:34:51',NULL,NULL),
	(326,1,'hl_a47851358','tmp_c2b3bbbf07cd6362f4ae7d522aece399.jpg','eCNCNa26xJXhusbsB67uOJWWFnwLVZKi.jpg','/uploads/files/eCNCNa26xJXhusbsB67uOJWWFnwLVZKi.jpg','files','234461','image','jpeg',NULL,'jpg','','2023-11-13 09:34:52',NULL,NULL),
	(327,1,'hl_a47851358','tmp_8c247c6bdfef7f6eebdc30dc37c9d0cd.jpg','3zmTIHP3iR18E0chWv7NoH4MVUDhhg4C.jpg','/uploads/files/3zmTIHP3iR18E0chWv7NoH4MVUDhhg4C.jpg','files','253635','image','jpeg',NULL,'jpg','','2023-11-13 09:34:52',NULL,NULL),
	(328,1,'hl_a47851358','tmp_95eb1322612b3636095a7b65feb54dca.jpg','B07gOTeaz31PpQxO53dx9ZUYaeYxdJCc.jpg','/uploads/files/B07gOTeaz31PpQxO53dx9ZUYaeYxdJCc.jpg','files','321685','image','jpeg',NULL,'jpg','','2023-11-13 09:34:52',NULL,NULL),
	(329,1,'hl_a47851358','tmp_54ec483653b769881fbf2e01b216aefc.jpg','czDqCE2NNpKgVG1SJSAAty3gKFr1DACN.jpg','/uploads/files/czDqCE2NNpKgVG1SJSAAty3gKFr1DACN.jpg','files','312835','image','jpeg',NULL,'jpg','','2023-11-13 09:34:53',NULL,NULL),
	(330,1,'hl_a47851358','tmp_5cede48e297ec0429ead478877a22c23.jpg','pqlxnKonqdLQ6w9416Zk0XOLocBbvlxr.jpg','/uploads/files/pqlxnKonqdLQ6w9416Zk0XOLocBbvlxr.jpg','files','470563','image','jpeg',NULL,'jpg','','2023-11-13 09:36:11',NULL,NULL),
	(331,1,'hl_a47851358','tmp_3342f44044ed54b308bd10bfe63c4c25.jpg','IclSBF49ipUFvFODwUg7JCqA8Nv0GroL.jpg','/uploads/files/IclSBF49ipUFvFODwUg7JCqA8Nv0GroL.jpg','files','203079','image','jpeg',NULL,'jpg','','2023-11-13 09:36:58',NULL,NULL),
	(332,1,'hl_a47851358','tmp_de48f01fad2fa2eaebd517fcaab2b25b.jpg','GFVQQOfFiMFGsen9GuvXlMv3cVXB0yKp.jpg','/uploads/files/GFVQQOfFiMFGsen9GuvXlMv3cVXB0yKp.jpg','files','234461','image','jpeg',NULL,'jpg','','2023-11-13 09:36:58',NULL,NULL),
	(333,1,'hl_a47851358','tmp_0c0cf9161d46d0e4fe5ea53cc8dcba48.jpg','CQELrxqDDO3ZUU2aIztXCAm2mD0vsmoF.jpg','/uploads/files/CQELrxqDDO3ZUU2aIztXCAm2mD0vsmoF.jpg','files','312835','image','jpeg',NULL,'jpg','','2023-11-13 09:36:58',NULL,NULL),
	(334,1,'hl_a47851358','tmp_9364f438acc67af4a08ded25d80c6d18.jpg','jwQV4e165jV4s8yMe9uEcDePWNEhStgX.jpg','/uploads/files/jwQV4e165jV4s8yMe9uEcDePWNEhStgX.jpg','files','321685','image','jpeg',NULL,'jpg','','2023-11-13 09:36:58',NULL,NULL),
	(335,1,'hl_a47851358','tmp_af1847ff1b574c99cab8b76dce4d3af4.jpg','G8g5B4WJNevgSaRlQMKNPmHjeewqAb68.jpg','/uploads/files/G8g5B4WJNevgSaRlQMKNPmHjeewqAb68.jpg','files','253635','image','jpeg',NULL,'jpg','','2023-11-13 09:36:58',NULL,NULL);

/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 land_articles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `land_articles`;

CREATE TABLE `land_articles` (
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

LOCK TABLES `land_articles` WRITE;
/*!40000 ALTER TABLE `land_articles` DISABLE KEYS */;

INSERT INTO `land_articles` (`id`, `article_author`, `article_title`, `article_detail`, `article_original_url`, `article_theme_url`, `status`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(1,'作者','1','<p>1</p>','12','',1,NULL,'2023-10-23 17:11:28','2023-10-23 17:11:28',NULL);

/*!40000 ALTER TABLE `land_articles` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 land_collection
# ------------------------------------------------------------

DROP TABLE IF EXISTS `land_collection`;

CREATE TABLE `land_collection` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(140) NOT NULL DEFAULT '' COMMENT '类型 moment introduce answer',
  `relation_type_id` varchar(10) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 Type ID',
  `wechat_open_id` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 User ID',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 0 - 删除；1 - 发布',
  `ip` varchar(16) DEFAULT NULL COMMENT 'IP 地址',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '提交时间',
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='收藏';

LOCK TABLES `land_collection` WRITE;
/*!40000 ALTER TABLE `land_collection` DISABLE KEYS */;

INSERT INTO `land_collection` (`id`, `type`, `relation_type_id`, `wechat_open_id`, `status`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(13,'designer','2','od8m-63JwR52W6PGi0WnQOOeJiNE',1,NULL,'2023-11-13 09:03:33','2023-11-13 13:47:10',NULL);

/*!40000 ALTER TABLE `land_collection` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 land_designers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `land_designers`;

CREATE TABLE `land_designers` (
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

LOCK TABLES `land_designers` WRITE;
/*!40000 ALTER TABLE `land_designers` DISABLE KEYS */;

INSERT INTO `land_designers` (`id`, `nickname`, `avatar_url`, `sex`, `works`, `labels`, `detail`, `status`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(2,'韩伟','/uploads/avatars/sfIc0ZcC9LNUu81zjgDC4RVqYmQQNYp6.jpeg','1','1','中央美术学院学士,装配式资深设计师,高级工程师','至今主持参与工程项目300万平米\\r\\n主持项目：国家会议中心、中国国家博物馆--复兴之路、北辰洲际酒店、北京市教委、北京文化部、海淀国土局、海淀地税局',1,NULL,'2023-10-23 17:01:31','2023-10-23 17:01:31',NULL),
	(3,'颜世俊','/uploads/avatars/OVmJOjiJMzGRFPGP36DiI5drr5qqJoSV.jpeg','1',NULL,'辽宁广电大学学士,前木棉中国设计总监','主案办公设计项目60万平米、青岛宜家办公楼设计顾问成员、办公设计落地项目40万平米',0,NULL,'2023-10-23 17:05:56','2023-10-23 17:05:56',NULL),
	(4,'贾鹦','/uploads/avatars/iRryyn5zNXwq2ldyMl4c0oCCnGjZQso9.jpg','0',NULL,'设计师,色彩搭配师',NULL,1,NULL,'2023-10-23 17:15:35','2023-10-23 17:15:35',NULL);

/*!40000 ALTER TABLE `land_designers` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 land_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `land_users`;

CREATE TABLE `land_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '昵称',
  `avatar_url` varchar(256) DEFAULT NULL COMMENT '头像',
  `wechat_union_id` varchar(255) DEFAULT NULL COMMENT '微信 UNION ID',
  `wechat_open_id` varchar(255) DEFAULT NULL COMMENT '小程序 OPEN ID',
  `wechat_platform_open_id` varchar(255) DEFAULT NULL COMMENT '公号 OPEN ID',
  `ip` varchar(16) DEFAULT NULL COMMENT 'IP 地址',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `land_users` WRITE;
/*!40000 ALTER TABLE `land_users` DISABLE KEYS */;

INSERT INTO `land_users` (`id`, `nickname`, `avatar_url`, `wechat_union_id`, `wechat_open_id`, `wechat_platform_open_id`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(4,'KMT 184.05','/uploads/files/a3SM6XdKWKPcETJjnSl8PKjW3CWHapD0.jpeg',NULL,'od8m-63JwR52W6PGi0WnQOOeJiNE',NULL,NULL,'2023-11-12 22:27:32','2023-11-12 22:27:32',NULL),
	(5,NULL,NULL,NULL,'od8m-67eK3BItFjqU8-hgZing7cs',NULL,NULL,'2023-11-13 17:34:36','2023-11-13 17:34:36',NULL);

/*!40000 ALTER TABLE `land_users` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 land_works
# ------------------------------------------------------------

DROP TABLE IF EXISTS `land_works`;

CREATE TABLE `land_works` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `catalog` bigint(10) DEFAULT '0' COMMENT '目录',
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

LOCK TABLES `land_works` WRITE;
/*!40000 ALTER TABLE `land_works` DISABLE KEYS */;

INSERT INTO `land_works` (`id`, `catalog`, `title`, `location`, `theme_url`, `area`, `work_time`, `introduction`, `detail`, `status`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(1,0,'作品名称','北京','','1000','2023-10-25','设计理念','<p>图片集合</p>',1,NULL,'2023-10-25 08:14:08','2023-10-25 08:14:08',NULL);

/*!40000 ALTER TABLE `land_works` ENABLE KEYS */;
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
	(9,'moment','9','hl_a77713707',1,'10.0.8.14','2023-11-06 14:52:53','2023-11-06 14:52:53',NULL),
	(10,'moment','2','hl_a87121976',1,'10.0.8.14','2023-11-11 19:40:48','2023-11-11 19:40:48',NULL),
	(11,'moment','31','hl_a21409999',0,'10.0.8.14','2023-11-11 22:44:17','2023-11-11 22:44:20',NULL),
	(12,'moment','33','hl_a90915530',0,'10.0.8.14','2023-11-12 08:02:32','2023-11-12 08:02:33',NULL);

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
  `content` longtext CHARACTER SET utf8mb4 NOT NULL COMMENT '描述',
  `photos` longtext CHARACTER SET utf8mb4 NOT NULL COMMENT '照片',
  `ip` varchar(16) CHARACTER SET utf8mb4 NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `moments` WRITE;
/*!40000 ALTER TABLE `moments` DISABLE KEYS */;

INSERT INTO `moments` (`id`, `status`, `recommend`, `user_id`, `content`, `photos`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(2,1,1,'hl_a90915530','秋来，叶落 🍂','[\"/uploads/files/u7a8GJxhd4Nedd4BjOZlThwWns9xJ9cT.jpg\"]','','2023-10-24 17:55:40','2023-10-24 17:55:40',NULL),
	(3,1,0,'hl_a10140140','超级无敌喜欢吃火锅的！','[]','','2023-10-26 15:27:57','2023-10-26 15:27:57',NULL),
	(4,1,0,'hl_a45082499','日落尤其温柔，人间皆是浪漫','[]','','2023-10-26 15:31:53','2023-10-26 15:31:53',NULL),
	(5,1,0,'hl_a19680457','一个人最好的样子是被宠出来的','[]','','2023-10-26 15:32:59','2023-10-26 15:32:59',NULL),
	(6,1,0,'hl_a75816652','你好………','[]','','2023-10-26 15:34:18','2023-10-26 15:34:18',NULL),
	(7,1,0,'hl_a88076879','咕噜咕噜冒个泡','[]','','2023-10-26 16:02:14','2023-10-26 16:02:14',NULL),
	(8,1,0,'hl_a35324426','今天天气很不错','[]','','2023-10-26 16:09:12','2023-10-26 16:09:12',NULL),
	(9,1,0,'hl_a12419437','你好，秋天🍂','[]','','2023-10-26 16:24:43','2023-10-26 16:24:43',NULL),
	(10,1,1,'hl_a90915530','分手后没多久\n我收到了前男友的一条信息\n他发给我一个表格\n里面罗列着在一起时\n他花在我身上的每一笔钱\n从情人节52的红包到爆米花5折券\n他要我把这些全都还给他\n更让我震惊的是\n他在朋友圈公然诽谤我\n让我彻底看清了他的心\n是烂的：\ns lan der\n是烂 的\nslander\nv.','[\"/uploads/files/XJw47YeEk5J1BlnjkDsEdd99yk4p9TkN.jpg\"]','1.202.45.19','2023-11-09 18:34:50','2023-11-09 18:34:50',NULL),
	(11,1,0,'hl_a73199741','冒个泡🍚','[\"/uploads/files/Eq63i6vIXh9RzmgEvj3rEBDzcHwzwO5y.jpg\",\"/uploads/files/n1vAkm7GMPn8GEPqq99SBySOVrL03FCk.jpg\"]','10.0.8.14','2023-11-11 19:35:47','2023-11-11 19:35:47',NULL),
	(12,1,0,'hl_a21751174','','[\"/uploads/files/yTN2bSn5q69AN5ZU40AjdmiwHZ6yOupy.jpg\"]','10.0.8.14','2023-11-11 19:40:07','2023-11-11 19:40:07',NULL),
	(13,1,0,'hl_a24559452','你要照顾好你黑色的头发 挑剔的胃 和爱笑的眼睛.','[\"/uploads/files/YEII8QIXTiTiBlSqlsxEv2dOkbtS8y4r.jpg\",\"/uploads/files/wcCgl8FxjV28XRkMVvK7QevTvh4IFzfI.jpg\",\"/uploads/files/hVi7oLMTfWWnXOsPZre7n7sxmBSgsW8V.jpg\",\"/uploads/files/uLjNOA7Wtfq7Oeyx8Zvz4a3TELRSs7Xf.jpg\"]','10.0.8.14','2023-11-11 19:41:50','2023-11-11 19:41:50',NULL),
	(14,1,0,'hl_a45097638','不要让未来的你，讨厌现在的自己。与其祈求生活安稳点，还不如自己强大点。','[\"/uploads/files/Qj1rBRDWNgdbaCBWXOYZoq6DqlLZYwPD.jpg\"]','10.0.8.14','2023-11-11 19:43:46','2023-11-11 19:43:46',NULL),
	(15,1,0,'hl_a21751174','在幸福里折个角','[\"/uploads/files/a7ZOnhK6Il1cT5ZKda5n4i81NdU4JYsV.jpg\",\"/uploads/files/ojBC2g1YQ72TTabvknchfdasnjf5Kxqr.jpg\"]','10.0.8.14','2023-11-11 19:45:46','2023-11-11 19:45:46',NULL),
	(16,1,0,'hl_a21751174','海的味道我知道','[\"/uploads/files/ZJErwHC0DaAw0q7PNcQfUyKcXGQwShIq.jpg\",\"/uploads/files/6iGiqf9IfCICGngFcFpDewG9GqFyKKxF.jpg\"]','10.0.8.14','2023-11-11 19:48:06','2023-11-11 19:48:06',NULL),
	(17,1,0,'hl_a16392021','吗喽','[\"/uploads/files/QhCJq6pqjmHhlxBBCjHOTQN9BJ5Kb55h.jpg\",\"/uploads/files/M5g9eVehTjkuwpnC3CjZmoVENDDPaDZf.jpg\",\"/uploads/files/2kNVMY2DI2B3fIR4mqjk6j2LO0TTdJuo.jpg\"]','10.0.8.14','2023-11-11 19:48:51','2023-11-11 19:48:51',NULL),
	(18,1,0,'hl_a87121976','好不容易从自己待腻的地方，去到了别人待腻的地方，不纪念一下怎么行。','[\"/uploads/files/BKMN7WbBwhNRIe6WGYbIfKkPO4cEBzA9.jpg\"]','10.0.8.14','2023-11-11 19:49:28','2023-11-11 19:49:28',NULL),
	(19,1,0,'hl_a16392021','吗喽','[\"/uploads/files/KT18pyKXnXnL9T09e5wSOqWXq4In5HJO.jpg\"]','10.0.8.14','2023-11-11 19:49:42','2023-11-11 19:49:42',NULL),
	(20,1,0,'hl_a87121976','不笑运气差，一笑脸就大。','[\"/uploads/files/810nIwV28aWkGjdiehLL9aG0zlq7a2Ty.jpg\"]','10.0.8.14','2023-11-11 19:52:09','2023-11-11 19:52:09',NULL),
	(21,1,0,'hl_a24559452','马上就迎来我们之间的第二十个冬天','[\"/uploads/files/cyKbRl5CA3gyO1ekdawNiAQpw3cSQmTB.jpg\",\"/uploads/files/yxqcu8Z6BVpUP9h94kKCMm6UxOwFDhmi.jpg\",\"/uploads/files/s6gavjd3bEIgjcQbhuv3DXzLtY6zULPy.jpg\"]','10.0.8.14','2023-11-11 19:52:43','2023-11-11 19:52:43',NULL),
	(22,1,0,'hl_a87121976','以前丑，不好意思发自拍，现在不一样了，现在脸皮厚了。','[\"/uploads/files/xQVynQvykVKARTValmCVUT1qX8Fiy0wt.jpg\"]','10.0.8.14','2023-11-11 19:54:01','2023-11-11 19:54:01',NULL),
	(23,1,0,'hl_a24559452','有时间一起去看海叭','[\"/uploads/files/J2HIo35bgd2zNXkgyNBQeuqsXO82oFX2.jpg\",\"/uploads/files/Lh4ZaROxjS4P4jJir6dCP3xFXvp4KVUc.jpg\",\"/uploads/files/68gNeM0ba8DuwrG6VnUGo7HAtjfx1xaO.jpg\"]','10.0.8.14','2023-11-11 19:54:06','2023-11-11 19:54:06',NULL),
	(24,1,0,'hl_a73199741','👌🏻','[\"/uploads/files/ZMVNOcoEPLsAu7hz2hrhHBbRX5knfFkE.jpg\"]','10.0.8.14','2023-11-11 20:00:10','2023-11-11 20:00:10',NULL),
	(25,1,0,'hl_a57190617','🍲肚子享受  心里想瘦🤡','[\"/uploads/files/WCLHohcWuhGAyR4GMG22NANKnmW8JArq.jpg\",\"/uploads/files/58DLPAqx141tvG6VCQmSvkGDBbqDvh2E.jpg\"]','10.0.8.14','2023-11-11 20:01:09','2023-11-11 20:01:09',NULL),
	(26,1,0,'hl_a73199741','👀','[\"/uploads/files/7xjSDZavsl3pYMANkrLJnLkMOwo2hd7f.jpg\"]','10.0.8.14','2023-11-11 20:01:56','2023-11-11 20:01:56',NULL),
	(27,1,0,'hl_a22603795','人总是要和握不住的东西说再见的。','[\"/uploads/files/xRKcSZk9GWkbBXEr4unUMk0DF6NztnEB.jpg\"]','10.0.8.14','2023-11-11 20:02:00','2023-11-11 20:02:00',NULL),
	(28,1,1,'hl_a47851358','爱钱爱自由','[\"/uploads/files/c6nruqzdi4hTFAoFYM8ZPlhC6AGwZv4P.jpg\",\"/uploads/files/N3Jact6Avezv1v0JT430Q3dsGfpE2Pue.jpg\"]','10.0.8.14','2023-11-11 20:05:17','2023-11-11 20:05:17',NULL),
	(29,1,1,'hl_a22603795','恰饭恰饭','[\"/uploads/files/QHbYRugpjf9MLsviF5qVUWDqKgqZmKAf.jpg\",\"/uploads/files/ADRtwTtdi0UVjxVGInYGa50e9FE6Dswn.jpg\"]','10.0.8.14','2023-11-11 20:10:17','2023-11-11 20:10:17',NULL),
	(30,1,1,'hl_a60125001','又是过去了一年','[\"/uploads/files/DfQ85OEAac7X50zWlzqykVygrQNzIGSI.jpg\"]','10.0.8.14','2023-11-11 20:10:51','2023-11-11 20:10:51',NULL),
	(31,1,1,'hl_a22603795','讨厌迅速升温又突然降温的关系','[\"/uploads/files/6MqM9C0II49AtipPvKBlfAZmxQ60hQbR.jpg\"]','10.0.8.14','2023-11-11 20:10:59','2023-11-11 20:10:59',NULL),
	(32,1,1,'hl_a57190617','眼睛会遗忘的东西，就让相机记录波','[\"/uploads/files/KEsHgMNNWUSV4Upf64OLubKVMiODX5FV.jpg\",\"/uploads/files/FHARTiunjg9gk1pOyZxHAXVPrx6SCJWR.jpg\"]','10.0.8.14','2023-11-11 20:13:13','2023-11-11 20:13:13',NULL),
	(33,1,1,'hl_a47851358','我想海风可以吹走所有烦恼','[\"/uploads/files/mWo1CexUeC7MjEJgkgSkO5DYawuOjZFu.jpg\"]','10.0.8.14','2023-11-11 20:17:17','2023-11-11 20:17:17',NULL),
	(34,1,1,'hl_a47851358','我当然要保持清醒 因为我清楚的知道任何人都不是我的靠山','[\"/uploads/files/JeX73KAKmqibnhrKjYcrmigjjT1t1Sbm.jpg\",\"/uploads/files/GpRtroLwm3sDJZabtuTda8pGpubgLf7u.jpg\"]','10.0.8.14','2023-11-11 20:26:54','2023-11-11 20:26:54',NULL),
	(35,1,1,'hl_a57190617','回不去的何止时间……','[\"/uploads/files/i8oNtrwD4r7yeUFaFqSCdFqobxL4yiX7.jpg\",\"/uploads/files/sM0ZiaCpfeMOOTqYRzERf0E6qEaWU3Sh.jpg\",\"/uploads/files/1bW4r40KzU4Klrldn1IsjLG4LUfpjorF.jpg\"]','10.0.8.14','2023-11-11 20:38:09','2023-11-11 20:38:09',NULL),
	(36,1,0,'hl_a68441203','耶','[\"/uploads/files/FT9kuAg4LhmPFbLR0j7tPCh3nbscw3qN.jpg\"]','10.0.8.14','2023-11-11 21:02:41','2023-11-11 21:02:41',NULL),
	(37,1,0,'hl_a68441203','','[]','10.0.8.14','2023-11-11 21:02:41','2023-11-11 21:02:41',NULL),
	(38,1,0,'hl_a59873898','我希望我希望的希望有希望','[\"/uploads/files/TpDCnuY8Jt7Xy428WhMnmOntOz1KjHtZ.jpg\"]','10.0.8.14','2023-11-11 21:24:03','2023-11-11 21:24:03',NULL),
	(39,1,0,'hl_a16337054','冒个泡','[\"/uploads/files/sxzcl02J4jNzOpm2eb7EdG7NYFhFYJaN.jpg\"]','10.0.8.14','2023-11-11 21:25:03','2023-11-11 21:25:03',NULL),
	(40,1,0,'hl_a54411643','冒个泡^ω^','[\"/uploads/files/SaLKNtP3x7rMWoKErylyy5OCYPYfQCNX.jpg\",\"/uploads/files/5I545kwUHcYmU6tIytCSskTeMROlYDbz.jpg\"]','10.0.8.14','2023-11-11 21:25:49','2023-11-11 21:25:49',NULL),
	(41,1,0,'hl_a16337054','😛😛','[\"/uploads/files/Nx9PlnqqbDIKIfXksZkL2Zaspvy8UUoO.jpg\"]','10.0.8.14','2023-11-11 21:26:15','2023-11-11 21:26:15',NULL),
	(42,1,0,'hl_a96886310','美丽的晚霞','[\"/uploads/files/mxtdPEeHQV40l5LOD1j4ceEzUkMliaES.jpg\"]','10.0.8.14','2023-11-11 21:26:21','2023-11-11 21:26:21',NULL),
	(43,1,0,'hl_a16337054','😎😎','[\"/uploads/files/gj5XP8xUsdtUHCdrNfdlpdk88awMTbfE.jpg\"]','10.0.8.14','2023-11-11 21:26:50','2023-11-11 21:26:50',NULL),
	(44,1,0,'hl_a96886310','速度与激情特别行动','[\"/uploads/files/DUhxxVCM76LsMxjsu7pR9gqY8P4qsePH.jpg\",\"/uploads/files/9VKkIZ7UzLewQNOj24mraRVV7pfLi86l.jpg\"]','10.0.8.14','2023-11-11 21:26:52','2023-11-11 21:26:52',NULL),
	(45,1,0,'hl_a96886310','最喜欢的音乐','[\"/uploads/files/ks88nU1NKd0Ca5lEeoDSKdXNsgNoanid.jpg\",\"/uploads/files/LeW6Lz8NHrwWe0VWuyBuSjaJUE4WnArG.jpg\"]','10.0.8.14','2023-11-11 21:27:25','2023-11-11 21:27:25',NULL),
	(46,1,0,'hl_a54411643','芜湖~','[\"/uploads/files/GJbgi0g0812b4iozMF2mIKUo3kukLAx1.jpg\"]','10.0.8.14','2023-11-11 21:28:34','2023-11-11 21:28:34',NULL),
	(47,1,0,'hl_a54411643','日落🌅','[\"/uploads/files/kv0M92GK7mRcjH2RKCKcNMQOncUQgWsP.jpg\"]','10.0.8.14','2023-11-11 21:29:12','2023-11-11 21:29:12',NULL),
	(48,1,0,'hl_a79349105','','[\"/uploads/files/zMa9vPy0vvA3VqegZsSB5G9AXnKMNPux.jpg\"]','10.0.8.14','2023-11-11 21:31:02','2023-11-11 21:31:02',NULL),
	(49,1,0,'hl_a04893937','或许今年的冬天更令人期待呢','[\"/uploads/files/XacGmhsibZnMS2P28IZQpLpos9XzrOYj.jpg\"]','10.0.8.14','2023-11-11 21:52:42','2023-11-11 21:52:42',NULL),
	(50,1,0,'hl_a16337054','\n阳光正好，微风不燥，人间值得，未来可期！','[\"/uploads/files/BzqXzGPE3nNXLJuSHdaedCXhwBd9Bdgm.jpg\"]','10.0.8.14','2023-11-11 22:04:17','2023-11-11 22:04:17',NULL),
	(51,1,0,'hl_a16337054','','[]','10.0.8.14','2023-11-11 22:04:33','2023-11-11 22:04:33',NULL),
	(52,1,0,'hl_a16337054','真正治愈自己的，只有自己，不去抱怨，尽量担待，不怕孤单，努力沉淀。\n','[\"/uploads/files/412rPDTgu2LMOGTlYazUpJEriim8Bf9U.jpg\"]','10.0.8.14','2023-11-11 22:05:26','2023-11-11 22:05:26',NULL),
	(53,1,0,'hl_a16337054','希望一夜醒来，事情都能变好。所有深夜的心事都变成头顶的那一颗星星，指向每一条正确的路','[\"/uploads/files/t01r1nABaLZR2l0uRrucvX5tHU4sjyLT.jpg\"]','10.0.8.14','2023-11-11 22:06:21','2023-11-11 22:06:21',NULL),
	(54,1,0,'hl_a04893937','彤姐的分贝比酒吧还吵','[\"/uploads/files/cSncFm1EdRF8N1FXDrEp0PKDHMPdtZIE.jpg\"]','10.0.8.14','2023-11-11 22:07:00','2023-11-11 22:07:00',NULL),
	(55,1,0,'hl_a79349105','','[\"/uploads/files/mqLGQr4PfqzYGkBpUQaw36DYHkvNHP1m.jpg\",\"/uploads/files/8NgFIZIu9odkffA3ClQEM5jRWEDFHRsT.jpg\",\"/uploads/files/m8A5kxZbtOKc4gArWS6QvQVAxUjtW8RK.jpg\",\"/uploads/files/8H3R1X61cJMrL8FiaqG9uIO9gbgoTfHl.jpg\",\"/uploads/files/ZTBFG2n1kagCWOlutWnZqxHIs4cuzOa5.jpg\"]','10.0.8.14','2023-11-11 22:34:18','2023-11-11 22:34:18',NULL),
	(56,1,0,'hl_a79349105','','[]','10.0.8.14','2023-11-11 22:34:18','2023-11-11 22:34:18',NULL),
	(57,1,0,'hl_a16337054','\n天光渐暗，暮色里遗漏了一丝蓝，星辰便从中亮起。','[\"/uploads/files/YVDvBPnLxb8L48JTGeRAHOu2z9CZu9cs.jpg\"]','10.0.8.14','2023-11-12 11:32:33','2023-11-12 11:32:33',NULL),
	(58,1,0,'hl_a16337054','浪漫不归于爱情,温暖不囿于亲人。','[\"/uploads/files/NBPWIUlowzCND8mpNc8gwQt3Ockzr6Dx.jpg\"]','10.0.8.14','2023-11-12 11:33:38','2023-11-12 11:33:38',NULL),
	(59,1,0,'hl_a16337054','再美好的东西，再欢乐的热闹，没有你在我身边分享，总觉得满是遗憾。','[\"/uploads/files/SCdODb6a4p7o31vx7R8Am2rflTEo4THr.jpg\"]','10.0.8.14','2023-11-12 11:35:10','2023-11-12 11:35:10',NULL),
	(60,1,0,'hl_a57190617','看海本身就是一种浪漫的事','[\"/uploads/files/opYdohiNgnj7Wg6GedoGqTkokurPyeSz.jpg\",\"/uploads/files/ZyGKf6jBRCk9VETqdaNFudr9tLm2LYAz.jpg\",\"/uploads/files/DuGtJnXimodtl7BrCJ2EtZk7OweZc0Ow.jpg\"]','10.0.8.14','2023-11-12 12:11:23','2023-11-12 12:11:23',NULL),
	(61,1,0,'hl_a57190617','收集地图上的每一道风和丽日','[\"/uploads/files/6Wvwqmz4mfwqItdvvhfZPycOGxsMCy66.jpg\"]','10.0.8.14','2023-11-12 12:20:16','2023-11-12 12:20:16',NULL),
	(62,1,0,'hl_a57190617','我们的青春总是在不经意间逝去，不是吗','[\"/uploads/files/LvSStqOT0cDXw3KBihRPY0Mv8oj60ast.jpg\",\"/uploads/files/RYK3XcTEXxRLd6j3QS6ErB8YyBLHbgOe.jpg\",\"/uploads/files/3a7Fkj7oBURpbLyaxYkHeYzNaNven24Y.jpg\"]','10.0.8.14','2023-11-12 12:23:29','2023-11-12 12:23:29',NULL),
	(63,1,0,'hl_a47851358','一百块挣20啥狗运气','[\"/uploads/files/3CveM8Kg5kgHemf5ggNoboPNCUwc4taL.jpg\"]','10.0.8.14','2023-11-12 13:11:37','2023-11-12 13:11:37',NULL),
	(64,1,0,'hl_a47851358','感觉还不错还挺好看','[\"/uploads/files/0AXkrwpIes1cpQ6garLjkgCrrkfvZyLd.jpg\"]','10.0.8.14','2023-11-12 13:12:09','2023-11-12 13:12:09',NULL),
	(65,1,0,'hl_a47851358','生活是苦的糖是甜的','[\"/uploads/files/h51FJiyMWYFPP7pXlfBnC8zqnOIurB7G.jpg\"]','10.0.8.14','2023-11-12 13:13:25','2023-11-12 13:13:25',NULL);

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
  `ip_city` varchar(50) DEFAULT NULL,
  `online_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '最近上线时间',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `type`, `user_id`, `nickname`, `avatar_url`, `birthday`, `height`, `sex`, `work`, `photos`, `videos`, `detail`, `contact_wechat`, `school`, `company`, `location`, `realname`, `phone`, `wechat_union_id`, `wechat_open_id`, `wechat_platform_open_id`, `parent_id`, `ip`, `ip_city`, `online_at`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(25,1,'hl_a90915530','KMT 184.05','/uploads/files/TGgCSHkqsLstgkne0FuewabXMyGIrjE9.jpg','1997-05-01',173,1,'{\"key\":\"zhipin\",\"value\":[0,12]}','[\"/uploads/files/fWb1balGB2IQSWdccNXPVR44wFpyyBcR.png\",\"/uploads/files/pkfG33cwtPa2HiKpkdRhuqwufkCZaZV3.png\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vhiiLffHPfdB7LKmpMdr_I',NULL,NULL,'10.0.8.14','ip_city','2023-11-13 16:48:41','2023-10-24 17:48:25','2023-10-24 17:50:28',NULL),
	(29,2,'hl_a77713707','💐','/uploads/files/iU8zhMAB2cAKEfC83YrkpJ68rA1vtWFO.jpg','1997-01-01',167,0,'{\"key\":\"zhipin\",\"value\":[5,0]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vkWz17jyhDWsWuzDrV41_E',NULL,NULL,'1.202.45.19','','2023-11-09 08:32:00','2023-10-25 18:05:17','2023-10-25 18:06:13',NULL),
	(30,1,'hl_a94942316',NULL,NULL,NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4mdlhDDXIVKQE2sg3kf_lcI',NULL,NULL,NULL,'','2023-10-26 13:46:48','2023-10-26 13:46:48','2023-10-26 13:46:48',NULL),
	(31,1,'hl_a45082499','与月亮私奔',NULL,NULL,162,NULL,'{\"key\":\"zhipin\",\"value\":[4,1]}','[]',NULL,'日落即是温柔，人间浪漫',NULL,'陕西科技大学','空军军医大学第一附属医院',NULL,NULL,'18523584230',NULL,'op02s4t9pXQZwBdxtCfToEHwIaTY',NULL,NULL,'10.0.8.14','','2023-10-26 16:04:35','2023-10-26 15:17:37','2023-10-26 15:17:37',NULL),
	(32,1,'hl_a79908519','热爱山海',NULL,NULL,165,NULL,'{\"key\":\"zhipin\",\"value\":[0,0]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'19860918085',NULL,'op02s4gT-Hr2uxbC_vEHOjf234dE',NULL,NULL,'10.0.8.14','','2023-10-26 16:02:08','2023-10-26 15:17:56','2023-10-26 15:17:56',NULL),
	(33,1,'hl_a18254325','南浔',NULL,NULL,170,NULL,'{}','[]',NULL,'众你寻他千百度',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4n4Vhg4zFvnVbKzSC6bnf1Y',NULL,NULL,'10.0.8.14','','2023-10-30 11:32:28','2023-10-26 15:18:15','2023-10-26 15:18:15',NULL),
	(34,1,'hl_a64615905',NULL,NULL,NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4qcZqUCpoYq75ny0h8-EV_E',NULL,NULL,'10.0.8.14','','2023-10-26 16:04:10','2023-10-26 15:18:49','2023-10-26 15:18:49',NULL),
	(35,1,'hl_a10140140','babada','/uploads/normal-avatars/sex-017.png','1999-02-25',155,0,'{\"key\":\"zhipin\",\"value\":[6,3]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4gGwaOLEdT2Asy2fI87RhLg',NULL,NULL,'10.0.8.14','','2023-10-26 15:41:52','2023-10-26 15:19:50','2023-10-26 15:24:04',NULL),
	(36,1,'hl_a28939076',NULL,NULL,NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4iEsvekWPMwPAXKjkAxAbYM',NULL,NULL,NULL,'','2023-10-26 15:20:01','2023-10-26 15:20:01','2023-10-26 15:20:01',NULL),
	(37,1,'hl_a19680457','绿洲','/uploads/normal-avatars/sex-011.png','1999-01-01',166,0,'{\"key\":\"zhipin\",\"value\":[3,3]}','[]',NULL,'日照金山',NULL,'南京大学','华为',NULL,NULL,'18822073831',NULL,'op02s4jp3Cncjf5YZjraTnHLkDmQ',NULL,NULL,'10.0.8.14','','2023-10-26 15:42:17','2023-10-26 15:24:37','2023-10-26 15:26:09',NULL),
	(38,1,'hl_a75816652','bsa','/uploads/normal-avatars/sex-015.png','2001-01-04',164,0,'{\"key\":\"zhipin\",\"value\":[2,0]}','[]',NULL,'寻找一片云',NULL,'山东科技大学','兴业银行',NULL,NULL,'19906405498',NULL,'op02s4npunh0azL11_2Yg_BEy8Mg',NULL,NULL,'10.0.8.14','','2023-10-27 16:58:27','2023-10-26 15:27:57','2023-10-27 16:53:58',NULL),
	(39,1,'hl_a16846511','pumpkin','/uploads/normal-avatars/sex-015.png','2000-01-29',168,0,'{\"key\":\"zhipin\",\"value\":[2,0]}','[]',NULL,'11',NULL,'0','无',NULL,NULL,'13820328675',NULL,'op02s4merBxXTrbYLriYPcIffJHg',NULL,NULL,'10.0.8.14','','2023-10-27 10:26:28','2023-10-26 15:34:11','2023-10-26 15:35:14',NULL),
	(40,1,'hl_a34770909','耶','/uploads/normal-avatars/sex-015.png','1999-11-13',159,0,'{\"key\":\"zhipin\",\"value\":[3,1]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4tlL5X5oLEim4T-j5r43tpE',NULL,NULL,'10.0.8.14','','2023-10-26 17:16:07','2023-10-26 15:35:01','2023-10-26 15:36:58',NULL),
	(41,1,'hl_a88076879','Ostrich','/uploads/normal-avatars/sex-015.png','2001-02-01',161,0,'{\"key\":\"zhipin\",\"value\":[1,0]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4i2kATw38yViGlJE_pYkchs',NULL,NULL,'10.0.8.14','','2023-10-26 18:02:05','2023-10-26 15:45:53','2023-10-26 15:47:35',NULL),
	(42,2,'hl_a35324426','一颗盐粒子','/uploads/normal-avatars/sex-013.png',NULL,NULL,0,'{\"key\":\"zhipin\",\"value\":[0,20]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4tpkddBtuQFf8TKWFKtKVuQ',NULL,NULL,'10.0.8.14','','2023-10-26 16:11:42','2023-10-26 16:06:59','2023-10-26 16:07:52',NULL),
	(43,1,'hl_a12419437','晴天','/uploads/normal-avatars/sex-013.png','1994-03-22',160,0,'{\"key\":\"zhipin\",\"value\":[11,0]}','[]',NULL,'两岸猿声啼不住 轻舟已过万重山',NULL,'0','机器人',NULL,NULL,'13134109977',NULL,'op02s4hqkkfbDD1quIULQ8E9TwRU',NULL,NULL,'10.0.8.14','','2023-10-27 14:47:31','2023-10-26 16:11:03','2023-10-26 16:13:12',NULL),
	(44,1,'hl_a56624573',NULL,NULL,NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4szQy1a_qqnDNBIt643bih4',NULL,NULL,NULL,'','2023-10-30 10:08:33','2023-10-30 10:08:33','2023-10-30 10:08:33',NULL),
	(45,2,'hl_a54461571','111','/uploads/normal-avatars/sex-012.png',NULL,NULL,0,'{\"key\":\"zhipin\",\"value\":[2,0]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4nmSNPbmJ8iwqcCRl-H74dI',NULL,NULL,'10.0.8.14','','2023-10-31 15:24:31','2023-10-30 17:39:42','2023-10-30 17:40:04',NULL),
	(46,2,'hl_a09087583','Charles正泉','/uploads/normal-avatars/sex-115.png',NULL,NULL,1,'{\"key\":\"zhipin\",\"value\":[0,2]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vllnME96C7JPHus0K0IjGE',NULL,NULL,'223.104.41.22','','2023-10-30 20:08:55','2023-10-30 20:06:32','2023-10-30 20:07:31',NULL),
	(47,2,'hl_a45943511','槙岛圣护','/uploads/files/JA3Sc2RocqrGEZKyMwZbJFyqxsxKamYj.jpg','2001-08-13',158,0,'{\"key\":\"zhipin\",\"value\":[0,0]}','[\"/uploads/files/evSh5Md7ALlm6zGXjjasO693d7xHcBsu.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vK7NqYrMGoluds8GWRCt0c',NULL,NULL,'10.0.8.14','','2023-11-11 22:30:27','2023-10-31 18:02:55','2023-10-31 18:04:11',NULL),
	(49,2,'hl_a20353909','雅齐','/uploads/files/2pOGyuRXYSxx0pgb2h3fWKgogufYsqjx.jpg',NULL,NULL,0,'{\"key\":\"zhipin\",\"value\":[7,5]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4m3WJxRN50cI5oOuyH8gijI',NULL,NULL,'103.216.43.147','','2023-11-09 08:35:50','2023-11-08 14:28:42','2023-11-09 08:35:45',NULL),
	(50,1,'hl_a68726129',NULL,NULL,NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4m4Nr1PEtStJ7w17Bq1D7-I',NULL,NULL,'223.104.159.174','','2023-11-09 09:35:41','2023-11-09 08:41:38','2023-11-09 08:41:38',NULL),
	(51,2,'hl_a87121976','骑⃰着⃰蜗⃰牛⃰追⃰飞⃰机⃰','/uploads/files/xezFHPBcl53OSOmtk9cK2m5jRte9bNCK.jpg',NULL,NULL,1,'{\"key\":\"zhipin\",\"value\":[0,19]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4kInUboKmBYj_Pb1w7BuvZQ',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 21:21:44','2023-11-11 19:30:16','2023-11-11 19:30:50',NULL),
	(52,2,'hl_a73199741','煎饼狗子','/uploads/files/xZw8Lie7EUFpXk5m5NJ4injEGFzeM8G3.jpg','2004-09-07',170,1,'{\"key\":\"zhipin\",\"value\":[1,3]}','[\"/uploads/files/mnVmkLx7Bu5DFqczg4825I5XdIODetj6.png\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4mxDBwPR9JbCQVCLvXoBQCk',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 20:31:07','2023-11-11 19:30:19','2023-11-11 19:32:56',NULL),
	(53,1,'hl_a53724151','不期而遇.','/uploads/files/wxzihTMXVU7b4M44qPJvOjQOVo07nNNm.jpg',NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4nPqh9v7SNFn0qphin0Dplw',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 19:41:59','2023-11-11 19:30:23','2023-11-11 19:30:23',NULL),
	(54,2,'hl_a40734152','爱璇璇','/uploads/files/AWOlqQWSqMHMZAAnV0I3QWB6q0p5q7Fx.jpg',NULL,NULL,1,'{\"key\":\"zhipin\",\"value\":[0,1]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4r1cSNWI-Z19vP4ngEhtfSo',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 20:22:42','2023-11-11 19:30:42','2023-11-11 19:31:18',NULL),
	(55,2,'hl_a24559452','noise','/uploads/files/cxfnY6pjbpuJw9EnuyWlEnOVDH6uQbCN.jpg',NULL,NULL,1,'{\"key\":\"zhipin\",\"value\":[1,0]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4ocT14JmvYZ0q3SC5LsqfT4',NULL,NULL,'10.0.8.14',NULL,'2023-11-12 13:36:53','2023-11-11 19:31:16','2023-11-11 22:37:09',NULL),
	(56,1,'hl_a16392021','科二考试上车后先系安全带','/uploads/files/P03brR4Ka4NgHbKmZsTHMab2ARuIbHyr.jpg','2003-09-15',180,1,'{\"key\":\"zhipin\",\"value\":[2,0]}','[\"/uploads/files/Psvo5u0zNmWZ0d3stkbaTEANpRn19dEp.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4iaNocoHDtARA9qGj_WqYuw',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 19:57:38','2023-11-11 19:31:43','2023-11-11 19:32:58',NULL),
	(57,1,'hl_a45097638','佳得乐！','/uploads/files/VPv9scOzxbcaCVPtUGXnJPNl2tNGYBSu.jpg',NULL,NULL,NULL,'{}','[\"/uploads/files/ASCOEESNiXzLnMhatE5KPDJsGoTIFeig.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4oet2st0zyIt9gVxhHkNRR4',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 19:44:23','2023-11-11 19:32:52','2023-11-11 19:32:52',NULL),
	(58,1,'hl_a21751174','張珈赫','/uploads/files/OJYnl3Sv7TilJF2U0zbXo1UDcSmO050n.jpg','2002-06-01',181,1,'{\"key\":\"zhipin\",\"value\":[1,2]}','[\"/uploads/files/tpoTwD42OiSzrKzcOQI4XUkRAzKiIRbg.jpg\"]',NULL,'我们追逐的是五角星的星光',NULL,NULL,NULL,NULL,NULL,'18764211555',NULL,'op02s4rG4RaVscaSZbv-n6z0eXm0',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 20:56:01','2023-11-11 19:34:45','2023-11-11 19:37:32',NULL),
	(59,2,'hl_a47851358','','/uploads/files/JXOw4KmkFur7pIz618WZNgYjjIhBvHrn.jpg','2002-11-08',187,1,'{\"key\":\"zhipin\",\"value\":[0,1]}','[\"/uploads/files/9tN95poxz1RO7QyL4nIjBhxP0l9KPgBf.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4hwQ1jEmyDeyodH5mlAm6bY',NULL,NULL,'10.0.8.14',NULL,'2023-11-13 17:51:55','2023-11-11 19:36:42','2023-11-11 19:38:04',NULL),
	(60,2,'hl_a22603795','+7','/uploads/files/tJDobQE3XnJjg883mUJcjGnM53FM0e1v.jpg',NULL,169,NULL,'{}','[]',NULL,'人总是要和握不住的东西说再见的。',NULL,NULL,NULL,NULL,NULL,'18105422952',NULL,'op02s4qGTCUrJnrrptRy8puvQhxA',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 21:59:40','2023-11-11 19:45:11','2023-11-11 19:45:11',NULL),
	(61,2,'hl_a57190617','不见君','/uploads/files/nWs1wVGbh1tvE5nsRNVIa5OEmdCcQudJ.jpg',NULL,183,1,'{\"key\":\"zhipin\",\"value\":[0,20]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4igUQag_uUnmM3ioxYCeCGI',NULL,NULL,'10.0.8.14',NULL,'2023-11-13 10:00:02','2023-11-11 19:47:16','2023-11-11 21:21:38',NULL),
	(62,1,'hl_a60125001','🇨🇳','/uploads/files/AdOb0leY8BjxjbFAS5NiGqoSHmDtpMzD.jpg','2004-11-06',175,1,'{\"key\":\"zhipin\",\"value\":[3,1]}','[\"/uploads/files/vFF7Gq6yvzgOVMdDSfefIirvGeiD9DHc.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4i6Cv-YIdcRtjXAUVkmiA0w',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 20:11:33','2023-11-11 20:07:48','2023-11-11 20:09:22',NULL),
	(63,2,'hl_a20696176','斩','/uploads/files/KONxjeWw2jc8Ld358FGylVDGgHTvmfMp.jpg','2000-01-01',180,1,'{\"key\":\"zhipin\",\"value\":[0,10]}','[\"/uploads/files/vKG8RR2zjnkwqLVdLhnltPZvI9bBAio8.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4oLkAZ2KiHKDzX4Ghh_uTcM',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 21:09:38','2023-11-11 20:25:31','2023-11-11 20:27:21',NULL),
	(64,1,'hl_a68441203','奶汁樱桃','/uploads/files/azrzPgtq1MlkSC6Nq9zolffJ3G0fFUnz.jpg','1999-01-01',161,0,'{\"key\":\"zhipin\",\"value\":[1,0]}','[\"/uploads/files/09cKGsqzz1wMjiutCJXK0x664e8bCk4H.jpg\",\"/uploads/files/XJA07qix7199VDsjaJdoGrGWa2M0tveH.jpg\",\"/uploads/files/T75XZREcUGBdTu7ENnMDMXMLjI8tcdKw.jpg\",\"/uploads/files/1nQDg3Q1K64YiniHks7y7i5wfmd5cst2.jpg\",\"/uploads/files/8PgEtojU2ospiErjZpSkSfExm8Kk86gp.jpg\",\"/uploads/files/9bilSd6u215G0XuHBQYcT79whTlfTymX.jpg\",\"/uploads/files/bCSDkf7H9pREsV5qnBUMStyQgOP2kAsB.jpg\",\"/uploads/files/2hbnitlsDPxhNftZetcZVSVzUtsIhjiT.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4rj-GlK2AkRpwKCiNN1A-S0',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 22:46:50','2023-11-11 20:43:13','2023-11-11 21:00:58',NULL),
	(65,1,'hl_a79349105','姜金玲','/uploads/files/rp901zWFTeg6FKoqfZw3g0F41eEpGaOn.jpg','2004-07-26',172,1,'{\"key\":\"zhipin\",\"value\":[1,0]}','[\"/uploads/files/s7INagWVcR2WdAf8tu7E6hNESqBE1UIO.jpg\",\"/uploads/files/VBQMQviwJ9y9QXCcwuPFVNTHpmqJutWg.jpg\",\"/uploads/files/5bBykpsSDLCyyOBxKhX16AezerwC3WKA.jpg\",\"/uploads/files/yiGdZwEEDU2nxZz4X9UWhx7031LK17p7.jpg\",\"/uploads/files/3gITUBWp3HZrWmgFAErM6Q2G5Q9mTovY.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'18745848680',NULL,'op02s4rqqhqd19ycR8feZ4ATrReI',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 22:43:18','2023-11-11 21:09:32','2023-11-11 21:18:16',NULL),
	(66,1,'hl_a72530367','1','/uploads/files/1bg0qTuxy8I1kbXyF1By96EAfdcOIOWx.jpg',NULL,200,0,'{\"key\":\"zhipin\",\"value\":[10,0]}','[\"/uploads/files/OiOpPwStUKyYT4Oz2327Nmblo0deONgo.jpg\",\"/uploads/files/XlGxbJ7P6pflQO2fWdO0Nv4yMOTNXtA0.jpg\",\"/uploads/files/kJNusMmXmKWgz0dyEZzpkJAbaJITfZ7u.jpg\",\"/uploads/files/4qCosQ59lv37wK6XgzcyBIUmgsr17CVc.jpg\",\"/uploads/files/e2DhJplxXHnpNzu1M8sDzmaO2iEBr98c.jpg\"]',NULL,'姐的冷酷  零下8度\n',NULL,NULL,NULL,NULL,NULL,'18249284319',NULL,'op02s4gP8SD0uDcp37ydg3i9JrwM',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 22:46:30','2023-11-11 21:10:13','2023-11-11 21:10:46',NULL),
	(67,2,'hl_a58894817','乌鱼乌鱼','/uploads/files/KUmQDRmZd0RvkXVM6nNzgPcA5xMHsRdS.jpg',NULL,185,1,'{\"key\":\"zhipin\",\"value\":[0,1]}','[]',NULL,'我的母语是无语',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4u6cvkfECyZdpfckFtDcmKY',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 21:18:07','2023-11-11 21:13:01','2023-11-11 21:13:47',NULL),
	(68,2,'hl_a59873898','北方青年.','/uploads/files/oUcF8f7wVTPiYkZJOQikCk5CbiMnWdeW.jpg',NULL,NULL,1,'{\"key\":\"zhipin\",\"value\":[0,1]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4uL1XbgjJXN5ho7K5L2YaVw',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 21:29:20','2023-11-11 21:15:46','2023-11-11 21:18:05',NULL),
	(69,1,'hl_a77205715','南方老北鼻','/uploads/files/TH0ydLB2h39lyNUZ0TYDowEsIZyr4trN.jpg','2001-11-12',180,1,'{\"key\":\"zhipin\",\"value\":[0,4]}','[\"/uploads/files/TavJhqB7spIRsUQO4gqjaJjuZtqrpJHD.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4k_zO8A9uf90EzL71Sh5aWU',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 21:16:36','2023-11-11 21:16:36','2023-11-11 21:19:42',NULL),
	(70,2,'hl_a16337054','Yy','/uploads/files/uQ2OFjF3UAnqjAJtoBXC59lFdYKMcckq.jpg','2003-11-14',168,0,'{\"key\":\"zhipin\",\"value\":[0,0]}','[\"/uploads/files/TbrWGFCrDZXr6iK2nDtfZoNWKNnzZic7.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4p8eupfXYWGdmHf_32EeGHs',NULL,NULL,'10.0.8.14',NULL,'2023-11-12 12:12:35','2023-11-11 21:21:55','2023-11-11 21:23:50',NULL),
	(71,2,'hl_a54411643','今天星期几ღ.','/uploads/files/HFMGM89oPAM9VjOg78n2ogyWcdBQYJHq.jpg','2004-06-04',165,0,'{\"key\":\"zhipin\",\"value\":[0,0]}','[\"/uploads/files/AZEdsoalPblFlDUvOUKqnIZFwUJoJGTK.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4iazh4o5JhbP6rlGBnydtqM',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 22:34:56','2023-11-11 21:22:08','2023-11-11 21:23:51',NULL),
	(72,1,'hl_a04893937','困困困困困死啦','/uploads/files/czCr5DozigYS3wU2M6M0DnNOfEMlK7Ct.jpg','2003-12-12',160,0,'{\"key\":\"zhipin\",\"value\":[3,3]}','[\"/uploads/files/m9gr3cDcmn2p0EUnOPsejr5lxTw006pz.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4mCD_BsKOPKy2sRmzASWld4',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 22:10:04','2023-11-11 21:24:55','2023-11-11 21:26:49',NULL),
	(73,2,'hl_a96886310','多巴胺、','/uploads/files/6459hjV1WEV4i1dbVQRtgLTqwXOpMOJO.jpg',NULL,NULL,1,'{\"key\":\"zhipin\",\"value\":[0,1]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4i1RvIkTLgx0dXDxf5sNA7Y',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 21:42:26','2023-11-11 21:25:14','2023-11-11 21:25:37',NULL),
	(74,1,'hl_a45675875',NULL,NULL,NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4nHm3T0gAzloxAjzhHrCMEc',NULL,NULL,NULL,NULL,'2023-11-11 21:25:20','2023-11-11 21:25:20','2023-11-11 21:25:20',NULL),
	(75,1,'hl_a26608468','张有志','/uploads/files/GTNGBhajrtiLUiBvMzlNFXNp4Oa8ZTX9.jpg','2000-01-01',170,1,'{\"key\":\"zhipin\",\"value\":[0,4]}','[\"/uploads/files/NncGEIBoYM6Nf26awazXA331n2S8tDBI.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4qigL7HXpmORlkVQAp5kuZ8',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 21:25:21','2023-11-11 21:25:21','2023-11-11 21:27:10',NULL),
	(76,1,'hl_a80271710','Starshine','/uploads/files/AwLuhPRPEvkp9CzogcOheOh3mvITaM9z.jpg','2003-03-06',168,0,'{\"key\":\"zhipin\",\"value\":[3,0]}','[\"/uploads/files/nG301F9djbd8j7hTJnYG0j7E23rYmZqa.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4ssz0v3OReTVkyRiiFiAb-0',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 21:26:53','2023-11-11 21:26:53','2023-11-11 21:28:01',NULL),
	(77,1,'hl_a21409999','Sunset🌕','/uploads/files/KsYWLxVPZN1RAMkBh5JYSpCGFgGRNzRB.jpg','2001-02-01',185,1,'{\"key\":\"zhipin\",\"value\":[2,6]}','[\"/uploads/files/yf6449n0cUbuEEsHsxDXMnB3gqSPZqzX.jpg\",\"/uploads/files/KwXwWXZoRLHaDpI6wLCgdSIp8U4wo6Sx.jpg\",\"/uploads/files/bM1spg2k2mP7iZmCQn6FPsIOxzNZqdRu.jpg\",\"/uploads/files/sbhORk5rslKQiWsJz5LOOYlPw6SCeHcG.jpg\",\"/uploads/files/qaS5BscQpTu61ezB2U1aOvFtdRXRLyQG.jpg\"]',NULL,'面朝大海，春暖花开',NULL,'1',NULL,NULL,NULL,'15146392671',NULL,'op02s4qXC5xXt6OBCjBUzltRlyb8',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 22:42:57','2023-11-11 21:58:36','2023-11-11 21:59:41',NULL),
	(78,1,'hl_a04144909','漠北也有浪漫','/uploads/files/cBsMiGy74ZynnO1Nvfy6gkZxgiWOATKi.jpg','2003-01-09',175,1,'{\"key\":\"zhipin\",\"value\":[0,8]}','[\"/uploads/files/0lLQms0ytyK06Eov1gZaZ3TVcWl5i6gP.jpg\",\"/uploads/files/T092irHo2hJQYlBqbvW5HByrAUrrCEWa.jpg\",\"/uploads/files/DA5Eoh2lthjhGUrFxKAYwe6F8oaRYEpy.jpg\",\"/uploads/files/ftWKVGjQpigTYcbEEZhtqs7C4rffY4Lv.jpg\",\"/uploads/files/a1TbwYsuXA9MC4Kya5e7JOgr52N7ijR7.jpg\"]',NULL,'我想要的其实很简单',NULL,'1',NULL,NULL,NULL,'18246412640',NULL,'op02s4puda42xJFrg2lbtVMTyj2w',NULL,NULL,'10.0.8.14',NULL,'2023-11-11 22:48:16','2023-11-11 22:09:10','2023-11-11 22:10:19',NULL);

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
