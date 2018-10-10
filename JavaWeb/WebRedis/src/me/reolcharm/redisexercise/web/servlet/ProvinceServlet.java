package me.reolcharm.redisexercise.web.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import me.reolcharm.redisexercise.domain.Province;
import me.reolcharm.redisexercise.service.ProvinceService;
import me.reolcharm.redisexercise.service.impl.ProvinceServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @Project: WebRedis
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-08 18:28
 * @Description:
 **/
/*@WebServlet(name = "ProvinceServlet", urlPatterns = "/provinceServlet")*/
public class ProvinceServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /* 查询数据库, 找到数据库中的选项 *//*
        ProvinceService ser = new ProvinceServiceImpl();
        List<Province> provinces = ser.findAll();

        *//* 转换成 json *//*
        ObjectMapper om = new ObjectMapper();
        String provinceJson = om.writeValueAsString(provinces);

        System.out.println("provinceJson = " + provinceJson);*/

        ProvinceService ser = new ProvinceServiceImpl();
        String s = ser.jsonProvince();

        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(s);


    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
