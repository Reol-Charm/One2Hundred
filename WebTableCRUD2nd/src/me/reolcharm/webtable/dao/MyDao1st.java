package me.reolcharm.webtable.dao;

import me.reolcharm.webtable.domain.User;

import java.util.List;

public interface MyDao1st {
    User searchUser(User loginUser);
    int add(User userBean);
    List<User> queryAll();

    User findUserById(User idUserBean);

}
