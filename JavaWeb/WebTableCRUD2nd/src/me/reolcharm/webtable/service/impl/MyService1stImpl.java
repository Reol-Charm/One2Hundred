/**
 * @Project: WebTableCRUD2nd
 * @Author: Reolcharm
 * @CreatedTime: 2018-09-22 21:23
 * @Description: implement
 **/
package me.reolcharm.webtable.service.impl;

import me.reolcharm.webtable.dao.impl.MyDao1stImpl;
import me.reolcharm.webtable.domain.User;
import me.reolcharm.webtable.service.MyService1st;

import java.util.List;

public class MyService1stImpl implements MyService1st {
    MyDao1stImpl myDao1st = new MyDao1stImpl();

    @Override
    public User searchUser(User loginUser) {
        return myDao1st.searchUser(loginUser);
    }

    @Override
    public int add(User userBean) {
        return myDao1st.add(userBean);
    }

    @Override
    public List<User> queryAll() {
        return myDao1st.queryAll();
    }

    @Override
    public User findUserById(User idUserBean) {
        return myDao1st.findUserById(idUserBean);
    }

    @Override
    public int updateUser(User idUserBean) {
        return myDao1st.updateById(idUserBean);
    }
}
