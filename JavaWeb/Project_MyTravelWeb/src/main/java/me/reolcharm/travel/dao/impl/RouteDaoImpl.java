/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-14 20:37
 * @Description:
 **/
package me.reolcharm.travel.dao.impl;

import me.reolcharm.travel.dao.RouteDao;
import me.reolcharm.travel.domain.Route;
import me.reolcharm.travel.util.JdbcUtils;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;

public class RouteDaoImpl implements RouteDao {
    private JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());

    /**
     * @Param: [cid, startIndex, pageSize, rname]
     * @Return: java.util.List<me.reolcharm.travel.domain.Route>
     * @Author: Reolcharm
     * @Date: 2018/10/16-16:00
     * @Description: 因为用户可以从主页开始搜索, 所以, 前三个参数可能都不知道, 所以需要动态的拼装 sql .
     */
    @Override
    public List<Route> findPerPageData(int cid, int startIndex, int pageSize, String rname) {
        /*定义 sql 模板*/
        String sql = "select * from tab_route where 1 = 1 ";

        /*定义 StringBuilder 容器*/
        StringBuilder sb = new StringBuilder(sql);
        /*定义 条件集合 泛型的妙用*/
        List condition = new ArrayList<>();

        /*判断各个条件是否有值*/
        if (cid != 0) {
            sb.append(" and cid = ?");
            condition.add(cid);
        }
        /*有 rname 条件时: */
        if (rname != null && rname.length() > 0) {
            sb.append(" and rname like ?");
            condition.add("%" + rname + "%");
        }
        sb.append(" limit ?,? ");
        condition.add(startIndex);
        condition.add(pageSize);
        /*动态拼接 sql 语句, 返回的值也是动态的.*/
        sql = sb.toString();
        return template.query(sql,
                new BeanPropertyRowMapper<Route>(Route.class), condition.toArray());
    }
    /*-------------------注意点--------------------*/
    /* 1. sql 拼接的两个技巧
     *       - sql 语句容器
     *       - 条件存储容器
     *
     *  2. sql.toString() 转为 String 类型
     *
     *  3. conditionArrayList.toArray() 转为 object 的可变参数.
     *       - sartorial*/


    /**
     * @Param: [cid]
     * @Return: int
     * @Author: Reolcharm
     * @Date: 2018/10/14-23:50
     * @Description: 查询某分类下数据总数.
     */
    @Override
    public int findTotalSize(int cid, String rname) {
        /*通用模板, 动态形成结果cid=? and rname like ?*/
        String sql = "select count(*) from tab_route where 1 = 1 ";
        /*容器*/
        StringBuilder sb = new StringBuilder(sql);
        List cond = new ArrayList();

        /*条件判断, 动态生成 sql 语句*/
        if (cid != 0) {
            sb.append(" and cid = ?");
            cond.add(cid);
        }
        if (rname != null && rname.length() > 0) {
            sb.append(" and rname like ?");
            cond.add("%" + rname + "%");
        }
        /*[B]*/
        sql = sb.toString();
        /*模糊查询, 拼接字符串*/
        return template.queryForObject(sql, Integer.class, cond.toArray());
    }
}
