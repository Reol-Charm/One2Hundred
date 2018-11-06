/**
 * @Project: SSM00_HelloSSM
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-04 20:06
 * @Description:
 **/
package me.reolcharm.mapper;

import me.reolcharm.domain.Account;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface AccountMapper {

    List<Account> findAll();

    boolean save(Account account);
}
