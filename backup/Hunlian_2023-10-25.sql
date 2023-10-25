# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20051
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: 127.0.0.1 (MySQL 5.7.26)
# 数据库: Hunlian
# 生成时间: 2023-10-25 02:37:37 +0000
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
	(3,'当然是拯救世界啦！','hl_a90915530','1',NULL,NULL,'[\"/uploads/files/OCPkev0TzsrSVPXgRcB1UhuT7oYx8lD7.jpg\"]',0,'2023-10-24 18:12:33','2023-10-24 18:12:33',NULL);

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
	(2,1,'hl_a90915530',NULL,'0',4,'人美心善的女孩','{\"openid\":\"op02s4vhiiLffHPfdB7LKmpMdr_I\",\"relation\":\"0\",\"introduction\":\"人美心善的女孩\",\"photos\":[\"/uploads/files/TnXkHGqIOwkDCYZkX7xQ3t1fTSsT9V6c.jpg\"],\"type\":1,\"avatar\":\"http://tmp/bu6BqAYGGH6q3d363a6f448fec0e083d4b1acf8c84c2.jpg\",\"avatar_url\":\"/uploads/files/KGvDmQtTiDdmaiH6NI1vxQ7SAPLGxwdh.jpg\",\"nickname\":\"大聪明\",\"sex\":\"0\",\"height\":166,\"birthday\":\"1999-01-01\",\"work\":{\"key\":\"zhipin\",\"value\":[4,0]},\"files\":[\"http://tmp/0veo6Ezp6icZ094b50e2e03841797ff499c708fb5b97.jpg\"]}','2023-10-24 18:29:07','2023-10-24 18:29:07',NULL),
	(3,1,'hl_a90915530',NULL,'0',5,'在 USA 读博中，希望遇见一个喜欢的他。😘','','2023-10-24 18:29:07','2023-10-24 18:29:07',NULL);

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
  `work` varchar(50) DEFAULT NULL COMMENT '职业工作',
  `photos` longtext COMMENT '图片集',
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
	(4,NULL,'大聪明','/uploads/files/KGvDmQtTiDdmaiH6NI1vxQ7SAPLGxwdh.jpg','1999-01-01',166,0,'{\"key\":\"zhipin\",\"value\":[4,0]}','[\"/uploads/files/TnXkHGqIOwkDCYZkX7xQ3t1fTSsT9V6c.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-24 18:29:07','2023-10-24 18:29:07',NULL),
	(5,NULL,'是小欢子呀','/uploads/files/qYLHcgYxr63cRITMfNs2d80ikGgIbAVE.jpg','1998-05-07',174,0,'{\"key\":\"zhipin\",\"value\":[3,1]}','[\"/uploads/files/5HaneJfTWus4eL17O4z4sgGne63pSfTO.jpg\",\"/uploads/files/15CJwN177y2cF2FOLi7rKfY4Ug94WB7y.jpg\",\"/uploads/files/w1W1BFoMug8kFCpnDWBdyUpvhx0eOlQa.jpg\",\"/uploads/files/cqMR1HKMdnD59wffDowvObsUwruoORCZ.jpg\",\"/uploads/files/Zf1gUqYuw3G7133xuC7fBCDXh3lXvFMT.jpg\",\"/uploads/files/6dJ83B9JsOlVKHOIOZL70xkbWbzWhp7Z.jpg\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-25 09:33:25','2023-10-25 09:33:25',NULL);

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
	(4,'answer','3','hl_a90915530',1,'10.0.8.14','2023-10-24 18:22:08','2023-10-24 18:22:08',NULL);

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
	(2,'hl_a90915530','秋来，叶落 🍂','[\"/uploads/files/u7a8GJxhd4Nedd4BjOZlThwWns9xJ9cT.jpg\"]','2023-10-24 17:55:40','2023-10-24 17:55:40',NULL);

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
  `work` varchar(50) DEFAULT NULL COMMENT '职业工作',
  `photos` longtext COMMENT '图片集',
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
	(25,2,'hl_a90915530','KMT 184.05','/uploads/files/lK4JVEZZ0bhVk5LsFUMKN8oBkCYRUDnF.jpeg','1997-02-01',173,1,'{\"key\":\"zhipin\",\"value\":[0,12]}','[]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vhiiLffHPfdB7LKmpMdr_I',NULL,NULL,'10.0.8.14','2023-10-25 10:37:19','2023-10-24 17:48:25','2023-10-24 17:50:28',NULL);

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
