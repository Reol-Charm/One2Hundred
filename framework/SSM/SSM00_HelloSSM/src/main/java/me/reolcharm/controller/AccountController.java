/**
 * @Project: SpringMVC02_02ResponseView
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-02 20:03
 * @Description:
 **/
package me.reolcharm.controller;

import me.reolcharm.domain.Account;
import me.reolcharm.service.AccountService;
import me.reolcharm.service.impl.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    /**
     * 用户登录
     */
    @RequestMapping("login.do")
    public String login(Account account, Model model) {
        model.addAttribute("account", account);
        System.out.println("account = " + account);
        accountService.findAll();
        accountService.save(account);

        return "successLogin";
    }

}
