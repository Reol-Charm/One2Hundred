/**
 * @Project: SSM00_HelloSSM
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-04 20:06
 * @Description:
 **/
package me.reolcharm.service;

import me.reolcharm.domain.Account;

import java.util.List;

public interface AccountService {
    List<Account> findAll();

    boolean save(Account account);
}
