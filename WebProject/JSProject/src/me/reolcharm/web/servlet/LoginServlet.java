package me.reolcharm.web.servlet;

import me.reolcharm.dao.UserDao;
import me.reolcharm.domain.UserBean;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * @Project: WebProject
 * @Author: Reolcharm
 * @CreatedTime: 2018-09-21 14:26
 * @Description: ${description}
 **/
@WebServlet(name = "LoginServlet", value = "/loginServlet")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 需求一:
         * 1. 动态显示登陆成功后的名字*/
        /* 需求二:
            验证码登录
         *  1. 在线生成验证码, 点击刷新, 验证码校验*/
        /* 需求三.
            上次登录时间显示
         * 1. 访问一个Servlet，如果是第一次访问，则提示：您好，欢迎您首次访问。
         * 2. 如果不是第一次访问，则提示：欢迎回来，您上次访问时间为:显示时间字符串*/
        /* 需求四:
        *  登陆成功页面新增 文件下载链接
        *  1. 页面显示超链接
	       2. 点击超链接后弹出下载提示框
           3. 完成图片文件下载 */

        /* 1. 设置请求编码 */
        request.setCharacterEncoding("utf-8");
        HttpSession session = request.getSession();

        /* 2.一 查询数据 */
        String loginusername = request.getParameter("u_username");
        String loginpassword = request.getParameter("u_password");
        /* 2.二 验证校验*/
        String loginVerifyCode = request.getParameter("verifyCode");

        /* 3.二 从 session 获取生成的验证码字符串 */
        String ses_verifyCode = (String) session.getAttribute("ses_verifyCode");
        /* 7.二 移除获得的 验证码字符串, */
        session.removeAttribute("ses_verifyCode");
        /* 8.二 移除之前的错误信息 */
        session.removeAttribute("u_msg");
        session.removeAttribute("v_msg");

        /* 4.二. 登录验证码和实际验证码一致则进入用户名和密码判断, 非空判断! */
        if (ses_verifyCode != null && ses_verifyCode.equalsIgnoreCase(loginVerifyCode)) {
            /* 3.一 调用 dao 层中的 login() 方法*/
            UserDao userDao = new UserDao();
            UserBean loginUser = userDao.login(loginusername, loginpassword);
            if (loginUser != null) {

                /* 4.一 把查到的 user 对象保存到 session 域对象中 */
                session.setAttribute("loginUser", loginUser);
                /* 5.一 实现页面跳转, 重定向到新的 */

                response.sendRedirect(request.getContextPath() + "/successServlet");
            } else {
                /* 6.二 转发到登录页面 */
                /* 方便向隐藏域展示文字 */
                session.setAttribute("u_msg", "用户名或者密码错误!");
                request.getRequestDispatcher(/* todo Wrong!!request.getContextPath() + */"/Login.jsp").forward(request, response);
            }

            /* 5.二 否则, 提示用户验证码不正确 */
        } else {
            /* 转发到登录页面*/
            session.setAttribute("v_msg", "验证码错误!");
            request.getRequestDispatcher("/Login.jsp").forward(request, response);
        }


    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}