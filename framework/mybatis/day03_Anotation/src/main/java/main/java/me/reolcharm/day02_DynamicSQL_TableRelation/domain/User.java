/**
 * @Project: mybatis01
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-20 20:28
 * @Description:
 **/
package me.reolcharm.day02_DynamicSQL_TableRelation.domain;

import java.util.Date;

public class User {
    /**
     * 用包装类, 没有数据时, id = null, 而不是 0
     */
    private Integer id;
    private String username;
    /**
     * 用 util.Date sql.Time; sql.Timestamp; sql.Date类
     */
    private Date birthday;
    private String sex;
    private String address;

    public User() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", birthday=" + birthday +
                ", sex='" + sex + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
