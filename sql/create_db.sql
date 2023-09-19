/* COP4331 Small Project
   SQL script to create database and tables
   Create db
   */

CREATE database IF NOT EXISTS COP4331;
USE COP4331;

/* Create users table
*/
DROP TABLE IF EXISTS Users;
CREATE TABLE `COP4331`.`Users` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `DateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `DateLastLoggedIn` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `FirstName` VARCHAR(50) NOT NULL DEFAULT '',
    `LastName` VARCHAR(50) NOT NULL DEFAULT '',
    `Login` VARCHAR(50) NOT NULL DEFAULT '',
    `Password` VARCHAR(50) NOT NULL DEFAULT '',
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

/* Create contacts table
*/
DROP TABLE IF EXISTS Contacts;
CREATE TABLE `COP4331`.`Contacts` 
( 
	`ID` INT NOT NULL AUTO_INCREMENT , 
	`FirstName` VARCHAR(50) NOT NULL DEFAULT '',
        `LastName` VARCHAR(50) NOT NULL DEFAULT '', 
	`Phone` VARCHAR(50) NOT NULL DEFAULT '' , 
	`Email` VARCHAR(50) NOT NULL DEFAULT '' , 
	`UserID` INT NOT NULL DEFAULT '0' , 
	PRIMARY KEY (`ID`)
) ENGINE = InnoDB;


/* Populate data rows with group members
*/
USE COP4331;

insert into Users (FirstName, LastName, Login, Password)
VALUES (
        'Aly',
        'Megahed',
        'AlyM',
        'blahblahblahblah1234'
    );

insert into Users (FirstName, LastName, Login, Password)
VALUES (
        'Katheryn',
        'Berndt',
        'KatherynB',
        'blahblahblahblah2345'
    );
insert into Users (FirstName, LastName, Login, Password)
VALUES (
        'Jarod',
        'Davies',
        'JarodD',
        'blahblahblahblah2567'
    );

insert into Users (FirstName, LastName, Login, Password)
VALUES (
        'Joshua',
        'Nguyen',
        'JoshuaN',
        'blahblahblahblah8190'
    );

insert into Users (FirstName, LastName, Login, Password)
VALUES (
        'Rylan',
        'Townsend',
        'RylanT',
        'blahblahblahblah9181'
    );


insert into Contacts (ID, FirstName, LastName, Phone, Email, UserID)
VALUES (
        1,
        'Aly',
        'Megahed',
        '1238918976',
        'perpetual@database.com',
        123

);

insert into Contacts (ID, FirstName, LastName, Phone, Email, UserID)
VALUES (
        2,
        'Katheryn',
        'L Berndt',
        '8191091872',
        'katie@API.com',
        256

);


insert into Contacts (ID, FirstName, LastName, Phone, Email, UserID)
VALUES (
        3,
        'Jarod', 
        'Robert Davies',
        '2981743382',
        'jarod@frontEnd.com',
        928

);


insert into Contacts (ID, FirstName, LastName, Phone, Email, UserID)
VALUES (
        4,
        'Joshua',
        'Nguyen',
        '1982711765',
        'joshua@API.com',
        827

);


insert into Contacts (ID, FirstName, LastName, Phone, Email, UserID)
VALUES (
        5,
        'Rylan',
        'Leland Townsend',
        '1982764732',
        'rylan@frontEnd.com',
        746

);

/* Create user and grant privileges 
*/
Use COP4331;
create user IF NOT EXISTS 'PerpetualUser' identified by 'Small_Project1234QWER';
GRANT ALL PRIVILEGES ON COP4331.* TO 'PerpetualUser' @'%'