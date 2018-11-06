package me.reolcharm.dao.impl;

import me.reolcharm.dao.IAccountDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

/**
 * 账户的持久层实现类
 */
@Repository /*自动注入, 默认是 accountDaoImpl, 所以在 serviceimpl 层中, 可以指向过来*/
public class AccountDaoImpl implements IAccountDao {

    @Override
    public void saveAccount() {
        System.out.println("保存了账户");
    }

    @PreDestroy
    public void after() {
        System.out.println("@PreDestroy In AccountDaoImpl");
    }
}
