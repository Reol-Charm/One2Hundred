package me.reolcharm.travel.web.servlet;

import me.reolcharm.travel.domain.PageBean;
import me.reolcharm.travel.domain.Route;
import me.reolcharm.travel.service.RouteService;
import me.reolcharm.travel.service.impl.RouteServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-12 18:20
 * @Description:
 **/
public class RouteServlet extends BaseServlet {
    public void getPageRouteInfo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*获取 cid , currentPage*/
        String cidStr = request.getParameter("cid");
        String currentePageStr = request.getParameter("currentePage");
        String pageSizeStr = request.getParameter("pageSize");
        /*处理参数/*格式转换*/

        /*非空判断:不为空, 并且长度大于0; 该提前想到的.*/
        int cid = 0;
        if (cidStr != null && cidStr.length() > 0) {
            cid = Integer.parseInt(cidStr);
        }

        int currentPage = 0;
        if (currentePageStr != null && currentePageStr.length() > 0) {
            currentPage = Integer.parseInt(currentePageStr);
            /*设置默认值, 如果页面没有传递, 或者 <= 0, */
            if (currentPage < 0) {
                currentPage = 1;
            }
        }
        if (currentePageStr == null) {
            currentPage = 1;
        }

        int pageSize = 0;
        if (pageSizeStr != null && pageSizeStr.length() > 0) {
            pageSize = Integer.parseInt(pageSizeStr);
        }
        if (pageSizeStr == null) {
            pageSize = 5;
        }
        /*调用 service, 进行封装等操作 */
        RouteService routeService = new RouteServiceImpl();
        PageBean<Route> pageBean = routeService.getPageBean(cid, currentPage, pageSize);

        String pageBean_Json = writerAsString(pageBean, response);
        System.out.println("pageBean_Json = " + pageBean_Json);
        response.getWriter().write(pageBean_Json);
    }
}

