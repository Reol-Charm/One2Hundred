/**
 * @Project: WebTableCRUD2nd
 * @Author: Reolcharm
 * @CreatedTime: 2018-09-22 21:27
 * @Description: implement of MyDao1st
 **/
package me.reolcharm.webtable.dao.impl;

import me.reolcharm.webtable.dao.MyDao1st;
import me.reolcharm.webtable.domain.User;
import me.reolcharm.webtable.utils.MyJdbcUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class MyDao1stImpl implements MyDao1st {
    private JdbcTemplate jdbct = new JdbcTemplate(MyJdbcUtils.getDs());
    private User userAfterOperate;

    /* 传入封装了登录信息的 User 对象, */
    @Override
    public User searchUser(User loginUser) {
        String sql = "select * from userinfo where userName=? and u_password=?";
//[注意点 2]    Incorrect result size: expected 1, actual 0, 对这段代码进行 try - catch , 返回 userAfterOperate = null,
//      方便拿着这个空值进行页面跳转回 login.jsp 的后续操作.

        try {
            userAfterOperate = jdbct.queryForObject(sql, new BeanPropertyRowMapper<User>(User.class),
                    loginUser.getUserName(), loginUser.getU_password());
        } catch (DataAccessException e) {
            return null;
        }
        return userAfterOperate;
    }

    /**
     * @Param: [userBean]
     * @return: boolean
     * @Author: ReolCharm
     * @Date: 2018/9/25
     * @Description: 增加一条数据
     */
    @Override
    public int add(User userBean) {
        String sql = "insert into userinfo (userName,gender,age,address,qq,email) values (?,?,?,?,?,?)";
// Wrong!        userAfterOperate = jdbct.queryForObject(sql, userBean.getClass(),
        return jdbct.update(sql,
                userBean.getUserName(), userBean.getGender(), userBean.getAge(),
                userBean.getAddress(), userBean.getQq(), userBean.getEmail());
    }

    @Override
    public List<User> queryAll() {
        String sql = "select * from userinfo";
        try {
//[注意点 3]   此处应该返回一个 list 集合,
            List<User> userList = jdbct.query(sql, new BeanPropertyRowMapper<User>(User.class));
            return userList;
        } catch (DataAccessException e) {
            return null;
        }
    }

    @Override
    public User findUserById(User idUserBean) {
        String sql = "select * from userinfo where id=?";
        /* 调用 jdbcTemplate 对象查询*/
        try {
            User userAfterFindById = jdbct.queryForObject(sql, new BeanPropertyRowMapper<User>(User.class),
                    idUserBean.getUid());
            return userAfterFindById;
        } catch (DataAccessException e) {
            return null;
        }
    }
}
