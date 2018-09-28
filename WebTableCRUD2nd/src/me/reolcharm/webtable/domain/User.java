/**
 * @Project: WebTableCRUD2nd
 * @Author: Reolcharm
 * @CreatedTime: 2018-09-22 20:45
 * @Description: javaBean
 **/
package me.reolcharm.webtable.domain;

public class User {
    private int uid;
    private String realName;
    private String userName;
    private String u_password;
    private String gender;
    private int age;
    private String address;
    private String email;
    private String created_date;
    private String lastTime;
    private String telNum;
    private String indentyCard;
    private String qq;
    private String hidenVarchar;

    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "uid=" + uid +
                ", realName='" + realName + '\'' +
                ", userName='" + userName + '\'' +
                ", u_password='" + u_password + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", created_date='" + created_date + '\'' +
                ", lastTime='" + lastTime + '\'' +
                ", telNum='" + telNum + '\'' +
                ", indentyCard='" + indentyCard + '\'' +
                ", qq='" + qq + '\'' +
                ", hidenVarchar='" + hidenVarchar + '\'' +
                '}';
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCreated_date() {
        return created_date;
    }

    public void setCreated_date(String created_date) {
        this.created_date = created_date;
    }

    public String getLastTime() {
        return lastTime;
    }

    public void setLastTime(String lastTime) {
        this.lastTime = lastTime;
    }

    public String getTelNum() {
        return telNum;
    }

    public void setTelNum(String telNum) {
        this.telNum = telNum;
    }

    public String getIndentyCard() {
        return indentyCard;
    }

    public void setIndentyCard(String indentyCard) {
        this.indentyCard = indentyCard;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getHidenVarchar() {
        return hidenVarchar;
    }

    public void setHidenVarchar(String hidenVarchar) {
        this.hidenVarchar = hidenVarchar;
    }
}
