package cn.itcast.examproject.web.servlet;

import cn.itcast.examproject.domain.Customer;
import cn.itcast.examproject.service.impl.ServiceImpl;
import org.apache.commons.beanutils.BeanUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

@WebServlet("/saveServlet")
public class SaveServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        /* 向数据库中插入数据*/
        /*封装提交的数据*/
        Customer submitCustomer = new Customer();
        Map<String, String[]> map = request.getParameterMap();
        try {
            BeanUtils.populate(submitCustomer, map);
        } catch (IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }

        ServiceImpl service = new ServiceImpl();
        /* 插入数据*/
        int saveFlag = service.add(submitCustomer);
        if (saveFlag == -1) {
        /* 保存失败,跳转到 msg.jsp*/
            request.getSession().setAttribute("msg_error", "保存失败!");
            request.getRequestDispatcher("/msg.jsp").forward(request, response);
        } else {
            /*保存数据成功, 保存到域对象*/
            request.getSession().setAttribute("submitCustomer", submitCustomer);
            /*转发到msg.jsp*/
            request.getRequestDispatcher("/msg.jsp").forward(request,response);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
