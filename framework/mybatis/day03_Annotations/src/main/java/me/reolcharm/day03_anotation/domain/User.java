/**
 * @Project: mybatis01
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-20 20:28
 * @Description:
 **/
package me.reolcharm.day03_anotation.domain;

import java.util.Date;

public class User {
    /**
     * 用包装类, 没有数据时, id = null, 而不是 0
     */
    private Integer userId;
    private String userName;
    /**
     * 用 util.Date sql.Time; sql.Timestamp; sql.Date类
     */
    private Date userBirthday;
    private String userSex;
    private String userAddress;

    public User() {
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Date getUserBirthday() {
        return userBirthday;
    }

    public void setUserBirthday(Date userBirthday) {
        this.userBirthday = userBirthday;
    }

    public String getUserSex() {
        return userSex;
    }

    public void setUserSex(String userSex) {
        this.userSex = userSex;
    }

    public String getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(String userAddress) {
        this.userAddress = userAddress;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", userBirthday=" + userBirthday +
                ", userSex='" + userSex + '\'' +
                ", userAddress='" + userAddress + '\'' +
                '}';
    }
}
