/**
 * @Project: framework
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-21 20:59
 * @Description:
 **/
package me.reolcharm.mybatis01_foundation.domain;

public class ConditionPojo {
    /**
     * 将多个 User 属性的条件封装到该 User中
     */
    private User user;

    /**构造方法:
     * 将条件 User 传进来, 封装到该 pojo 中
     */
    public ConditionPojo(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
