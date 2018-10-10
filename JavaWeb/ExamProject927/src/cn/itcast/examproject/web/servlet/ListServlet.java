package cn.itcast.examproject.web.servlet;

import cn.itcast.examproject.domain.Customer;
import cn.itcast.examproject.service.impl.ServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/listServlet")
public class ListServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*跳转到该 servlet 来展示数据库信息*/
        ServiceImpl service = new ServiceImpl();
        List<Customer> customers = service.list();

        if (customers != null) {
            request.getSession().setAttribute("customers", customers);
            request.getRequestDispatcher("/customer_list.jsp").forward(request, response);
        }

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
