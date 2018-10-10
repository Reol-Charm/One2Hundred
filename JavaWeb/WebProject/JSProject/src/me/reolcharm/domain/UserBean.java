/**
 * @Project: WebProject
 * @Author: Reolcharm
 * @CreatedTime: 2018-09-21 14:57
 * @Description: Store the data from mysql db
 **/
package me.reolcharm.domain;

public class UserBean {
    private int uid;
    private String u_username;
    private String u_password;
    private String gender;
    private String email;
    private String telNum;

    public UserBean() {
    }

    public UserBean(int uid, String u_username, String u_password, String gender, String email, String telNum) {
        this.uid = uid;
        this.u_username = u_username;
        this.u_password = u_password;
        this.gender = gender;
        this.email = email;
        this.telNum = telNum;
    }

    @Override
    public String toString() {
        return "UserBean{" +
                "uid=" + uid +
                ", u_username='" + u_username + '\'' +
                ", u_password='" + u_password + '\'' +
                ", gender='" + gender + '\'' +
                ", email='" + email + '\'' +
                ", telNum='" + telNum + '\'' +
                '}';
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getU_username() {
        return u_username;
    }

    public void setU_username(String u_username) {
        this.u_username = u_username;
    }

    public String getU_password() {
        return u_password;
    }

    public void setU_password(String u_password) {
        this.u_password = u_password;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelNum() {
        return telNum;
    }

    public void setTelNum(String telNum) {
        this.telNum = telNum;
    }
}
