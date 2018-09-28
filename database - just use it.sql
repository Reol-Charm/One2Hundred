-- 飞哥摸底的数据库
CREATE DATABASE web_test1;
USE web_test1;
CREATE TABLE `customer` (
  `cust_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '客户编号(主键)',
  `cust_name` VARCHAR (32) NOT NULL COMMENT '客户名称(公司名称)',
  `cust_source` VARCHAR (32) DEFAULT NULL COMMENT '客户信息来源',
  `cust_level` VARCHAR (32) DEFAULT NULL COMMENT '客户级别',
  `cust_mobile` VARCHAR (16) DEFAULT NULL COMMENT '移动电话'
) ENGINE = INNODB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 ;9m

INSERT  INTO `customer`(`cust_id`,`cust_name`,`cust_source`,`cust_level`,`cust_mobile`) VALUES (1,'熊大','网络营销','vip','13012341234'),(2,'熊二','电话营销','vip','13112341234'),(3,'张三','广告推广','普通客户','13212341234'),(4,'李四','朋友介绍','vip','13312341234'),(5,'王五','咨询','普通客户','13412341234');
SELECT * FROM customer;
INSERT INTO customer VALUES (NULL,'SD','DSFA','普通客户','DA');

-- 继续之前的案例, 主要目标是熟悉业务逻辑.
CREATE DATABASE webtabledb;
USE webtabledb;
CREATE TABLE userinfo(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	realName VARCHAR(15),
	userName VARCHAR(20) NOT NULL,
	u_password VARCHAR(20) NOT NULL,
	gender VARCHAR(5),
	age INT,
	address VARCHAR(25),
	email VARCHAR(20),
	telNum VARCHAR(15),
	created_date DATE,
	lastTime TIMESTAMP,
	qq VARCHAR(15),
	indentyCard VARCHAR(25),
	hidenVarchar VARCHAR(15)
);

SELECT * FROM userinfo;
