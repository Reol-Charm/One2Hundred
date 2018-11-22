/**
 * @Project: ssm06_travel_background
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-17 20:28
 * @Description:
 **/
package me.reolcharm.mapper;

import me.reolcharm.domain.Role;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

public interface RoleMapper {


    /**
     * 查询该角色下所有信息,包括权限, 并封装结果集
     */

    @Select("select * from role r where r.id in (select roleid from USERS_ROLE t where t.userid = #{userId})")
    @Results({
            @Result(id = true, column = "id", property = "id"),
            @Result(property = "rolename", column = "roleName"),
            @Result(property = "roleDesc", column = "roleDesc"),
            @Result(property = "id", column = "permissions", javaType = java.util.List.class,
                    many = @Many(select = "me.reolcharm.mapper.PermissionMapper.findById")),
    })
    Role findById(String userId);
    /*todo 根据角色查询权限*/
}
