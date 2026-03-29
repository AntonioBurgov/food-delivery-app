-- MySQL dump 10.13  Distrib 9.2.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: fooddelivery
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Addresses`
--

DROP TABLE IF EXISTS `Addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Addresses` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` int NOT NULL,
  `Street` varchar(200) NOT NULL,
  `City` varchar(100) NOT NULL,
  `PostalCode` varchar(20) DEFAULT NULL,
  `IsDefault` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Addresses`
--

LOCK TABLES `Addresses` WRITE;
/*!40000 ALTER TABLE `Addresses` DISABLE KEYS */;
INSERT INTO `Addresses` VALUES (1,3,'321 Customer Lane','New York','10001',1);
/*!40000 ALTER TABLE `Addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,'Pizza'),(2,'Burgers'),(3,'Sushi'),(4,'Mexican'),(5,'Chinese'),(6,'Indian'),(7,'Salads'),(8,'Desserts'),(9,'Drinks');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MenuItems`
--

DROP TABLE IF EXISTS `MenuItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MenuItems` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `RestaurantId` int NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Description` text,
  `Price` decimal(10,2) NOT NULL,
  `ImageUrl` varchar(300) DEFAULT NULL,
  `CategoryLabel` varchar(100) DEFAULT NULL,
  `IsAvailable` tinyint(1) DEFAULT '1',
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `RestaurantId` (`RestaurantId`),
  CONSTRAINT `menuitems_ibfk_1` FOREIGN KEY (`RestaurantId`) REFERENCES `Restaurants` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MenuItems`
--

LOCK TABLES `MenuItems` WRITE;
/*!40000 ALTER TABLE `MenuItems` DISABLE KEYS */;
INSERT INTO `MenuItems` VALUES (1,1,'Margherita','Tomato, mozzarella, basil',12.99,'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop','Classic Pizzas',1,'2026-03-08 19:16:42'),(2,1,'Pepperoni','Tomato, mozzarella, pepperoni',14.99,'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop','Classic Pizzas',1,'2026-03-08 19:16:42'),(3,1,'Tiramisu','Classic Italian dessert',6.99,'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop','Desserts',1,'2026-03-08 19:16:42'),(4,2,'Classic Burger','Beef patty, lettuce, tomato',11.99,'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop','Burgers',1,'2026-03-08 19:16:42'),(5,2,'Cheese Burger','Beef patty, cheddar, pickles',13.99,'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=200&fit=crop','Burgers',1,'2026-03-08 19:16:42'),(6,2,'French Fries','Crispy golden fries',4.99,'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=300&h=200&fit=crop','Sides',1,'2026-03-08 19:16:42'),(7,3,'Salmon Nigiri','Fresh salmon on rice',8.99,'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=200&fit=crop','Nigiri',1,'2026-03-08 19:16:42'),(8,3,'Dragon Roll','Shrimp tempura, avocado',15.99,'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=400&h=300&fit=crop','Rolls',1,'2026-03-08 19:16:42'),(9,3,'Miso Soup','Traditional Japanese soup',3.99,'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop','Soups',1,'2026-03-08 19:16:42'),(10,4,'Street Tacos','Three corn tortillas with carne asada, onion, cilantro',9.99,'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop','Mexican',1,'2026-03-29 13:29:42'),(11,4,'Burrito Bowl','Rice, beans, grilled chicken, salsa, guacamole',12.99,'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop','Mexican',1,'2026-03-29 13:29:42'),(12,4,'Nachos Grande','Tortilla chips, cheese, jalapeños, sour cream',8.99,'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop','Mexican',1,'2026-03-29 13:29:42'),(13,4,'Quesadilla','Flour tortilla with cheese and grilled chicken',10.99,'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop','Mexican',1,'2026-03-29 13:29:42'),(14,4,'Churros','Fried dough with cinnamon sugar and chocolate dip',5.99,'https://images.unsplash.com/photo-1624371414361-e670edf4254a?w=400&h=300&fit=crop','Desserts',1,'2026-03-29 13:29:42'),(15,4,'Horchata','Traditional Mexican rice drink',3.49,'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop','Drinks',1,'2026-03-29 13:29:42'),(16,5,'Kung Pao Chicken','Spicy stir-fried chicken with peanuts and vegetables',13.99,'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop','Chinese',1,'2026-03-29 13:29:42'),(17,5,'Dim Sum Basket','Steamed dumplings with soy dipping sauce',11.99,'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop','Chinese',1,'2026-03-29 13:29:42'),(18,5,'Fried Rice','Wok-fried rice with egg, vegetables and soy sauce',9.99,'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop','Chinese',1,'2026-03-29 13:29:42'),(19,5,'Spring Rolls','Crispy vegetable spring rolls with sweet chili sauce',7.99,'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&h=300&fit=crop','Starters',1,'2026-03-29 13:29:42'),(20,5,'Peking Duck','Roasted duck with pancakes, cucumber and hoisin sauce',24.99,'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=400&h=300&fit=crop','Chinese',1,'2026-03-29 13:29:42'),(21,5,'Jasmine Tea','Traditional Chinese jasmine tea',2.99,'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop','Drinks',1,'2026-03-29 13:29:42'),(22,6,'Butter Chicken','Creamy tomato curry with tender chicken',15.99,'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop','Indian',1,'2026-03-29 13:29:42'),(23,6,'Lamb Biryani','Aromatic basmati rice with spiced lamb',17.99,'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop','Indian',1,'2026-03-29 13:29:42'),(24,6,'Garlic Naan','Freshly baked bread with garlic and butter',3.99,'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop','Breads',1,'2026-03-29 13:29:42'),(25,6,'Samosas','Crispy pastry filled with spiced potatoes and peas',6.99,'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop','Starters',1,'2026-03-29 13:29:42'),(26,6,'Mango Lassi','Refreshing yogurt drink with mango',4.49,'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=300&fit=crop','Drinks',1,'2026-03-29 13:29:42'),(27,6,'Gulab Jamun','Soft milk dumplings in rose sugar syrup',5.99,'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop','Desserts',1,'2026-03-29 13:29:42'),(28,7,'Caesar Salad','Romaine lettuce, parmesan, croutons, caesar dressing',10.99,'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop','Salads',1,'2026-03-29 13:29:42'),(29,7,'Greek Salad','Tomatoes, cucumber, olives, feta cheese, oregano',11.99,'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop','Salads',1,'2026-03-29 13:29:42'),(30,7,'Quinoa Bowl','Quinoa, roasted vegetables, avocado, tahini dressing',13.99,'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop','Bowls',1,'2026-03-29 13:29:42'),(31,7,'Acai Bowl','Acai blend topped with granola, banana, berries',12.99,'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop','Bowls',1,'2026-03-29 13:29:42'),(32,7,'Green Smoothie','Spinach, banana, mango, almond milk',6.99,'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=300&fit=crop','Drinks',1,'2026-03-29 13:29:42'),(33,7,'Avocado Toast','Sourdough bread with smashed avocado and poached egg',9.99,'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&h=300&fit=crop','Starters',1,'2026-03-29 13:29:42'),(34,8,'Chocolate Lava Cake','Warm chocolate cake with molten center',8.99,'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=400&h=300&fit=crop','Cakes',1,'2026-03-29 13:29:42'),(35,8,'New York Cheesecake','Classic creamy cheesecake with berry compote',7.99,'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop','Cakes',1,'2026-03-29 13:29:42'),(36,8,'Macarons Box','Six assorted French macarons',12.99,'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&h=300&fit=crop','Pastries',1,'2026-03-29 13:29:42'),(37,8,'Waffles & Cream','Belgian waffles with whipped cream and strawberries',9.99,'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&h=300&fit=crop','Waffles',1,'2026-03-29 13:29:42'),(38,8,'Tiramisu','Classic Italian dessert with mascarpone and espresso',7.99,'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop','Cakes',1,'2026-03-29 13:29:42'),(39,8,'Hot Chocolate','Rich creamy hot chocolate with marshmallows',4.99,'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=300&fit=crop','Drinks',1,'2026-03-29 13:29:42');
/*!40000 ALTER TABLE `MenuItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderItems`
--

DROP TABLE IF EXISTS `OrderItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderItems` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `OrderId` int NOT NULL,
  `MenuItemId` int NOT NULL,
  `Quantity` int NOT NULL DEFAULT '1',
  `UnitPrice` decimal(10,2) NOT NULL,
  `SpecialInstructions` text,
  PRIMARY KEY (`Id`),
  KEY `OrderId` (`OrderId`),
  KEY `MenuItemId` (`MenuItemId`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `Orders` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`MenuItemId`) REFERENCES `MenuItems` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderItems`
