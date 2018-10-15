package me.reolcharm.travel.web.servlet;

import me.reolcharm.travel.domain.PageBean;
import me.reolcharm.travel.domain.Route;
import me.reolcharm.travel.service.RouteService;
import me.reolcharm.travel.service.impl.RouteServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-12 18:20
 * @Description: 点击分类进入该分类下线路展示 route_list页面
 **/
public class RouteServlet extends BaseServlet {
    public void getPageRouteInfo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*获取 cid , currentPage*/
        String cidStr = request.getParameter("cid");
        String currentPageStr = request.getParameter("currentPage");
        String pageSizeStr = request.getParameter("pageSize");
        /*处理参数/*格式转换*/

        /*非空判断:不为空, 并且长度大于0; 该提前想到的.*/
        int cid = 0;
        if (cidStr != null && cidStr.length() > 0) {
            cid = Integer.parseInt(cidStr);
        }


        /*页面传递 null 过来.*/
        int currentPage = 1;
        currentPage = strNum2Int(currentPageStr, currentPage);
        /*设置默认值, 如果页面没有传递, 或者 <= 0, */
        if (currentPage < 0) {
            currentPage = 1;
        }

        /*!"null".equalsIgnoreCase(pageSizeStr*/
        int pageSize = 5;
        pageSize = strNum2Int(pageSizeStr, pageSize);

        /*调用 service, 进行封装等操作 */
        RouteService routeService = new RouteServiceImpl();
        PageBean<Route> pageBean = routeService.getPageBean(cid, currentPage, pageSize);

        String pagebeanJson = writerAsString(pageBean, response);
        System.out.println("pageBean_Json = " + pagebeanJson);
        response.getWriter().write(pagebeanJson);

    }

    /**
     * @param str 待转换的字符串
     * @param defaultNum pagebean 中的默认值.
     * @return 转换好的 int 值.
     */
    private int strNum2Int(String str, int defaultNum) {
        if (str != null && !"null".equalsIgnoreCase(str) && str.length() != 0) {
            return defaultNum = Integer.parseInt(str);
        } else {
            return defaultNum;
        }
    }

}

