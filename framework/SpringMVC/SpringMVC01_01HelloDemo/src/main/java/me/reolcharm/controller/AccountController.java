/**
 * @Project: SpringMVC01_01HelloDemo
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-01 19:45
 * @Description:
 **/
package me.reolcharm.controller;

import me.reolcharm.domain.Account;
import me.reolcharm.domain.PageBean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Map;

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
    @RequestMapping(path = "/login" /*, params = {"username", "password"}*/, method = {RequestMethod.GET, RequestMethod.POST}/*headers = {"JSESSIONID"}*/)
    public String login01(String username, String password) {
        System.out.println("login...");
        System.out.println("username = " + username);
        System.out.println("password = " + password);
        System.out.println("-------------");

        return "success";
    }

    @RequestMapping(path = "/login02")
    public String login02(Account account) {
        System.out.println("login02...");
        System.out.println("account = " + account);
        System.out.println("-------------");

        return "success";
    }

    @RequestMapping("/login03")
    public String login03(Account account, List<PageBean> pageBeans/*, Map<String, PageBean> pageBeanMap*/) {
        System.out.println("login03...");
        System.out.println("pageBeans = " + pageBeans);
//        System.out.println("pageBeanMap = " + pageBeanMap);
        System.out.println("account = " + account);
        System.out.println("-------------");

        return "success";
    }
}
