-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: duyenmay
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Discription` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `RootID` int(11) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (0,'Chưa có danh mục','',NULL,0),(2,'Nước hoa','nuoc-hoa',NULL,1),(3,'Son','son',NULL,1),(4,'Khử mùi','khu-mui',NULL,1),(5,'Trang điểm mắt','cham-soc-mat',NULL,1),(6,'Dầu gội','dau-goi',NULL,1),(9,'Công Vủ','cong-vu',NULL,0),(10,'Công Vủ','undefined',NULL,0),(11,'Công Vủ','không có mô tả',NULL,0),(12,'kem','',NULL,0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_order`
--

DROP TABLE IF EXISTS `dm_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `dm_order` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `Address` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Status` int(11) DEFAULT '1',
  `CreateDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `CreateDate_UNIQUE` (`CreateDate`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_order`
--

LOCK TABLES `dm_order` WRITE;
/*!40000 ALTER TABLE `dm_order` DISABLE KEYS */;
INSERT INTO `dm_order` VALUES (49,1,NULL,1,'2018-06-28 14:21:51'),(50,1,NULL,3,'2018-06-28 00:00:00'),(51,1,NULL,2,'2018-06-29 00:00:00'),(52,20,NULL,1,'2018-06-29 14:06:22'),(53,20,NULL,1,'2018-06-29 14:10:06'),(54,20,NULL,1,'2018-06-29 14:11:11');
/*!40000 ALTER TABLE `dm_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orderdetail` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `OrderID` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` VALUES (37,49,3,2),(38,49,4,23),(39,51,4,1),(40,51,16,2),(41,52,2,1),(42,52,16,1),(43,53,2,1),(44,54,2,5);
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `post` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Tittle` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `BodyContent` varchar(20000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Description` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Tag` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PostCategoryID` int(11) DEFAULT '0',
  `Status` tinyint(4) DEFAULT '1',
  `Note` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CreateDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `CreateBy` int(11) DEFAULT NULL,
  `Image` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'sản phẩm','<p>dsadsad</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"dsd\" src=\"/upload/5397909880.jpg\" style=\"height:326px; width:434px\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>2321</p>\r\n','Theo Đông y, củ sắn dây có vị ngọt, mát, tính bình, đi vào kinh tỳ, vị, phế, bàng quang, có tác dụng thanh nhiệt, sinh tân dịch, trừ phiền nhiệt, thông đại tiểu tiện, làm ra mồ hôi, giải độc. Thường dùng trong các trường hợp tiêu khát (đái tháo đường), cơ thể nóng…','321',3,0,NULL,'2018-09-13 14:26:30',NULL,'/upload/e9a5db7cc22e01fa9958a26b56b6e3c93bc7d59e.jpg'),(2,'sản phẩm chăm sóc da mặt','<p>dsadsad</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"dsd\" src=\"/upload/5397909880.jpg\" style=\"height:326px; width:434px\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>2321</p>\r\n','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \"Content here, content here\", making it look like readable English. Many desktop publishing packages and web page e','321',3,0,NULL,'2018-09-13 15:29:57',NULL,'/upload/e9a5db7cc22e01fa9958a26b56b6e3c93bc7d59e.jpg'),(3,'sản phẩm','<p>dsadsad</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"dsd\" src=\"/upload/5397909880.jpg\" style=\"height:326px; width:434px\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>2321</p>\r\n',NULL,'321',3,1,NULL,'2018-09-13 15:29:57',NULL,'/upload/e9a5db7cc22e01fa9958a26b56b6e3c93bc7d59e.jpg'),(4,'sản phẩm','<p>dsadsad</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"dsd\" src=\"/upload/5397909880.jpg\" style=\"height:326px; width:434px\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>2321</p>\r\n',NULL,'321',3,1,NULL,'2018-09-13 19:03:29',NULL,'/upload/e9a5db7cc22e01fa9958a26b56b6e3c93bc7d59e.jpg'),(5,'dsadsa','<p>dsa</p>\r\n','dsa','dsa',1,0,NULL,'2018-09-16 13:09:18',NULL,'dsad');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_category`
--

DROP TABLE IF EXISTS `post_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `post_category` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Description` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Parent_ID` int(11) DEFAULT '0',
  `Status` tinyint(4) DEFAULT '1',
  `Note` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CreateDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_category`
--

LOCK TABLES `post_category` WRITE;
/*!40000 ALTER TABLE `post_category` DISABLE KEYS */;
INSERT INTO `post_category` VALUES (1,'Thú Cưng','Mô tả về thú cưng',0,1,'Không có ghi chú','2018-09-03 12:53:31'),(2,'Trang Trí','',0,1,'','2018-09-03 15:02:30'),(3,'Không có danh mục',NULL,0,1,NULL,'2018-09-13 00:19:42'),(4,'Trò chơi','',0,1,'','2018-09-16 13:48:20');
/*!40000 ALTER TABLE `post_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producer`
--

DROP TABLE IF EXISTS `producer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `producer` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Address` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Phone` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Website` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Status` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producer`
--

LOCK TABLES `producer` WRITE;
/*!40000 ALTER TABLE `producer` DISABLE KEYS */;
INSERT INTO `producer` VALUES (1,'Đông Á','Quận 3','012932832','abc@gmail.com','www.abc.com',1),(2,'Shopee','Quận 5','09348343','shoppe.com','www.shoppe.com',1),(3,'RulelES','33, Trần Văn A, quân 4 TPHCM','09372832','RuleES@gmail.com','www.reules.com',1),(4,'Công Vủ','24 Tân Lập, Đông Hòa, Dĩ An, BD','0982634236','dcongvu307@gmail.com','duongcongvu.com',1);
/*!40000 ALTER TABLE `producer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `SeoName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Discription` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `PromotionPrice` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `Detail` varchar(19000) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Code` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Status` tinyint(4) DEFAULT '1',
  `ViewCount` int(11) DEFAULT '1',
  `CreateDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `SeoCount` int(11) DEFAULT '0',
  `InStock` tinyint(4) DEFAULT '1',
  `ProducerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (44,'Kem Dưỡng Ban Ngày Cho Da Nhạy Cảm Simple Kind To Skin Vital Vitamin (Bestseller)',NULL,'- Kem dưỡng da The Body Shop Vitamin C Glow Boosting Moisturiser. <br> - Được mệnh danh là  kem dưỡng nước cam\" tuyệt vời dành cho da.  - Với thành phần chính được chiết xuất từ quả CAMU CAMU chứa hàm lượng Vitamin C cao gấp 60 lần so với trái cam thông thường.  <br>- Giúp bạn nuôi dưỡng làn da trắng sáng và bật trắng bật tone chỉ sau khi sử dụng một hộp. ','/upload/2984469231.jpg',3432,3432,NULL,3,'<p><img alt=\"\" src=\"/upload/2984469231.jpg\" style=\"height:1961px; width:1709px\" />43432</p>\r\n',NULL,1,3,'2018-09-19 22:48:11',0,1,3);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('OBqcm5IZu3LZXvpmtRY_ZCSNUPBaP2SC',1537459040,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isLogged\":true,\"User\":{\"ID\":1,\"f_Username\":\"Admin\",\"f_Password\":\"123456\",\"FullName\":\"Dương Công Vủ\",\"Address\":\"KTX Khu B đại học quốc gia, TP HCMx\",\"DoB\":\"28/7/1997\",\"Permission\":1,\"Role\":\"Admin\",\"Email\":\"dcongvu307@gmail.com\",\"PhoneNumber\":\"092634236\",\"Status\":1},\"Cart\":[]}'),('QRNsrRYJKxEVGaD6HMDjHVkN4q-x5hGA',1537167731,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isLogged\":true,\"User\":{\"ID\":1,\"f_Username\":\"Admin\",\"f_Password\":\"123456\",\"FullName\":\"Dương Công Vủ\",\"Address\":\"KTX Khu B đại học quốc gia, TP HCMx\",\"DoB\":\"28/7/1997\",\"Permission\":1,\"Role\":\"Admin\",\"Email\":\"dcongvu307@gmail.com\",\"PhoneNumber\":\"092634236\",\"Status\":1},\"Cart\":[]}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `f_Username` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `f_Password` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FullName` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Address` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DoB` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Permission` tinyint(4) DEFAULT '1',
  `Role` varchar(45) COLLATE utf8_unicode_ci DEFAULT 'Customer',
  `Email` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PhoneNumber` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin','123456','Dương Công Vủ','KTX Khu B đại học quốc gia, TP HCMx','28/7/1997',1,'Admin','dcongvu307@gmail.com','092634236',1),(17,'zarker','123456','Dương Công Vủ','Trần bình tọng ,quận 5','5/6/2018',1,'Customer','dcongvu307@gmail.com','098273231',1),(18,'tranvanan','123456','Dương Công Vủ','Trần bình tọng ,quận 5','7/3/1996',1,'Customer','dcongvu307@gmail.com',NULL,1),(19,'dsad133','12321','dsada','43141','7/6/2018',1,'Customer','432@gmailc.ds',NULL,NULL),(20,'abcdefg','123456','Dương Công Vủ','Trần bình tọng ,quận 5','25/1/1996',1,'Customer','dcongvu307@gmail.com',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-16 13:21:59
