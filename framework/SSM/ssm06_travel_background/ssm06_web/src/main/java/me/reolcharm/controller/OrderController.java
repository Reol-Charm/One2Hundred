/**
 * @Project: ssm06_ny_travel_background
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-13 18:39
 * @Description:
 **/
package me.reolcharm.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import me.reolcharm.domain.Orders;
import me.reolcharm.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    /**
     * 查询所有订单功能 -- 带有分页功能.
     * 获取分页参数,
     */
    @RequestMapping("/findAll.do")
    public ModelAndView findAll(@RequestParam(name = "page", defaultValue = "1", required = true) Integer page,
                                @RequestParam(name = "size", defaultValue = "5", required = true) Integer size) {
        ModelAndView mv = new ModelAndView();
        List<Orders> all = orderService.findAll(page, size);
        //        封装查询到的到 pageBean 中
        PageInfo<Orders> pageInfo = new PageInfo<>(all);
        mv.addObject("ordersList", pageInfo);
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
    @RequestMapping("/findById.do")
    public ModelAndView findById(@RequestParam(name = "orderId", required = true) String orderId) {
        ModelAndView mv = new ModelAndView();
        Orders anOrder = orderService.findById(orderId);
        mv.addObject("orders", anOrder);
        mv.setViewName("orders-show");
        return mv;
    }

}
