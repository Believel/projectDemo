-- 讲师表
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `tc_id` int(11) NOT NULL AUTO_INCREMENT,
  `tc_name` varchar(16) NOT NULL DEFAULT '' COMMENT '讲师姓名',
  `tc_roster` varchar(10) NOT NULL DEFAULT '攻城狮' COMMENT '讲师花名',
  `tc_pass` char(32) NOT NULL DEFAULT '' COMMENT '密码',
  `tc_type` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否为管理员',
  `tc_status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '讲师状态',
  `tc_brithday` varchar(16) NOT NULL DEFAULT '' COMMENT '讲师生日',
  `tc_province` char(6) NOT NULL DEFAULT '0' COMMENT '所在省份',
  `tc_city` char(6) NOT NULL DEFAULT '0' COMMENT '所在城市',
  `tc_district` char(6) NOT NULL DEFAULT '0' COMMENT '所在区县',
  `tc_hometown` varchar(120) NOT NULL DEFAULT '' COMMENT '家乡',
  `tc_avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '讲师头像',
  `tc_gender` tinyint(2) NOT NULL DEFAULT '0' COMMENT '性别',
  `tc_cellphone` char(11) NOT NULL DEFAULT '' COMMENT '手机号码',
  `tc_email` varchar(30) NOT NULL DEFAULT '' COMMENT '电子邮箱',
  `tc_join_time` varchar(16) NOT NULL DEFAULT '' COMMENT '入职时间',
  `tc_introduce` text COMMENT '讲师介绍',
  `tc_update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (`tc_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='讲师表';

-- 课程分类表
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `cg_id` int(11) NOT NULL AUTO_INCREMENT,
  `cg_pid` int(11) NOT NULL DEFAULT '0' COMMENT '父级ID',
  `cg_name` varchar(16) NOT NULL DEFAULT '' COMMENT '分类名称',
  `cg_order` int(11) NOT NULL DEFAULT '10' COMMENT '排序',
  `cg_is_hide` tinyint(2) NOT NULL DEFAULT 0 COMMENT '是否隐藏',
  `cg_update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (`cg_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='分类表';

-- 课程表
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `cs_id` int(11) NOT NULL AUTO_INCREMENT,
  `cs_cg_id` int(11) NOT NULL DEFAULT '0' COMMENT '课程分类ID',
  `cs_tc_id` int(11) NOT NULL DEFAULT '0' COMMENT '课程讲师ID',
  `cs_name` varchar(128) NOT NULL DEFAULT '' COMMENT '课程名称',
  `cs_brief` text COMMENT '课程简介',
  `cs_tags` varchar(64) NOT NULL DEFAULT '' COMMENT '课程标签',
  `cs_cover` varchar(255) NOT NULL DEFAULT '' COMMENT '课程封面',
  `cs_cover_original` varchar(255) NOT NULL DEFAULT '' COMMENT '封面原图',
  `cs_visited` int(11) NOT NULL DEFAULT 0 COMMENT '浏览量',
  `cs_update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (`cs_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='课程表';

-- 课时表
DROP TABLE IF EXISTS `lesson`;
CREATE TABLE `lesson` (
  `ls_id` int(11) NOT NULL AUTO_INCREMENT,
  `ls_cs_id` int(11) NOT NULL DEFAULT '0' COMMENT '课程ID',
  `ls_name` varchar(128) NOT NULL DEFAULT '' COMMENT '课时名称',
  `ls_brief` text COMMENT '课时简介',
  `ls_is_free` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否免费',
  `ls_video` varchar(255) NOT NULL DEFAULT '' COMMENT '视频',
  `ls_video_duration` varchar(16) NOT NULL DEFAULT '00:00' COMMENT '视频时长',
  `ls_recommend_duration` varchar(16) NOT NULL DEFAULT '' COMMENT '推荐时长',
  `ls_update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (`ls_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='课时表';


-- 用户课程关联表
DROP TABLE IF EXISTS `user_to_course`;
CREATE TABLE `user_to_course` (
  `utc_id` int(11) NOT NULL AUTO_INCREMENT,
  `utc_cs_id` int(11) NOT NULL DEFAULT '0' COMMENT '课程ID',
  `utc_us_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `utc_update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (`utc_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户课程关联表';

