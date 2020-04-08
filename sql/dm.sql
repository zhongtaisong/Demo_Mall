/*
SQLyog Ultimate v12.3.1 (64 bit)
MySQL - 8.0.19 : Database - dm
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`dm` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `dm`;

/*Table structure for table `dm_address` */

DROP TABLE IF EXISTS `dm_address`;

CREATE TABLE `dm_address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户名',
  `name` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收货人',
  `region` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '地区',
  `detail` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '详情地址',
  `phone` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '电话',
  `isDefault` int(1) unsigned zerofill DEFAULT NULL COMMENT '是否为默认地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `dm_address` */

insert  into `dm_address`(`id`,`uname`,`name`,`region`,`detail`,`phone`,`isDefault`) values 
(1,'dangdang','闹钟太松了','上海市浦东新区','孙环路申城佳苑','18888888888',1),
(2,'dangdang','小项项','上海浦东','上海火车站','15666666666',0),
(4,'dangdang','高山流水','老树','昏鸦','18666666666',0);

/*Table structure for table `dm_admin` */

DROP TABLE IF EXISTS `dm_admin`;

CREATE TABLE `dm_admin` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uname` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户名',
  `role` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '角色',
  `brandMenu` int DEFAULT NULL COMMENT '品牌管理',
  `brandBtn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '品牌管理操作按钮权限',
  `productMenu` int DEFAULT NULL,
  `productBtn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `orderMenu` int DEFAULT NULL,
  `orderBtn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `userMenu` int DEFAULT NULL,
  `userBtn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `commentMenu` int DEFAULT NULL,
  `commentBtn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `adminMenu` int DEFAULT NULL,
  `adminBtn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `operator` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `handleTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `dm_admin` */

insert  into `dm_admin`(`id`,`uname`,`role`,`brandMenu`,`brandBtn`,`productMenu`,`productBtn`,`orderMenu`,`orderBtn`,`userMenu`,`userBtn`,`commentMenu`,`commentBtn`,`adminMenu`,`adminBtn`,`operator`,`handleTime`) values 
(1,'dangdang','100',1,'[1,3,2]',1,'[1,4,2,5,3,6]',1,'[4,2]',1,'[2,1,4,3,5]',1,'[1,3,4,2]',1,'[1,4,2,3]','dangdang','2020-02-18 23:15:09'),
(3,'yuanyuan','10',1,'[1,2,3]',1,'[1,4,5,2,3,6]',1,'[2,4]',1,'[1,4,5,2,3]',1,'[1,4,2,3]',1,'[1,4,3,2]','dangdang','2020-02-22 11:11:23'),
(6,'zhong001','1',1,'[4]',1,'[4]',1,'[4]',1,'[]',1,'[4]',1,'[4]','dangdang','2020-02-22 15:30:06'),
(8,'zhong','1',1,'[]',1,'[]',0,'[]',0,'[]',0,'[]',0,'[]','yuanyuan','2020-02-22 22:07:43');

/*Table structure for table `dm_brands` */

DROP TABLE IF EXISTS `dm_brands`;

CREATE TABLE `dm_brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brandName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `dm_brands` */

insert  into `dm_brands`(`id`,`brandName`) values 
(1,'Apple'),
(2,'小米（MI）'),
(3,'ThinkPad'),
(4,'华硕（ASUS）'),
(5,'联想（Lenovo）'),
(6,'戴尔（DELL）'),
(11,'华为（HUAWEI）'),
(12,'惠普（HP）'),
(13,'宏碁（acer）');

/*Table structure for table `dm_cart` */

DROP TABLE IF EXISTS `dm_cart`;

CREATE TABLE `dm_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `pid` int DEFAULT NULL COMMENT '商品主表id',
  `num` int DEFAULT NULL COMMENT '商品数量',
  `totalprice` decimal(10,2) DEFAULT NULL COMMENT '商品总价',
  `collection` int DEFAULT '0' COMMENT '1-已收藏，0-未收藏',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `dm_cart` */

insert  into `dm_cart`(`id`,`uname`,`pid`,`num`,`totalprice`,`collection`) values 
(60,'dangdang',27,1,9299.00,1),
(63,'dangdang',46,1,17999.00,1),
(66,'dangdang',52,1,8899.00,1),
(93,'dangdang',17,2,29398.00,0),
(94,'dangdang',20,1,4489.00,0),
(95,'dangdang',10,1,3299.00,0),
(96,'dangdang',6,1,21999.00,0),
(97,'dangdang',7,1,4499.00,0);

/*Table structure for table `dm_comment` */

DROP TABLE IF EXISTS `dm_comment`;

CREATE TABLE `dm_comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户名',
  `pid` int DEFAULT NULL COMMENT '商品id',
  `content` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '评价内容',
  `commentTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '发表评价时间',
  `agree` int DEFAULT NULL COMMENT '喜欢次数',
  `disagree` int DEFAULT NULL COMMENT '不喜欢次数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `dm_comment` */

insert  into `dm_comment`(`id`,`uname`,`pid`,`content`,`commentTime`,`agree`,`disagree`) values 
(1,'dangdang',42,'7777777777777','2020-01-18 12:57:13',3,1),
(2,'dangdang',42,'fffffffffffffda6666666666','2020-01-18 13:01:34',2,0),
(3,'dangdang',2,'1111','2020-01-18 15:13:08',0,1),
(4,'dangdang',12,'ffdafa','2020-01-18 15:13:33',0,0),
(5,'dangdang',42,'11111111','2020-01-18 18:42:06',1,0),
(6,'dangdang',2,'2222222222ffffffff','2020-02-13 14:00:42',0,0),
(8,'zhong',42,'大大大大大大多多多多多','2020-01-18 18:42:16',1,0),
(10,'yuanyuan',2,'12fd哒哒哒哒哒哒多多多6666','2020-02-13 14:24:19',0,0),
(11,'dangdang',7,'旧时王谢堂前燕，飞入寻常百姓家','2020-03-21 12:08:34',0,0),
(12,'dangdang',8,'你好    大大大大大大多多多多多多多多多多','2020-03-21 12:10:59',0,0),
(13,'dangdang',7,'f顶顶顶顶','2020-03-21 12:11:25',0,0),
(14,'dangdang',8,'1111111','2020-03-21 12:11:40',0,0),
(15,'dangdang',8,'ww','2020-03-21 12:12:18',0,0),
(16,'dangdang',7,'111111','2020-03-21 12:12:58',0,0),
(17,'dangdang',8,'1','2020-03-21 12:13:16',0,0),
(18,'dangdang',7,'111111','2020-03-21 12:13:35',0,0),
(19,'dangdang',7,'66666666666','2020-03-21 12:15:27',0,0),
(20,'dangdang',1,'111111','2020-03-21 12:18:39',0,0),
(21,'dangdang',7,'111111','2020-03-21 12:24:01',0,0),
(22,'dangdang',8,'222222222','2020-03-21 12:24:13',0,0),
(23,'dangdang',7,'33333','2020-03-21 12:24:54',0,0),
(24,'dangdang',17,'飞雪连天射白鹿，笑书神侠倚碧鸳','2020-04-01 21:52:16',0,0),
(25,'dangdang',17,'雨色轻风意，柔情怜花殇','2020-04-01 21:52:31',0,0),
(26,'dangdang',17,'旧时王谢堂前燕，飞入寻常百姓家','2020-04-01 21:52:43',0,0),
(27,'dangdang',12,'噜噜噜噜噜','2020-04-07 10:00:04',0,0),
(28,'dangdang',2,'摸摸','2020-04-07 10:00:26',0,0);

/*Table structure for table `dm_message` */

DROP TABLE IF EXISTS `dm_message`;

CREATE TABLE `dm_message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户名',
  `content` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '留言内容',
  `submitTime` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '留言时间',
  `agree` int DEFAULT NULL COMMENT '喜欢次数',
  `disagree` int DEFAULT NULL COMMENT '不喜欢次数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `dm_message` */

insert  into `dm_message`(`id`,`uname`,`content`,`submitTime`,`agree`,`disagree`) values 
(1,'dangdang','111111111','2020-02-05 16:17:48',0,2),
(2,'dangdang','222222222','2020-02-05 16:17:52',1,0),
(3,'dangdang','ddddddddd','2020-02-10 20:09:00',0,0),
(4,'dangdang','ffffff','2020-02-10 20:59:41',0,0),
(5,'dangdang','vvvv','2020-02-10 21:03:24',0,0);

/*Table structure for table `dm_order` */

DROP TABLE IF EXISTS `dm_order`;

