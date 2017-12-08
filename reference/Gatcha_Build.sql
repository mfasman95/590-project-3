-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: dragon_gatcha
-- ------------------------------------------------------
-- Server version	5.7.17-log

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
 1 AS `className`,
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
-- Table structure for table `enemy`
--

DROP TABLE IF EXISTS `enemy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enemy` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `challenge` int(10) unsigned NOT NULL DEFAULT '1',
  `health` int(10) unsigned NOT NULL DEFAULT '1',
  `attack` int(10) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=803 DEFAULT CHARSET=utf8 COMMENT='Table of enemies.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enemy`
--

LOCK TABLES `enemy` WRITE;
/*!40000 ALTER TABLE `enemy` DISABLE KEYS */;
INSERT INTO `enemy` VALUES (1,'Ceryneian Hind',15,74,8),(2,'Deer Woman',9,65,4),(3,'Gilled Antelope',3,27,5),(4,'Goldhorn',2,22,3),(5,'Keresh',16,77,6),(6,'Qilin',12,74,7),(7,'Jackalope',12,71,5),(8,'White stag',6,46,4),(9,'Peryton',15,103,7),(10,'Bake-kujira',17,98,6),(11,'Ceffyl Dŵr',4,34,2),(12,'Encantado',13,78,7),(13,'Kelpie',15,88,8),(14,'Selkie',11,66,7),(15,'Anansi',17,82,9),(16,'Arachne',6,42,4),(17,'Khepri',14,70,5),(18,'Tsuchigumo',15,89,5),(19,'Myrmecoleon',16,92,6),(20,'Myrmidons',15,103,7),(21,'Jorōgumo',16,79,6),(22,'Karkinos',17,81,7),(23,'Mothman',13,79,5),(24,'Pabilsag',15,73,6),(25,'Scorpion man',2,21,4),(26,'Selket',14,95,6),(27,'Camazotz',17,81,5),(28,'Vampire',1,19,3),(29,'Bugbear',6,48,3),(30,'Callisto',1,17,4),(31,'Adarna',13,76,7),(32,'Aethon',11,68,7),(33,'Alkonost',9,56,7),(34,'Alectryon',11,69,3),(35,'Alicanto',18,84,8),(36,'Bare-fronted Hoodwink',17,82,6),(37,'Bennu',16,106,6),(38,'Bird People',5,43,2),(39,'Cockatrice',7,54,5),(40,'Caladrius',15,102,8),(41,'Cetan',9,58,5),(42,'Chamrosh',14,70,4),(43,'Chol',14,70,7),(44,'Cinnamon bird',5,36,3),(45,'Devil Bird',18,86,7),(46,'Feng Huang',19,107,8),(47,'Gandaberunda',17,83,9),(48,'Gamayun',16,106,9),(49,'Garuda',6,44,6),(50,'Griffin',9,57,5),(51,'Harpy',10,71,7),(52,'Hræsvelgr',12,71,6),(53,'Horus',18,121,8),(54,'Hugin and Munin',12,62,4),(55,'Nachtkrapp',7,47,5),(56,'Oozlum bird',13,91,8),(57,'Owlman',14,94,8),(58,'Pamola',7,54,6),(59,'Phoenix',14,95,8),(60,'Ra',17,83,6),(61,'Rain Bird',7,40,6),(62,'Roc',13,79,4),(63,'Sarimanok',5,43,5),(64,'Shangyang',17,80,6),(65,'Simurgh',17,113,8),(66,'Sirin',17,114,8),(67,'Strix',11,58,5),(68,'Stymphalian birds',19,127,9),(69,'Tengu',8,46,6),(70,'Three-legged bird',4,33,4),(71,'Thunderbird',7,41,4),(72,'Thoth',8,61,7),(73,'Turul',19,108,5),(74,'Vermilion Bird',15,89,7),(75,'Vucub Caquix',7,47,2),(76,'Yatagarasu',7,49,5),(77,'Ziz',6,46,3),(78,'Zu',13,88,5),(79,'Auðumbla',14,96,8),(80,'Bai Ze',18,120,6),(81,'Kujata',10,62,6),(82,'Bicorn and Chichevache',13,64,6),(83,'Minotaur',11,56,5),(84,'Nandi',15,103,8),(85,'Shedu',13,89,6),(86,'Tachash',4,34,3),(87,'Ushi-oni',3,25,2),(88,'Allocamelus',11,68,5),(89,'Adlet',12,71,8),(90,'Amarok',9,56,4),(91,'Anubis',7,53,3),(92,'Aralez',1,17,3),(93,'Asena',8,44,7),(94,'Axehandle hound',9,49,5),(95,'Black dog',7,47,6),(96,'Beast of Gévaudan',18,87,9),(97,'Cerberus',11,58,5),(98,'Chupacabra',4,29,6),(99,'Cu Sith',18,102,9),(100,'Crocotta',9,48,4),(101,'Cynocephaly',5,34,6),(102,'Fenrir',18,103,5),(103,'Hellhound',14,97,7),(104,'Huli jing',2,21,2),(105,'Kishi',11,57,5),(106,'Orthrus',2,24,2),(107,'Penghou',2,23,3),(108,'Salawa',6,37,5),(109,'Shug Monkey',11,68,4),(110,'Shunka Warakin',5,38,6),(111,'Tanuki',18,120,9),(112,'Vǎrkolak',19,89,6),(113,'Werewolf',14,71,6),(114,'Amalthea',5,38,6),(115,'Aries',9,67,3),(116,'Capricornus',14,68,8),(117,'Chimera',17,82,6),(118,'Faun',9,59,4),(119,'Goldhorn',9,64,4),(120,'Heiðrún',11,77,6),(121,'Khnum',18,102,9),(122,'Satyr',6,47,4),(123,'Sidehill gouger',8,45,5),(124,'Tanngrisnir and Tanngnjóstr',11,76,4),(125,'Arion',7,48,4),(126,'Buraq',13,66,8),(127,'Centaur',15,103,5),(128,'Cheval Gauvin',13,89,7),(129,'Chiron',8,59,7),(130,'Haizum',17,113,9),(131,'Hippocamp',2,21,2),(132,'Hippogriff',15,72,4),(133,'Ichthyocentaurs',12,83,7),(134,'Ipotane',11,68,3),(135,'Karkadann',6,41,3),(136,'Kelpie',5,35,6),(137,'Longma',18,102,6),(138,'Nuckelavee',16,106,7),(139,'Onocentaur',4,34,3),(140,'Pegasus',12,72,8),(141,'Pooka',7,52,5),(142,'Sleipnir',11,57,5),(143,'Simurgh',5,41,6),(144,'Tikbalang',11,77,5),(145,'Uchchaihshravas',3,25,5),(146,'Unicorn',19,108,5),(147,'White horse',16,91,8),(148,'Blue Mountains panther',3,25,4),(149,'Blue tiger',18,120,6),(150,'Bakeneko',3,30,1),(151,'Bast',5,34,6),(152,'Beast of Bodmin',4,31,4),(153,'Cactus cat',13,67,6),(154,'Cait Sidhe',19,108,6),(155,'Chimera',15,73,8),(156,'Demon Cat',15,74,4),(157,'Ennedi tiger',14,83,7),(158,'Griffin',5,34,5),(159,'Lamassu',5,39,5),(160,'Manticore',5,32,5),(161,'Narasimha',16,107,9),(162,'Nekomata',16,78,7),(163,'Nemean Lion',17,114,9),(164,'Panther',18,121,6),(165,'Phantom cat',3,30,5),(166,'Sekhmet',2,24,3),(167,'Sphinx',13,89,7),(168,'Surrey Puma',8,44,6),(169,'Tigris',12,72,5),(170,'Underwater panther',14,70,5),(171,'White Tiger',15,74,8),(172,'Fish People',13,64,7),(173,'Mermaid',4,31,5),(174,'water spirit',16,76,6),(175,'Undine',6,46,3),(176,'Abaia',16,108,9),(177,'Hippocamp',18,119,9),(178,'Ika-Roa',1,19,1),(179,'Isonade',8,47,7),(180,'Namazu',19,109,5),(181,'Ningyo',13,65,8),(182,'Kun',6,39,4),(183,'Salmon of Wisdom',13,90,7),(184,'Shachihoko',9,65,4),(185,'Werehyena',6,38,3),(186,'Kishi',10,54,4),(187,'Drop Bear',17,113,7),(188,'Gunni',4,31,3),(189,'Phantom kangaroo',8,46,5),(190,'Bunyip',9,66,6),(191,'Akkorokamui',7,40,6),(192,'Kraken',17,112,7),(193,'Shen',10,53,7),(194,'Azeban',8,47,7),(195,'Gef',7,47,5),(196,'Ichneumon',19,106,6),(197,'Kamaitachi',15,74,7),(198,'Mujina',7,54,5),(199,'Ramidreju',2,25,3),(200,'Raiju',3,30,4),(201,'Abath',8,61,7),(202,'Baku',10,64,4),(203,'Behemoth',9,57,5),(204,'Grootslang',2,24,5),(205,'Sæhrímnir',16,91,6),(206,'Taweret',17,81,7),(207,'Veo',7,53,3),(208,'Calydonian Boar',1,19,2),(209,'Erymanthian Boar',7,47,6),(210,'Zhu Bajie',1,17,4),(211,'Bigfoot',17,97,9),(212,'Hibagon',4,32,5),(213,'Jué yuán',10,55,3),(214,'Satori',17,97,7),(215,'Shug Monkey',18,85,9),(216,'Sun Wukong',4,34,2),(217,'Vanara',7,53,5),(218,'Yeren',3,26,5),(219,'Yeti',3,28,4),(220,'Yowie',9,58,7),(221,'Al-mi\'raj',19,88,8),(222,'Jackalope',15,89,5),(223,'Moon rabbit',6,46,5),(224,'Skvader',14,96,8),(225,'Wolpertinger',1,16,5),(226,'Ammut',14,97,5),(227,'Basilisk',15,73,8),(228,'Black Tortoise',5,33,2),(229,'Chinese Dragon',17,80,7),(230,'Cipactli',16,78,8),(231,'Dragon',10,71,4),(232,'Emela-ntouka',16,107,6),(233,'Kongamato',18,118,9),(234,'Kurma',1,18,3),(235,'Loch Ness Monster',14,97,7),(236,'Makara',1,17,3),(237,'Mbielu-Mbielu-Mbielu',3,29,1),(238,'Mokele Mbembe',4,33,6),(239,'Ngoubou',1,19,5),(240,'Reptilian humanoids',18,101,7),(241,'Sewer alligator',1,16,5),(242,'Sobek',4,35,5),(243,'Taniwha',14,69,6),(244,'Wyvern',9,57,6),(245,'Zaratan',6,37,6),(246,'Afanc',8,44,3),(247,'Giant Rat',16,107,9),(248,'Ratatoskr',19,125,6),(249,'Rat king',13,76,7),(250,'Wolpertinger',7,43,6),(251,'Amphisbaena',16,94,7),(252,'Amphithere',2,21,4),(253,'Apep',8,52,6),(254,'Azhi Dahaka',16,79,8),(255,'Basilisk',7,54,2),(256,'Bakonawa',7,41,3),(257,'Cockatrice',15,103,8),(258,'Dragon',7,42,3),(259,'Drake',12,73,8),(260,'Echidna',11,56,4),(261,'Fafnir',15,72,5),(262,'Feathered serpent',3,24,5),(263,'Gorgon',3,28,2),(264,'Hoop snake',16,93,5),(265,'Hydra',13,78,8),(266,'Jaculus',4,32,5),(267,'Jasconius',7,42,4),(268,'Jörmungandr',3,27,3),(269,'Lamia',17,96,7),(270,'Lindorm',1,17,2),(271,'Madame White Snake',15,88,6),(272,'Meretseger',19,106,6),(273,'Mongolian Death Worm',5,39,3),(274,'Naga',17,114,9),(275,'Níðhöggr',19,90,6),(276,'Ouroboros',8,47,5),(277,'Python',16,92,6),(278,'Rainbow serpent',1,19,5),(279,'Sea serpent',17,97,8),(280,'Tarasque',14,94,8),(281,'Tsuchinoko',13,77,6),(282,'Wyvern',13,65,6),(283,'Yamata no Orochi',8,51,6),(284,'Peluda',13,91,5),(285,'Mapinguari',4,29,6),(286,'Azeban',13,67,7),(287,'Lavellan',2,23,3),(288,'Automaton',15,88,6),(289,'Blodeuwedd',19,90,6),(290,'Frankenstein\'s monster',16,92,6),(291,'Galatea',5,39,6),(292,'Gingerbread man',15,103,8),(293,'Golem',10,55,7),(294,'Homunculus',6,47,5),(295,'Nephele',1,18,1),(296,'Shabti',8,47,7),(297,'Tokeloshe',16,109,7),(298,'Tsukumogami',10,71,4),(299,'Tulpa',10,54,5),(300,'Tupilaq',18,104,9),(301,'Ushabti',5,40,6),(302,'Alan',9,59,3),(303,'Chupacabra',13,65,4),(304,'Dhampir',18,85,9),(305,'Preta',5,36,4),(306,'Golden Hind',17,80,6),(307,'Kappa',11,57,5),(308,'Kekkai',19,107,7),(309,'Lamia',2,23,4),(310,'Manananggal',13,65,7),(311,'Mandurugo',8,54,3),(312,'Redcap',16,93,8),(313,'Rokurokubi',16,76,5),(314,'Sigbin',5,32,6),(315,'Vampire',8,58,4),(316,'Werewolf',1,17,2),(317,'Yuki-onna',15,72,8),(318,'Bloody Bones',6,43,4),(319,'Gashadokuro',10,54,5),(320,'Grim Reaper',9,48,4),(321,'Skeleton',9,49,3),(322,'Argus Panoptes',13,77,7),(323,'Basilisk',11,59,4),(324,'Catoblepas',12,62,6),(325,'Cockatrice',15,72,5),(326,'Cyclops',6,43,2),(327,'Gorgon',7,48,4),(328,'Hitotsume-kozou',4,34,4),(329,'Lamia',18,86,9),(330,'Lynx',8,46,6),(331,'Mokumokuren',7,52,4),(332,'Asura',7,53,3),(333,'Deva',19,108,8),(334,'Noppera-bō',10,52,4),(335,'Futakuchi-onna',8,59,5),(336,'Harionago',12,82,8),(337,'Medusa',2,20,3),(338,'Amphisbaena',12,74,5),(339,'Cerberus',8,61,6),(340,'Chimera',17,114,8),(341,'Chonchon',4,31,4),(342,'Double-headed eagle',15,87,5),(343,'Dullahan',14,69,5),(344,'Hekatonkheires',6,39,4),(345,'Hydra',2,22,5),(346,'Lernaean Hydra',5,35,6),(347,'Nine-headed Bird',1,19,3),(348,'Nukekubi',13,89,6),(349,'Rokurokubi',3,24,2),(350,'Orthrus',11,79,5),(351,'Shesha',6,41,6),(352,'Penanggalan',4,30,4),(353,'Wanyūdō',8,59,4),(354,'Xing Tian',8,45,6),(355,'Yacuruna',15,72,8),(356,'Yamata no Orochi',16,94,6),(357,'Asura',5,41,4),(358,'Deva',4,36,5),(359,'Hekatonkheires',15,72,5),(360,'Kui',18,121,7),(361,'Sleipnir',4,28,3),(362,'Three-legged bird',13,78,6),(363,'Futakuchi-onna',1,18,3),(364,'Kuchisake-onna',4,37,5),(365,'Selkie',14,81,4),(366,'Skin-walker',15,87,6),(367,'Swan maiden',5,37,6),(368,'Bakeneko',18,121,9),(369,'Kitsune',7,55,5),(370,'Yamata no Orochi',1,19,3),(371,'Kumiho',10,62,4),(372,'Hulder',8,60,6),(373,'Rokurokubi',7,47,3),(374,'Vampire',16,78,7),(375,'Geryon',1,18,5),(376,'Basilisk',15,74,7),(377,'Balor of the Evil Eye',2,21,3),(378,'Catoblepas',6,43,3),(379,'Cockatrice',6,49,5),(380,'Gorgon',5,43,5),(381,'Ammit',2,23,4),(382,'Banshee',2,23,2),(383,'Demon',5,36,5),(384,'Devil',12,74,7),(385,'Dullahan',11,56,4),(386,'Ghost',7,55,4),(387,'Grim Reaper',9,51,5),(388,'Ox-Head and Horse-Face',2,23,4),(389,'Phoenix',12,85,7),(390,'Undead',15,89,6),(391,'Valkyrie',16,77,6),(392,'Vampire',14,94,8),(393,'Abatwa',7,48,6),(394,'Alan',19,90,8),(395,'Boto',14,96,4),(396,'Faun',7,48,3),(397,'German',11,57,4),(398,'Incubus',6,47,5),(399,'Maenad',9,64,5),(400,'Nymph',18,121,7),(401,'Pombero',16,92,8),(402,'Popobawa',4,35,2),(403,'Satyr',3,30,5),(404,'Sileni',16,107,6),(405,'Unicorn',12,74,5),(406,'Zemyna',16,94,7),(407,'Simurgh',8,45,3),(408,'Phoenix',2,22,5),(409,'Ubume',19,91,7),(410,'Dwarf',4,36,6),(411,'Genie',5,40,5),(412,'Leprechaun',15,73,7),(413,'Sigbin',7,42,6),(414,'Yaksha',1,17,1),(415,'Sarimanok',11,59,4),(416,'Banshee',7,47,2),(417,'Fenghuang',13,67,4),(418,'Mermaid',11,66,3),(419,'Nue',8,60,6),(420,'Siren',6,37,5),(421,'Cupid',5,35,5),(422,'Swan maiden',17,114,6),(423,'Madame White Snake',2,23,5),(424,'Melusine',16,78,9),(425,'Tennin',18,120,8),(426,'Undine',15,86,8),(427,'Baku',17,113,7),(428,'Carbuncle',18,84,9),(429,'Devil',4,35,2),(430,'Incubus',10,71,5),(431,'Mermaid',15,88,8),(432,'Nightmare',1,17,2),(433,'Nue',5,32,6),(434,'Oni',11,78,5),(435,'Sandman',15,100,7),(436,'Satori',15,101,6),(437,'Gef',19,109,7),(438,'Serpent in Bible',8,52,5),(439,'Bai Ze',7,54,2),(440,'Salmon of Wisdom',13,64,7),(441,'Sphinx',3,28,2),(442,'Baba Yaga',16,77,9),(443,'Griffin',12,72,7),(444,'Father Time',8,58,3),(445,'Gremlin',19,109,9),(446,'Angel',15,89,7),(447,'Deity',14,97,4),(448,'Lampetia',5,42,6),(449,'Will-o\'-the-wisp',3,29,2),(450,'Dragon',9,57,4),(451,'Deity',12,60,8),(452,'Elemental',6,48,5),(453,'Spirit',14,69,5),(454,'Angel',19,89,9),(455,'Demon',18,85,6),(456,'Devil',5,38,6),(457,'Yokai',4,28,6),(458,'Nymph',11,66,6),(459,'Elf',1,19,1),(460,'Fairy',7,41,5),(461,'Black dog',11,69,7),(462,'Bogeyman',11,79,4),(463,'Ghost',2,22,2),(464,'Grim Reaper',1,17,5),(465,'Shadow People',4,35,5),(466,'Vampire',15,75,5),(467,'Werewolf',1,19,1),(468,'Oni',2,24,4),(469,'Gashadokuro',19,109,7),(470,'Camazotz',10,55,4),(471,'The Wild Hunt',12,73,8),(472,'Hell Hound',12,63,8),(473,'Bluecap',6,37,3),(474,'Dvergr',18,118,8),(475,'Dwarf',4,29,5),(476,'Earth Dragon',3,30,2),(477,'Gargoyle',16,108,9),(478,'Giant',6,48,4),(479,'Gnome',19,109,7),(480,'Goblin',11,58,6),(481,'Golem',12,62,6),(482,'Monopod',7,47,5),(483,'Nymph',13,65,6),(484,'Ogre',10,61,7),(485,'Oread',16,93,7),(486,'Troll',15,87,5),(487,'Cherufe',1,18,4),(488,'Dragon',19,126,6),(489,'Ifrit',12,73,7),(490,'Hellhound',4,33,3),(491,'Lampad',1,17,1),(492,'Phoenix',2,23,2),(493,'Salamander',10,61,4),(494,'Angel',19,108,8),(495,'Light Elf',5,32,5),(496,'Rainbow crow',18,118,8),(497,'Rainbow Serpent',7,55,4),(498,'Cyclops',3,28,1),(499,'Griffin',19,91,9),(500,'Gnome',4,33,3),(501,'Leprechaun',3,26,5),(502,'Chinese dragon',6,39,5),(503,'Cyclops',18,85,9),(504,'Kitsune',16,78,6),(505,'Raijū',3,28,5),(506,'Thunderbird',9,56,6),(507,'Valkyrie',16,77,8),(508,'Afanc',3,28,1),(509,'Amefurikozō',5,37,3),(510,'Aspidochelone',16,91,9),(511,'Bloody Bones',2,25,3),(512,'Buggane',2,25,5),(513,'Bunyip',10,71,4),(514,'Camenae',9,50,5),(515,'Capricorn',6,41,4),(516,'Cetus',17,80,5),(517,'Charybdis',19,127,7),(518,'Crinaeae',12,85,5),(519,'Davy Jones\' Locker',19,126,5),(520,'Draug',19,109,9),(521,'Each uisge',7,53,5),(522,'Eachy',15,87,7),(523,'Elemental',3,27,1),(524,'Fish People',4,34,4),(525,'Fur-bearing trout',2,20,4),(526,'Gargouille',8,54,6),(527,'Grindylow',13,89,7),(528,'Haetae',3,24,4),(529,'Hippocamp',13,65,5),(530,'Hydra',4,31,6),(531,'Ichthyocentaur',16,78,5),(532,'Jasconius',10,72,6),(533,'Jengu',15,101,4),(534,'Kappa',1,17,4),(535,'Kelpie',18,120,7),(536,'Kraken',1,17,5),(537,'Lake monster',13,89,5),(538,'Lavellan',9,59,4),(539,'Leviathan',16,76,9),(540,'Loch Ness monster',19,107,8),(541,'Lorelei',6,43,6),(542,'Lusca',1,17,2),(543,'Makara',18,121,9),(544,'Melusine',17,83,8),(545,'Mermaid',8,46,4),(546,'Merrow',9,48,4),(547,'Morgens',15,86,6),(548,'Muc-sheilch',8,61,5),(549,'Naiad',4,29,5),(550,'Näkki',3,30,2),(551,'Nereid',7,43,4),(552,'Nix',8,53,4),(553,'Nymph',14,96,5),(554,'Pisces',14,83,8),(555,'Ponaturi',1,19,3),(556,'Potamus',18,119,9),(557,'Rusalka',3,29,3),(558,'Samebito',12,84,4),(559,'Sea monster',3,26,1),(560,'Sea serpent',3,28,4),(561,'Selkie',2,24,4),(562,'Shen',18,121,8),(563,'Siren',10,72,5),(564,'Taniwha',10,54,6),(565,'Tiamat',3,26,1),(566,'Triton',16,79,9),(567,'Ondine',6,46,4),(568,'Vodyanoy',2,23,3),(569,'Water Dragon',5,36,5),(570,'Water Leaper',19,91,8),(571,'Water Sprite',14,84,8),(572,'Yacuruna',10,70,7),(573,'Zaratan',14,70,5),(574,'Dwarf',16,78,8),(575,'European dragon',8,52,7),(576,'Gnome',8,61,5),(577,'Goblin',1,19,4),(578,'Golem',6,44,5),(579,'Grootslang',4,35,4),(580,'Leprechaun',16,79,5),(581,'Troll',11,58,6),(582,'Yaoguai',3,25,4),(583,'Angel',2,22,5),(584,'Asteriae',4,28,4),(585,'Deva',3,29,1),(586,'Feathered serpent',1,18,5),(587,'Pegasus',5,42,5),(588,'Grim Reaper',3,28,5),(589,'Swan Maiden',1,18,2),(590,'Tennin',7,42,3),(591,'Three-legged bird',10,53,4),(592,'Valkyrie',13,77,5),(593,'Amphisbaena',19,107,9),(594,'Basilisk',7,41,5),(595,'Cockatrice',11,79,3),(596,'Ghoul',18,120,9),(597,'Mongolian Death Worm',9,51,3),(598,'Sphinx',13,77,7),(599,'Ajatar',1,18,1),(600,'Bigfoot',8,44,7),(601,'Dryad',12,63,8),(602,'Elf',14,95,5),(603,'Leshy',7,49,6),(604,'Green Man',4,31,3),(605,'Owlman',6,44,4),(606,'Unicorn',15,74,7),(607,'Satyr',5,36,5),(608,'Waldgeist',4,37,3),(609,'Ahool',6,42,4),(610,'Curupira',5,36,5),(611,'Dingonek',1,17,2),(612,'Mapinguari',19,91,5),(613,'Man-eating tree',11,77,7),(614,'Manticore',18,120,9),(615,'Saci',12,83,4),(616,'Umdhlebi',14,96,6),(617,'Fairy',5,35,5),(618,'Gnome',19,126,6),(619,'Emela-ntouka',13,91,6),(620,'Ennedi tiger',2,22,4),(621,'Werehyena',11,66,5),(622,'Ahuitzotl',9,59,5),(623,'Bunyip',12,72,7),(624,'Chinese dragon',11,66,3),(625,'Encantado',15,88,7),(626,'Grootslang',10,71,6),(627,'Iara',4,30,5),(628,'Jiaolong',19,88,8),(629,'Kappa',8,54,7),(630,'Kelpie',7,55,5),(631,'Lake monster',3,28,5),(632,'Hydra',15,100,5),(633,'Loch Ness Monster',14,82,8),(634,'Mizuchi',8,53,3),(635,'Naiad',16,107,9),(636,'Nixie',11,76,7),(637,'Ogopogo',11,56,3),(638,'Ondine',16,79,5),(639,'Rainbow serpent',8,60,4),(640,'Rusalka',15,89,6),(641,'Ryujin',3,30,3),(642,'Shellycoat',7,47,3),(643,'Warlock',1,19,2),(644,'Yacuruna',3,24,1),(645,'Dwarf',13,88,8),(646,'Fenghuang',3,31,3),(647,'Griffin',18,84,7),(648,'Hippogriff',7,42,4),(649,'Mountain Giant',10,73,4),(650,'Olitiau',19,126,8),(651,'Oread',19,91,8),(652,'Patupaiarehe',10,70,5),(653,'Satyr',6,36,4),(654,'Tengu',8,61,5),(655,'Yeti',9,57,6),(656,'Bishop-fish',4,31,2),(657,'Charybdis',3,30,3),(658,'Dragon King',7,52,3),(659,'Fish People',4,31,6),(660,'Hippocamp',9,48,5),(661,'Leviathan',1,18,3),(662,'Jormungand',9,64,5),(663,'Kraken',16,79,8),(664,'Mermaid',4,35,5),(665,'Nereid',5,42,3),(666,'Sea monk',18,121,6),(667,'Sea monster',5,41,3),(668,'Sea serpent',11,56,5),(669,'Selkie',12,73,4),(670,'Shen',9,51,5),(671,'Siren',1,19,4),(672,'Tritons',9,58,4),(673,'Umibōzu',18,104,9),(674,'Water Dragon',19,108,8),(675,'Yacuruna',7,40,3),(676,'Bunyip',1,16,3),(677,'Grootslang',3,25,1),(678,'Lernaean Hydra',6,49,3),(679,'Honey island swamp monster',18,103,7),(680,'Mokele-mbembe',1,16,3),(681,'Swamp monster',7,40,3),(682,'Will-o\'-the-wisp',13,77,5),(683,'Cherufe',11,69,7),(684,'Phoenix',17,114,9),(685,'Salamander',7,54,3),(686,'Akhlut',9,57,7),(687,'Amarok',6,44,6),(688,'Barbegazi',2,20,4),(689,'Hrimthurs',7,43,2),(690,'Ijiraq',15,87,5),(691,'Jotun',7,47,6),(692,'Qiqirn',8,58,4),(693,'Saumen Kar',3,28,4),(694,'Tizheruk',10,55,6),(695,'Wendigo',13,79,8),(696,'Yeti',17,82,6),(697,'Ymir',6,38,6),(698,'Yuki-onna',18,85,9),(699,'Banshee',10,54,7),(700,'Boggart',2,23,1),(701,'Brownie',19,90,6),(702,'Domovoi',15,88,5),(703,'Dvorovoi',1,19,2),(704,'Duende',14,82,6),(705,'Jinn',5,41,6),(706,'Kobold',17,83,9),(707,'Tomte',5,39,5),(708,'Vampire',7,42,5),(709,'Zashiki-warashi',5,34,5),(710,'Ammit',6,43,5),(711,'Cerberus',2,22,4),(712,'Cyclops',9,59,4),(713,'Demon',10,61,3),(714,'Devil',1,18,3),(715,'Earth Dragon',2,23,2),(716,'Garm',3,26,4),(717,'Hekatonkheires',11,77,6),(718,'Hellhound',2,25,4),(719,'Ifrit',13,90,7),(720,'Ox-Head and Horse-Face',2,21,4),(721,'Preta',6,43,3),(722,'Kua Fu',3,29,2),(723,'Three-legged bird',10,55,5),(724,'Phoenix',17,98,8),(725,'Jade rabbit',11,67,6),(726,'Werewolf',6,43,6),(727,'Werecoyote',11,58,6),(728,'Werejaguar',6,41,4),(729,'Azure Dragon',6,39,4),(730,'Black Tortoise',8,60,4),(731,'Capricorn',14,96,5),(732,'Centaur',1,18,3),(733,'Ladon',3,29,5),(734,'Nemean Lion',13,64,6),(735,'Pegasus',1,18,2),(736,'Phoenix',7,54,4),(737,'Vermilion Bird',2,20,3),(738,'Yellow Dragon',5,32,3),(739,'White Tiger',5,40,4),(740,'World Elephant',14,84,8),(741,'World Turtle',8,54,7),(742,'Dryad',18,120,8),(743,'Ghillie Dhu',10,63,7),(744,'Green Man',8,58,7),(745,'Hamadryad',9,49,5),(746,'Jubokko',3,26,2),(747,'Kodama',1,17,5),(748,'Leshy',2,25,5),(749,'Mandrake',12,74,5),(750,'Man-eating tree',15,103,7),(751,'Penghou',13,89,4),(752,'Spriggan',10,71,5),(753,'Umdhlebi',13,67,5),(754,'Vegetable Lamb of Tartary',14,83,6),(755,'Griffin',17,97,6),(756,'Jackalope',5,36,5),(757,'Unicorn',1,17,4),(758,'Wolpertinger',6,48,6),(759,'Amarok',13,65,5),(760,'Bigfoot',11,59,5),(761,'Ennedi tiger',11,68,7),(762,'Ghoul',12,71,6),(763,'Owlman',9,67,5),(764,'Werewolf',10,72,7),(765,'Vampire',4,36,6),(766,'Aswang',10,71,5),(767,'Banshee',12,62,7),(768,'Ghost',17,99,8),(769,'Jikininki',16,109,7),(770,'Kuchisake-onna',14,83,8),(771,'Poltergeist',6,42,5),(772,'Preta',3,30,2),(773,'Spirit',13,67,4),(774,'Vampire',2,23,4),(775,'Wewe Gombel',12,61,4),(776,'Wili',5,34,3),(777,'Will o\' the wisp',16,79,9),(778,'Wraith',9,59,7),(779,'Yurei',15,86,8),(780,'Draugr',6,42,5),(781,'Fext',7,52,2),(782,'Ghoul',14,82,8),(783,'Jiangshi',6,47,5),(784,'Lich',16,91,7),(785,'Manananggal',6,44,5),(786,'Mummy',8,53,5),(787,'Myling',16,77,8),(788,'Nukekubi',11,77,3),(789,'Pontianak',6,46,3),(790,'Skeleton',4,28,3),(791,'Undead',4,30,4),(792,'Vampire',2,25,4),(793,'Zombie',5,42,4),(794,'Daemon',13,78,7),(795,'Demon',5,33,5),(796,'Fairy',6,38,4),(797,'Familiar',14,97,5),(798,'Genie',15,86,6),(799,'Monster',12,83,6),(800,'Sprite',4,30,2),(801,'Yōkai',13,67,6),(802,'Giant Kea',17,89,9);
/*!40000 ALTER TABLE `enemy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_armor` int(1) unsigned NOT NULL DEFAULT '0',
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='List of Equipment. Currently a shell.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
INSERT INTO `equipment` VALUES (1,0,'Iron Breastplate'),(2,1,'Iron Sword'),(3,0,'Iron Leggings'),(4,1,'Iron Greatsword');
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_list`
--

DROP TABLE IF EXISTS `friend_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friend_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(10) unsigned NOT NULL,
  `friend` int(10) unsigned NOT NULL,
  `active` int(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `friend_base_idx` (`user`),
  KEY `friend_ref_idx` (`friend`),
  CONSTRAINT `friend_base` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `friend_ref` FOREIGN KEY (`friend`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='Users have friends. A bridge table of user to user.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_list`
--

LOCK TABLES `friend_list` WRITE;
/*!40000 ALTER TABLE `friend_list` DISABLE KEYS */;
INSERT INTO `friend_list` VALUES (2,1,1,0),(3,1,2,1),(4,2,1,0);
/*!40000 ALTER TABLE `friend_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gatcha`
--

DROP TABLE IF EXISTS `gatcha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gatcha` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `required` int(10) unsigned NOT NULL DEFAULT '10' COMMENT 'The required currency to roll on this gatcha.',
  `maxLevel` int(10) unsigned NOT NULL DEFAULT '5',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='Table of Roll Types (''gatcha''), ie. "Bronze", "Platinum", etc.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gatcha`
--

LOCK TABLES `gatcha` WRITE;
/*!40000 ALTER TABLE `gatcha` DISABLE KEYS */;
INSERT INTO `gatcha` VALUES (1,'Bronze',10,5),(2,'Silver',100,10),(3,'Gold',1000,15),(4,'Platinum',10000,20);
/*!40000 ALTER TABLE `gatcha` ENABLE KEYS */;
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
  `currency` int(10) unsigned NOT NULL DEFAULT '100',
  `level` int(10) unsigned NOT NULL DEFAULT '1',
  `experience` int(10) unsigned NOT NULL DEFAULT '1',
  `stamina` int(10) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','thebestpassword',208747,1,1,1),(2,'a','a',90000,100,1578841,5421);
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
  `party` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '1 if part of the party, 0 otherwise. Should only be 3 active at a time, maintained through the client-side.',
  `support` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '1 if it''s the support, 0 otherwise. Should be unique, though that''s up to the client-side.',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_idx` (`user`),
  CONSTRAINT `user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='List of cards a user owns. Just a bridge table for now.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_cards`
