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
 * @CreatedTime: 2018-09-22 19:13
 * @Description: 完整的页面登录代码.
 **/
@WebServlet(name = "LoginServlet", value = "/loginServlet")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 从前端页面获取数据, 防止传过来的是乱码*/
        request.setCharacterEncoding("utf-8");

        /* 1. 获取到登录信息 */
        String verifycode = request.getParameter("verifycode");
        /* 1.2 获取系统生成的验证码字符串*/
        String checkcode_server = (String) request.getSession().getAttribute("CHECKCODE_SERVER");
        request.getSession().removeAttribute("CHECKCODE_SERVER");

        /* 2. 验证码验证 */
//[注意点1 ]     后退后, 再重新输入之前的验证码, 报空指针异常
//              if (verifycode == null || !checkcode_server.equalsIgnoreCase(verifycode))
        if (verifycode == null || !verifycode.equalsIgnoreCase(checkcode_server)) {
            /* 2.1 存储验证码错误信息,并转发到login.jsp */
            request.getSession().setAttribute("msg_error", "验证码错误!");
            request.getRequestDispatcher("/login.jsp").forward(request, response);
            /* 2.2 验证码验证都不过, 直接结束判断. */
            return;
        }

        /* 3. 验证码验证通过, 进入信息验证, 成功则封装数据, 失败则 存储验证码错误信息,并转发到login.jsp (同验证码错误) */
        /* 3.1 创建 User 类: javaBean 容器*/
        User user = new User();
        /* 3.2 获取所有的 参数信息, 进行封装. */
        Map<String, String[]> parameterMap = request.getParameterMap();
        /* 3.4 调用 Beanutils 工具类封装数据*/
        try {
            /* 查api 知道了其调用方法! */
            BeanUtils.populate(user, parameterMap);
        } catch (IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }


        /* 4. 调用 service 层方法, 获取到登录信息 */
        MyService1stImpl myService1st = new MyService1stImpl();
        User userAfterSearch = myService1st.searchUser(user);

        /*5. 对 userAfterSearch 进行判断是否为空, 为空, 说明没有该账户秘码*/
        if (userAfterSearch == null) {
            /* 5.1 存储验证码错误信息,并转发到login.jsp, 在 login.jsp 上显示错误信息. */
            request.getSession().setAttribute("msg_error", "用户名或者密码错误!");
            request.getRequestDispatcher("/login.jsp").forward(request, response);
        } else {
            /* 5.2 登陆成功! 转发到 listServlet 获取所有人员信息; 重定向必须加项目工程名! */
            request.getSession().setAttribute("userAfterSearch", userAfterSearch);
            request.getRequestDispatcher("/listServlet").forward(request, response);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}