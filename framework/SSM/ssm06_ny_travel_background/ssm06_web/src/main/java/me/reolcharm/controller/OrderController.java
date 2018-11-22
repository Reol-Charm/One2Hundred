/**
 * @Project: ssm06_ny_travel_background
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-13 18:39
 * @Description:
 **/
package me.reolcharm.controller;

import com.github.pagehelper.PageHelper;
import me.reolcharm.domain.Orders;
import me.reolcharm.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    /**
     * 查询所有订单功能
     */
    @RequestMapping("/findAll.do")
    public ModelAndView findAll() {
        ModelAndView mv = new ModelAndView();
        /*使用静态方法对下一个查询进行分页展示*/
        PageHelper.startPage(1, 5);
        List<Orders> all = orderService.findAll();
        mv.addObject("ordersList", all);
        mv.setViewName("orders-list");
        return mv;
    }

    /*@RequestMapping("/save.do")
    public String save(Orders orders) {
        orderService.save(orders);
        return "forward:findAll.do";
    }*/

    /**
     * 订单详情功能
     */
    @RequestMapping("/findById")
    public ModelAndView findById() {
        ModelAndView mv = new ModelAndView();
        List<Orders> all = orderService.findAll();
        mv.addObject("orders", all);
        mv.setViewName("orders-list");
        return mv;
    }

}
