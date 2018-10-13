package me.reolcharm.travel.web.servlet;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-12 18:13
 * @Description: 继承 HttpServlet service方法中调用 页面请求的方法[分发]
 **/
public class BaseServlet extends HttpServlet {
    @Override
    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 获取方法名称的
         * 方式1：截取请求路径，其中严格的请求路径*/
        String requestURI = request.getRequestURI();

//        requestURI = /HeimaTravelWeb/user/register
        System.out.println("requestURI = " + requestURI);
        /*必须有 +1 的操作， 否则 methodName 包含“/” 符号*/
        int split = requestURI.lastIndexOf("/") + 1;
        String methodName = requestURI.substring(split);

        /* 方式二： 根据隐藏表单域 获取请求方法名称 */
        String methodName02 = request.getParameter("action");

        /*利用反射调用方法*/
        try {
            Method method = this.getClass().getMethod(methodName, HttpServletRequest.class, HttpServletResponse.class);
            /*嗲 ♂ 用方法*/
            method.invoke(this, request, response);

        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }

    }

    /**
     * @Param: [obj, response]
     * @Return: void
     * @Author: Reolcharm
     * @Date: 2018/10/12-19:55
     * @Description: 抽取 Jesion 方法
     */
    public void writer(Object obj, HttpServletResponse response) {

        /* json 向页面传递数据 */
        ObjectMapper mapper = new ObjectMapper();
        response.setContentType("application/json;charset=utf-8");
        try {
            mapper.writeValue(response.getOutputStream(), obj);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * @Param: [obj, response]
     * @Return: java.lang.String
     * @Author: Reolcharm
     * @Date: 2018/10/12-19:55
     * @Description:
     */
    public String writerAsString(Object obj, HttpServletResponse response) throws JsonProcessingException {
        ObjectMapper om = new ObjectMapper();
        response.setContentType("application/json;charset=utf-8");
        return om.writeValueAsString(obj);
    }

}
