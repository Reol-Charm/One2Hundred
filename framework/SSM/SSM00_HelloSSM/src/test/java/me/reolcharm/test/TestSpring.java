package me.reolcharm.test;

import me.reolcharm.service.impl.AccountServiceImpl;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestSpring {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        AccountServiceImpl accountService = (AccountServiceImpl) context.getBean("accountService");
        accountService.findAll();
    }
}