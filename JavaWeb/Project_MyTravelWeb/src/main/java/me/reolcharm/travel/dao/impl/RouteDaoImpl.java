/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-14 20:37
 * @Description:
 **/
package me.reolcharm.travel.dao.impl;

import me.reolcharm.travel.dao.RouteDao;
import me.reolcharm.travel.domain.PageBean;
import me.reolcharm.travel.domain.Route;
import me.reolcharm.travel.util.JdbcUtils;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class RouteDaoImpl implements RouteDao {
    private JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());

    /**
     * @param cid 分类id
     * @param startIndex 分页查询的开始索引。
     * @param pageSize
     * @return
     */
    @Override
    public List<Route> findPerPageData(int cid, int startIndex, int pageSize) {
        /*当前页数 = */
        return template.query("select * from tab_route where cid = ? limit ?, ?",
                new BeanPropertyRowMapper<Route>(Route.class), cid, startIndex, pageSize);
    }

    /**
     * @Param: [cid]
     * @Return: int
     * @Author: Reolcharm
     * @Date: 2018/10/14-23:50
     * @Description: 查询某分类下数据总数.
     */
    @Override
    public int findTotalSize(int cid) {
        String sql = "select count(*) from tab_route where cid=?";
        return template.queryForObject(sql, Integer.class, cid);
    }
}
