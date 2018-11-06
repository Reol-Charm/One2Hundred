/**
 * @Project: SpringMVC01_01HelloDemo
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-01 19:32
 * @Description:
 **/
package me.reolcharm.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class Account implements Serializable {
    private String username;
    private String password;

    private User user;

    private List<PageBean> pageBeans;
    private Map<String, PageBean> pageBeanMap;

    @Override
    public String toString() {
        return "Account{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", user=" + user +
                ", pageBeans=" + pageBeans +
                ", pageBeanMap=" + pageBeanMap +
                '}';
    }

    public List<PageBean> getPageBeans() {
        return pageBeans;
    }

    public void setPageBeans(List<PageBean> pageBeans) {
        this.pageBeans = pageBeans;
    }

    public Map<String, PageBean> getPageBeanMap() {
        return pageBeanMap;
    }

    public void setPageBeanMap(Map<String, PageBean> pageBeanMap) {
        this.pageBeanMap = pageBeanMap;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
