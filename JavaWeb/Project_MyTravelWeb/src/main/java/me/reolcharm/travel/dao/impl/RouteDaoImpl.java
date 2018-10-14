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

    @Override
    public List<Route> findPerPageData(int cid, int currentPage, int pageSize) {
        /*当前页数 = */

        return template.query("select * from tab_route where cid = ? limit ?, ?",
                new BeanPropertyRowMapper<Route>(Route.class), cid);
    }

    @Override
    public int findTotalSize(int cid) {

        return 0;
    }
}
