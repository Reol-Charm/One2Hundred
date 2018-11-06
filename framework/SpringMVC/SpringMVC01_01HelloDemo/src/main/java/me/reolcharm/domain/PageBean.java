/**
 * @Project: SpringMVC01_01HelloDemo
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-01 21:14
 * @Description:
 **/
package me.reolcharm.domain;

import java.io.Serializable;
import java.util.List;

public class PageBean implements Serializable {
    private Integer totalCount;
    private Integer totalPage;
//    private List<Router> routers;

    @Override
    public String toString() {
        return "PageBean{" +
                "totalCount=" + totalCount +
                ", totalPage=" + totalPage +
               /* ", routers=" + routers +*/
                '}';
    }

    public Integer getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }

    public Integer getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }
//
//    public List<Router> getRouters() {
//        return routers;
//    }
//
//    public void setRouters(List<Router> routers) {
//        this.routers = routers;
//    }
}
