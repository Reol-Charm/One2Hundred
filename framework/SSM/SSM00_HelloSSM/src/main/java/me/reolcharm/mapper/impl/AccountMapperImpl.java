/**
 * @Project: SSM00_HelloSSM
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-04 20:06
 * @Description:
 **/
package me.reolcharm.mapper.impl;

import me.reolcharm.domain.Account;
import me.reolcharm.mapper.AccountMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("accountMapper")
public class AccountMapperImpl implements AccountMapper {
    @Override
    public List<Account> findAll() {
        return null;
    }

    @Override
    public boolean save(Account account) {
        return false;
    }
}
