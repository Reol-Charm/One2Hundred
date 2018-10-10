package me.reolcharm.web.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Project: WebProject
 * @Author: Reolcharm
 * @CreatedTime: 2018-09-21 17:39 * @Description: ${description}
 **/
@WebServlet(name = "FailServlet", value = "/failServlet")
public class FailServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        request.setCharacterEncoding("utf-8");
//        response.setCharacterEncoding("utf-8");
        /* 设置编码 */
        if (request.getSession().getAttribute("loginUser") == null) {
            response.setContentType("contentType=text/html;charset=UTF-8");
            response.getWriter().print("登录失败!用户名或者秘密错误!");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}