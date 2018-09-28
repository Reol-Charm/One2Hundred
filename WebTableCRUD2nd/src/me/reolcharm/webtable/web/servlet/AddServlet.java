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
 * @CreatedTime: 2018-09-25 20:37
 * @Description: 增加联系人的功能.
 **/
@WebServlet(name = "AddServlet", value = "/addServlet")
public class AddServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 思路: 数据提交上来后, 提交到当前 servlet 中, 获取到数据后, 封装成 User 对象,
        调用 service 层, service 层中调用 dao 层方法, 向数据库添加一条数据.
        [扩展] service 层中进行数据校验*/
        request.setCharacterEncoding("utf-8");

        /* 1. 获取填写的数据 */
        Map<String, String[]> parameterMap = request.getParameterMap();
        /* 1.2 创建 bean 对象, 并封装 */
        User userBean = new User();
        try {
            BeanUtils.populate(userBean, parameterMap);
        } catch (IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }

        /* 2. 调用 service 层, todo(校验)插入一条数据*/
        MyService1stImpl service2nd = new MyService1stImpl();
        int add = service2nd.add(userBean);

        /* 3. 判断转发 与 重定向*/
        if (add != -1) {
            /* 添加成功, 转发到遍历所有用户的 listServlet中, 在 listServlet 中再转发到展示的 list.jsp*/
            request.getRequestDispatcher("/listServlet").forward(request, response);
        } else {
            /* 添加失败, 提示用户错误信息, 转发到 修改页面*/
            request.getSession().setAttribute("msg_add_error", "请检查您填写的信息~");
            request.getRequestDispatcher("/add.jsp").forward(request, response);
        }


    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}