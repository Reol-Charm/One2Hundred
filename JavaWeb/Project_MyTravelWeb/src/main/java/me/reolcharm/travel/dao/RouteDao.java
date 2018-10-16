/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-14 20:37
 * @Description:
 **/
package me.reolcharm.travel.dao;

import me.reolcharm.travel.domain.PageBean;
import me.reolcharm.travel.domain.Route;

import java.util.List;

public interface RouteDao {

    /**
     * @param cid
     * @param currentPage
     * @param pageSize
     * @param rname
     * @return List<Route>
     */
    List<Route> findPerPageData(int cid, int currentPage, int pageSize, String rname);

    /**
     * @param cid
     * @param rname
     * @return
     */
    int findTotalSize(int cid, String rname);
}
