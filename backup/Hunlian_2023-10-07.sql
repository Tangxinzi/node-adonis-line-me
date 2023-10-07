# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20051
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: localhost (MySQL 5.7.34)
# 数据库: Hunlian
# 生成时间: 2023-10-07 00:16:03 +0000
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
	(3,'test-1234','1126638303','0','didididiididid',NULL,'2023-09-22 17:35:03','2023-09-22 17:35:03',NULL);

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
  `location` varchar(255) DEFAULT NULL COMMENT '所在地址信息',
  `realname` varchar(50) DEFAULT NULL COMMENT '真实姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机',
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

INSERT INTO `users` (`id`, `type`, `user_id`, `nickname`, `avatar_url`, `birthday`, `height`, `sex`, `work`, `photos`, `videos`, `detail`, `contact`, `location`, `realname`, `phone`, `wechat_union_id`, `wechat_open_id`, `wechat_platform_open_id`, `parent_id`, `ip`, `online_at`, `created_at`, `modified_at`, `deleted_at`)
VALUES
	(2,1,'10000001','Jiangkun','/uploads/files/c9WyMZmT3nl6QKrXhNivsFAvMcv7MPBd.png','2001-03-01',173,1,'{\"key\":\"zhipin\",\"value\":[2,0]}','[\"/uploads/files/4Yk9GYRHwbJCubuPNhCc2UL0XkfYymq0.png\",\"/uploads/files/S1O8rRym4gBMYniWqGwnHub7UtDkAGJT.png\",\"/uploads/files/2GQ6uwNXugR6eWD8AYm5eCH6aZ0UDzg0.jpg\",\"/uploads/files/rMp4Y9km65FkpIC3XOYpQovkcyieSqUo.jpg\",\"/uploads/files/FbPVlAFTnTMEwz1H2HpW5XDGcG5bTShB.jpg\",\"/uploads/files/I4MbhatLDwwTtwNVG97ym5jRQ0VmKsK0.jpg\"]',NULL,'Hi 你好哇~',NULL,NULL,NULL,'17725386753',NULL,'op02s4vhiiLffHPfdB7LKmpMdr_I',NULL,NULL,'10.0.8.14','2023-10-06 23:40:20','2023-09-22 08:03:17','2023-09-22 08:03:32',NULL),
	(3,1,'10000002','☄️ 彗星撞地球','/uploads/files/10000002.png','1998-05-10',173,0,'{\"key\":\"zhipin\",\"value\":[4,0]}',NULL,NULL,'爱笑开朗乐观，对你充满期待',NULL,NULL,NULL,NULL,NULL,'test-1234',NULL,NULL,NULL,NULL,'2023-09-24 21:51:03','2023-09-24 21:51:03',NULL),
	(4,1,'77500354','Charles正泉',NULL,NULL,165,1,'{\"key\":\"zhipin\",\"value\":[0,13]}','\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vllnME96C7JPHus0K0IjGE',NULL,NULL,'10.0.8.14','2023-10-02 11:47:11','2023-09-27 08:56:33','2023-09-27 08:56:33',NULL),
	(5,1,'93498125',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4vkWz17jyhDWsWuzDrV41_E',NULL,NULL,'10.0.8.14',NULL,'2023-09-27 14:58:56','2023-09-27 14:58:56',NULL),
	(6,1,'33164845','哈哈哈',NULL,NULL,NULL,0,'{\"key\":\"zhipin\",\"value\":[0,1]}','\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4nHm3T0gAzloxAjzhHrCMEc',NULL,NULL,'10.0.8.14','2023-10-01 17:11:52','2023-10-01 16:57:28','2023-10-01 16:57:28',NULL),
	(7,1,'76928410',NULL,NULL,NULL,170,1,'{\"key\":\"zhipin\",\"value\":[0,1]}','\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4utqqTDNHSkBgyq_sRDt-yU',NULL,NULL,'10.0.8.14','2023-10-01 17:30:15','2023-10-01 17:28:59','2023-10-01 17:28:59',NULL),
	(8,1,'39794388',NULL,NULL,NULL,170,1,'{\"key\":\"zhipin\",\"value\":[0,1]}','\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4utqqTDNHSkBgyq_sRDt-yU',NULL,NULL,'10.0.8.14','2023-10-01 17:30:15','2023-10-01 17:28:59','2023-10-01 17:28:59',NULL),
	(9,1,'71125475',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4tnP5NhnvX8dHG2XzVYfq3M',NULL,NULL,'10.0.8.14','2023-10-01 17:37:49','2023-10-01 17:37:13','2023-10-01 17:37:13',NULL),
	(10,1,'32769247',NULL,NULL,NULL,NULL,NULL,NULL,'\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4oozjlNYIf3PGW8MQB1CLyk',NULL,NULL,'10.0.8.14','2023-10-01 18:35:26','2023-10-01 18:35:18','2023-10-01 18:35:18',NULL),
	(11,1,'51920388',NULL,NULL,NULL,185,1,'{\"key\":\"zhipin\",\"value\":[0,20]}','\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4r1_DuvnOuEa6SZREWTmGPk',NULL,NULL,'10.0.8.14','2023-10-01 20:04:51','2023-10-01 20:03:36','2023-10-01 20:03:36',NULL),
	(12,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-10-02 09:53:08','2023-10-02 09:53:08','2023-10-02 09:53:08',NULL),
	(13,1,'52290967','不羡仙',NULL,NULL,167,1,'{\"key\":\"zhipin\",\"value\":[1,2]}','\"\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'op02s4hgWueQKTMPdMAbC908yXZQ',NULL,NULL,'10.0.8.14','2023-10-02 11:40:27','2023-10-02 11:38:04','2023-10-02 11:38:04',NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