CREATE TABLE `dm_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户名',
  `ordernum` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '订单号',
  `status` int DEFAULT NULL COMMENT '100表示订单已完成，101表示追评，102表示已评价完毕',
  `aid` int DEFAULT NULL COMMENT '地址id',
  `pid` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品主表id',
  `submitTime` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '提交订单时间',
  `num` int DEFAULT NULL COMMENT '商品总数',
  `totalprice` decimal(10,2) DEFAULT NULL COMMENT '商品总价',
  `nums` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '同一订单下各个商品的数量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `dm_order` */

insert  into `dm_order`(`id`,`uname`,`ordernum`,`status`,`aid`,`pid`,`submitTime`,`num`,`totalprice`,`nums`) values 
(6,'dangdang','20200114183835',100,2,'16,12,25,29,21,49','2020-01-14 18:38:35',6,33883.00,'1,1,1,1,1,1'),
(7,'dangdang','20200115162414',100,2,'2,8','2020-01-15 16:24:14',2,12887.00,'1,1'),
(10,'dangdang','20200210220335',100,4,'16,38,39,32,2,1','2020-02-10 22:03:35',6,44451.00,'1,1,1,1,1,1'),
(11,'dangdang','20200329144237',100,1,'35','2020-03-29 14:42:37',2,12578.00,'2'),
(12,'dangdang','20200329144445',100,1,'17','2020-03-29 14:44:45',1,14699.00,'1'),
(13,'dangdang','20200329144912',100,1,'17','2020-03-29 14:49:12',1,14699.00,'1'),
(14,'dangdang','20200329144917',100,1,'17','2020-03-29 14:49:17',1,14699.00,'1'),
(15,'dangdang','20200329144926',100,1,'17','2020-03-29 14:49:26',1,14699.00,'1'),
(16,'dangdang','20200329144934',100,1,'17','2020-03-29 14:49:34',1,14699.00,'1'),
(17,'dangdang','20200329144950',100,1,'1','2020-03-29 14:49:50',1,10688.00,'1'),
(18,'dangdang','20200329192855',100,1,'17','2020-03-29 19:28:55',1,14699.00,'1'),
(19,'dangdang','20200329192907',100,1,'1','2020-03-29 19:29:07',1,10688.00,'1'),
(20,'dangdang','20200329192916',100,1,'3','2020-03-29 19:29:16',1,18799.00,'1'),
(21,'dangdang','20200329192924',100,1,'24','2020-03-29 19:29:24',2,10398.00,'2'),
(22,'dangdang','20200329193142',100,1,'17','2020-03-29 19:31:42',1,14699.00,'1'),
(23,'dangdang','20200329193158',100,1,'17','2020-03-29 19:31:58',1,14699.00,'1'),
(24,'dangdang','20200329220454',100,2,'17','2020-03-29 22:04:54',1,14699.00,'1'),
(25,'dangdang','20200329221940',100,7,'17','2020-03-29 22:19:40',1,14699.00,'1'),
(26,'dangdang','20200330213616',100,1,'17','2020-03-30 21:36:16',1,14699.00,'1'),
(27,'dangdang','20200401215127',100,1,'17','2020-04-01 21:51:27',1,14699.00,'1'),
(28,'dangdang','20200405205329',100,1,'28','2020-04-05 20:53:29',1,10999.00,'1'),
(29,'dangdang','20200405205341',100,1,'28','2020-04-05 20:53:41',1,10999.00,'1'),
(30,'dangdang','20200405205821',100,1,'28','2020-04-05 20:58:21',1,10999.00,'1'),
(31,'dangdang','20200405211218',100,2,'28','2020-04-05 21:12:18',1,10999.00,'1'),
(32,'dangdang','20200405211227',100,2,'28','2020-04-05 21:12:27',1,10999.00,'1'),
(33,'dangdang','20200406103842',100,4,'28','2020-04-06 10:38:42',1,10999.00,'1'),
(34,'dangdang','20200406134510',100,5,'50,18','2020-04-06 13:45:10',3,25297.00,'1,2'),
(35,'dangdang','20200406135211',100,4,'5,17','2020-04-06 13:52:11',2,20908.00,'1,1'),
(36,'dangdang','20200406140745',100,1,'21','2020-04-06 14:07:45',1,6799.00,'1');

/*Table structure for table `dm_products` */

DROP TABLE IF EXISTS `dm_products`;

CREATE TABLE `dm_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brandId` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '品牌id',
  `productName` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品名称',
  `description` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '描述',
  `copywriting` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '促销文案',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `spec` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '规格',
  `weight` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品毛重',
  `placeOfOrigin` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品产地',
  `systems` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '系统',
  `cpu` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '处理器',
  `thickness` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '厚度',
  `disk` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '硬盘容量',
  `standbyTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '待机时间',
  `series` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '系列',
  `bareWeight` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '裸机重量',
  `screenSize` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '屏幕尺寸',
  `gpu` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '显卡型号',
  `characteristic` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '特性',
  `memory` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '内存容量',
  `gpuCapacity` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '显存容量',
  `bodyMaterial` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '机身材质',
  `mainPicture` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品主图',
  `pictures` varchar(360) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品其它图片',
  `detailsPic` varchar(360) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品详情图',
  `onLine` int DEFAULT '100' COMMENT '上线100，下线10',
  `hot` int DEFAULT '11' COMMENT '热门推荐101，未推荐11',
  `single` int DEFAULT '12' COMMENT '单品推广102，未推广12',
  `banner` int DEFAULT '13' COMMENT 'banner推广103，未推广13',
  `bannerPic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'banner图片',
  `startTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '上线时间',
  `endTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '下线时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `dm_products` */

insert  into `dm_products`(`id`,`brandId`,`productName`,`description`,`copywriting`,`price`,`spec`,`weight`,`placeOfOrigin`,`systems`,`cpu`,`thickness`,`disk`,`standbyTime`,`series`,`bareWeight`,`screenSize`,`gpu`,`characteristic`,`memory`,`gpuCapacity`,`bodyMaterial`,`mainPicture`,`pictures`,`detailsPic`,`onLine`,`hot`,`single`,`banner`,`bannerPic`,`startTime`,`endTime`) values 
(1,'1','AppleMacBook Pro 13.3','Apple 2019款 MacBook Pro 13.3【带触控栏】八代i5 8G 256G RP645显卡 银色 笔记本电脑 MUHR2CH/A','【年货节】19年款MacBookAir到手价低至9199，限量送内胆包、30天无忧试用~数量有限先到先得',10688.00,'19款13.3英寸 i5 8+256G银 RP645','2.58kg','中国大陆','Mac OS','Intel i5','10.0mm—15.0mm','256GB SSD','9小时以上','其他','1-1.5KG','13.3英寸','集成显卡','背光键盘','8GB','其他','其他','img/products/imgs/df937f4142c4f80103cbeb31f3fca6d4.jpg','img/products/imgs/e569afdf371d7d78e785c72747444fd1.jpg','img/products/details/f23b9371c4a31466da3502e81c13ab05.jpg|img/products/details/b394565d9cdcdb78b4bc97bb4cc74c1a.jpg|img/products/details/4f41edfaf128473f94ba1c7a31eb2623.jpg|img/products/details/c0501c7dc8b4c016dafd7e108f3019df.jpg|img/products/details/445efa498aae65d42a42028ce3f14936.jpg',100,101,12,13,NULL,'2020-02-12 15:34:52',NULL),
(2,'1','AppleMacBook Air','Apple 2019款 MacBook Air 13.3 Retina屏 八代i5 8G 128G SSD 银色 笔记本电脑 轻薄本 MVFK2CH/A','【年货节】19年款MacBookAir到手价低至8278，限量送内胆包、30天无忧试用~数量有限先到先得',8188.00,'2019新款八代i5 8G 128G 银','2.36kg','中国大陆','Mac OS','Intel i5','其他','128GB SSD','>8小时','其他','其他','13.3英寸','英特尔核芯显卡','背光键盘','8GB','其他','其他','img/products/imgs/6fabd0eda27f38fb0d33d21591b8cf45.jpg','img/products/imgs/ba6cc6b78323dc834f7309b21aff0c40.jpg|img/products/imgs/341fb1f8a926abc3f1360141dd9ffdc1.jpg','img/products/details/cc3b05eb68e2cc59017ffeb26eb2fe89.jpg|img/products/details/8c46493b4f3d77c38475e256a4d039ad.jpg|img/products/details/4a5b921abbec06744f2864e2dfce68d6.jpg|img/products/details/1dd87b29a2e081f5501f30a09c6d30de.jpg|img/products/details/f53d5fdb5c204d036878740b22dc1fd7.jpg',100,11,12,13,NULL,'2020-01-10 22:45:45',NULL),
(3,'1','AppleMacBook Pro 16','Apple 2019新品 MacBook Pro 16【带触控栏】九代六核i7 16G 512G 深空灰 Radeon Pro 5300M显卡 笔记本电脑 轻薄本 MVVJ2CH/A',NULL,18799.00,'【新品】16英寸 九代i7 16+512灰','3.76kg','中国大陆','Mac OS','Intel i7','15.1mm—18.0mm','512GB SSD','7-9小时','Macbook Pro','1.5-2kg','其他','AMD Radeon Pro 5300M','背光键盘，机身厚度小于20mm','16GB','4GB','金属材质','img/products/imgs/1f84f2e8e0860d210fa74f975a03b2db.jpg','img/products/imgs/6643e1ed0daa05ca911ed2630683b575.jpg|img/products/imgs/c33a18ee883495f7ef3c3b0765b3d28e.jpg|img/products/imgs/0fb957e6a66755f0ea2c70249a81469f.jpg|img/products/imgs/859ee8a69c8ca2a3882fbf6151651cd8.jpg','img/products/details/595d2a144d879d21b49d2e4be05f6d4f.jpg|img/products/details/6e26868801a761fb78d5f460e60d309c.jpg|img/products/details/e7b371360b784498df607bf6a2b1f818.jpg|img/products/details/dfd6830f9482aeac812c2f4cf7be1100.jpg',100,11,12,13,NULL,'2020-01-09 18:04:13',NULL),
(4,'1','AppleMacBook Pro','Apple Macbook Pro 13.3【无触控栏】Core i5 8G 128G SSD 深空灰 笔记本电脑 轻薄本 MPXQ2CH/A',NULL,7499.00,'老款13.3英寸 i5 8G 128G深空灰','2.56kg','中国大陆','Mac OS','Intel i5','10.0mm—15.0mm','128GB SSD','9小时以上','其他','1-1.5KG','13.3英寸','集成显卡','机身厚度小于20mm','8GB','其他','其他','img/products/imgs/b9711cb23872260571594afe17370353.jpg','img/products/imgs/fc8c69788be4deeda642e39024194b15.jpg','img/products/details/b1909a277e041e26fa40d7c03bf88c44.jpg|img/products/details/f970c72590eb8fba3bca2d789af88447.jpg|img/products/details/10b6bb85cd9a09e90dbc2e20410b539d.jpg|img/products/details/ac01a050772d04df3ba3dfeaffc940d1.jpg|img/products/details/3dbbb00ece9d5377f78bddaf4c5dc05c.jpg',100,11,12,13,NULL,'2020-01-09 21:59:35',NULL),
(5,'1','AppleMQD32CH/A','Apple MacBook Air 13.3 | Core i5 8G 128G SSD 笔记本电脑 轻薄本 银色 MQD32CH/A','【年货节】爆款D32低至6278，限量内胆包、30天无忧试用~数量有限先到先得',6209.00,'i5 8G 128G 银','2.96kg','中国大陆','Mac OS','Intel i5','10.0mm—15.0mm','128GB SSD','9小时以上','其他','1-1.5KG','13.3英寸','集成显卡','背光键盘','8GB','其他','其他','img/products/imgs/74d66acff70f75fec0ab8cd506121d08.jpg','img/products/imgs/2662f3530b44ecad87ad9c870d1ba881.jpg|img/products/imgs/fd2421b01aee5103fdb18f7f04eff80a.jpg','img/products/details/9a73fb2e9a7de0f3587723dda0bf9b5b.jpg',100,11,12,13,NULL,'2020-01-09 21:59:39',NULL),
(6,'1','AppleMacBook Pro 16','Apple 2019新品 MacBook Pro 16【带触控栏】九代八核i9 16G 1TB 银色 Radeon Pro 5500M显卡 笔记本电脑 轻薄本 MVVM2CH/A','【年货节】19年款MacBookAir到手价低至9199，限量送内胆包、30天无忧试用~数量有限先到先得',21999.00,'【新品】16英寸 九代i9 16+1T银','3.76kg','中国大陆','Mac OS','Intel i9','15.1mm—18.0mm','1T SSD','7-9小时','MacBook Pro','1.5-2kg','其他','AMD Radeon Pro 5500M 图形处理器','背光键盘，机身厚度小于20mm','16GB','其他','其他','img/products/imgs/5122c3c408002333db319221f36cf9f4.jpg','img/products/imgs/92ccde98aaebf5ddcff8c8d82925a31f.jpg|img/products/imgs/ac632690e38bf1264c10f338c3068e19.jpg|img/products/imgs/c432561fd769fb481e627ba30554acd6.jpg','img/products/details/3eafd1b387dae30482f30168a8eaac1b.jpg|img/products/details/c7364c989c83d7790baa4722a1678d2b.jpg|img/products/details/e0e9e6e6b5a3e0d9733ea27390d22ae7.jpg|img/products/details/d0f18a0d2762ef02230535f7a84c5580.jpg',100,101,12,13,NULL,'2020-01-09 21:59:42',NULL),
(7,'2','小米RedmiBook 13','RedmiBook 13英寸全面屏全金属超轻薄(第十代英特尔酷睿i5-10210U 8G 512GSSD MX250 2G独显 Office 支持手环解锁 Win10) 游戏 银 笔记本电脑 小米','【四边窄全面屏超轻薄】全金属超薄机身、十代酷睿I5处理器、高性能MX250独显、专业飓风散热系统、11小时超长续航',4499.00,'【全面屏】十代I5 8G 512G MX250','2.04kg','中国大陆','Windows 10 家庭版','Intel i5','15.1mm—18.0mm','512GB SSD','>8小时','小米-笔记本','1-1.5KG','13.3英寸','NVIDIA GeForce MX250','全面屏，机身厚度小于20mm','8GB','2GB','金属材质','img/products/imgs/4c759f3b925bcc48254e7c652f7b0ad0.jpg','img/products/imgs/b5974ffc7f8e7f681a7774ba07e19e06.jpg|img/products/imgs/e878a465cc5e7e4060fa9da756a5fa81.jpg|img/products/imgs/9b3323e97bf8ee80650494a7f5e37786.jpg|img/products/imgs/901bef821d3c86b85f6826595409709c.jpg','img/products/details/47fdb9696caa859e9996994d37e71f94.jpg|img/products/details/5e076e17c356abd7351a4d97d6fda1b8.jpg|img/products/details/bd1481da67cb7a0093ed8e9ea60d1477.jpg|img/products/details/e6a1efe2d5075a90ac26a504f6067c9d.jpg|img/products/details/04340b6afdaa573016ba332287b729cc.jpg',100,101,12,13,NULL,'2020-01-09 22:01:21',NULL),
(8,'2','小米RedmiBook 14','RedmiBook 14 增强版全金属超轻薄(第十代酷睿i5-10210U 8G 1TB PCIE SSD MX250 2G独显 Office 支持手环疾速解锁 Win10)游戏 银 笔记本 小米',NULL,4699.00,'【新品首发】十代I5 1TSSD  独显','2.26kg','中国大陆','Windows 10','Intel i5','15.1mm—18.0mm','1T SSD','5-8小时','RedmiBook 14','其他','14.0英寸','NVIDIA GeForce MX250','机身厚度小于20mm','8GB','2GB','金属材质','img/products/imgs/a9d9d3fb4b9b95e952709af42f9f00de.jpg','img/products/imgs/0d16f5ca0be3d7547652487eb66afef6.jpg|img/products/imgs/9e07a562599d7c356958d8bc916206f5.jpg|img/products/imgs/c8e86122e669023000aec83170191568.jpg|img/products/imgs/b5781e9a7e8a8ab609ad186da8d12ec4.jpg','img/products/details/a50e69759056616c97ca3a6888359e34.jpg|img/products/details/186d25c8af1811f39df653131b7ab8c7.jpg|img/products/details/454e7163c4c752a4465cf21d7e75b0c8.jpg|img/products/details/7052511a11f425a3eb5e25e8dbf5e8cc.jpg|img/products/details/6370eb4995d0e18c6e759bf89f4a014b.jpg',100,11,12,13,NULL,'2020-01-09 21:59:47',NULL),
(9,'2','小米pro','小米Pro增强版 2019款 15.6英寸金属轻薄(第十代英特尔酷睿i7-10510U 16G 1TB PCIE SSD MX250 2G独显 100%sRGB 指纹识别 Office) 游戏 灰色','【Pro旗舰机】【100%sRGB高色域屏幕】【卓越性能调校】全新第十代I7处理器、16G大内存、1TB超大容量固态',6799.00,'【新品首发】I7 16G 1T 100%sRGB','2.68kg','中国大陆','Windows 10 家庭版','intel i7','15.1mm—18.0mm','1T SSD','7-9小时','小米 - Pro','1.5-2kg','15.6英寸','NVIDIA GeForce MX250','背光键盘，快充，Type-c接口','16GB','其他','金属材质','img/products/imgs/75f371e85fd68112dfb0eed2b63b5536.jpg','img/products/imgs/d3ef0ea54d65af490ad93e1fb10326d1.jpg|img/products/imgs/61f622b0af422a84200eaa2af68816df.jpg|img/products/imgs/77b30ad2670fa7860c982ed2951fe2ba.jpg|img/products/imgs/738ebc79df8b5aa42da11513e4a61588.jpg','img/products/details/09c12e0d52c3ec26d7420a7acce8cc2d.jpg|img/products/details/f67148d42f05b022cca5dcddeeb4c4f9.jpg|img/products/details/c724ee760acc4410490a33fb7da2e1c4.jpg|img/products/details/ec3764342fc5006df05f46309c87eb80.jpg|img/products/details/e8c417e7b7402277ffdfd889dc4dfeef.jpg',100,11,12,13,NULL,'2020-01-09 21:59:49',NULL),
(10,'2','小米笔记本','RedmiBook 14 锐龙版 全金属超轻薄(AMD Ryzen R5-3500U 8G 512G PCIe 全高清 支持手环疾速解锁 首发小米互传）游戏 经典银 笔记本电脑 小米 红米','热销爆款】【年度战略新品首发】满血版R5锐龙处理器、PCIE大容量高速固态、全高清防眩光窄边框',3299.00,'【经典银】R5 8G 512G PCIe','2.28kg','中国大陆','Windows 10 家庭版','锐龙5','15.1mm—18.0mm','512GB SSD','7-9小时','RedmiBook 14','1-1.5KG','14.0英寸','Radeon Vega 8 Graphics','机身厚度小于20mm','8GB','共享系统内存（集成）','金属材质','img/products/imgs/2e3be1116ddb4ba80d28096ba223e4a1.jpg','img/products/imgs/02b3974757df5f1b49173f0c9e9e3c25.jpg|img/products/imgs/49daeab1953b0da6c03400bf8b8a77f1.jpg|img/products/imgs/1959ca5953932ff3cabf58f7e9af25be.jpg|img/products/imgs/c9faedbacc79a40b5c1160f8c362d2e8.jpg','img/products/details/e3f468718d93a37484b33a2686317510.jpg|img/products/details/ddcaf35fd397fb8ab100a479ae8cb513.jpg|img/products/details/0b74fb85f5fc5b8cf12de6cbad4587cb.jpg|img/products/details/8ef1a3ccf9cb7d70a87d8b0136fcd2c3.jpg|img/products/details/b28203a65ebe8b9e1da5b1fe563427cd.jpg',100,11,102,13,NULL,'2020-01-09 21:59:50',NULL),
(11,'2','小米Ruby','小米 (MI)Ruby 15.6英寸金属轻薄笔记本电脑(第八代英特尔酷睿i5-8250U 8G 512G SSD 2G GDDR5独显 FHD 全键盘 Office Win10) 深空灰 电脑 小米',NULL,3899.00,'【15寸轻薄】I5 8G 512GSSD 独显','3.28kg','中国大陆','Windows 10','Intel i5','18.1mm—20.0mm','512GB SSD','5-7小时','小米-笔记本','2-2.5kg','15.6英寸','NVIDIA GeForce MX110','快充','8GB','2GB','其他','img/products/imgs/0b425fd75ea4c322075eef6e41b2b43a.jpg','img/products/imgs/54e4a7ed26ab9d6f64aa3c4a1a78588f.jpg|img/products/imgs/7d121a6834a2a6a6547188b1e20010a6.jpg|img/products/imgs/63c37ca76e72cef521f023ffe7fc221c.jpg','img/products/details/2fc8682cb1dbd9b06d7421f3fad2ea42.jpg|img/products/details/88c96dfbf8a554f736c1254d2f3f0630.jpg|img/products/details/6aec8b231934a7f319faa738fa27d27a.jpg|img/products/details/9ee9b7b16f28b769404fe0f0a3f7e549.jpg|img/products/details/7daa5f38c5831c646dc6ea4498eac9c0.jpg',100,11,12,13,NULL,'2020-01-09 21:59:51',NULL),
(12,'2','小米Air12','小米Air 2019款 12.5英寸全金属超轻薄(第八代英特尔酷睿i5 4G 256G 全高清屏 正版office Win10) 游戏 银色 笔记本电脑',NULL,3999.00,'【12.5银色】八代I5 4G 256G SSD','2.06kg','中国大陆','Windows 10 家庭版','Intel i5','10.0mm—15.0mm','256GB SSD','7-9小时','小米 - Air','1-1.5KG','12.5英寸','英特尔? UHD Graphics 615集成显卡','背光键盘','4GB','其他','金属材质','img/products/imgs/66854e93c2a48357c000927bc425f912.jpg','img/products/imgs/6c44a3fddbe1239dd40c279d94dfc2fa.jpg|img/products/imgs/b7f2e35eb155160abb452a81ef45d293.jpg|img/products/imgs/46ac5d327c7181e75119bd63537c56a4.jpg|img/products/imgs/af754ca942d940c13ada4c4904f2d588.jpg','img/products/details/67ff301c1f907fae5bba4e2b814a38c4.jpg',100,11,12,13,NULL,'2020-01-09 21:59:52',NULL),
(13,'3','ThinkPad翼480','联想ThinkPad 翼480（4VCD）英特尔酷睿i5 14英寸轻薄笔记本电脑(i5-8250U 8G 128GSSD+1T 2G独显 FHD)冰原银','此商品将于2020-01-04,00点结束闪购特卖',4499.00,'翼480 Intel i5处理器 128GSSD+1T','2.69kg','中国大陆','Windows 10','Intel i5','其他','128GB SSD+1TB HDD','5-7小时','ThinkPad - E系列','1.5-2kg','14.0英寸','AMD Radeon RX550 2GB GDDR5 独立显存','Type-c接口','8GB','其他','其他','img/products/imgs/4fbf4b3d1aebd27a9fdf356533e36929.jpg','img/products/imgs/8abff7a1e1a24c783867a17e3f67bc81.jpg|img/products/imgs/87e3890b63d6254ce5a30d3b4cc6fe1d.jpg|img/products/imgs/3dcbeddd81640d8525cc178e48cfd2e0.jpg|img/products/imgs/909f6cfc23c60dfdec232c5f3f92104e.jpg','img/products/details/9f73172023cfb935db52dbf2fbb16c23.jpg|img/products/details/1a671e2d81e2a2c261461477b6d7f2e6.jpg|img/products/details/fdac5e6768a0cfc3e7b19a140ba364e9.jpg|img/products/details/12f90efeced786b0ece740b1a31e9fa8.jpg|img/products/details/05c4c9190793cc02afc6904817c989c4.jpg',100,11,12,13,NULL,'2020-01-09 22:01:12',NULL),
(14,'3','ThinkPadThinkBook','联想ThinkBook 14(0CCD)英特尔酷睿i5 14英寸轻薄笔记本电脑(十代i5-10210U 8G 512G傲腾增强型SSD 2G独显)','此商品将于2020-01-04,00点结束闪购特卖',4699.00,'ThinkBook 14 i5-10210U|8G|512G傲腾增强SSD','2.38kg','中国大陆','Windows 10','Intel i5','其他','512GB SSD','9小时以上','ThinkBook','1-1.5KG','14.0英寸','AMD Radeon 625','背光键盘，指纹识别，Type-c接口','8GB','其他','其他','img/products/imgs/88f9ef0148147bca87a173c0afc2aeae.jpg','img/products/imgs/42cae3349990861f20e63dfed8c62a8a.jpg|img/products/imgs/3bdc8bdbc0be4b3aac7f3de11e9a69a4.jpg|img/products/imgs/ade4438fe8d8101b0a8f417abc909819.jpg|img/products/imgs/997c4bbf8066d95198def81a493aca93.jpg','img/products/details/f8573830b91d6a88b868d797fa12d60d.jpg|img/products/details/e592a984bbee7d1f6335e93284ec3f5b.jpg|img/products/details/5b68252b7cfa12d6f7596bd2768606c6.jpg|img/products/details/20e5deae9df7dd445063b4e89c54f52e.jpg|img/products/details/cbac863a4a5b0744f77d8d3dc53e7249.jpg',100,11,12,13,NULL,'2020-01-09 22:01:13',NULL),
(15,'3','ThinkPadX','联想ThinkPad X395（0YCD）13.3英寸轻薄笔记本电脑（锐龙7 PRO 3700U 8G 512GSSD FHD 指纹识别）',NULL,4999.00,'【R7】8G 512GSSD 高清','2.2kg','中国大陆','Windows 10','锐龙7','其他','512GB SSD','9小时以上','ThinkPad - X系列','1-1.5KG','13.3英寸','Radeon?RX Vega 10 Graphics','指纹识别，Type-c接口','8GB','其他','其他','img/products/imgs/6d1e1c37da6cda1660d052b14429f38d.jpg','img/products/imgs/4d908f62b92921f9abe587f12d8c10b7.jpg|img/products/imgs/907bb17f6db183a37fe56c3b51faa1b7.jpg|img/products/imgs/82e474d11791efa6bbd80dc4b9065f80.jpg|img/products/imgs/8f6186ef7ffef8351e84fd1065ad19c0.jpg','img/products/details/ab0570af472ba8870f492d36e103d0cf.jpg|img/products/details/ef64f8a37e7ed4a9e3214e0ddb9959c2.jpg|img/products/details/9c687d29b5399968896f2e5840360d6f.jpg|img/products/details/1affc0123e52c3b04d495bd432c11fa4.jpg|img/products/details/4327b2ed9d099501efc66c10117a2350.jpg',100,11,12,13,NULL,'2020-01-09 22:01:15',NULL),
(16,'3','ThinkPadT','联想ThinkPad T495(02CD)14英寸轻薄笔记本电脑(R5 PRO-3500U 8G 512GSSD FHD Micro SD读卡器)','【T系列新品】高性能商务本,搭载AMD移动处理器，大固态存储,降噪麦克风,快速充电，丰富接口，可支持4个USB，指纹识别更快捷',4999.00,'R5 PRO-3500U|8G|512GSSD|FHD','2.46kg','中国大陆','Windows 10','锐龙5','其他','512GB SSD','5-8小时','ThinkPad - T系列','其他','14.0英寸','AMD嵌入式显示核心','指纹识别，Type-c接口','8GB','其他','其他','img/products/imgs/a3fd53172bc4ae7f983050d28489d6d0.jpg','img/products/imgs/bbcbc10a19444e1b9fb38b29450298e0.jpg|img/products/imgs/fc0c31e0ef9fd18a9a4c23a794a44ced.jpg|img/products/imgs/e1ca33f2ecc4bfe2f84624bf9a5042a6.jpg|img/products/imgs/05cb5b1200a1e88a9e5f42d1c392ffc2.jpg','img/products/details/f735efca3cde54b6a8f1be583bfc958b.jpg|img/products/details/98ec88224b9ef4c35e688969ebb81104.jpg|img/products/details/94349309449217da737f2215d20a1660.jpg|img/products/details/6eaac5243dbf87122e1d3454cdf44b74.jpg|img/products/details/d23096e2f7e6fa3168ae9f00bcb09060.jpg',100,101,12,13,NULL,'2020-01-09 22:01:16',NULL),
(17,'3','ThinkPadX1 Carbon','联想ThinkPad X1 Carbon 2019（02CD）英特尔酷睿i7 14英寸轻薄笔记本电脑(i7-10710U 16G 512GSSD WQHD)4G版','此商品将于2020-01-04,00点结束闪购特卖',14699.00,'10代i7|16G|512GSSD|2K屏|4G版','2.22kg','中国大陆','Windows 10','Intel i7','其他','512G PCIe SSD','9小时以上','ThinkPad - X1系列','其他','14.0英寸','英特尔? UHD 显示芯片','背光键盘，PCIE高速固态硬盘，LTE','16GB','其他','其他','img/products/imgs/6963fdd7131eaddeb11e27850fb9d8ed.jpg','img/products/imgs/b71a539780af6ad682d9c94cd9a1c634.jpg|img/products/imgs/d0ec4680d569643464bee1f273b18713.jpg|img/products/imgs/53d23e2def58c5ad5c9ad98e42ff5256.jpg|img/products/imgs/895d24daf9a9bce18c49ce637d4cb8b6.jpg','img/products/details/04da8ad66b450974ee706090d194f772.jpg|img/products/details/7b49616026222fb13771e4c65cd0bc28.jpg|img/products/details/52a80cb29050bf19d2169faa605ad1f7.jpg|img/products/details/5171d58fbc1bb8d9b1a612bbbf7e66b7.jpg|img/products/details/9ec5a46898c1e7f6c70a5ebd47abc4b4.jpg',100,11,102,103,'img/products/banners/79f1c30c183cf46de9bed8b525b1e9de.jpg','2020-01-09 22:01:17',NULL),
(18,'3','ThinkPadT480','联想ThinkPad T480(0PCD)14英寸轻薄笔记本电脑(i7-8550U 8G 128GSSD+1T双硬盘 FHD IPS屏 2G独显 双电池)','此商品将于2020-01-04,00点结束闪购特卖',8999.00,'[独显]i7|8G|128GSSD+1T双盘|FHD','2.68kg','中国大陆','Windows 10','Intel i7','其他','128GB SSD+1TB HDD','5-7小时','ThinkPad - T系列','1.5-2kg','14.0英寸','NVIDIA GeForce MX150','背光键盘，指纹识别','8GB','其他','其他','img/products/imgs/ddc14b62e46a6e269a9f4bbf74e42613.jpg','img/products/imgs/4c28917db70cb80d67167bc081652c75.jpg|img/products/imgs/f9b6501d691a92863ac2efa73f1bf8a5.jpg|img/products/imgs/67b69664e7ac7d8bae985f6c6880ad84.jpg|img/products/imgs/e7eedeca03115cf1a224dcb4902168e2.jpg','img/products/details/b136935983ac7d1006af4ec2f59afda1.jpg|img/products/details/ac5fa4ba714c88f1f948d5549a50a195.jpg|img/products/details/98e9224756451f3075288dab9f73ae1e.jpg|img/products/details/1ae0181a80b0c33d2dd7e8268d3b1629.jpg|img/products/details/c363be56f571763623fdabda222c3ad5.jpg',100,11,12,13,NULL,'2020-01-09 22:01:18',NULL),
(19,'4','华硕（ASUS）PX574','华硕（ASUS） 破晓7 英特尔酷睿 15.6英寸窄边框商务轻薄笔记本电脑 2G独显 银灰色 i5-8265U/8G/256G固态+1TB','【1月3日华硕金鼠焕新机】爆款限时直降！飞行堡垒7，i5单盘低至5999！i7单盘低至6789！购机赠华硕原装鼠垫！白条3期免息，晒单有礼',4299.00,' i5-8265U/8G/256G固态+1TB','1.7kg','中国大陆','Windows 10','Intel i5','18.1mm—20.0mm','256GB SSD+1TB HDD','小于5小时','其他','1.5-2kg','15.6英寸','其他','PCIE高速固态硬盘，双硬盘位，机身厚度小于20mm','8GB','2GB','金属+复合材质','img/products/imgs/10b0f0f6ae77fbe99a3478889b1a4413.jpg','img/products/imgs/4bf47a448537be036bce6f86301b777e.jpg|img/products/imgs/729b2861766f9ffc36551d6e0c51e521.jpg|img/products/imgs/8b36926d7c79c0f1440aa5d512323bad.jpg|img/products/imgs/95c0817e93d961077938e0e5ba6bce0f.jpg','img/products/details/1c112ad723399f1c5d207774cbf23fe1.jpg|img/products/details/8f6ce1b5097d09699a6b120a01ba60b2.jpg|img/products/details/b6bde0b57de19ab3fa9c7e3a4f4bfb07.jpg|img/products/details/55b8237a9e074050566dc849c08a180a.jpg|img/products/details/b6f59e21e8373afe44ce321c355a0810.jpg',100,11,12,13,NULL,'2020-01-09 22:01:02',NULL),
(20,'4','华硕（ASUS）VivoBook14','华硕（ASUS）VivoBook14/15 全面屏窄边框轻薄笔记本电脑 VivoBook14-14英寸 i5-8265U 8G 512G固态 MX250','【1月3日华硕金鼠焕新机】爆款限时直降！飞行堡垒7，i5单盘低至5999！i7单盘低至6789！购机赠华硕原装鼠垫！白条3期免息，晒单有礼',4489.00,'VivoBook14-14英寸','1.8kg','中国大陆','Windows 10','Intel i5','18.1mm—20.0mm','512GB SSD','小于5小时','华硕-VivoBook','1.5-2kg','14.0英寸','NVIDIA GeForce MX250','PCIE高速固态硬盘，Type-c接口，机身厚度小于20mm','8GB','2GB','金属+复合材质','img/products/imgs/712b09345baafce032176b36ca4e1182.jpg','img/products/imgs/b27e3171d7a15594d58ec3e2f98be48e.jpg|img/products/imgs/4dcb28eb210736c54db1c7fa03ff4c70.jpg|img/products/imgs/006f3b816eb3c14394feb22e821fed16.jpg|img/products/imgs/b48a7828e3fb415eb6f2256f29f7a64a.jpg','img/products/details/af01f708eefe80e5c23ab95f91eeb126.jpg|img/products/details/22063163080e7dfea790642260a07ff8.jpg|img/products/details/ea177b08f08c751ce6dab0318172ca95.jpg|img/products/details/fdf58c92b1c2a9c3083028ab6df1979e.jpg|img/products/details/c6908a3cfbdae4db8d09c70d13710844.jpg',100,11,12,13,NULL,'2020-01-09 22:01:04',NULL),
(21,'4','华硕飞行堡垒7','华硕(ASUS) 飞行堡垒7 九代英特尔酷睿i7 120Hz高速屏游戏笔记本电脑(i7-9750H 8G 512SSD GTX1650)金属电竞','【1月华硕年终大促】i7处理器+新GTX1650显卡+高清IPS电竞屏+RGB多彩键盘+强劲散热',6799.00,'新i7处理器 8G 512GSSD GTX1650','3.46kg','中国大陆','Windows 10','Intel i7','25.0mm以上','512GB SSD','小于5小时','华硕-飞行堡垒系列','2-2.5kg','15.6英寸','GTX1650','其他','8GB','4GB','其他','img/products/imgs/3bc7e9256d4ab95b1ee67a438be8683a.jpg','img/products/imgs/b08b50d170c186e1e82af6647a3a4cc0.jpg|img/products/imgs/3784c0cd373eb7ce2071dfb1d8ae8fd2.jpg|img/products/imgs/e880d11013fdc05cbafa3345c8010d9d.jpg|img/products/imgs/cf7a109737c4e0bb7c71154d71a4f39f.jpg','img/products/details/fcc63a2e77058dad8906e963b0b6c3d1.jpg|img/products/details/469ae038e8db639060080907337db156.jpg|img/products/details/aa3ec5f49ba1c895bc0737579a29db97.jpg|img/products/details/3ecd7b56afd8f4ae53562eb1122f1109.jpg|img/products/details/93774badedc0ec02053ffb08ff8d929d.jpg',100,101,12,13,NULL,'2020-01-09 22:01:05',NULL),
(22,'4','华硕Vivobook 系列','华硕(ASUS) VivoBook14 14.0英寸轻薄笔记本电脑(i5-8265U 8G 512GSSD MX250 2G独显)银色(V4000)','【1月华硕年终大促】Vivobook-轻薄碰撞高性能！512G高速存储！高颜值四面窄边框！升级MX250性能显卡！',4699.00,'Vivobook i5 8G 512SSD MX250 银','2.24kg','中国大陆','Windows 10','Intel i5','其他','512GB SSD','5-7小时','华硕-VivoBook','1.5-2kg','14.0英寸','NVIDIA GeForce MX250','PCIE高速固态硬盘，机身厚度小于20mm','8GB','2GB','其他','img/products/imgs/9b60731ec591a207b1e742d2dc08a6cb.jpg','img/products/imgs/64f7670b87e77886e81063b7529bee07.jpg|img/products/imgs/6e63ef9246631f031a200cca929a3fdf.jpg|img/products/imgs/0540cfd35671e3fc1ccae07c93486ddb.jpg|img/products/imgs/e475a833694a31363291e8669f4fa896.jpg','img/products/details/b9a08a8c1f20bfbf2de7f9fef347a542.jpg|img/products/details/f428153f20a3a520b71b3e089bedb09f.jpg|img/products/details/4e71a6d97131df8d1a812a7036205279.jpg|img/products/details/38abeb8ed79a31ee5c729fc8c1cca222.jpg|img/products/details/f6cdf2df6cc5e5dec8fb91e286709ed0.jpg',100,11,12,13,NULL,'2020-01-09 22:01:06',NULL),
(23,'4','华硕Vivobook 系列','华硕(ASUS) VivoBook14s X 14.0英寸英特尔酷睿i5轻薄笔记本电脑(i5-10210U 8G 512G+32G傲腾SSD 2G独显)红','【1月华硕年终大促】十代处理器+四边窄边框+3D面部识别+金属机身+快速充电功能+潮流撞色设计！',5899.00,'14Vivobook sX i5 傲腾512SSD红','6.8kg','中国大陆','Windows 10','Intel i5','其他','512GB SSD','其他','华硕-VivoBook','其他','14.0英寸','NVIDIA GeForce MX250','机身厚度小于20mm','8GB','2GB','其他','img/products/imgs/55b0d2a3cf5c744a0d027cf113e9e658.jpg','img/products/imgs/987d143cff479ac17789dd01cb36f530.jpg|img/products/imgs/98cf6eeb7f422e63564a5c0208904696.jpg|img/products/imgs/761a5022ab584b080167f76e019e9d3d.jpg|img/products/imgs/c274cff90ac7bbd308ed90b7d03df536.jpg','img/products/details/015007f94199815204fb2201dc917465.jpg|img/products/details/b256290159de9fa86644791077bcbfea.jpg|img/products/details/67287f8b041d35b347b87933e2f2054d.jpg|img/products/details/a1c3f69cc0965964f52d4aa6bdc92aca.jpg|img/products/details/c727053dba5997d815a697f746127de6.jpg',100,11,12,13,NULL,'2020-01-09 22:01:07',NULL),
(24,'4','华硕a豆','华硕a豆 adolbook14 十代英特尔酷睿i5 14英寸金属轻薄笔记本电脑(i5-10210U 8G 256G 16G傲腾增强版)梦境粉','【1月华硕年终大促】华硕10代处理器新品！全面屏渐变色爆款！20小时高效长续航，数量稀缺，手慢无货！',5199.00,'【14英寸渐变粉】10代i5处理器 8G 256GSSD','2.47kg','中国大陆','Windows 10','Intel i5','15.1mm—18.0mm','256GB SSD','其他','adolbook','1-1.5KG','14.0英寸','核显','背光键盘','8GB','其他','其他','img/products/imgs/f9b4dea8ea616c78cd73cd76ebffeb26.jpg','img/products/imgs/9c081ee81719661e8dd5fe0dcec9c1f4.jpg|img/products/imgs/cafbfd0bc7ff34218ad70b044099c1ca.jpg|img/products/imgs/52f68724270ce9ec8a23def33e8f4285.jpg|img/products/imgs/073471f336cdcc26f5ec9832d6a138a0.jpg','img/products/details/6882b564931739eec063e86a170581fa.jpg|img/products/details/2550d9001abb696052958c2805e82fc6.jpg|img/products/details/93a5ad5828cab4f03eaaa091a3848af6.jpg|img/products/details/9262f36d43a0a127604819d172702675.jpg|img/products/details/2dedf60cb65693787657005560546e1d.jpg',100,11,12,13,NULL,'2020-01-09 22:01:08',NULL),
(25,'5','联想小新Pro','联想(Lenovo)小新Pro13.3英寸全面屏超轻薄笔记本电脑(标压锐龙R5-3550H 16G 512G 2.5K QHD 100%sRGB)银','锐龙标压处理器性能更强劲，16G双通道内存响应更快速，超窄边框，“真”全面屏！',4999.00,'Pro13|标压R5 16G 512G QHD','2.08kg','中国大陆','Windows 10','锐龙5','15.1mm—18.0mm','512GB SSD','＞12小时','小新Pro','1-1.5KG','13.3英寸','集成显卡','背光键盘，全面屏，面部识别','16GB','其他','金属材质','img/products/imgs/f18ae5febfc877d9363d25ef909bce8c.jpg','img/products/imgs/921c065aaf8e200bcc44de578f607216.jpg|img/products/imgs/49cac957f435abea13c7b20d12d7b5a7.jpg|img/products/imgs/3f35c2684b5935e4e688ee1399e8cabd.jpg|img/products/imgs/06f5e89241032d2b00d3239e33e35b84.jpg','img/products/details/b8159c057debbb658385e6ef1c34fb80.jpg|img/products/details/906525370f0fd3431899e5ca7c4b063d.jpg|img/products/details/45bb024c3067df3fc6a83d713f41529a.jpg|img/products/details/caa27cd4ccfeecba16827825ae8541ae.jpg|img/products/details/21da4de173fe0cbf6ad63ae76aff3e26.jpg',100,11,12,13,NULL,'2020-01-09 22:00:54',NULL),
(26,'5','联想小新Air','联想(Lenovo)小新Air14英寸 AMD锐龙版(全新12nm)轻薄笔记本电脑(R5-3500U 12G 512G PCIE IPS)轻奢灰','超轻薄金属机身，12nm制程CPU，12G超大容量双通道内存，512G_PCIe大固态，丰富接口更便捷',4299.00,'小新Air14|R5 12G 512G','2.36kg','中国大陆','Windows 10','锐龙5','15.1mm—18.0mm','512GB SSD','7-9小时','联想 - 小新Air','1-1.5KG','14.0英寸','集成显卡','指纹识别，全面屏，快充','12GB','其他','金属+复合材质','img/products/imgs/5e9f38d6d79af550af0d6913054b0fec.jpg','img/products/imgs/d287fd28161989be314b4a167546f1de.jpg|img/products/imgs/7fea438ac200b9aef240e18d204b6ebf.jpg|img/products/imgs/193045077ddc346dfba7f084d7c3726d.jpg|img/products/imgs/2bebc7835e7975104da5e2273b1c7ea1.jpg','img/products/details/872b8a04438785fd2b6c76af89590479.jpg|img/products/details/728646cfd15c26c768416e0b2ae8907d.jpg|img/products/details/2289d8637f81764c45e54afe00687d58.jpg|img/products/details/c970077eb4ba2f5e9448b23016c6dea6.jpg|img/products/details/21ae5def420c73147b8a7160890651a6.jpg',100,11,12,13,NULL,'2020-01-09 22:00:55',NULL),
(27,'5','联想拯救者Y7000P','联想(Lenovo)拯救者Y7000P 2019英特尔酷睿i715.6英寸游戏笔记本电脑(i7-9750H 16G 1T SSD GTX1660Ti 144Hz)','超大1T固态，升级双通道16G内存一步到位，GTX1660Ti电竞级独显，英特尔9代i7H高性能处理器，144Hz电竞屏窄边框！',9299.00,'Y7000P2019|i7 16G 1660Ti电竞屏','4.62kg','中国大陆','Windows 10','Intel i7','20.0mm—25.0mm','1T SSD','小于5小时','联想 - 拯救者','2-2.5kg','15.6英寸','NVIDIA GeForce GTX 1660Ti','全面屏，背光键盘，PCIE高速固态硬盘','16GB','6GB','金属+复合材质','img/products/imgs/9d1d2877aab76c1b2af13e945a0d800b.jpg','img/products/imgs/e01748cb1988b541b9fa3b2f70f52391.jpg|img/products/imgs/fbc3e2e34a0f636b0d26adf14e725033.jpg|img/products/imgs/9c20295e7a056038b5e0bcdf29468379.jpg|img/products/imgs/e87faee186920f4ee6c1ab4dd8f6cf45.jpg','img/products/details/278ba02ec9c0ad3c71abde7615d1aa35.jpg|img/products/details/551d1b301879176cb9c0f3c9e271d604.jpg|img/products/details/0f289bc1515f5806f991ef4e237a8432.jpg|img/products/details/bd5af744e2fcee707f510d8abb34840c.jpg|img/products/details/83f013853b16b1a4892236a9cac52f77.jpg',100,11,12,13,NULL,'2020-01-09 22:00:56',NULL),
(28,'5','联想Yoga','联想(Lenovo)YOGA C940 英特尔酷睿i7 14.0英寸超轻薄笔记本电脑(i7-1065G7 16G 1T SSD UHD)深空灰','全新10nm制程处理器，金属机身，4K可触控，360度翻转屏幕，内置4096级压感手写笔，精彩随心而动',10999.00,'Yoga C940|十代i7 16G 1T UHD','2.58kg','中国大陆','Windows 10','Intel i7','10.0mm—15.0mm','1T SSD','其他','联想 - YOGA','1-1.5KG','14.0英寸','共享系统内存（集成）','触控屏，全面屏，360°翻转','16GB','其他','金属材质','img/products/imgs/5af7742a6094120a6962cfc0121c6f24.jpg','img/products/imgs/937884da424fd08576c864952aa53954.jpg|img/products/imgs/2690b28a5ae60b66b08a6018fb4308ac.jpg|img/products/imgs/8b3e41e4d730dcd504aec36a72ca7784.jpg|img/products/imgs/ec5a5eb2071b85f5a77a6dd00007105f.jpg','img/products/details/54476095867f9e42f187e30640f4c574.jpg|img/products/details/2dd279f95117c8db31de30633a4efb82.jpg|img/products/details/893011171b4b9129c4cca1f5d08d7036.jpg|img/products/details/f2073025152423faa89e653169837e83.jpg|img/products/details/8fd92c42036c5d84f1b2ede9a5c9c40d.jpg',100,11,12,103,'img/products/banners/f5af3640fd680078a3531043dcd197c2.jpg','2020-01-09 22:00:57',NULL),
(29,'5','联想MIIX520','联想(Lenovo)MIIX520 二合一平板电脑 12.2英寸 可插拔超轻薄笔记本(i5-8250U 8G/512G SSD/含键盘)星际灰','第八代英特尔酷睿处理器，512G大容量SSD高速硬盘，可插拔键盘，可触控屏幕，轻巧办公，高效长续航',5999.00,'i5键盘套装【8G/512G】星际灰','2.21kg','中国大陆','windows','其他','其他','其他','7-9h','联想（Lenovo）MIIX520','其他','12.2英寸','其他','高保真音质','其他','其他','其他','img/products/imgs/faa3f44fd57e17cac441bc917712eab7.jpg','img/products/imgs/f1a02570bfa57ed69137b46e5890107e.jpg|img/products/imgs/f87295803dc7d8532ae9107e490a46bd.jpg|img/products/imgs/9e4aea81c702f5862454119e9eda98fb.jpg|img/products/imgs/94b196124ea4d4a13090e4dabfeba635.jpg','img/products/details/d435b74f70d15c0f5b57b66fda9d07a9.jpg|img/products/details/891cbfe1a74bcb3cc8b92f5bffd266aa.jpg|img/products/details/6a056d1ab8ae0341454cdcbf781eeca0.jpg',100,11,12,13,NULL,'2020-01-09 22:00:58',NULL),
(30,'5','联想威6系列','联想（Lenovo）威6 Pro 英特尔酷睿 i5 13.3英寸轻薄窄边框笔记本电脑(i5-8265U 8G 512GSSD 2G独显 100%sRGB 一键开机登录 Type-C 两年上门)太空灰','【72%NTSC、15.9mm厚、1.34kg轻薄本】航天5系全铝金属机身、三面窄边框',4699.00,'威6pro13|i5 8G 512G 独显72色域','2.1kg','中国大陆','Windows 10','Intel i5','15.1mm—18.0mm','512G PCIe SSD','9小时以上','联想-扬天系列','1-1.5KG','13.3英寸','AMD R540X GDDR5 2G独立显卡','背光键盘，指纹识别，PCIE高速固态硬盘','8GB','2GB','金属+复合材质','img/products/imgs/e80f56f641f79740c5e909ed0b26c4fd.jpg','img/products/imgs/99a0887e4f5c820da58784119dc75106.jpg|img/products/imgs/14a9a8ecad0ef1e125e5bfa5e7623c8c.jpg|img/products/imgs/9bb83e66fe967e399574e58c408c9c4b.jpg|img/products/imgs/0bf24b9c36d8c8c5de340a0f495fda47.jpg','img/products/details/3d1156de9c9739249973d073da5ede07.jpg|img/products/details/707ca9b70368156b09c0f0d7f279b935.jpg|img/products/details/5a20f739198d05e2d7206c559a543b8c.jpg|img/products/details/600b3f796ab7b5afb167eb75ae79c4e7.jpg|img/products/details/a2b4bbeef525f78383435cb1a285f3d5.jpg',100,11,12,13,NULL,'2020-01-09 22:01:00',NULL),
(31,'6','戴尔灵越5000','戴尔灵越5000 14英寸英特尔酷睿i5高性能轻薄窄边框笔记本电脑(十代i5-1035G1 8G 512G MX230 2G)银','【年货节抢好礼】十代轻薄本低至3999，优选爆款六期免息，晒单更享外星人配件/加湿器！',4289.00,'十代新品Ins5493 i5-1035G1 8G 512G MX230','2.55kg','中国大陆','Windows 10','Intel i5','15.1mm—18.0mm','512G PCIe SSD','5-7小时','戴尔 - Inspiron','其他','14.0英寸','MX230','PCIE高速固态硬盘','8GB','2GB','其他','img/products/imgs/d6961d8c351964c2d81d972e807cd7da.jpg','img/products/imgs/5a63421c5af368d532213ec723cffb6e.jpg|img/products/imgs/3cc70fbdb0f327fcef3f03f1405824c0.jpg|img/products/imgs/edd25e33d3187060642833280bb1ed44.jpg|img/products/imgs/b7e4ca3b30bb996c3cba1aabb9fbc8f7.jpg','img/products/details/d6a64ec41023b076757bf8b82ce42dd9.jpg|img/products/details/d6dab242d1c905196aae72df7c026512.jpg|img/products/details/7f7cb42c53f2a0b88025337db7ad95f1.jpg|img/products/details/3c1351b56bc3e81404ad6ac1f9d30d59.jpg|img/products/details/42882cf9b15327cf6c77e39dc476416e.jpg',100,11,12,13,NULL,'2020-01-09 22:00:45',NULL),
(32,'6','戴尔G3','戴尔DELL游匣G3 15.6英寸英特尔酷睿i5游戏笔记本电脑(i5-9300H 8G 512G GTX1650 4G 72色域 2年整机上门)','【年货节抢好礼】十代轻薄本低至3999，优选爆款六期免息，晒单更享外星人配件/加湿器！',5589.00,'G3 i5|1650 4G独显|512GSSD|72色域','3.42kg','中国大陆','Windows 10','Intel i5','20.0mm—25.0mm','512GB SSD','9小时以上','戴尔 - 游匣','2-2.5kg','15.6英寸','GTX1650','PCIE高速固态硬盘','8GB','4GB','其他','img/products/imgs/fbc469f6ab9d21a8708d87352a1a72e1.jpg','img/products/imgs/ab3a030b8440b04e8f3876292d7c7e58.jpg|img/products/imgs/cae2a38b6ab022564ff4776b172d1b14.jpg|img/products/imgs/ad114f93b3a49ca49b5125dc06c9a0df.jpg|img/products/imgs/14800e9894b5390fb060d5273095c5c6.jpg','img/products/details/3cedee7130339ab46a8079eff4778160.jpg|img/products/details/7834e9bf33239f0a760d0eba59a83497.jpg|img/products/details/6d6b36d5fa8ecc731da1e60c8ceaefaf.jpg|img/products/details/60bec6a8f6ba312d7e94175bace73a6b.jpg|img/products/details/4a246f711b08ade308d4299decb14952.jpg',100,11,12,13,NULL,'2020-01-09 22:00:46',NULL),
(33,'6','戴尔Ins 15-7591','戴尔DELL灵越7000英特尔酷睿i7 15.6英寸创意设计轻薄笔记本电脑(i7-9750H 8G 512G GTX1650 高色域 2年全智)','【年货节抢好礼】十代轻薄本低至3999，优选爆款六期免息，晒单更享外星人配件/加湿器！',7289.00,'[灵越]i7-9750H 512G GTX1650 4G','3.0kg','中国大陆','Windows 10','Intel i7','18.1mm—20.0mm','512GB SSD','7-9小时','戴尔-灵越系列','1.5-2kg','15.6英寸','NVIDIA GTX 1650','PCIE高速固态硬盘','8GB','4GB','其他','img/products/imgs/6967bce3f6ad1ceee6585de786b50fd7.jpg','img/products/imgs/d6c08dd5833b1c0cd477d1e6f655e766.jpg|img/products/imgs/fdc4697da354b93d288a9fc010333426.jpg|img/products/imgs/b213bf3bb6be63488911bfe16607b84b.jpg|img/products/imgs/1cce33b0585824be87b9e6504c58bb9b.jpg','img/products/details/aa4ee18feb13ca76a35c05180f1f64b7.jpg|img/products/details/f07f298df11020c110dec1305cf8c152.jpg|img/products/details/d09daf6557f141851e21ab9ce9157bd3.jpg|img/products/details/dc830e5e0f23b9bbbacc994d73733572.jpg|img/products/details/3b4721e530f7b72eeaade50fe92693d9.jpg',100,11,102,13,NULL,'2020-01-09 22:00:48',NULL),
(34,'6','戴尔G7','戴尔DELL G7 15.6英寸英特尔酷睿i7 DCI-P3色域创意设计师笔记本电脑(i7-9750H 8G 512G GTX1650 4K OLED)','高端设计师笔记本,OLED屏,DCI-P3广色域覆盖,4K全高清,九代标压处理器,GTX1650显卡,2年先智服务',9989.00,'[G7设计师]i7 512G 1650 4G OLED','3.72kg','中国大陆','Windows 10','Intel i7','其他','512GB SSD','其他','戴尔 - Inspiron','其他','15.6英寸','NVIDIA GTX 1650','PCIE高速固态硬盘','8GB','4GB','其他','img/products/imgs/d7fc228b6c3ff517f5ff34ab2c1018d9.jpg','img/products/imgs/eb553839f3b4d7a51693764e2dc90405.jpg|img/products/imgs/b72b60fccb065fb37bf6875e2c7c72bc.jpg|img/products/imgs/660b78bb111dafd9150f15173dc9a1a0.jpg|img/products/imgs/f0f89845666801f26dac6b7586ac73ac.jpg','img/products/details/7ad9fd7de1a520e3f990ab501b057734.jpg|img/products/details/e6669227b5491157570bc9320427f8ae.jpg|img/products/details/d6de388bb29dad1d61757bb86b10b8cb.jpg|img/products/details/e2f57bc4332c41274dfaf65a2a46698f.jpg|img/products/details/ebf6e6a77437ced65b15005f4a247f91.jpg',100,11,12,13,NULL,'2020-01-09 22:00:49',NULL),
(35,'6','戴尔灵越 fit','戴尔灵越5000 fit 14英寸英特尔酷睿i7轻薄笔记本电脑(十代i7-10510U 8G 1TSSD MX250 2G 2年整机上门)银','【年货节抢好礼】十代轻薄本低至3999，优选爆款六期免息，晒单更享外星人配件/加湿器！ ',6289.00,'新品|十代i7 8G 1TSSD MX250 银','2.28kg','中国大陆','Windows 10','Intel i7','15.1mm—18.0mm','1T','5-8小时','戴尔 - Inspiron','1-1.5KG','14.0英寸','NVIDIA MX250','背光键盘，PCIE高速固态硬盘','8GB','2GB','其他','img/products/imgs/7ea980c1a8d6a2bef876250fdb875bd3.jpg','img/products/imgs/db1ed05771d2dda8820fa29fde60115d.jpg|img/products/imgs/00798328a7066fc0130619bda3209ec3.jpg|img/products/imgs/e496415f63804ceafe0c35b5548398e0.jpg|img/products/imgs/6e94e5ffb41c547e77a0e1bddc6481c5.jpg','img/products/details/8161871d2689a58821bd38a559526e2e.jpg|img/products/details/a11105098dcf19bc59f9f7229f20ea23.jpg|img/products/details/4a3d1fa634c1408775ade92820810f85.jpg|img/products/details/b22eec1769f4dc210fe8c9197fa46e18.jpg|img/products/details/7d0419ba598720d2433eca7060dee886.jpg',100,11,12,13,NULL,'2020-01-09 22:00:50',NULL),
(36,'6','戴尔XPS 13','全新戴尔DELLXPS13-7390 13.3英寸英特尔酷睿i7超轻薄笔记本电脑(十代 i7-10710U 16G 1TB SSD 2年先智)银','【年货节抢好礼】十代轻薄本低至3999，优选爆款六期免息，晒单更享外星人配件/加湿器！',14999.00,'7390【十代i7-10710U 1TSSD银】','2.44kg','中国大陆','Windows 10','Intel i7','10.0mm—15.0mm','1T SSD','9小时以上','戴尔 - XPS','1-1.5KG','13.3英寸','共享系统内存（集成）','指纹识别，PCIE高速固态硬盘','16GB','其他','其他','img/products/imgs/5dca618db8920658212493adfbb37082.jpg','img/products/imgs/b8e98f6f91b95362e3e44fcdc840f846.jpg|img/products/imgs/21e12ecb9fe8df883e5a28a6733bc1a9.jpg|img/products/imgs/1faafd8d0f44d16a0048a98e717245e5.jpg|img/products/imgs/0135b9d9eea1c204ad467abd66c8932d.jpg','img/products/details/0496e44cb9e634695e121bed15b3a439.jpg|img/products/details/855ed9cb0d4d36cb5f8f43bd09e5134f.jpg|img/products/details/cbb7aa4e4d55ac3bc4fc8679cc3f5170.jpg|img/products/details/f2eeec052399646dc0940661550d549c.jpg|img/products/details/a5b0f771adcdfebfddd069fa05f090ff.jpg',100,11,102,13,NULL,'2020-01-09 22:00:51',NULL),
(37,'11','华为MateBook X Pro','华为(HUAWEI)MateBook X Pro 2019款 第三方Linux版 13.9英寸全面屏轻薄笔记本电脑(i7-8565U 8+512GB 3K) 灰','【限量送尊享礼包+“新机咨询服务”】采用3K炫丽全面屏，轻薄金属机身，91%的屏占比，为您实现娱乐办公无界体验！',9699.00,'【第三方Linux版】i7独显 深空灰','2.177kg','中国大陆','第三方Linux','Intel i7','10.0mm—15.0mm','512GB SSD','其他','华为-Matebook X Pro','1-1.5KG','13.9英寸','NVIDIA GeForce MX250','触控屏，背光键盘，全面屏，PCIE高速固态硬盘，快充，Type-','8GB','2GB','金属材质','img/products/imgs/1a5efe4816537af5788a0900bc78ac64.jpg','img/products/imgs/d833dcf50dd8aafc2a6642900df8838d.jpg|img/products/imgs/280a84df48407033e4789d4cc5b0c556.jpg|img/products/imgs/43f83e395e6d5a66897ea2b2ec3687ff.jpg|img/products/imgs/35fe26878d9e02791a3a00ae3a85abcf.jpg','img/products/details/0852c631bbe8bc4920a3f2f340dda84b.jpg|img/products/details/14b5ef679966d2e0439025dc2c9be172.jpg|img/products/details/f7536fdcd82a508df6671227259188a4.jpg|img/products/details/bd14d7c08cde612488f8a78efce99507.jpg',100,101,12,13,NULL,'2020-01-09 22:00:19',NULL),
(38,'11','华为(HUAWEI) MateBook D','华为笔记本电脑 MateBook D 四核 轻薄 商务手提高清IPS 大屏学生电脑荣耀银 I7-10510U/16G内存256G+1T独显','【跨年盛典】京东年货节华为10代新品预售D系列i7-10510内存16G双硬盘轻薄便携多屏协同一件指纹解锁独显满血版MX250显卡',6599.00,'I7-10510U/16G内存256G+1T独显','1.9kg','中国大陆','Windows 10','Intel i7','10.0mm—15.0mm','256GB SSD+1TB HDD','5-7小时','华为 - MateBookD','1.5-2kg','15.6英寸','NVIDIA GeForce MX250','指纹识别，全面屏，双硬盘位','16GB','2GB','金属材质','img/products/imgs/df02e1cb2c304eb351c2e864b46c2796.jpg','img/products/imgs/16e76a9b6ee6bf11e12f8225837f3fae.jpg|img/products/imgs/ee24bc2dc77be916551120fe87c73054.jpg|img/products/imgs/dde03297423b96b63de93a862d86ff33.jpg|img/products/imgs/e250e10ccd965a624ab5b90345e466b8.jpg','img/products/details/39436bbcc08cbee21ee3ecc618e32fa0.jpg|img/products/details/0468e629b68078b331b833afb0f121f1.jpg|img/products/details/5899dc11365b9c1d9049ad88c7e983ed.jpg|img/products/details/967869c52f8bae74d1dd0a9e54b7db86.jpg|img/products/details/b65e46e5c7d2079d71a32ee10176c8f6.jpg',100,11,12,103,'img/products/banners/9a144c8af1d04feaa7c6823cd50d89c5.jpg','2020-01-09 22:00:21',NULL),
(39,'11','华为笔记本MateBook D超薄本15.6英寸轻薄商务办公学生手提游戏本便携笔记本电脑预装正版系统 定制版银 I7-8550U/32G/512G+1T','华为笔记本MateBook D超薄本15.6英寸轻薄商务办公学生手提游戏本便携笔记本电脑预装正版系统 定制版银 I7-8550U/32G/512G+1T','15.6英寸大屏,宽阔视野,轻薄商务,IPS广视角全高清,双硬盘大容量,酷睿八代4核处理器',8388.00,'定制版银 I7-8550U/32G/512G+1T','2.5kg','中国大陆','Windows 10','Intel i7','18.1mm—20.0mm','512GB SSD','7-9小时','华为 - MateBookD','1.5-2kg','15.6英寸','独立显卡','双硬盘位，Type-c接口，机身厚度小于20mm','16GB','其他','金属+复合材质','img/products/imgs/ab653655f1f0daf02ddc336fdd6d805d.jpg','img/products/imgs/436c5e5314acb2a0ebcc6ef534ec2781.jpg|img/products/imgs/7debb0c68292870503ca226e97612c89.jpg|img/products/imgs/71d702bdffc28d08bdf9b76e128c6b81.jpg|img/products/imgs/e8fc1b99c6470eda0d5e975d6e5b46e0.jpg','img/products/details/ee39e4458ff47ddead5d187a2122ee99.jpg|img/products/details/33e09733534a34dfab07acbe95a04cd7.jpg|img/products/details/053b1e5793a6d19f55dd881240392039.jpg|img/products/details/fad08e6655efaacf40e2297a76b83b87.jpg',100,11,12,13,NULL,'2020-01-09 22:00:33',NULL),
(40,'11','华为MateBook 13','华为(HUAWEI)MateBook 13 第三方Linux版 全面屏轻薄性能笔记本电脑 (i5-8265U 8G 512G 2K 独显)银','【限量送鼠标+“新机咨询服务”】采用2K高清全面屏，轻薄金属机身，为您带来便携无忧出行、畅爽娱乐办公体验！',5199.00,'【第三方Linux版】i5独显 皓月银','2.1kg','中国大陆','第三方Linux','Intel i5','10.0mm—15.0mm','512GB SSD','其他','华为-Matebook','1-1.5KG','13.0英寸','NVIDIA? GeForce MX250','背光键盘，全面屏，PCIE高速固态硬盘，快充，Type-c接口','8GB','2GB','其他','img/products/imgs/8aeaefce1058422b262f4bfd2892ccb0.jpg','img/products/imgs/75c2a8f410450790ef935aeb50422deb.jpg|img/products/imgs/b8e73301c02bbd67c979c1b2bcf19941.jpg|img/products/imgs/e40149183c4bcb8de1c8750c98b8ac24.jpg|img/products/imgs/8e51236a29a12e29723e7fa481d8ff4a.jpg','img/products/details/c858cd16a860c2fb5e574462ceec3f66.jpg|img/products/details/5717444f8238779449c01ad80937262c.jpg|img/products/details/77562b7b5146ccbd2e664c5e383ed4ee.jpg|img/products/details/8b9e44ff227c1d675a09c235ec0a0938.jpg|img/products/details/54271fa82a8beda29d136ea1a956476b.jpg',100,11,12,13,NULL,'2020-01-09 22:00:34',NULL),
(41,'11','华为MateBook 14','华为(HUAWEI)MateBook 14 第三方Linux版 全面屏轻薄性能笔记本电脑(i5-8265U 8+512GB 2k 独显)灰','【限量送双肩包+“新机咨询服务”】采用2K高清全面屏，轻薄金属机身，90%的屏占比，为您实现娱乐办公无界体验！',5699.00,'【第三方Linux版】i5独显 深空灰','2.22kg','中国大陆','第三方Linux','Intel i5','15.1mm—18.0mm','512GB SSD','其他','华为-Matebook','1.5-2kg','14.0英寸','NVIDIA GeForce MX250','背光键盘，全面屏，PCIE高速固态硬盘，Type-c接口','8GB','2GB','金属材质','img/products/imgs/83c3f92e3befbc43fde39ad9fd8eafdc.jpg','img/products/imgs/a4b61c1f04857ca6d189b946af900236.jpg|img/products/imgs/0aaac8cbe11caac5fb16eedf42c21fb0.jpg|img/products/imgs/21f0415d633c1224e7fe069d46c33b2b.jpg|img/products/imgs/07a1f243c2a55196f945c811f6e9bb21.jpg','img/products/details/2640de82e5963625603733128cd53fb0.jpg|img/products/details/9bca057d12fca6dbd43974253ebf810b.jpg|img/products/details/04979c0a18002c582a77e7859db8a6ef.jpg|img/products/details/e0869f3ff21409f7ad2ce522817a4404.jpg',100,11,12,13,NULL,'2020-01-09 22:00:35',NULL),
(42,'11','华为MatePad Pro','华为(HUAWEI)MatePad Pro10.8英寸麒麟990影音娱乐办公全面屏平板电脑6GB+128GB WIFI(夜阑灰)','【旗舰新品享3期免息】搭载麒麟990芯片，支持多屏互动，植入强大插件，配合高清全面屏，为您带来智慧办公体验！',3299.00,'【新品】6G/128G/WIFI/夜阑灰','0.925kg','中国大陆','Android','其他','7.1mm-9mm','128G','其他','平板','其他','10.8英寸','其他','多点触控；GPS导航；陀螺仪；重力感应；光线感应','6GB','其他','其他','img/products/imgs/7e9a2a090d39789492202872b488e1c4.jpg','img/products/imgs/e41759ebc38d153e55e5f5f0bded1728.jpg|img/products/imgs/e4b8f75de2064ca555df0aa2f7372b12.jpg|img/products/imgs/4d5ee635fb12d8ea7ec290a42089765f.jpg|img/products/imgs/9714d56edb52b8dda7f7fd7061d3f974.jpg','img/products/details/2b28979b94a9c1f9301b999de6dd034e.jpg|img/products/details/b6df65da5969730db506abd1f2ad5cdc.jpg|img/products/details/a23d6fd674a3a47f74f0971497271999.jpg|img/products/details/b9e8453e3788fd1a257a7a7289aadbe7.jpg|img/products/details/ea2152f25e24a0c60fb850235911aaa0.jpg',100,11,12,13,NULL,'2020-01-09 22:00:37',NULL),
(43,'12','惠普HP ZHAN99 G1','惠普（HP）战99-25 15.6英寸 工作站 设计本 笔记本i7-9750H/16GB/256GB PCIe+2TB/W10 Home/4G独显','【年货节爆品】战99高性能工作站级商务本，intel标压处理器，6.89mm窄边框',8499.00,'【9代标压】i7 16G 256SSD+2T','3.6kg','中国大陆','Windows 10','Intel i7','20.0mm以上','256GB PCIe NVMe TLC SSD','其他','惠普 - 战系列','2-2.5kg','15.6英寸','其他','背光键盘，指纹识别','16GB','4GB','其他','img/products/imgs/851cd551e01ecbf4cfba099631ab25c1.jpg','img/products/imgs/ca1a4bbd0778ad5f234ec8281572fc02.jpg|img/products/imgs/2d60b9fa54e44d1ea177e6258eacb431.jpg|img/products/imgs/0ba7fa1c0fa49278f7adb8af247998b2.jpg|img/products/imgs/392f6002a982cc8fb9669f20e470e557.jpg','img/products/details/e5a38c6a02487af33c126c8ac8d443c6.jpg|img/products/details/3fb363f2238972673e7ef2166902f63c.jpg|img/products/details/5737002ac880082db8ebb2bd930876c2.jpg|img/products/details/6cdff1193df7ef4bd84eddb43016633b.jpg|img/products/details/19c0024d720dc56662fd887ded6eb1e5.jpg',100,11,12,13,NULL,'2020-01-09 22:00:05',NULL),
(44,'12','惠普战66 Pro 15 G3','惠普（HP）战66三代 15.6英寸轻薄笔记本电脑（i7-10510U 16G 512G MX250 2G 高色域一年上门+意外 2年电池）','【年货节爆品】全新第十代CPU，180度开合，标配背光键盘，19项军规测试',7299.00,'i7十代 15’高色域 MX250 2G独显 16G 512G PCIe','2.66kg','中国大陆','Windows 10','Intel i7','18.1mm—20.0mm','512G PCIe SSD','其他','惠普 - 战系列','1.5-2kg','15.6英寸','Nvidia MX250 2G GDDR5','指纹识别，PCIE高速固态硬盘，长寿命电池','16GB','2GB','其他','img/products/imgs/1f0ffe9f90355477e9e957ee45b98cd9.jpg','img/products/imgs/5935976364aa683b8f0f989384db6886.jpg|img/products/imgs/4cca99ce2952a9bfc4796b38de2d8c03.jpg|img/products/imgs/060c158d1db10c4897c97c7083ea73cd.jpg|img/products/imgs/0b8e1f60a3edf2fb0398011c8326dc2c.jpg','img/products/details/f5d240d1debf96cbfd8700ef68dc6ea8.jpg|img/products/details/e3bc71b33ae9168ee06ce55b78cb0a52.jpg|img/products/details/f980182aa56d5c76b91b54cf2b525e80.jpg|img/products/details/725286e9b90d2f44848aecbaeffad982.jpg|img/products/details/1aeae8e1263660952659f1814278cb61.jpg',100,11,12,13,NULL,'2020-01-09 22:00:07',NULL),
(45,'12','惠普（HP）0132TX/0135TX/0137TX/0139TX/0040TXPRC/0209TX','惠普HP光影精灵5 15.6英寸游戏笔记本电脑 8G/512G SSD/ i7/GTX1660Ti Max-Q 6G独显',NULL,8299.00,'i7/GTX1660Ti Max-Q 6G独显','3.37kg','中国大陆','Windows 10','Intel i7','20.0mm以上','512GB SSD','小于5小时','惠普 - Pavilion','2-2.5kg','15.6英寸','其它','背光键盘','8GB','其他','其他','img/products/imgs/ef701b7a8f2f7a46343305839108177b.jpg','img/products/imgs/895b951e86f3409efb2c9942b3fa3e5c.jpg|img/products/imgs/b8c8beb80047381b9712561b32873bff.jpg|img/products/imgs/275e363cf10b5bc80d732810fa35104a.jpg','img/products/details/1cdf84d67191adace8d1004e188fc67e.jpg|img/products/details/b26713adfae958ce23a41c70b7134f9e.jpg|img/products/details/4df7b140d4085b97dae50f002af64e6b.jpg|img/products/details/4a3a1a4b64b23181570a3bd209b5f0e4.jpg|img/products/details/24ae3e920d246c1830873a9021be8610.jpg',100,11,102,13,NULL,'2020-01-09 22:00:08',NULL),
(46,'12','惠普HP EliteBook系列','惠普 (HP) Elite蜻系列13.3英寸超轻薄笔记本电脑（i7-8565U 16GB 2TB 4K触屏带触控笔 一年上门+意外）','【年货节爆品】',17999.00,'4K高清触控翻转屏','3.1kg','中国大陆','Windows 10','Intel i7','15.1mm—18.0mm','SSD 2TB PCIe NVMe TLC','其他','惠普-EliteBook','1-1.5KG','13.3英寸','集成显卡','触控屏，长寿命电池，机身厚度小于20mm','16GB','其他','其他','img/products/imgs/af4b7ab8d061d215f9cfda680388c0ea.jpg','img/products/imgs/23eaa18dd260726100bc7da543c55747.jpg|img/products/imgs/6c562d30ecbfef96d31958c54e1b3b28.jpg|img/products/imgs/aa77956f3222e8fab2472a8644618062.jpg|img/products/imgs/44df032302669ef68f7fc86bbb9caa39.jpg','img/products/details/df74e1b3461702d15eac370b97588c3f.jpg|img/products/details/70f4ce1cbaeeb095db24e000f06b8d92.jpg|img/products/details/b3a746d3e9f01d71708e1fa278fa8fec.jpg|img/products/details/9cb8ac4dca24b840d50532484951ccd9.jpg|img/products/details/0ae2bcfdb387cb91a396c41f8f8e0070.jpg',100,11,12,13,NULL,'2020-01-09 22:00:13',NULL),
(47,'12','惠普Envy15x360','惠普(HP)ENVYx360 15 15.6英寸轻薄翻转笔记本(i7-10510U 8G 1TB PCIE SSD MX250 4G 触控屏)摩卡黑木纹','【年货节爆品】可以盘的笔记本，全新ENVY系列产品搭载intel十代CPU，高性能长续航轻薄本',8899.00,'木纹 独显 i7-10510U 【15.6英寸,触控屏】8G 1TBSSD','2.8kg','中国大陆','Windows 10','Intel i7','15.1mm—18.0mm','1T SSD','＞12小时','惠普 - ENVY','1.5-2kg','15.6英寸','NVIDIA GeForce MX250','触控屏，PCIE高速固态硬盘，机身厚度小于20mm','8GB','4GB','金属材质','img/products/imgs/79d1c7cc948843f8570a6ab36370c485.jpg','img/products/imgs/35eb418940a9f4e015c0e9cbf02ec77f.jpg|img/products/imgs/499eb08e12c6a061ff6ea89d6fbdfae0.jpg|img/products/imgs/19158494c83e70f73929d8075685d597.jpg|img/products/imgs/e373dfa327aa58ab86ba5424288435bf.jpg','img/products/details/de089073da5d95f1d1a45c0937d139c6.jpg|img/products/details/bd6d4ddafd36d486fd185ce4de065522.jpg|img/products/details/e6ee276e98cdb352da020aca6c8306c8.jpg|img/products/details/d5bf4a13ef29803f4a78fb9ba05ab9a2.jpg|img/products/details/c19e238491c691f942c2162af5e654ea.jpg',100,11,12,103,'img/products/banners/58a8a2a71980e6941530f1b1ec18d2e0.jpg','2020-01-09 22:00:15',NULL),
(48,'12','惠普战X 13 G2','惠普（HP）战X 13.3英寸轻薄笔记本电脑（i7-8565U 8G 1TBSSD Win10 72%NTSC 一年上门）','【年货节爆品】360°翻转，金属机身，双雷电接口，1000尼特亮度，10点触控',7999.00,'战X 13.3英寸i7-8565U 8G 1TBSSD','2.23kg','中国大陆','Windows 10','Intel i7','15.1mm—18.0mm','1T SSD','9小时以上','惠普 - 战系列','1-1.5KG','13.3英寸','集成显卡','触控屏，指纹识别，360°翻转','8GB','其他','其他','img/products/imgs/ab4bd02b234754674af504e20609e331.jpg','img/products/imgs/028600d7717641fc9e7db4389c0fea9e.jpg|img/products/imgs/d01635cfed0bac6e9c3283dbb78407ab.jpg|img/products/imgs/f838d2b88e54916a5b7e09b9bded2542.jpg|img/products/imgs/3f8c1a88dbcb6d3c932e43e43f7ecc8b.jpg','img/products/details/f0710b2a190a1b2915c6511cb21a08da.jpg|img/products/details/f2b3445acbf302aa9bcdbdcef0198cba.jpg|img/products/details/2512b4343907f4b21d3011c40dc87066.jpg|img/products/details/4b20a69c41d32806ff1fed89b67e545c.jpg|img/products/details/4f22b7b7f75983a74ba8a16ab2a75efa.jpg',100,11,102,13,NULL,'2020-01-09 22:00:16',NULL),
(49,'13','宏碁Concept-D','宏碁ConceptD3九代标压英特尔酷睿i5 15.6英寸轻薄创意设计师本 高性能工作站 游戏本显卡笔记本电脑 (16G大内存 512G SSD GTX1650 高色域屏 潘通认证 三年上门保修)','【晒单赢好礼】专业设计师电脑，九代标压,PANTONE认证，DCI-P3高色域屏，三年上门保修',7088.00,'设计师优选|GTX1650|高色域屏|黑','4.08kg','中国大陆','Windows 10','Intel i5','其他','512GB SSD','5-8小时','concept-D','其他','15.6英寸','其他','背光键盘','8GB+8GB','其他','其他','img/products/imgs/52a663885f9a03f38fe837ff39c11d09.jpg','img/products/imgs/8c7074ebbdfdae9c2feb0ac1c8fb5a5a.jpg|img/products/imgs/8bb1abedb18570ceb1d5e1e0c9126759.jpg|img/products/imgs/d41eca69b347c4060d60d9720c9ca361.jpg|img/products/imgs/6e08e1ce28ab36057468e58c10ddae81.jpg','img/products/details/88e00b678233df50018a7a60b0d936a4.jpg|img/products/details/efd3b0bfa7b3928695fd262a077ca1db.jpg|img/products/details/74f27ebe74eba30a6c5853b2afa5bd5c.jpg|img/products/details/f320558062aedd3f5a7f5295f634204e.jpg|img/products/details/e64adfe615f821fbb08f901109206556.jpg',100,11,12,13,NULL,'2020-01-09 21:59:56',NULL),
(50,'13','宏基蜂鸟Swift5 14英寸超轻薄触控屏学生便携商务办公手提笔记本电脑 尊贵白【i5-1035G1/MX250】触控屏 8G/512G PCIE【六倍提速】','宏碁acer【官方旗舰店】宏基蜂鸟Swift5 14英寸超轻薄触控屏学生便携商务办公手提笔记本电脑 尊贵白【i5-1035G1/MX250】触控屏 8G/512G PCIE【六倍提速】','【品牌年货节：抢劵再减300，尊贵蓝：6999】【全新十代酷睿】【满血2G独显】【72色域触控屏】',7299.00,'尊贵白【i5-1035G1/MX250】触控屏','0.97kg','中国大陆','Windows 10','Intel i5','10.0mm—15.0mm','512GB SSD','7-9小时','宏碁 - 蜂鸟','小于1KG','14.0英寸','其他','触控屏，背光键盘，指纹识别','8GB','2GB','金属材质','img/products/imgs/48c7292ae69edef7e8e5665f2e90d800.jpg','img/products/imgs/e8e16effac9c0934b56a8b3321a126f9.jpg|img/products/imgs/f8c206b710c589af94661d81691cb94f.jpg|img/products/imgs/6473e62eaa352351b404574a4848d330.jpg|img/products/imgs/3efb999912e8462df1a3b75113e797e8.jpg','img/products/details/98817fd7168805133cd6ff92d114c530.jpg|img/products/details/50c612263f9e1eaf99a3d46d9dc6a6eb.jpg|img/products/details/1376155739bcbeddfe0efbcd412c26bc.jpg|img/products/details/8a507bbd19b2f87d75f08db8cf021bae.jpg|img/products/details/2acf7adcf067220be70e48b6a6d74f5d.jpg',100,11,12,13,NULL,'2020-01-09 21:59:57',NULL),
(51,'13','宏碁TraveMate','宏碁(Acer)墨舞X45 14英寸商务超轻薄笔记本（i7-8565U 16G 512GBPCIe IPS 镁锂合金机身 触控屏 980g)',NULL,7999.00,'【980g】i7-8565U 16G 512G 触控','2.17kg','中国大陆','Windows 10','Intel i7','10.0mm—15.0mm','512GB SSD','9小时以上','宏碁 - 墨舞','小于1KG','14.0英寸','集成显卡','触控屏，指纹识别，PCIE高速固态硬盘，Type-c接口','16GB','其他','金属材质','img/products/imgs/5a3f6bac111657411813a5ed951a2b60.jpg','img/products/imgs/719b43f07e76b5f8e3a3876104157b70.jpg|img/products/imgs/b0493a6a52d9ae89bd868fa3c5771e3f.jpg|img/products/imgs/eed1bb4478e86a19e98b34958458246d.jpg|img/products/imgs/f3fe193bf7012b7e85a4f2fe9713de40.jpg','img/products/details/26eb254c81feec6fee0c04365a49b005.jpg|img/products/details/eceb40fdaff8bf2d00eefd252bdcf1e1.jpg|img/products/details/cd821f39a2704080e5104965219ce9d1.jpg|img/products/details/049987fe1a56ea58fd1c9da77c96cb04.jpg|img/products/details/795eeae14257c44aa1c804f3f4fc640e.jpg',100,11,12,13,NULL,'2020-01-09 21:59:59',NULL),
(52,'13','宏碁（acer）AN517-51','宏碁acer宏基暗影骑士4轻刃九代酷睿17.3英寸全面屏学生手提金属学生吃鸡游戏办公笔记本电脑 i7-9750H 1650 4G独显 16G 256PCIE+1T 定制版','【京东年货节，领卷减600】暗影4轻刃17.3英寸金属机身大屏游戏本，72色域双风扇急速散热',8899.00,'i7-9750H 1650 4G独显 16G 256PCIE+1T 定制版','2.6kg','中国大陆','Windows 10','Intel i7','20.0mm以上','256GB SSD+1TB HDD','7-9小时','adolbook','大于2.5KG','17.3英寸','独立显卡','背光键盘，双硬盘位，双内存插槽','16GB','其他','金属+复合材质','img/products/imgs/ba20efd7849e104964fcbf41326d555e.jpg','img/products/imgs/8309e4ce8c75f81926068b6ae9eda41d.jpg|img/products/imgs/46ad7d9f6a73da84c9bbcc7c6dd4e90f.jpg|img/products/imgs/14036ae9543b0d740fe03497f6b026d6.jpg|img/products/imgs/8062c4555c32ee7dd2a277024802647f.jpg','img/products/details/86119f9df7ea61c8568d870ff13087aa.jpg|img/products/details/2e3ae161647d707495ba17dc6a468f8e.jpg|img/products/details/e5d8d87ecd6ed86468567ac4a7f91e35.jpg|img/products/details/00a661131aae39e8ea4918f3353675dc.jpg|img/products/details/cca03ce1cf8379dc8e15629f11b8ba7f.jpg',100,11,12,13,NULL,'2020-01-09 22:00:01',NULL),
(53,'13','宏碁SF314','宏碁(Acer)蜂鸟3轻薄本14英寸72%色域IPS屏商务办公笔记本电脑(i5-8265U 8G 256G SSD 指纹识别 背光键盘)','蜂鸟3轻薄金属机身，72%高色域屏，背光键盘，自带指纹识别功能，蓝光护盾爱护眼睛',4077.00,'蜂鸟3【72%色域屏+指纹识别】红','2.44kg','中国大陆','Windows 10','Intel i5','10.0mm—15.0mm','256GB SSD','>8小时','宏碁 - 蜂鸟','1-1.5KG','14.0英寸','集成显卡','背光键盘，指纹识别，机身厚度小于20mm','8GB','其他','其他','img/products/imgs/4fac0965efea0af6435a4fa1504d5af9.jpg','img/products/imgs/71b8d71228924a5250603a57c6eed54c.jpg|img/products/imgs/a25246cdb37d2cd98b1915be61d0207f.jpg|img/products/imgs/de21e3a983e8c96088ff0f1e7702998f.jpg','img/products/details/bfeed971312f296cc3b1520c6ce8e2e9.jpg|img/products/details/c64ead78afe3c36eae8628c8560ad660.jpg|img/products/details/5b4fe7aea639bb0bc06e6a9cee4f7696.jpg|img/products/details/7539bc871b3c81c2f3abe65cf01636de.jpg|img/products/details/fc8c248f5f99fa6478952f7abd6ba8c5.jpg',100,101,12,103,'img/products/banners/235aaa70310468ade7915abec79d2eb9.jpg','2020-01-09 22:00:02',NULL);

/*Table structure for table `dm_user` */

DROP TABLE IF EXISTS `dm_user`;

CREATE TABLE `dm_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户名',
  `upwd` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户密码（已加密）',
  `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '电话',
  `avatar` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '头像',
  `ukey` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '辅助加密key',
  `gender` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '性别，男0，女1，保密2',
  `birthday` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '生日',
  `nickName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '昵称',
  `admin` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT '后台权限1表示有，0表示无',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `dm_user` */

