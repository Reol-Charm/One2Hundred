/**
 * @Project: mybatis01
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-20 20:27
 * @Description:
 **/
package me.reolcharm.mybatis01_foundation.dao;

import me.reolcharm.mybatis01_foundation.domain.ConditionPojo;
import me.reolcharm.mybatis01_foundation.domain.User;
import me.reolcharm.mybatis01_foundation.domain.User4ResultType;

import java.util.List;

public interface User4ResultTypeDao {
    /*----------------------- 深入 ParameterType --> 即条件封装至 POJO 类中------------------------------*/

    /**
     * @Param [pojo]
     * @Return java.util.List<me.reolcharm.mybatis01_foundation.domain.User>
     * @Author Reolcharm
     * @Date 2018/10/22-9:17
     * @Description 根据多条件查询(封装在 pojo 中)
     */
    List<User4ResultType> findInfoByPojo(ConditionPojo pojo);
}

