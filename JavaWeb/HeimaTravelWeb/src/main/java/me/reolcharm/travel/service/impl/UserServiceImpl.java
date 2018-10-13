/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-11 20:43
 * @Description:
 **/
package me.reolcharm.travel.service.impl;

import me.reolcharm.travel.dao.UserDao;
import me.reolcharm.travel.dao.impl.UserDaoImpl;
import me.reolcharm.travel.domain.User;
import me.reolcharm.travel.service.UserService;

public class UserServiceImpl implements UserService {
    private UserDao dao = new UserDaoImpl();
    @Override
    public User searchByUsername(User userBean1) {
        return dao.searchByUsername(userBean1.getName());
    }
}
