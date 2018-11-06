/**
 * @Project: SSM00_HelloSSM
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-04 20:06
 * @Description:
 **/
package me.reolcharm.mapper.impl;

import me.reolcharm.domain.Account;
import me.reolcharm.mapper.AccountMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("accountService")
public class AccountMapperImpl implements AccountMapper {
    @Override
    public List<Account> findAll() {
        System.out.println("findAll....");
        return null;
    }

    @Override
    public boolean save(Account account) {
        System.out.println("Save: " + "true");
        return false;
    }
}
