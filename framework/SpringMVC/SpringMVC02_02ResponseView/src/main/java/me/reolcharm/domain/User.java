/**
 * @Project: SpringMVC01_01HelloDemo
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-01 21:00
 * @Description:
 **/
package me.reolcharm.domain;

import java.io.Serializable;

public class User implements Serializable {
    private String uname;
    private String email;
    private Integer age;

    @Override
    public String toString() {
        return "User{" +
                "uname='" + uname + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                '}';
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
