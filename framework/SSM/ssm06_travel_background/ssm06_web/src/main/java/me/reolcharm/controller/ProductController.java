/**
 * @Project: ssm06_ny_travel_background
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-13 18:39
 * @Description:
 **/
package me.reolcharm.controller;

import me.reolcharm.domain.Product;
import me.reolcharm.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @RequestMapping("/findAll.do")
    public ModelAndView findAll() {
        ModelAndView mv = new ModelAndView();
        List<Product> all = productService.findAll();
        mv.addObject("productList", all);
        mv.setViewName("product-list");
        return mv;
    }

    @RequestMapping("/save.do")
    public String save(Product product) {
        productService.save(product);
        return "forward:findAll.do";
    }

}