insert  into `dm_user`(`id`,`uname`,`upwd`,`email`,`phone`,`avatar`,`ukey`,`gender`,`birthday`,`nickName`,`admin`) values 
(16,'dangdang','688344cb36c2be642febb3eab9a33430','zhongtaisong@sina.com','18312345678','img/avatar/6f847d49a001b86189c59ce6e9a12d31.jpg','565403042620171','0','2020-04-18','啦啦啦','1'),
(17,'zhong','e618f9b540c5d502af310e8cfaa88c3e','zhongtaisong@sina.com','18312345678','img/avatar/9f36612fb47a663af063fd3d5d2661e1.jpg','08132417815893','2','2019-12-01','zhong','1'),
(35,'yuanyuan','905117d7b3063ed238f53e0d6dbf2235','zhongtaisong@sina.com','18312345678','img/avatar/8f3b2ad7834a81e6b35d51dacc435844.jpg','5846917731496786','1','2020-02-27','yuanyuan666','1'),
(37,'zhong001','12d97549939281b005b70e07c42ce406','zhongtaisong@sina.com','18312345678',NULL,'38653085083815397','0','2020-02-22','001','1'),
(38,'zhong002','2a0c55375141afc2cb3a7339cde0e5f7','zhongtaisong@sina.com','18312345678',NULL,'513625655869792','0','2020-02-23','1fda','0'),
(39,'zhong003','02c8b450837c0a911fae8d00af4d974c','zhongtaisong@sina.com','18312345678',NULL,'16200864139191018','0','2020-02-26','fgf','0'),
(40,'zts','cf3f0e1fd9487a3152c3cabc58d08dcb','zhongtaisong','123 456',NULL,'11121233204706926','2','2020-04-03 11:15:46','zts','0'),
(41,'mm','432918d6e985c7ebdc0944932389a4dc','fdaf','123 1213 1231',NULL,'7023627137799147','2','2020-04-03 11:16:56','mm','0'),
(42,'1','a46c9fb879156c2b47ff0511b1802185','3','2',NULL,'29652236605550963','2','2020-04-03 11:20:34','1','0');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
