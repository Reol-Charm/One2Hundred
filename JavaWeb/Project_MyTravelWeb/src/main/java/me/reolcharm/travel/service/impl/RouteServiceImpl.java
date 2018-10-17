/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-14 20:31
 * @Description:
 **/
package me.reolcharm.travel.service.impl;

import me.reolcharm.travel.dao.RouteDao;
import me.reolcharm.travel.dao.impl.RouteDaoImpl;
import me.reolcharm.travel.domain.PageBean;
import me.reolcharm.travel.domain.Route;
import me.reolcharm.travel.domain.RouteImg;
import me.reolcharm.travel.service.RouteService;

import java.util.List;

public class RouteServiceImpl implements RouteService {
    private RouteDao dao = new RouteDaoImpl();

    /**
     * @param cid
     * @param currentPage
     * @param pageSize
     * @param rname
     * @return PageBean<Route>
     */
    @Override
    public PageBean<Route> getPageBean(int cid, int currentPage, int pageSize, String rname) {
        PageBean pb = new PageBean();
        /*封装 pageBean */
        /*查询该分类下总数据数*/
        int totalSize = dao.findTotalSize(cid, rname);
        pb.setTotalSize(totalSize);
        pb.setCurrentPage(currentPage);
        /*每页显示条数*/
        pb.setPageSize(pageSize);

        /*总页数 = 总页码 / 每页显示条数*/
        /*除得尽就取值, 不然 + 1 [向上取整~]*/
        Integer totalPage = totalSize % pageSize == 0 ? (totalSize / pageSize) : ((totalSize / pageSize) + 1);
        pb.setTotalPage(totalPage);
        /*[B] 查询该分类下 分页区间内 的数据*/
        /*
        1. 语法：limit 开始的索引,每页查询的条数;
		2. 公式：开始的索引 = （当前的页码 - 1） * 每页显示的条数*/
        int startIndex = (currentPage - 1) * pageSize;
        List<Route> routeList = dao.findPerPageData(cid, startIndex, pageSize, rname);
        pb.setPageList(routeList);

        return pb;
    }

    @Override
    public Route getRouteBean(int rid) {

        Route route = dao.getRouteInfo(rid);
        /*获取图片集合*/
        List<RouteImg> imgList = dao.getImgList(rid);
        /*添加图片集合到 routeBean */
        route.setRouteImgList(imgList);

        return route;
    }
}
