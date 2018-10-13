/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-11 20:46
 * @Description:
 **/
package me.reolcharm.travel.dao.impl;

import me.reolcharm.travel.dao.UserDao;
import me.reolcharm.travel.domain.User;
import me.reolcharm.travel.util.JdbcUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class UserDaoImpl implements UserDao {
    private JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());

    @Override
    public User searchByUsername(String username) {
//        boolean flag = false;
        /*此处就可以不用 flag标记*/
        User userBean2;
        String sql = "select * from tab_user where username=?";
        try {
            return userBean2 = template.queryForObject(sql, new BeanPropertyRowMapper<User>(User.class), username);
        } catch (DataAccessException e) {
            return null;
        }
    }
}
