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
     * @return List<Route>
     */
    List<Route> findPerPageData(int cid, int currentPage, int pageSize);

    /**
     * @param cid
     * @return
     */
    int findTotalSize(int cid);
}
