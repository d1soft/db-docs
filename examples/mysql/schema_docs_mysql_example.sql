--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
  `id` tinyint(1) NOT NULL COMMENT 'Country identificator',
  `name` varchar(255) DEFAULT NULL COMMENT 'Country full name',
  `flag_icon` varchar(255) DEFAULT NULL COMMENT 'Country icon url',
  `code` varchar(3) NOT NULL COMMENT 'ISO-code 3-letters',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Countries info';

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `ignored_table`
--

DROP TABLE IF EXISTS `ignored_table`;
CREATE TABLE `ignored_table` (
  `id` int(11) NOT NULL COMMENT 'Identity',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ignored_table`
--

LOCK TABLES `ignored_table` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `statistic`
--

DROP TABLE IF EXISTS `statistic`;
CREATE TABLE `statistic` (
  `date` date NOT NULL COMMENT 'Date of stats',
  `registered_users` int(10) DEFAULT '0' COMMENT 'Total users registered count',
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Statistic metrics values';

LOCK TABLES `statistic` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL COMMENT 'User email adress (unique)',
  `phone` varchar(255) DEFAULT NULL COMMENT 'User phone number (unique)',
  `country_id` tinyint(1) DEFAULT NULL COMMENT 'Country identificator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  KEY `user_country_idx` (`country_id`),
  CONSTRAINT `user_country` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Users info';

LOCK TABLES `users` WRITE;
UNLOCK TABLES;