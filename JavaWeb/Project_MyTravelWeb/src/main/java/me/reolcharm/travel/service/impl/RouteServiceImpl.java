/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-14 20:31
 * @Description:
 **/
package me.reolcharm.travel.service.impl;

import me.reolcharm.travel.dao.RouteDao;
import me.reolcharm.travel.dao.UserDao;
import me.reolcharm.travel.dao.impl.RouteDaoImpl;
import me.reolcharm.travel.dao.impl.UserDaoImpl;
import me.reolcharm.travel.domain.PageBean;
import me.reolcharm.travel.domain.Route;
import me.reolcharm.travel.service.RouteService;

import java.util.List;

public class RouteServiceImpl implements RouteService {
    private RouteDao dao = new RouteDaoImpl();

    @Override
    public PageBean<Route> getPageBean(int cid, int currentPage) {
        PageBean pb = new PageBean();
        /*每页显示条数*/
        int pageSize = 5;
        /*查询该分类下总数据数*/
        int totalSize = dao.findTotalSize(cid);
        List<Route> pageBeanList = dao.findPerPageData(cid, currentPage, pageSize);

        pb.setCurrentPage(currentPage);
    }
}
