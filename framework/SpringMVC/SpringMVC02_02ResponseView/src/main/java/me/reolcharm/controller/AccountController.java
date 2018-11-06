/**
 * @Project: SpringMVC02_02ResponseView
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-02 20:03
 * @Description:
 **/
package me.reolcharm.controller;

import me.reolcharm.domain.Account;
import me.reolcharm.domain.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("account")
public class AccountController {
    @RequestMapping("/login")
    public String login01(Account account) {
        System.out.println("login...");
        System.out.println("account = " + account);
//        System.out.println("password = " + password);
        System.out.println("-------------");
//       /WEB-INF/success.jsp
//        return "success";
//        return "forward:/WEB-INF/success.jsp";
        return "redirect:Redirect";
//        return "redirect:/Redirect.jsp";

    }

    @RequestMapping("/login02")
    public void login02(String username, Account account, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("login02...");
        System.out.println("username = " + username);
        System.out.println("account = " + account);
        System.out.println("-------------");
        try {
//            request.getRequestDispatcher("/WEB-INF/success.jsp").forward(request,response);
//             /mvc02/account/Redirect.jsp
            System.out.println("request.getContextPath() = " + request.getContextPath());
            response.sendRedirect(request.getContextPath() + "/Redirect.jsp");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/login03")
    public ModelAndView login03(Model model, Account account) {
        System.out.println("login03...");
//        model = {account=Account{username='Mikky', password='123', user=null, pageBeans=null, pageBeanMap=null},
//                  org.springframework.validation.BindingResult.account=org.springframework.validation.BeanPropertyBindingResult: 0 errors}
        System.out.println("model = " + model);
        System.out.println("account = " + account);
        System.out.println("-------------");
        /*模拟向 dao 查询账户信息，进行登陆*/
        ModelAndView mv = new ModelAndView();
        Account account1 = new Account();
        account1.setUsername("mmm");
        account1.setPassword("090090");
        /*向 session 域中存值*/
        mv.addObject("accountAfterSearch", account1);
        /*转发页面*/
        mv.setViewName("success");
        return mv;
    }

    @RequestMapping("/login04")
    public @ResponseBody User login04(@RequestBody User user) {
        System.out.println("login...");
        System.out.println("user = " + user);
        System.out.println("-------------");
        user.setUname("helloJSON!");
        /*尝试，直接不返回 ModelAndView，能不能跳转成功*/
        /*ModelAndView mv = new ModelAndView();
        mv.setViewName("success");*/
        return user;
    }






}
