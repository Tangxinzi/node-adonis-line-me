# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20051
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: localhost (MySQL 5.7.34)
# 数据库: hunlian
# 生成时间: 2023-09-27 10:35:45 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# 转储表 customer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_wechat_open_id` varchar(255) DEFAULT NULL COMMENT '发布用户 ID',
  `relation_id` varchar(255) DEFAULT NULL COMMENT '关联用户 ID',
  `relation` varchar(11) DEFAULT '0' COMMENT '与红娘关系',
  `introduction` longtext COMMENT '红娘介绍客户信息',
  `userinfo` longtext COMMENT '用户 JSON 数据',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;

INSERT INTO `customer` (`id`, `user_wechat_open_id`, `relation_id`, `relation`, `introduction`, `userinfo`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(2,'op02s4vhiiLffHPfdB7LKmpMdr_I','1126638303','0','介绍性的内容',NULL,'2023-09-22 17:35:03','2023-09-22 17:35:03',NULL),
	(3,'test-1234','1126638303','0','didididiididid',NULL,'2023-09-22 17:35:03','2023-09-22 17:35:03',NULL),
	(4,'op02s4vhiiLffHPfdB7LKmpMdr_I','op02s4vhiiLffHPfdB7LKmpMdr_I','0','很不错~','{\"id\":2,\"type\":1,\"user_id\":\"10000001\",\"nickname\":\"Jiangkun\",\"avatar_url\":\"/uploads/files/c9WyMZmT3nl6QKrXhNivsFAvMcv7MPBd.png\",\"birthday\":\"2001-03-01\",\"height\":174,\"sex\":1,\"work\":\"房地产/建筑\",\"photos\":[\"/uploads/files/4Yk9GYRHwbJCubuPNhCc2UL0XkfYymq0.png\",\"/uploads/files/S1O8rRym4gBMYniWqGwnHub7UtDkAGJT.png\"],\"videos\":null,\"detail\":\"Hi 你好哇~\",\"contact\":null,\"location\":null,\"realname\":null,\"number\":\"17725386753\",\"wechat_union_id\":null,\"wechat_open_id\":\"op02s4vhiiLffHPfdB7LKmpMdr_I\",\"wechat_platform_open_id\":null,\"parent_id\":null,\"ip\":null,\"online_at\":\"2023-09-27T00:58:50.000Z\",\"created_at\":\"2023-09-22T00:03:17.000Z\",\"modified_at\":\"2023-09-22T00:03:32.000Z\",\"deleted_at\":null}','2023-09-27 13:47:19','2023-09-27 13:47:19',NULL);

/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
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



# 转储表 users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` int(1) DEFAULT '1' COMMENT '身份 1用户 2红娘',
  `user_id` varchar(40) DEFAULT NULL COMMENT '用户ID',
  `nickname` varchar(50) DEFAULT NULL COMMENT '昵称',
  `avatar_url` varchar(128) DEFAULT NULL COMMENT '头像',
  `birthday` varchar(12) DEFAULT NULL COMMENT '生日',
  `height` int(11) unsigned DEFAULT NULL COMMENT '身高',
  `sex` int(1) DEFAULT NULL COMMENT '性别',
  `work` varchar(50) DEFAULT NULL COMMENT '职业工作',
  `photos` varchar(500) DEFAULT NULL COMMENT '图片集',
  `videos` varchar(500) DEFAULT NULL COMMENT '介绍视频',
  `detail` longtext COMMENT '个人介绍',
  `contact` varchar(50) DEFAULT NULL COMMENT '联系方式',
  `location` varchar(255) DEFAULT NULL COMMENT '所在地址信息',
  `realname` varchar(50) DEFAULT NULL COMMENT '真实姓名',
  `number` varchar(11) DEFAULT NULL COMMENT '手机',
  `wechat_union_id` varchar(255) DEFAULT NULL COMMENT '微信 UNION ID',
  `wechat_open_id` varchar(255) DEFAULT NULL COMMENT '小程序 OPEN ID',
  `wechat_platform_open_id` varchar(255) DEFAULT NULL COMMENT '公号 OPEN ID',
  `parent_id` int(11) DEFAULT NULL COMMENT '父级 ID',
  `ip` varchar(16) DEFAULT NULL COMMENT 'IP 地址',
  `online_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '最近上线时间',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `type`, `user_id`, `nickname`, `avatar_url`, `birthday`, `height`, `sex`, `work`, `photos`, `videos`, `detail`, `contact`, `location`, `realname`, `number`, `wechat_union_id`, `wechat_open_id`, `wechat_platform_open_id`, `parent_id`, `ip`, `online_at`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(2,1,'10000001','Jiangkun','/uploads/files/c9WyMZmT3nl6QKrXhNivsFAvMcv7MPBd.png','2001-03-01',174,1,'房地产/建筑','[\"/uploads/files/4Yk9GYRHwbJCubuPNhCc2UL0XkfYymq0.png\",\"/uploads/files/S1O8rRym4gBMYniWqGwnHub7UtDkAGJT.png\"]',NULL,'Hi 你好哇~',NULL,NULL,NULL,'17725386753',NULL,'op02s4vhiiLffHPfdB7LKmpMdr_I',NULL,NULL,'10.0.8.14','2023-09-27 08:58:50','2023-09-22 08:03:17','2023-09-22 08:03:32',NULL),
	(3,1,'10000002','☄️ 彗星撞地球','/uploads/files/10000002.png','1998-05-10',173,0,'教育',NULL,NULL,'爱笑开朗乐观，对你充满期待',NULL,NULL,NULL,NULL,NULL,'test-1234',NULL,NULL,NULL,'2023-09-27 08:58:50','2023-09-24 21:51:03','2023-09-24 21:51:03',NULL),
	(4,1,'77500354','Charles正泉',NULL,NULL,165,1,NULL,'\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vllnME96C7JPHus0K0IjGE',NULL,NULL,NULL,'2023-09-27 08:58:50','2023-09-27 08:56:33','2023-09-27 08:56:33',NULL),
	(5,1,'93498125',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vkWz17jyhDWsWuzDrV41_E',NULL,NULL,NULL,'2023-09-27 14:58:56','2023-09-27 14:58:56','2023-09-27 14:58:56',NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
