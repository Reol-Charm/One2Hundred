/**
 * @Project: mybatis01
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-20 20:27
 * @Description:
 **/
package me.reolcharm.mybatis01_foundation.dao;

import me.reolcharm.mybatis01_foundation.domain.ConditionPojo;
import me.reolcharm.mybatis01_foundation.domain.User;

import java.util.List;

public interface UserDao {
    /**
     * 查询所有用户数据
     */
    List<User> findAll();

    /**
     * 1. 定义sql操作方法 增加一条用户数据
     */
    Boolean addUser(User usertobeAdded);

    /**
     * @param usertoBeUpdated
     * @Return: java.lang.Boolean
     * @Author: Reolcharm
     * @Date: 2018/10/21-12:53
     * @Description: 修改用户信息
     */
    Boolean updateUser(User usertoBeUpdated);

    /**
     * @param condition
     * @Param: []
     * @Return: java.util.List<me.reolcharm.mybatis01_foundation.domain.User>
     * @Author: Reolcharm
     * @Date: 2018/10/21-20:20
     * @Description: 模糊查询, 单条件 和 条件封装
     */
    List<User> findInfoByName(String condition);

    /*----------------------- 深入 ParameterType --> 即条件封装至 POJO 类中------------------------------*/

    List<User> findInfoByPojo(ConditionPojo pojo);

}

