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
 * @CreatedTime: 2018-09-21 16:38
 * @Description: ${description}
 **/
@WebServlet(name = "SuccessServlet", value = "/successServlet")
public class SuccessServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 成功登陆, 跳转到新的 jsp 页面*/
        /*request.setCharacterEncoding("utf-8");
        response.getWriter().print("Hellooo~ 4 First Connecting~~!!");*/
        response.sendRedirect(request.getContextPath() + "/successLogin.jsp");

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}