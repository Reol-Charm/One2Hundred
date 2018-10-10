/**
 * @Project: WebProject
 * @Author: Reolcharm
 * @CreatedTime: 2018-09-21 15:07
 * @Description: Utils 4 Jdbc
 **/
package me.reolcharm.redisexercise.util;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class MyJdbcUtils {
    private static DataSource ds;

    static {
        Properties pro = new Properties();
        InputStream resourceAsStream = MyJdbcUtils.class.getClassLoader().getResourceAsStream("druid.properties");
        try {
            pro.load(resourceAsStream);
            /* Druid 数据连接工厂, 创建连接池*/
            ds = DruidDataSourceFactory.createDataSource(pro);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * @Param: []
     * @return: java.sql.Connection
     * @Author: ReolCharm
     * @Date: 2018/9/21
     * @Description: 从连接池获取连接对象
     */
    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }

    public static DataSource getDs() {
        return ds;
    }

    public static void close(ResultSet rs, Statement stmt, Connection con) {
       /* try {
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            stmt.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }*/
        //如果不为空，关闭结果集对象
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        //置空，便于垃圾回收机制回收
        rs = null;
        //如果不为空，关闭执行对象
        if (stmt != null) {
            try {
                stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        //置空，便于垃圾回收机制回收
        stmt = null;
        //如果不为空，关闭数据库连接对象
        if (con != null) {
            try {
                con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        //置空，便于垃圾回收机制回收
        con = null;
    }

    public static void close(Statement stmt, Connection con) {
        close(null, stmt, con);
    }
}