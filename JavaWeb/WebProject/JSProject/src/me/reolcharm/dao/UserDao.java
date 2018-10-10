/**
 * @Project: WebProject
 * @Author: Reolcharm
 * @CreatedTime: 2018-09-21 15:02
 * @Description: Dao 2 User
 **/
package me.reolcharm.dao;

import me.reolcharm.domain.UserBean;
import me.reolcharm.web.utils.MyJdbcUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class UserDao {
    public UserBean login(String loginusername, String loginpassword) {
        /* 获取 执行对象 */
        JdbcTemplate jdt = new JdbcTemplate(MyJdbcUtils.getDs());

        /*执行查询*/
        try {
            UserBean query4User = jdt.queryForObject("select * from webdb where u_username=? and u_password=?",
                    new BeanPropertyRowMapper<UserBean>(UserBean.class),
                    loginusername, loginpassword);
            return query4User;
            /* 自动生成的 try..catch, 捕捉返回来的数据库消息*/
            /* 并 **实现**返回 null 的功能. */
        } catch (DataAccessException e) {
            e.printStackTrace();
            return null;
        }
    }
}
