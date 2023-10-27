# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20051
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: 127.0.0.1 (MySQL 5.7.26)
# 数据库: Hunlian
# 生成时间: 2023-10-27 10:26:44 +0000
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

INSERT INTO `answer` (`id`, `content`, `user_id`, `relation_question_id`, `introduce_name`, `introduce_openid`, `photos`, `type`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(3,'当然是拯救世界啦！','hl_a90915530','1',NULL,NULL,'[\"/uploads/files/OCPkev0TzsrSVPXgRcB1UhuT7oYx8lD7.jpg\"]',0,'2023-10-24 18:12:33','2023-10-24 18:12:33',NULL),
	(4,'拜托生活，少一些莫名其妙的不快乐','hl_a18254325','1',NULL,NULL,'[]',0,'2023-10-26 15:24:27','2023-10-26 15:24:27',NULL),
	(5,'吃辣星人','hl_a18254325','2',NULL,NULL,'[]',0,'2023-10-26 15:24:46','2023-10-26 15:24:46',NULL),
	(6,'高高帅帅，可可爱爱！','hl_a18254325','9',NULL,NULL,'[]',0,'2023-10-26 15:25:01','2023-10-26 15:25:01',NULL),
	(7,'大学本科','hl_a18254325','3',NULL,NULL,'[]',0,'2023-10-26 15:25:13','2023-10-26 15:25:13',NULL),
	(8,'父母双全，有个小弟。','hl_a18254325','3',NULL,NULL,'[]',0,'2023-10-26 15:25:34','2023-10-26 15:25:34',NULL),
	(9,'看电影听音乐','hl_a18254325','7',NULL,NULL,'[]',0,'2023-10-26 15:25:46','2023-10-26 15:25:46',NULL),
	(10,'甜酷','hl_a18254325','10',NULL,NULL,'[]',0,'2023-10-26 15:27:31','2023-10-26 15:27:31',NULL),
	(11,'天天都开心','hl_a45082499','1',NULL,NULL,'[]',0,'2023-10-26 15:31:02','2023-10-26 15:31:02',NULL),
	(12,'偶尔健健身','hl_a45082499','8',NULL,NULL,'[]',0,'2023-10-26 15:31:15','2023-10-26 15:31:15',NULL),
	(13,'每日晨跑','hl_a75816652','2',NULL,NULL,'[]',0,'2023-10-26 15:32:44','2023-10-26 15:32:44',NULL),
	(14,'风景照','hl_a19680457','11',NULL,NULL,'[]',0,'2023-10-26 15:33:15','2023-10-26 15:33:15',NULL),
	(15,'躺平','hl_a19680457','4',NULL,NULL,'[]',0,'2023-10-26 15:33:24','2023-10-26 15:33:24',NULL),
	(16,'学习','hl_a19680457','7',NULL,NULL,'[]',0,'2023-10-26 15:33:37','2023-10-26 15:33:37',NULL),
	(17,'不是很美好','hl_a19680457','6',NULL,NULL,'[]',0,'2023-10-26 15:33:50','2023-10-26 15:33:50',NULL),
	(18,'温柔多金善良','hl_a19680457','5',NULL,NULL,'[]',0,'2023-10-26 15:34:02','2023-10-26 15:34:02',NULL),
	(19,'喜欢跑步','hl_a19680457','8',NULL,NULL,'[]',0,'2023-10-26 15:34:10','2023-10-26 15:34:10',NULL),
	(20,'明年去哈尔滨旅游…','hl_a75816652','1',NULL,NULL,'[]',0,'2023-10-26 15:35:11','2023-10-26 15:35:11',NULL),
	(21,'快乐小狗','hl_a88076879','5',NULL,NULL,'[]',0,'2023-10-26 15:50:29','2023-10-26 15:50:29',NULL),
	(22,'快乐小狗','hl_a88076879','5',NULL,NULL,'[]',0,'2023-10-26 15:50:31','2023-10-26 15:50:31',NULL),
	(23,'喜欢音乐，旅游','hl_a35324426','7',NULL,NULL,'[]',0,'2023-10-26 16:10:39','2023-10-26 16:10:39',NULL),
	(24,'不健身，感觉太累了','hl_a35324426','8',NULL,NULL,'[]',0,'2023-10-26 16:10:51','2023-10-26 16:10:51',NULL),
	(25,'是自己','hl_a12419437','11',NULL,NULL,'[]',0,'2023-10-26 16:20:41','2023-10-26 16:20:41',NULL),
	(26,'是的','hl_a12419437','8',NULL,NULL,'[]',0,'2023-10-26 16:25:00','2023-10-26 16:25:00',NULL),
	(27,'成为富婆','hl_a34770909','1',NULL,NULL,'[]',0,'2023-10-26 17:14:47','2023-10-26 17:14:47',NULL),
	(28,'平安健康','hl_a16846511','1',NULL,NULL,'[]',0,'2023-10-27 10:25:38','2023-10-27 10:25:38',NULL);

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


# 转储表 comments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 Type ID',
  `relation_type_id` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 Type ID',
  `user_id` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 User ID',
  `comment_content` varchar(128) CHARACTER SET utf8mb4 NOT NULL COMMENT '评论内容',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '状态 0 - 删除；1 - 发布	',
  `ip` varchar(16) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;

INSERT INTO `comments` (`id`, `type`, `relation_type_id`, `user_id`, `comment_content`, `status`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(2,'moment','2','hl_a90915530','天气真好哇 ☁️',1,'10.0.8.14','2023-10-24 18:10:50','2023-10-24 18:10:50',NULL);

/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 customer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `status` bigint(1) DEFAULT '1' COMMENT '客户状态 0 - 删除；1 - 发布；2 - 草稿',
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

INSERT INTO `customer` (`id`, `status`, `user_id`, `relation_user_id`, `relation`, `relation_log_id`, `introduction`, `userinfo`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(2,1,'hl_a90915530',NULL,'0',4,'人美心善的女孩','{\"openid\":\"op02s4vhiiLffHPfdB7LKmpMdr_I\",\"relation\":\"0\",\"introduction\":\"人美心善的女孩\",\"photos\":[\"/uploads/files/TnXkHGqIOwkDCYZkX7xQ3t1fTSsT9V6c.jpg\"],\"type\":1,\"avatar\":\"http://tmp/bu6BqAYGGH6q3d363a6f448fec0e083d4b1acf8c84c2.jpg\",\"avatar_url\":\"/uploads/files/KGvDmQtTiDdmaiH6NI1vxQ7SAPLGxwdh.jpg\",\"nickname\":\"大聪明\",\"sex\":\"0\",\"height\":166,\"birthday\":\"1999-01-01\",\"work\":{\"key\":\"zhipin\",\"value\":[4,0]},\"files\":[\"http://tmp/0veo6Ezp6icZ094b50e2e03841797ff499c708fb5b97.jpg\"]}','2023-10-24 18:29:07','2023-10-24 18:29:07','2023-10-26 15:08:01'),
	(3,1,'hl_a90915530',NULL,'0',5,'在 USA 读博中，希望遇见一个喜欢的他。😘121212在 USA 读博中，希望遇见一个喜欢的他。😘121212在 USA 读博中，希望遇见一个喜欢的他。😘121212','','2023-10-24 18:29:07','2023-10-24 18:29:07',NULL),
	(4,1,'hl_a77713707',NULL,'0',6,'个性车模 😈 ','{\"openid\":\"op02s4vkWz17jyhDWsWuzDrV41_E\",\"relation\":\"0\",\"introduction\":\"个性车模 😈 \",\"photos\":[\"/uploads/files/2U5jTHFh1uzl30GyoGWlmWFGZ6JQbO2p.jpg\",\"/uploads/files/N13Y6VQl6Scb95sndrIKH3RkBGt62M1x.jpg\",\"/uploads/files/BVOFXMczZWxs7ne713gf8TkJgPp6hvik.jpg\",\"/uploads/files/Zwndgs60UNOGHQ2IkLmd90g23JY1wIVj.jpg\"],\"type\":1,\"nickname\":\"小甜甜\",\"sex\":\"0\",\"height\":173,\"birthday\":\"1995-01-01\",\"work\":{\"key\":\"zhipin\",\"value\":[11,5]},\"files\":[\"wxfile://tmp_724e6f82aaaa3704ac3ab22e7c66e8ecdae4c5ef4c1b2161.jpg\"]}','2023-10-25 18:10:01','2023-10-25 18:10:01',NULL);

/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 customer_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer_log`;

CREATE TABLE `customer_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(40) DEFAULT NULL COMMENT '用户ID',
  `nickname` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '昵称',
  `avatar_url` varchar(128) DEFAULT NULL COMMENT '头像',
  `birthday` varchar(12) DEFAULT NULL COMMENT '生日',
  `height` int(11) unsigned DEFAULT NULL COMMENT '身高',
  `sex` int(1) DEFAULT NULL COMMENT '性别',
  `work` varchar(50) DEFAULT '{}' COMMENT '职业工作',
  `photos` varchar(1000) DEFAULT '[]' COMMENT '图片集',
  `videos` varchar(500) DEFAULT NULL COMMENT '介绍视频',
  `detail` longtext COMMENT '个人介绍',
  `contact` varchar(50) DEFAULT NULL COMMENT '联系方式',
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

INSERT INTO `customer_log` (`id`, `user_id`, `nickname`, `avatar_url`, `birthday`, `height`, `sex`, `work`, `photos`, `videos`, `detail`, `contact`, `location`, `realname`, `phone`, `wechat_union_id`, `wechat_open_id`, `wechat_platform_open_id`, `parent_id`, `ip`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(4,NULL,'大聪明','/uploads/files/KGvDmQtTiDdmaiH6NI1vxQ7SAPLGxwdh.jpg','1999-01-01',166,0,'{\"key\":\"zhipin\",\"value\":[4,0]}','[\"/uploads/files/2GQ6uwNXugR6eWD8AYm5eCH6aZ0UDzg0.jpg\", \"/uploads/files/TnXkHGqIOwkDCYZkX7xQ3t1fTSsT9V6c.jpg\", \"/uploads/files/rMp4Y9km65FkpIC3XOYpQovkcyieSqUo.jpg\", \"/uploads/files/I4MbhatLDwwTtwNVG97ym5jRQ0VmKsK0.jpg\", \"/uploads/files/FbPVlAFTnTMEwz1H2HpW5XDGcG5bTShB.jpg\", \"/uploads/files/rMp4Y9km65FkpIC3XOYpQovkcyieSqUo.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-24 18:29:07','2023-10-24 18:29:07',NULL),
	(5,NULL,'是小欢子呀','/uploads/files/qYLHcgYxr63cRITMfNs2d80ikGgIbAVE.jpg','1998-05-07',174,0,'{\"key\":\"zhipin\",\"value\":[3,1]}','[\"/uploads/files/5HaneJfTWus4eL17O4z4sgGne63pSfTO.jpg\",\"/uploads/files/15CJwN177y2cF2FOLi7rKfY4Ug94WB7y.jpg\",\"/uploads/files/w1W1BFoMug8kFCpnDWBdyUpvhx0eOlQa.jpg\",\"/uploads/files/cqMR1HKMdnD59wffDowvObsUwruoORCZ.jpg\",\"/uploads/files/Zf1gUqYuw3G7133xuC7fBCDXh3lXvFMT.jpg\",\"/uploads/files/6dJ83B9JsOlVKHOIOZL70xkbWbzWhp7Z.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-25 09:33:25','2023-10-25 09:33:25',NULL),
	(6,NULL,'小甜甜','/uploads/normal-avatars/sex-014.png','1995-01-01',173,0,'{\"key\":\"zhipin\",\"value\":[11,5]}','[\"/uploads/files/2U5jTHFh1uzl30GyoGWlmWFGZ6JQbO2p.jpg\",\"/uploads/files/N13Y6VQl6Scb95sndrIKH3RkBGt62M1x.jpg\",\"/uploads/files/BVOFXMczZWxs7ne713gf8TkJgPp6hvik.jpg\",\"/uploads/files/Zwndgs60UNOGHQ2IkLmd90g23JY1wIVj.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-25 18:10:01','2023-10-25 18:10:01',NULL);

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
  `works` varchar(128) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '评论内容',
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
	(2,'韩伟','/uploads/avatars/sfIc0ZcC9LNUu81zjgDC4RVqYmQQNYp6.jpeg','1',NULL,'中央美术学院学士,装配式资深设计师,高级工程师','至今主持参与工程项目300万平米\\r\\n主持项目：国家会议中心、中国国家博物馆--复兴之路、北辰洲际酒店、北京市教委、北京文化部、海淀国土局、海淀地税局',1,NULL,'2023-10-23 17:01:31','2023-10-23 17:01:31',NULL),
	(3,'颜世俊','/uploads/avatars/OVmJOjiJMzGRFPGP36DiI5drr5qqJoSV.jpeg','1',NULL,'辽宁广电大学学士,前木棉中国设计总监','主案办公设计项目60万平米、青岛宜家办公楼设计顾问成员、办公设计落地项目40万平米',1,NULL,'2023-10-23 17:05:56','2023-10-23 17:05:56',NULL),
	(4,'贾鹦','/uploads/avatars/iRryyn5zNXwq2ldyMl4c0oCCnGjZQso9.jpg','0',NULL,'设计师,色彩搭配师',NULL,1,NULL,'2023-10-23 17:15:35','2023-10-23 17:15:35',NULL);

/*!40000 ALTER TABLE `designers` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 files
# ------------------------------------------------------------

DROP TABLE IF EXISTS `files`;

CREATE TABLE `files` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `clientName` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `fileName` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `filePath` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `fieldName` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `size` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `type` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `subtype` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `status` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `extname` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `related_id` varchar(60) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `describe` varchar(250) COLLATE utf8mb4_unicode_520_ci DEFAULT '',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='文件';



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
	(7,'answer','28','hl_a90915530',1,'10.0.8.14','2023-10-27 11:04:15','2023-10-27 11:04:15',NULL);

/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 moments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `moments`;

CREATE TABLE `moments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
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

INSERT INTO `moments` (`id`, `user_id`, `content`, `photos`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(2,'hl_a90915530','秋来，叶落 🍂','[\"/uploads/files/u7a8GJxhd4Nedd4BjOZlThwWns9xJ9cT.jpg\"]','2023-10-24 17:55:40','2023-10-24 17:55:40',NULL),
	(3,'hl_a10140140','超级无敌喜欢吃火锅的！','[]','2023-10-26 15:27:57','2023-10-26 15:27:57',NULL),
	(4,'hl_a45082499','日落尤其温柔，人间皆是浪漫','[]','2023-10-26 15:31:53','2023-10-26 15:31:53',NULL),
	(5,'hl_a19680457','一个人最好的样子是被宠出来的','[]','2023-10-26 15:32:59','2023-10-26 15:32:59',NULL),
	(6,'hl_a75816652','你好………','[]','2023-10-26 15:34:18','2023-10-26 15:34:18',NULL),
	(7,'hl_a88076879','咕噜咕噜冒个泡','[]','2023-10-26 16:02:14','2023-10-26 16:02:14',NULL),
	(8,'hl_a35324426','今天天气很不错','[]','2023-10-26 16:09:12','2023-10-26 16:09:12',NULL),
	(9,'hl_a12419437','你好，秋天🍂','[]','2023-10-26 16:24:43','2023-10-26 16:24:43',NULL);

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
  `avatar_url` varchar(128) DEFAULT NULL COMMENT '头像',
  `birthday` varchar(12) DEFAULT NULL COMMENT '生日',
  `height` int(11) unsigned DEFAULT NULL COMMENT '身高',
  `sex` int(1) DEFAULT NULL COMMENT '性别',
  `work` varchar(50) DEFAULT '{}' COMMENT '职业工作',
  `photos` varchar(1000) DEFAULT '[]' COMMENT '图片集',
  `videos` varchar(500) DEFAULT NULL COMMENT '介绍视频',
  `detail` longtext COMMENT '个人介绍',
  `contact` varchar(50) DEFAULT NULL COMMENT '联系方式',
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

INSERT INTO `users` (`id`, `type`, `user_id`, `nickname`, `avatar_url`, `birthday`, `height`, `sex`, `work`, `photos`, `videos`, `detail`, `contact`, `school`, `company`, `location`, `realname`, `phone`, `wechat_union_id`, `wechat_open_id`, `wechat_platform_open_id`, `parent_id`, `ip`, `online_at`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(25,2,'hl_a90915530','KMT 184.05','/uploads/files/lK4JVEZZ0bhVk5LsFUMKN8oBkCYRUDnF.jpeg','1997-02-01',173,1,'{\"key\":\"zhipin\",\"value\":[0,12]}','[\"/uploads/files/fWb1balGB2IQSWdccNXPVR44wFpyyBcR.png\",\"/uploads/files/pkfG33cwtPa2HiKpkdRhuqwufkCZaZV3.png\",\"/uploads/files/BQhpEI5rQGS62hhgTqM9CNtvfY3mbciU.png\",\"/uploads/files/tmeX8Fs0ysGLjOJK5NBlYb0aZG9IekLt.png\",\"/uploads/files/SxzWdvqrvn3SzdQ2tYynmQGvqB5qcHMi.png\",\"/uploads/files/58BuhpjqCcNPM4Cwp1c7Rq2dSYYkMlhW.png\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vhiiLffHPfdB7LKmpMdr_I',NULL,NULL,'10.0.8.14','2023-10-27 18:02:23','2023-10-24 17:48:25','2023-10-24 17:50:28',NULL),
	(29,2,'hl_a77713707','💐','/uploads/files/iU8zhMAB2cAKEfC83YrkpJ68rA1vtWFO.jpg','1997-01-01',167,0,'{\"key\":\"zhipin\",\"value\":[5,0]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vkWz17jyhDWsWuzDrV41_E',NULL,NULL,'10.0.8.14','2023-10-26 18:11:27','2023-10-25 18:05:17','2023-10-25 18:06:13',NULL),
	(30,1,'hl_a94942316',NULL,NULL,NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4mdlhDDXIVKQE2sg3kf_lcI',NULL,NULL,NULL,'2023-10-26 13:46:48','2023-10-26 13:46:48','2023-10-26 13:46:48',NULL),
	(31,1,'hl_a45082499','与月亮私奔',NULL,NULL,162,NULL,'{\"key\":\"zhipin\",\"value\":[4,1]}','[]',NULL,'日落即是温柔，人间浪漫',NULL,'陕西科技大学','空军军医大学第一附属医院',NULL,NULL,'18523584230',NULL,'op02s4t9pXQZwBdxtCfToEHwIaTY',NULL,NULL,'10.0.8.14','2023-10-26 16:04:35','2023-10-26 15:17:37','2023-10-26 15:17:37',NULL),
	(32,1,'hl_a79908519','热爱山海',NULL,NULL,165,NULL,'{\"key\":\"zhipin\",\"value\":[0,0]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'19860918085',NULL,'op02s4gT-Hr2uxbC_vEHOjf234dE',NULL,NULL,'10.0.8.14','2023-10-26 16:02:08','2023-10-26 15:17:56','2023-10-26 15:17:56',NULL),
	(33,1,'hl_a18254325','南浔',NULL,NULL,170,NULL,'{}','[]',NULL,'众你寻他千百度',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4n4Vhg4zFvnVbKzSC6bnf1Y',NULL,NULL,'10.0.8.14','2023-10-26 15:29:53','2023-10-26 15:18:15','2023-10-26 15:18:15',NULL),
	(34,1,'hl_a64615905',NULL,NULL,NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4qcZqUCpoYq75ny0h8-EV_E',NULL,NULL,'10.0.8.14','2023-10-26 16:04:10','2023-10-26 15:18:49','2023-10-26 15:18:49',NULL),
	(35,1,'hl_a10140140','babada','/uploads/normal-avatars/sex-017.png','1999-02-25',155,0,'{\"key\":\"zhipin\",\"value\":[6,3]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4gGwaOLEdT2Asy2fI87RhLg',NULL,NULL,'10.0.8.14','2023-10-26 15:41:52','2023-10-26 15:19:50','2023-10-26 15:24:04',NULL),
	(36,1,'hl_a28939076',NULL,NULL,NULL,NULL,NULL,'{}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4iEsvekWPMwPAXKjkAxAbYM',NULL,NULL,NULL,'2023-10-26 15:20:01','2023-10-26 15:20:01','2023-10-26 15:20:01',NULL),
	(37,1,'hl_a19680457','绿洲','/uploads/normal-avatars/sex-011.png','1999-01-01',166,0,'{\"key\":\"zhipin\",\"value\":[3,3]}','[]',NULL,'日照金山',NULL,'南京大学','华为',NULL,NULL,'18822073831',NULL,'op02s4jp3Cncjf5YZjraTnHLkDmQ',NULL,NULL,'10.0.8.14','2023-10-26 15:42:17','2023-10-26 15:24:37','2023-10-26 15:26:09',NULL),
	(38,1,'hl_a75816652','bsa','/uploads/normal-avatars/sex-015.png','2001-01-04',164,0,'{\"key\":\"zhipin\",\"value\":[2,0]}','[]',NULL,'寻找一片云',NULL,'山东科技大学','兴业银行',NULL,NULL,'19906405498',NULL,'op02s4npunh0azL11_2Yg_BEy8Mg',NULL,NULL,'10.0.8.14','2023-10-27 16:58:27','2023-10-26 15:27:57','2023-10-27 16:53:58',NULL),
	(39,1,'hl_a16846511','pumpkin','/uploads/normal-avatars/sex-015.png','2000-01-29',168,0,'{\"key\":\"zhipin\",\"value\":[2,0]}','[]',NULL,'11',NULL,'0','无',NULL,NULL,'13820328675',NULL,'op02s4merBxXTrbYLriYPcIffJHg',NULL,NULL,'10.0.8.14','2023-10-27 10:26:28','2023-10-26 15:34:11','2023-10-26 15:35:14',NULL),
	(40,1,'hl_a34770909','耶','/uploads/normal-avatars/sex-015.png','1999-11-13',159,0,'{\"key\":\"zhipin\",\"value\":[3,1]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4tlL5X5oLEim4T-j5r43tpE',NULL,NULL,'10.0.8.14','2023-10-26 17:16:07','2023-10-26 15:35:01','2023-10-26 15:36:58',NULL),
	(41,1,'hl_a88076879','Ostrich','/uploads/normal-avatars/sex-015.png','2001-02-01',161,0,'{\"key\":\"zhipin\",\"value\":[1,0]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4i2kATw38yViGlJE_pYkchs',NULL,NULL,'10.0.8.14','2023-10-26 18:02:05','2023-10-26 15:45:53','2023-10-26 15:47:35',NULL),
	(42,2,'hl_a35324426','一颗盐粒子','/uploads/normal-avatars/sex-013.png',NULL,NULL,0,'{\"key\":\"zhipin\",\"value\":[0,20]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4tpkddBtuQFf8TKWFKtKVuQ',NULL,NULL,'10.0.8.14','2023-10-26 16:11:42','2023-10-26 16:06:59','2023-10-26 16:07:52',NULL),
	(43,1,'hl_a12419437','晴天','/uploads/normal-avatars/sex-013.png','1994-03-22',160,0,'{\"key\":\"zhipin\",\"value\":[11,0]}','[]',NULL,'两岸猿声啼不住 轻舟已过万重山',NULL,'0','机器人',NULL,NULL,'13134109977',NULL,'op02s4hqkkfbDD1quIULQ8E9TwRU',NULL,NULL,'10.0.8.14','2023-10-27 14:47:31','2023-10-26 16:11:03','2023-10-26 16:13:12',NULL);

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
	(1,'名称','北京','','1000','2023-10-25','设计理念','<p>图片集合</p>',1,NULL,'2023-10-25 08:14:08','2023-10-25 08:14:08',NULL);

/*!40000 ALTER TABLE `works` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
