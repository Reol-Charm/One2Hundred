/**
 * @Project: SpringMVC02_02ResponseView
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-02 20:03
 * @Description:
 **/
package me.reolcharm.controller;

import me.reolcharm.domain.Items;
import me.reolcharm.service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/items")
public class ItemsController {
    @Autowired
    private ItemsService itemsService;

    /**
     * 查询某个
     */
    @RequestMapping("findById")
    public ModelAndView findById(ModelAndView modelAndView) {
        Items byId = itemsService.findById(1);
        modelAndView.addObject("item", byId);
        modelAndView.setViewName("itemDetail");
        return modelAndView;
    }
}
