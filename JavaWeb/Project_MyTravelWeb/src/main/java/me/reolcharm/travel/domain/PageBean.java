/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-14 20:32
 * @Description:
 **/
package me.reolcharm.travel.domain;

import java.util.List;

/**
 * @Param:
 * @Return:
 * @Author: Reolcharm
 * @Date: 2018/10/14-20:35
 * @Description: 待封装的 PageBean
 */
public class PageBean<T> {
    private Integer currentPage;
    private Integer pageSize;
    private Integer totalPage;
    private Integer totalSize;
    /**
     * @Param:
     * @Return:
     * @Author: Reolcharm
     * @Date: 2018/10/14-20:59
     * @Description: 每页显示的数据集合
     */
    private List<T> pageList;

    public PageBean() {
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }

    public Integer getTotalSize() {
        return totalSize;
    }

    public void setTotalSize(Integer totalSize) {
        this.totalSize = totalSize;
    }

    public List<T> getPageList() {
        return pageList;
    }

    public void setPageList(List<T> pageList) {
        this.pageList = pageList;
    }
}
