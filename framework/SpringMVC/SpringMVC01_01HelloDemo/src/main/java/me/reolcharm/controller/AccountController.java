/**
 * @Project: SpringMVC01_01HelloDemo
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-01 19:45
 * @Description:
 **/
package me.reolcharm.domain.me.reolcharm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 声明
 */
@Controller
/*类上: 一级目录*/
@RequestMapping("/account")
public class AccountController {
    /**
     * 映射请求路径和 AccountController 类中方法
     * <p>
     * 方法上: 二级目录
     */
    @RequestMapping(path = "/login", params = {"username", "password"}, method = {RequestMethod.GET, RequestMethod.POST}/*headers = {"JSESSIONID"}*/)
    public String login(String username, String password) {
        System.out.println("login...");
        System.out.println("username = " + username);
        System.out.println("password = " + password);
        System.out.println("-------------");

        return "success";
    }
}
