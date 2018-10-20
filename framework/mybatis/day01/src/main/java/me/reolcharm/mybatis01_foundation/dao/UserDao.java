/**
 * @Project: mybatis01
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-20 20:27
 * @Description:
 **/
package me.reolcharm.mybatis01_foundation.dao;

import me.reolcharm.mybatis01_foundation.domain.User;

import java.util.List;

public interface UserDao {
    List<User> findAll();
}
