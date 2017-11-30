CREATE DATABASE  IF NOT EXISTS `dragon_gatcha` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dragon_gatcha`;
-- MySQL dump
--
-- Host: localhost    Database: dragon_gatcha
-- ------------------------------------------------------
-- Server version

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adventurer`
--

DROP TABLE IF EXISTS `adventurer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adventurer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `level` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `race` int(10) unsigned NOT NULL,
  `class` int(10) unsigned NOT NULL,
  `str` int(10) unsigned NOT NULL DEFAULT '10',
  `dex` int(10) unsigned NOT NULL DEFAULT '10',
  `int` int(10) unsigned NOT NULL DEFAULT '10',
  `wis` int(10) unsigned NOT NULL DEFAULT '10',
  `con` int(10) unsigned NOT NULL DEFAULT '10',
  `cha` int(10) unsigned NOT NULL DEFAULT '10',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `class_idx` (`class`),
  KEY `race_idx` (`race`),
  CONSTRAINT `class` FOREIGN KEY (`class`) REFERENCES `class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `race` FOREIGN KEY (`race`) REFERENCES `race` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='List of Adventurers, not constrained by User ID.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adventurer`
--

LOCK TABLES `adventurer` WRITE;
/*!40000 ALTER TABLE `adventurer` DISABLE KEYS */;
INSERT INTO `adventurer` VALUES (1,1,'Test Testerson',1,1,12,11,10,10,11,11),(2,5,'John Smith',2,2,12,13,12,11,10,12),(3,10,'Tset Tosretset',3,3,11,12,13,13,12,13),(4,15,'Bob Roberto',4,5,12,13,1,15,13,12),(5,20,'Blargh Blorgh',5,4,12,13,15,15,12,18);
/*!40000 ALTER TABLE `adventurer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `adventurer_lookup`
--

DROP TABLE IF EXISTS `adventurer_lookup`;
/*!50001 DROP VIEW IF EXISTS `adventurer_lookup`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `adventurer_lookup` AS SELECT 
 1 AS `id`,
 1 AS `level`,
 1 AS `name`,
 1 AS `race`,
 1 AS `class`,
 1 AS `str`,
 1 AS `dex`,
 1 AS `int`,
 1 AS `wis`,
 1 AS `con`,
 1 AS `cha`,
 1 AS `hp`,
 1 AS `hit`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `hp_base` int(10) unsigned NOT NULL,
  `hp_level` int(10) unsigned NOT NULL,
  `atk_stat` varchar(3) NOT NULL DEFAULT 'str',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'Fighter',10,6,'str'),(2,'Rogue',8,5,'dex'),(3,'Wizard',6,4,'int'),(4,'Sorcerer',6,4,'cha'),(5,'Cleric',8,5,'wis'),(6,'Druid',8,5,'wis');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `armor` int(10) unsigned NOT NULL DEFAULT '0',
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='List of Equipment. Currently a shell.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proficiency`
--

DROP TABLE IF EXISTS `proficiency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proficiency` (
  `level` int(10) unsigned NOT NULL,
  `bonus` int(11) GENERATED ALWAYS AS ((ceiling((`level` / 4)) + 1)) STORED,
  PRIMARY KEY (`level`),
  UNIQUE KEY `level_UNIQUE` (`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Proficiency Bonus per Level. Calculated and stored simply for slight optimization.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proficiency`
--

LOCK TABLES `proficiency` WRITE;
/*!40000 ALTER TABLE `proficiency` DISABLE KEYS */;
INSERT INTO `proficiency` (`level`) VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20);
/*!40000 ALTER TABLE `proficiency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `race`
--

DROP TABLE IF EXISTS `race`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `race` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `imagePath` varchar(45) DEFAULT NULL COMMENT 'Custom image path for the race that isn''t "name.png"',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='List of Adventurer Races. Completely Visual ATM.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `race`
--

LOCK TABLES `race` WRITE;
/*!40000 ALTER TABLE `race` DISABLE KEYS */;
INSERT INTO `race` VALUES (1,'Human',NULL),(2,'Halfing',NULL),(3,'Tiefling',NULL),(4,'Half Elf',NULL),(5,'Elf',NULL),(6,'Dwarf',NULL),(7,'Dragonborn',NULL);
/*!40000 ALTER TABLE `race` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `score` (
  `score` int(10) unsigned NOT NULL,
  `modifier` int(11) GENERATED ALWAYS AS ((ceiling(((`score` - 1) / 2)) - 5)) STORED,
  PRIMARY KEY (`score`),
  UNIQUE KEY `score_UNIQUE` (`score`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
INSERT INTO `score` (`score`) VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20);
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_cards`
--

DROP TABLE IF EXISTS `user_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_cards` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(10) unsigned NOT NULL,
  `card_type` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '0 = ''Adventurer'', 1 = ''Equipment''',
  `card_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_idx` (`user`),
  CONSTRAINT `user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='List of cards a user owns. Just a bridge table for now.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_cards`
--

LOCK TABLES `user_cards` WRITE;
/*!40000 ALTER TABLE `user_cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'dragon_gatcha'
--

--
-- Dumping routines for database 'dragon_gatcha'
--
/*!50003 DROP FUNCTION IF EXISTS `calculate_hit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `CALCULATE_HIT`(adv_id INT) RETURNS int(11)
BEGIN
	DECLARE atk INT DEFAULT (SELECT `modifier` from `dragon_gatcha`.`score` where `score` = stat_lookup(adv_id));
    DECLARE prf INT DEFAULT (SELECT `bonus` from `dragon_gatcha`.`proficiency` where `level` = (SELECT `level` FROM `dragon_gatcha`.`adventurer` WHERE `id` = adv_id));
RETURN atk + prf;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `calculate_hp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `CALCULATE_HP`(adv_id INT) RETURNS int(11)
BEGIN
DECLARE cls INT DEFAULT (SELECT `class` FROM `dragon_gatcha`.`adventurer` WHERE `id` = adv_id);
DECLARE con INT DEFAULT (SELECT `con` FROM `dragon_gatcha`.`adventurer` WHERE `id` = adv_id);
DECLARE lvl INT DEFAULT (SELECT `level` FROM `dragon_gatcha`.`adventurer` WHERE `id` = adv_id);
return (
(SELECT `hp_base` FROM `dragon_gatcha`.`class` WHERE `id` = cls) +
(SELECT `modifier` FROM `dragon_gatcha`.`score` WHERE `score` = con) +
(lvl - 1) * (SELECT `hp_level` FROM `dragon_gatcha`.`class` WHERE `id` = cls)
);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `stat_lookup` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `stat_lookup`(adv_id INT) RETURNS int(11)
BEGIN
	DECLARE lookup VARCHAR(3) DEFAULT (select `atk_stat` from `dragon_gatcha`.`class` where `id` = (SELECT `class` FROM `dragon_gatcha`.`adventurer` WHERE `id` = adv_id));
	CASE lookup
		WHEN 'str' THEN RETURN (SELECT `str` FROM `dragon_gatcha`.`adventurer` WHERE `id` = adv_id);
		WHEN 'dex' THEN RETURN (SELECT `dex` FROM `dragon_gatcha`.`adventurer` WHERE `id` = adv_id);
		WHEN 'int' THEN RETURN (SELECT `int` FROM `dragon_gatcha`.`adventurer` WHERE `id` = adv_id);
		WHEN 'wis' THEN RETURN (SELECT `wis` FROM `dragon_gatcha`.`adventurer` WHERE `id` = adv_id);
		WHEN 'con' THEN RETURN (SELECT `con` FROM `dragon_gatcha`.`adventurer` WHERE `id` = adv_id);
		WHEN 'cha' THEN RETURN (SELECT `cha` FROM `dragon_gatcha`.`adventurer` WHERE `id` = adv_id);
	END CASE;
RETURN 0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `adventurer_lookup`
--

/*!50001 DROP VIEW IF EXISTS `adventurer_lookup`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `adventurer_lookup` AS select `adventurer`.`id` AS `id`,`adventurer`.`level` AS `level`,`adventurer`.`name` AS `name`,`race`.`name` AS `race`,`class`.`name` AS `class`,`adventurer`.`str` AS `str`,`adventurer`.`dex` AS `dex`,`adventurer`.`int` AS `int`,`adventurer`.`wis` AS `wis`,`adventurer`.`con` AS `con`,`adventurer`.`cha` AS `cha`,`CALCULATE_HP`(`adventurer`.`id`) AS `hp`,`CALCULATE_HIT`(`adventurer`.`id`) AS `hit` from ((`adventurer` join `class` on((`adventurer`.`class` = `class`.`id`))) join `race` on((`adventurer`.`race` = `race`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
