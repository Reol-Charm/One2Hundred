package me.reolcharm.webtable.web.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter(filterName = "LoginFilter", urlPatterns = "/LoginFilter", dispatcherTypes = DispatcherType.REQUEST)
public class LoginFilter implements Filter {
    //    todo 1. xml的配置, 需要熟悉一下    2.怎么就起作用了??urlPatterns
    @Override
    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest) req;
        String uri = request.getRequestURI();

        /* 1. 判断用户是想访问哪? */
        if (uri.contains("/login") || uri.contains("/css/") || uri.contains("/js") || uri.contains("/verifyCode")) {

            chain.doFilter(req, resp);
        } else {
            /* 2. 判断是否登陆过 */
            if (request.getSession().getAttribute("userAfterSearch") != null) {

                chain.doFilter(req, resp);
            } else {
                request.getSession().setAttribute("msg_error", "您尚未登录, 请先登录好伐?");
                request.getRequestDispatcher("/login.jsp").forward(request, resp);
            }
        }
    }

    @Override
    public void init(FilterConfig config) throws ServletException {

    }

}