--

LOCK TABLES `user_cards` WRITE;
/*!40000 ALTER TABLE `user_cards` DISABLE KEYS */;
INSERT INTO `user_cards` VALUES (1,1,0,3,0,0),(2,1,0,2,0,0),(3,1,0,5,0,1),(4,1,1,1,0,0),(5,1,1,4,0,0),(6,2,0,3,1,1);
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
/*!50003 DROP FUNCTION IF EXISTS `roll_gatcha` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `roll_gatcha`(user_id INT, gatcha_type INT) RETURNS int(1)
BEGIN
	# All declares have to be at the top, yay....
	DECLARE currentMoney INT DEFAULT (SELECT `currency` FROM `user` WHERE `id` = user_id);
    DECLARE requiredMoney INT DEFAULT (SELECT `required` FROM `gatcha` WHERE `id` = gatcha_type);
	DECLARE maxLevel INT DEFAULT (SELECT `maxLevel` FROM `gatcha` WHERE `id` = gatcha_type);
    DECLARE adventurer INT DEFAULT -1; # No adventurer
    # Define a return variable
    DECLARE retVar INT DEFAULT -1; # Should never happen!

	# Check if we have enough money
    IF (currentMoney < requiredMoney) THEN SET retVar = -2; # Not enough money!
    ELSE # Roll on the table
		UPDATE `user` SET `currency` = (currentMoney - requiredMoney) WHERE `id` = user_id;
		SET adventurer = (SELECT `id` FROM `adventurer` WHERE `level` <= maxLevel ORDER BY RAND() LIMIT 1);
        INSERT INTO `user_cards` (`user`, `card_type`, `card_id`) VALUES (user_id, 0, adventurer);
        SET retVar = adventurer; # We have a success!
    END IF;
	# Return the setting!
RETURN retVar;
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
/*!50001 VIEW `adventurer_lookup` AS select `adventurer`.`id` AS `id`,`adventurer`.`level` AS `level`,`adventurer`.`name` AS `name`,`race`.`name` AS `race`,`class`.`name` AS `className`,`adventurer`.`str` AS `str`,`adventurer`.`dex` AS `dex`,`adventurer`.`int` AS `int`,`adventurer`.`wis` AS `wis`,`adventurer`.`con` AS `con`,`adventurer`.`cha` AS `cha`,`CALCULATE_HP`(`adventurer`.`id`) AS `hp`,`CALCULATE_HIT`(`adventurer`.`id`) AS `hit` from ((`adventurer` join `class` on((`adventurer`.`class` = `class`.`id`))) join `race` on((`adventurer`.`race` = `race`.`id`))) */;
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

-- Dump completed on 2017-12-07 19:59:24
