package me.reolcharm.webtable.web.servlet;

import me.reolcharm.webtable.domain.User;
import me.reolcharm.webtable.service.MyService1st;
import me.reolcharm.webtable.service.impl.MyService1stImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

/**
 * @Project: WebTableCRUD2nd
 * @Author: Reolcharm
 * @CreatedTime: 2018-09-25 21:40
 * @Description: 中转站, 查询表中信息, 展示给 list.jsp
 **/
@WebServlet(name = "ListServlet", value = "/listServlet")
public class ListServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*查询所有 人员信息*/
        MyService1stImpl service3rd = new MyService1stImpl();
        List<User> users = service3rd.queryAll();
        /* 将查到的所有用户信息 保存到 list 集合中*/
        ArrayList<User> userList = (ArrayList<User>) service3rd.queryAll();

        try {
            request.getSession().setAttribute("userList", userList);
            /* 5.2 登陆成功! 转发到 list.jsp 展示获取到的所有人员信息; 重定向必须加项目工程名! */
            response.sendRedirect(request.getContextPath() + "/list.jsp");

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}