--

LOCK TABLES `OrderItems` WRITE;
/*!40000 ALTER TABLE `OrderItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `OrderItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CustomerId` int NOT NULL,
  `RestaurantId` int NOT NULL,
  `DeliveryAddressId` int NOT NULL,
  `Status` enum('Pending','Confirmed','Preparing','OnTheWay','Delivered','Cancelled') NOT NULL DEFAULT 'Pending',
  `TotalAmount` decimal(10,2) NOT NULL,
  `DeliveryFee` decimal(10,2) DEFAULT '0.00',
  `PaymentMethod` enum('Cash','Card','ApplePay') NOT NULL DEFAULT 'Cash',
  `PaymentStatus` enum('Pending','Paid','Failed') NOT NULL DEFAULT 'Pending',
  `PaymentIntentId` varchar(255) DEFAULT NULL,
  `Notes` text,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `CustomerId` (`CustomerId`),
  KEY `RestaurantId` (`RestaurantId`),
  KEY `DeliveryAddressId` (`DeliveryAddressId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `Users` (`Id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`RestaurantId`) REFERENCES `Restaurants` (`Id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`DeliveryAddressId`) REFERENCES `Addresses` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RestaurantCategories`
--

DROP TABLE IF EXISTS `RestaurantCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RestaurantCategories` (
  `RestaurantId` int NOT NULL,
  `CategoryId` int NOT NULL,
  PRIMARY KEY (`RestaurantId`,`CategoryId`),
  KEY `CategoryId` (`CategoryId`),
  CONSTRAINT `restaurantcategories_ibfk_1` FOREIGN KEY (`RestaurantId`) REFERENCES `Restaurants` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `restaurantcategories_ibfk_2` FOREIGN KEY (`CategoryId`) REFERENCES `Categories` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RestaurantCategories`
--

LOCK TABLES `RestaurantCategories` WRITE;
/*!40000 ALTER TABLE `RestaurantCategories` DISABLE KEYS */;
INSERT INTO `RestaurantCategories` VALUES (1,1),(2,2),(3,3);
/*!40000 ALTER TABLE `RestaurantCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restaurants`
--

DROP TABLE IF EXISTS `Restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Restaurants` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `OwnerId` int NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Description` text,
  `LogoUrl` varchar(300) DEFAULT NULL,
  `CoverImageUrl` varchar(300) DEFAULT NULL,
  `Address` varchar(200) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `DeliveryFee` decimal(10,2) DEFAULT '0.00',
  `MinOrderAmount` decimal(10,2) DEFAULT '0.00',
  `EstimatedDeliveryMinutes` int DEFAULT '30',
  `Rating` decimal(3,2) DEFAULT '0.00',
  `IsActive` tinyint(1) DEFAULT '1',
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `Category` varchar(50) DEFAULT 'Food',
  PRIMARY KEY (`Id`),
  KEY `OwnerId` (`OwnerId`),
  CONSTRAINT `restaurants_ibfk_1` FOREIGN KEY (`OwnerId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurants`
--

LOCK TABLES `Restaurants` WRITE;
/*!40000 ALTER TABLE `Restaurants` DISABLE KEYS */;
INSERT INTO `Restaurants` VALUES (1,2,'Mario Pizza','Authentic Italian pizza made fresh daily','https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop','https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=400&fit=crop','123 Main St','New York',2.99,10.00,25,4.70,1,'2026-03-08 19:16:42','Pizza'),(2,2,'Burger House','Juicy gourmet burgers and sides','https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop','https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=400&fit=crop','456 Oak Ave','New York',1.99,8.00,20,4.50,1,'2026-03-08 19:16:42','Burgers'),(3,2,'Sushi World','Fresh Japanese sushi and sashimi','https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop','https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&h=400&fit=crop','789 Pine Rd','New York',3.99,15.00,35,4.80,1,'2026-03-08 19:16:42','Sushi'),(4,2,'Taco Fiesta','Authentic Mexican street food','https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop','https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&h=400&fit=crop','321 Elm St','New York',2.49,12.00,30,4.30,1,'2026-03-29 13:29:42','Mexican'),(5,2,'Dragon Palace','Authentic Chinese cuisine','https://images.unsplash.com/photo-1563245372-f21724e3856d?w=100&h=100&fit=crop','https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&h=400&fit=crop','654 Maple Dr','New York',2.99,15.00,40,4.40,1,'2026-03-29 13:29:42','Chinese'),(6,2,'Spice Garden','Traditional Indian dishes','https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=100&h=100&fit=crop','https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&h=400&fit=crop','987 Cedar Ln','New York',3.49,20.00,45,4.60,1,'2026-03-29 13:29:42','Indian'),(7,2,'Green Bowl','Fresh healthy salads and bowls','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=400&fit=crop','147 Oak Ave','New York',1.99,10.00,20,4.50,1,'2026-03-29 13:29:42','Salads'),(8,2,'Sweet Dreams','Cakes, pastries and desserts','https://images.unsplash.com/photo-1551024506-0bccd828d307?w=100&h=100&fit=crop','https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200&h=400&fit=crop','258 Pine St','New York',2.49,8.00,25,4.70,1,'2026-03-29 13:29:42','Desserts');
/*!40000 ALTER TABLE `Restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FullName` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `PasswordHash` varchar(255) NOT NULL,
  `Role` enum('Customer','RestaurantOwner','Courier','Admin') NOT NULL DEFAULT 'Customer',
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Admin User','admin@fooddelivery.com','hashed_password_here','Admin','+1000000000','2026-03-08 19:16:42'),(2,'Mario Rossi','mario@pizzaplace.com','hashed_password_here','RestaurantOwner','+1111111111','2026-03-08 19:16:42'),(3,'John Doe','john@customer.com','hashed_password_here','Customer','+2222222222','2026-03-08 19:16:42'),(4,'admin','admin@gmail.com','4PLvKPNxbCzgd9wIGFNX3FOwCXvJrVoTLZgNsH4mFzc=','Customer','3212312312','2026-03-29 10:26:06');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-29 14:16:06
