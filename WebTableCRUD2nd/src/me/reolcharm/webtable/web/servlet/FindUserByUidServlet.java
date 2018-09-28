package me.reolcharm.webtable.web.servlet;

import me.reolcharm.webtable.domain.User;
import me.reolcharm.webtable.service.impl.MyService1stImpl;
import org.apache.commons.beanutils.BeanUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;

/**
 * @Project: WebTableCRUD2nd
 * @Author: Reolcharm
 * @CreatedTime: 2018-09-28 19:42
 * @Description: 查询 指定用户: 获取用户的 id, 传入 dao 层, 将完整的用户信息返回.
 **/
@WebServlet(name = "FindUserByUidServlet", urlPatterns = "/findUserByUidServlet")
public class FindUserByUidServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        HttpSession session = request.getSession();

        Map<String, String[]> idMap = request.getParameterMap();
        User idUserBean = new User();

        try {
            BeanUtils.populate(idUserBean, idMap);
        } catch (IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();/* 日志记录 */
        }

        MyService1stImpl service = new MyService1stImpl();
        /* 传入封装了 id 的 userBean对象, 调用查询, 返回查询到的该 User 对象*/
        User userById = service.findUserById(idUserBean);

        if (userById != null) {
            session.setAttribute("userById", userById);
            /* 查询成功后, 将 userById 带给修改页面, 实现页面回显. */
            response.sendRedirect(request.getContextPath() + "/update.jsp");
        }

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
