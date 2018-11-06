/**
 * @Project: SSM00_HelloSSM
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-04 20:06
 * @Description:
 **/
package me.reolcharm.service.impl;

import me.reolcharm.domain.Account;
import me.reolcharm.mapper.AccountMapper;
import me.reolcharm.mapper.impl.AccountMapperImpl;
import me.reolcharm.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("accountService")
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountMapper accountMapper;
    @Override
    public List<Account> findAll() {
        accountMapper.findAll();
        System.out.println("findAll....");
        return null;
    }

    @Override
    public boolean save(Account account) {
        System.out.println("Save: " + "true");
        accountMapper.save(account);
        return false;
    }
}
