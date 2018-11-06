package me.reolcharm.service.impl;

import me.reolcharm.dao.IAccountDao;
import me.reolcharm.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import java.util.*;

/**
 * 账户的业务层实现类
 */

/**
 * 1. 自定义 key
 */
@Service("accountService")
public class AccountServiceImpl implements IAccountService {
    /*
     * 降低耦合性
     */
//    @Component
//    @Autowired
//    @Resource(name = "accountDao")  Wrong!
    /**
     * 2. 内容注入
     * 没有指定的 key, 但是有系统默认生成的 Bean 对象
     */
    @Resource(name = "accountDaoImpl")
    private IAccountDao accountDao;
    @Value("Are u a Pig?")
    private String annoStr;

    private String[] myStrs;
    private List<String> myList;
    private Set<String> mySet;
    private Map<String, String> myMap;
    private Properties myProps;

    public AccountServiceImpl() {
        System.out.println("对象创建了");
    }

    /*
    @Override
    public void saveAccount() {
    accountDao.saveAccount();
    }
    */

    public void setMyStrs(String[] myStrs) {
        this.myStrs = myStrs;
    }

    public void setMyList(List<String> myList) {
        this.myList = myList;
    }

    public void setMySet(Set<String> mySet) {
        this.mySet = mySet;
    }

    public void setMyMap(Map<String, String> myMap) {
        this.myMap = myMap;
    }

    public void setMyProps(Properties myProps) {
        this.myProps = myProps;
    }

    /**
     * @return void
     * @Param []
     * @author Reolcharm
     * @date 2018/10/27-20:39
     * @desc 展示注解的威力
     */
    @Override
    public void saveAccount() {
        System.out.println(Arrays.toString(myStrs));
        System.out.println(myList);
        System.out.println("myProps = " + myProps);
//        annoStr = Are u a Pig?
        System.out.println("annoStr = " + annoStr);
//        accountDaoFromService = me.reolcharm.dao.impl.AccountDaoImpl@71d15f18
        System.out.println("accountDaoFromService = " + accountDao);
    }

    /**
     * 初始化方法
     */
    @PostConstruct
    public void postConstruct() {
        System.out.println("@postConstruct---- This\n" +
                " * method MUST be invoked before the class is put into service.");
    }

    @PreDestroy
    public void after() {
        System.out.println("@PreDestroy");
    }
}
