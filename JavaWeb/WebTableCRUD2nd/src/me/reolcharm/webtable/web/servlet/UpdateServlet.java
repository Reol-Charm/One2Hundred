package me.reolcharm.webtable.web.servlet;

import me.reolcharm.webtable.domain.User;
import me.reolcharm.webtable.service.impl.MyService1stImpl;
import org.apache.commons.beanutils.BeanUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;

/**
 * @Project: WebTableCRUD2nd
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-05 16:31
 * @Description: 向数据库基于 传回的 uid 修改数据
 **/
@WebServlet(name = "UpdateServlet", urlPatterns = "/updateServlet")
public class UpdateServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 获取 uid */
        Map<String, String[]> parameterMap = request.getParameterMap();
        User user = new User();

        try {
            /* 封装 uid 到 User */
            BeanUtils.populate(user,parameterMap);

        } catch (IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }

        /* 传递， 查询 */
        MyService1stImpl ser = new MyService1stImpl();
        ser.findUserById()

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
