-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema week4_umc
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema week4_umc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `week4_umc` DEFAULT CHARACTER SET utf8 ;
USE `week4_umc` ;

-- -----------------------------------------------------
-- Table `week4_umc`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `week4_umc`.`user` (
  `id` BIGINT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `user_address` VARCHAR(45) NOT NULL,
  `created_at` DATETIME(6) NULL,
  `updated_at` DATETIME(6) NULL,
  `email` VARCHAR(45) NOT NULL,
  `sex` TINYINT NOT NULL,
  `preferences` JSON NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `week4_umc`.`mission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `week4_umc`.`mission` (
  `id` BIGINT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `start_date` DATETIME(6) NOT NULL,
  `end_date` DATETIME(6) NULL,
  `status` TINYINT NOT NULL,
  `reward` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id`
    FOREIGN KEY ()
    REFERENCES `week4_umc`.`user` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `week4_umc`.`mission_assignment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `week4_umc`.`mission_assignment` (
  `id` BIGINT NOT NULL,
  `created_at` DATETIME NULL,
  `status` TINYINT NULL,
  `complete_date` DATETIME NULL,
  `review` TEXT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `mission_id`
    FOREIGN KEY ()
    REFERENCES `week4_umc`.`mission` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_id`
    FOREIGN KEY ()
    REFERENCES `week4_umc`.`user` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `week4_umc`.`alarm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `week4_umc`.`alarm` (
  `id` BIGINT NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `read_status` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_id`
    FOREIGN KEY ()
    REFERENCES `week4_umc`.`user` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `week4_umc`.`login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `week4_umc`.`login` (
  `id` BIGINT NOT NULL,
  `login_time` DATETIME NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_id`
    FOREIGN KEY ()
    REFERENCES `week4_umc`.`user` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
