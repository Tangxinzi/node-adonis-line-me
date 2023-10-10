# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20051
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: localhost (MySQL 5.7.39)
# 数据库: Hunlian
# 生成时间: 2023-10-10 10:28:38 +0000
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
  `relation_question_id` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 Question ID',
  `relation_user_id` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 User ID',
  `content` varchar(128) CHARACTER SET utf8mb4 NOT NULL COMMENT '描述',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;

INSERT INTO `answer` (`id`, `relation_question_id`, `relation_user_id`, `content`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(1,'1','op02s4vhiiLffHPfdB7LKmpMdr_I','喂马劈柴，周游世界','2023-10-07 16:15:39','2023-10-07 16:15:39',NULL),
	(2,'7','op02s4vhiiLffHPfdB7LKmpMdr_I','听听歌就很愉快','2023-10-07 16:20:33','2023-10-07 16:20:33',NULL),
	(3,'9','op02s4vhiiLffHPfdB7LKmpMdr_I','脚踏祥云','2023-10-07 16:26:23','2023-10-07 16:26:23',NULL),
	(4,'4','op02s4vhiiLffHPfdB7LKmpMdr_I','世界毁灭','2023-10-07 16:26:56','2023-10-07 16:26:56',NULL);

/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 customer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `status` bigint(1) DEFAULT NULL COMMENT '客户状态 0 - 删除；1 - 发布；2 - 草稿',
  `user_wechat_open_id` varchar(255) DEFAULT NULL COMMENT '发布用户 ID',
  `relation` varchar(11) DEFAULT '0' COMMENT '与红娘关系 ["朋友", "亲戚", "伙伴", "同事", "其他"]',
  `relation_log_id` bigint(10) DEFAULT NULL COMMENT '关联日志 ID',
  `relation_wechat_open_id` varchar(255) DEFAULT NULL COMMENT '关联用户 OPEN ID',
  `introduction` longtext COMMENT '红娘介绍客户信息',
  `userinfo` longtext COMMENT '用户 JSON 数据',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;

INSERT INTO `customer` (`id`, `status`, `user_wechat_open_id`, `relation`, `relation_log_id`, `relation_wechat_open_id`, `introduction`, `userinfo`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(1,1,'op02s4vhiiLffHPfdB7LKmpMdr_I','1',NULL,'op02s4vhiiLffHPfdB7LKmpMdr_I','自己的号，测试看看。','{\"age\":22,\"avatar_url\":\"/uploads/files/c9WyMZmT3nl6QKrXhNivsFAvMcv7MPBd.png\",\"birthday\":\"2001-03-01\",\"color\":\"rgba(167, 143, 80, .2)\",\"contact\":null,\"created_at\":\"2023-09-22T00:03:17.000Z\",\"deleted_at\":null,\"detail\":\"Hi 你好哇~\",\"height\":173,\"id\":2,\"ip\":{\"addr\":\" 局域网IP\",\"city\":\"\",\"cityCode\":\"0\",\"err\":\"noprovince\",\"ip\":\"10.0.8.14\",\"pro\":\"\",\"proCode\":\"999999\",\"region\":\"\",\"regionCode\":\"0\",\"regionNames\":\"\"},\"location\":null,\"modified_at\":\"2023-09-22T00:03:32.000Z\",\"nickname\":\"Jiangkun\",\"online_at\":\"2023-10-09T07:08:39.000Z\",\"parent_id\":null,\"phone\":\"17725386753\",\"photos\":[\"/uploads/files/4Yk9GYRHwbJCubuPNhCc2UL0XkfYymq0.png\",\"/uploads/files/S1O8rRym4gBMYniWqGwnHub7UtDkAGJT.png\",\"/uploads/files/2GQ6uwNXugR6eWD8AYm5eCH6aZ0UDzg0.jpg\",\"/uploads/files/rMp4Y9km65FkpIC3XOYpQovkcyieSqUo.jpg\",\"/uploads/files/FbPVlAFTnTMEwz1H2HpW5XDGcG5bTShB.jpg\",\"/uploads/files/I4MbhatLDwwTtwNVG97ym5jRQ0VmKsK0.jpg\"],\"realname\":null,\"sex\":1,\"type\":2,\"user_id\":\"10000001\",\"videos\":null,\"wechat_open_id\":\"op02s4vhiiLffHPfdB7LKmpMdr_I\",\"wechat_platform_open_id\":null,\"wechat_union_id\":null,\"work\":{\"key\":\"zhipin\",\"text\":\"银行\",\"value\":[2,0]},\"zodiac_sign\":\"白羊座\"}','2023-10-10 15:11:09','2023-10-09 15:11:09',NULL),
	(2,1,'op02s4vhiiLffHPfdB7LKmpMdr_I','0',1,NULL,'愿你们成为天造地设的一对',NULL,'2023-10-10 14:22:00','2023-10-10 14:22:00',NULL),
	(3,0,'op02s4vhiiLffHPfdB7LKmpMdr_I','0',1,NULL,'愿你们成为天造地设的一对',NULL,'2023-10-10 15:22:00','2023-10-10 14:22:00','2023-10-10 18:22:13'),
	(4,1,'op02s4vhiiLffHPfdB7LKmpMdr_I','0',1,NULL,'愿你们成为天造地设的一对',NULL,'2023-10-10 14:22:00','2023-10-10 14:22:00',NULL);

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
	(1,NULL,'白云黑土','/uploads/files/AKAeteTaeo6R7NYNsrWpPNVtUHPv2HqW.png','1999-01-01',166,1,'{\"key\":\"zhipin\",\"value\":[0,12]}','[\"/uploads/files/eKGBzB5lqX0iuMXRgUP9g0001Ov3tgBb.png\",\"/uploads/files/wUlkKYOb9RoQnfuyK4W5FUK1o0pzGkEy.png\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-10 14:22:00','2023-10-10 14:22:00',NULL);

/*!40000 ALTER TABLE `customer_log` ENABLE KEYS */;
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



# 转储表 moments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `moments`;

CREATE TABLE `moments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `relation_user_id` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '关联 User ID',
  `content` varchar(128) CHARACTER SET utf8mb4 NOT NULL COMMENT '描述',
  `photos` longtext CHARACTER SET utf8mb4 NOT NULL COMMENT '照片',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `moments` WRITE;
/*!40000 ALTER TABLE `moments` DISABLE KEYS */;

INSERT INTO `moments` (`id`, `relation_user_id`, `content`, `photos`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(1,'op02s4vhiiLffHPfdB7LKmpMdr_I','didi','[\"/uploads/files/4g1K1pMsu186Fny7lEFvsOL9gFNbd1qi.png\"]','2023-10-08 10:23:14','2023-10-08 10:23:14',NULL),
	(2,'op02s4vhiiLffHPfdB7LKmpMdr_I','老照片 这两天总看到北海的人和事，​不知不觉两年多过去了，想念当时北海的人了','[\"/uploads/files/4g1K1pMsu186Fny7lEFvsOL9gFNbd1qi.png\"]','2023-10-09 16:53:16','2023-10-09 16:53:16',NULL);

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
	(9,'2','2','你希望的 ta 是什么样？','我希望的意中人是个盖世英雄……','2023-10-06 23:27:51','2023-10-06 23:27:51',NULL);

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
	(2,2,'10000001','Jiangkun','/uploads/files/c9WyMZmT3nl6QKrXhNivsFAvMcv7MPBd.png','2001-03-01',174,1,'{\"key\":\"zhipin\",\"value\":[2,0]}','[\"/uploads/files/4Yk9GYRHwbJCubuPNhCc2UL0XkfYymq0.png\",\"/uploads/files/S1O8rRym4gBMYniWqGwnHub7UtDkAGJT.png\",\"/uploads/files/2GQ6uwNXugR6eWD8AYm5eCH6aZ0UDzg0.jpg\",\"/uploads/files/rMp4Y9km65FkpIC3XOYpQovkcyieSqUo.jpg\",\"/uploads/files/FbPVlAFTnTMEwz1H2HpW5XDGcG5bTShB.jpg\",\"/uploads/files/I4MbhatLDwwTtwNVG97ym5jRQ0VmKsK0.jpg\"]',NULL,'Hi 你好哇~',NULL,'','',NULL,NULL,'17725386753',NULL,'op02s4vhiiLffHPfdB7LKmpMdr_I',NULL,NULL,'10.0.8.14','2023-10-10 18:24:28','2023-09-22 08:03:17','2023-09-22 08:03:32',NULL),
	(3,1,'10000002','☄️ 彗星撞地球','/uploads/files/10000002.png','1998-05-10',173,0,'{\"key\":\"zhipin\",\"value\":[4,0]}',NULL,NULL,'爱笑开朗乐观，对你充满期待',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'wechat_open_id_test-0001',NULL,NULL,'10.0.8.14','2023-10-09 15:06:25','2023-09-24 21:51:03','2023-09-24 21:51:03',NULL),
	(4,1,'77500354','Charles正泉',NULL,NULL,165,1,'{\"key\":\"zhipin\",\"value\":[0,13]}','\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vllnME96C7JPHus0K0IjGE',NULL,NULL,'10.0.8.14','2023-10-02 11:47:11','2023-09-27 08:56:33','2023-09-27 08:56:33',NULL),
	(5,1,'93498125',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vkWz17jyhDWsWuzDrV41_E',NULL,NULL,'10.0.8.14',NULL,'2023-09-27 14:58:56','2023-09-27 14:58:56',NULL),
	(6,1,'33164845','哈哈哈',NULL,NULL,NULL,0,'{\"key\":\"zhipin\",\"value\":[0,1]}','\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4nHm3T0gAzloxAjzhHrCMEc',NULL,NULL,'10.0.8.14','2023-10-01 17:11:52','2023-10-01 16:57:28','2023-10-01 16:57:28',NULL),
	(7,1,'76928410',NULL,NULL,NULL,170,1,'{\"key\":\"zhipin\",\"value\":[0,1]}','\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4utqqTDNHSkBgyq_sRDt-yU',NULL,NULL,'10.0.8.14','2023-10-01 17:30:15','2023-10-01 17:28:59','2023-10-01 17:28:59',NULL),
	(8,1,'39794388',NULL,NULL,NULL,170,1,'{\"key\":\"zhipin\",\"value\":[0,1]}','\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4utqqTDNHSkBgyq_sRDt-yU',NULL,NULL,'10.0.8.14','2023-10-01 17:30:15','2023-10-01 17:28:59','2023-10-01 17:28:59',NULL),
	(9,1,'71125475',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4tnP5NhnvX8dHG2XzVYfq3M',NULL,NULL,'10.0.8.14','2023-10-01 17:37:49','2023-10-01 17:37:13','2023-10-01 17:37:13',NULL),
	(10,1,'32769247',NULL,NULL,NULL,NULL,NULL,NULL,'\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4oozjlNYIf3PGW8MQB1CLyk',NULL,NULL,'10.0.8.14','2023-10-01 18:35:26','2023-10-01 18:35:18','2023-10-01 18:35:18',NULL),
	(11,1,'51920388',NULL,NULL,NULL,185,1,'{\"key\":\"zhipin\",\"value\":[0,20]}','\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4r1_DuvnOuEa6SZREWTmGPk',NULL,NULL,'10.0.8.14','2023-10-01 20:04:51','2023-10-01 20:03:36','2023-10-01 20:03:36',NULL),
	(12,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-02 09:53:08','2023-10-02 09:53:08','2023-10-02 09:53:08',NULL),
	(13,1,'52290967','不羡仙',NULL,NULL,167,1,'{\"key\":\"zhipin\",\"value\":[1,2]}','\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4hgWueQKTMPdMAbC908yXZQ',NULL,NULL,'10.0.8.14','2023-10-02 11:40:27','2023-10-02 11:38:04','2023-10-02 11:38:04',NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
