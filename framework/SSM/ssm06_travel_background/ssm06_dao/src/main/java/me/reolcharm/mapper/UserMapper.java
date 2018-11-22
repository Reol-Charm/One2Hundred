/**
 * @Project: ssm06_travel_background
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-17 20:28
 * @Description:
 **/
package me.reolcharm.mapper;

import me.reolcharm.domain.UserInfo;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface UserMapper {


    /**
     * 查询是否有该 User 并封装结果集
     * 根据用户 id 查 中间表中对应的 角色id
     */
    @Select("select * from USERS t where t.username = #{username}")
    @Results({@Result(id = true, column = "id", property = "id"),
            @Result(property = "username", column = "username"),
            @Result(property = "email", column = "email"),
            @Result(property = "password", column = "password"),
            @Result(property = "phoneNum", column = "phoneNum"),
            @Result(property = "status", column = "status"),
            @Result(property = "roles", column = "id", javaType = List.class,
                    many = @Many(select = "me.reolcharm.mapper.RoleMapper.findById"))
    })
    UserInfo findByUsername(String username);
}
