-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.6.4-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para person
DROP DATABASE IF EXISTS `person`;
CREATE DATABASE IF NOT EXISTS `person` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci */;
USE `person`;

-- Volcando estructura para tabla person.acciones
DROP TABLE IF EXISTS `acciones`;
CREATE TABLE IF NOT EXISTS `acciones` (
  `id_acc` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_acc` varchar(80) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_acc`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla person.cuentaacceso
DROP TABLE IF EXISTS `cuentaacceso`;
CREATE TABLE IF NOT EXISTS `cuentaacceso` (
  `id_cue` int(11) NOT NULL AUTO_INCREMENT,
  `username_cue` varchar(50) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `password_cue` varchar(4000) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `iduser_cue` int(11) DEFAULT NULL,
  `idroles_cue` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_cue`) USING BTREE,
  KEY `FKUSER` (`iduser_cue`) USING BTREE,
  KEY `FK_cuentaacceso_roles` (`idroles_cue`) USING BTREE,
  CONSTRAINT `FK_cuentaacceso_roles` FOREIGN KEY (`idroles_cue`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_cuentaacceso_users` FOREIGN KEY (`iduser_cue`) REFERENCES `users` (`id_use`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla person.departamentos
DROP TABLE IF EXISTS `departamentos`;
CREATE TABLE IF NOT EXISTS `departamentos` (
  `id_dep` int(11) NOT NULL,
  `codigo_dep` int(11) DEFAULT NULL,
  `nombre_dep` varchar(100) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_dep`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla person.modulos
DROP TABLE IF EXISTS `modulos`;
CREATE TABLE IF NOT EXISTS `modulos` (
  `id_mod` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_mod` varchar(80) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_mod`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla person.municipios
DROP TABLE IF EXISTS `municipios`;
CREATE TABLE IF NOT EXISTS `municipios` (
  `id_mun` int(11) NOT NULL,
  `nombre_mun` varchar(80) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `codigodane_mun` varchar(4) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `iddepartamento_mun` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_mun`) USING BTREE,
  KEY `FK_municipios_departamentos` (`iddepartamento_mun`),
  CONSTRAINT `FK_municipios_departamentos` FOREIGN KEY (`iddepartamento_mun`) REFERENCES `departamentos` (`id_dep`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla person.permisosroles
DROP TABLE IF EXISTS `permisosroles`;
CREATE TABLE IF NOT EXISTS `permisosroles` (
  `id_prol` int(11) NOT NULL AUTO_INCREMENT,
  `idaccion_prol` int(11) DEFAULT 0,
  `idrol_prol` int(11) DEFAULT NULL,
  `idmodulo_prol` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_prol`) USING BTREE,
  UNIQUE KEY `Índice 5` (`idaccion_prol`,`idrol_prol`,`idmodulo_prol`) USING BTREE,
  KEY `FK__roles` (`idrol_prol`) USING BTREE,
  KEY `FK__modulos` (`idmodulo_prol`) USING BTREE,
  CONSTRAINT `FK_permisosroles_acciones` FOREIGN KEY (`idaccion_prol`) REFERENCES `acciones` (`id_acc`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_permisosroles_modulos` FOREIGN KEY (`idmodulo_prol`) REFERENCES `modulos` (`id_mod`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_permisosroles_roles` FOREIGN KEY (`idrol_prol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla person.registro
DROP TABLE IF EXISTS `registro`;
CREATE TABLE IF NOT EXISTS `registro` (
  `id_reg` int(11) NOT NULL AUTO_INCREMENT,
  `numerovalidas_reg` int(11) DEFAULT NULL,
  `numeroinvalidas_reg` int(11) DEFAULT NULL,
  `total_reg` int(11) DEFAULT NULL,
  `idmunicipio_reg` int(11) DEFAULT NULL,
  `fecha_reg` datetime DEFAULT NULL,
  `idcuentaacceso_reg` int(11) DEFAULT NULL,
  `iduser_reg` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_reg`) USING BTREE,
  KEY `FK_registro_municipios` (`idmunicipio_reg`),
  CONSTRAINT `FK_registro_municipios` FOREIGN KEY (`idmunicipio_reg`) REFERENCES `municipios` (`id_mun`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla person.roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(40) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `descripcion_rol` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_rol`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla person.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_use` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_use` varchar(50) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `apellido_use` varchar(50) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `email_use` varchar(50) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `cedula_use` varchar(50) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `coordinador_use` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_use`) USING BTREE,
  UNIQUE KEY `UNQ` (`cedula_use`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
