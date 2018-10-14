/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-11 20:45
 * @Description:
 **/
package me.reolcharm.travel.dao;

import me.reolcharm.travel.domain.User;

public interface UserDao {
    User searchByUsername(String username);
}
