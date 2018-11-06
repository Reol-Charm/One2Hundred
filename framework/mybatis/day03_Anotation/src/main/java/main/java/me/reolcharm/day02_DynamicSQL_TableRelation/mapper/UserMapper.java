/**
 * @Project: mybatis01
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-20 20:27
 * @Description:
 **/
package me.reolcharm.day02_DynamicSQL_TableRelation.mapper;

import me.reolcharm.day02_DynamicSQL_TableRelation.domain.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {
    /**
     * 查询所有用户数据
     */
    List<User> findAll();

    /**
     * @param condition
     * @Param: []
     * @Return: java.util.List<me.reolcharm.day02_DynamicSQL_TableRelation.domain.User>
     * @Author: Reolcharm
     * @Date: 2018/10/21-20:20
     * @Description: 模糊查询, 单条件 和 条件封装
     */
    List<User> findInfoByConditions(@Param("address") String condition, @Param("sex") String condition2);

    /**
     * @return java.lang.Boolean
     * @Param [user]
     * @author Reolcharm
     * @date 2018/10/23-21:00
     * @desc
     */
    Boolean updateInfoByDynamicSql(User user);
}

