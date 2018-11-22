/**
 * @Project: ssm06_ny_travel_background
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-13 18:45
 * @Description:
 **/
package me.reolcharm.mapper;

import me.reolcharm.domain.Permission;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberMapper {

    @Select("select * from member t where t.id = #{memberId}")
    Permission findById(String memberId);
}
