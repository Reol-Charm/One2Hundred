/**
 * @Project: framework
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-21 20:59
 * @Description:
 **/
package me.reolcharm.mybatis01_foundation.domain;

import java.io.Serializable;

public class ConditionPojo implements Serializable {
    /**
     * 将多个 User 属性的条件封装到该 User中
     */
    private User user;
    /**
     * TEST ResultType
     */
    private User4ResultType user4ResultType;

    public User4ResultType getUser4ResultType() {
        return user4ResultType;
    }

    public void setUser4ResultType(User4ResultType user4ResultType) {
        this.user4ResultType = user4ResultType;
    }

    /**
     * 构造方法: 可省略
     * 将条件 User 传进来, 封装到该 pojo 中
     */
   /* public ConditionPojo(User user) {
        this.user = user;
    }*/
    public User getUser() {
        return user;
    }

    /**
     * @Param [user]
     * @Return void
     * @Author Reolcharm
     * @Date 2018/10/22-9:15
     * @Description 传递条件 user
     */
    public void setUser(User user) {
        this.user = user;
    }
}
