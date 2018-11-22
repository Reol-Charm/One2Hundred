/**
 * @Project: ssm06_ny_travel_background
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-13 18:45
 * @Description:
 **/
package me.reolcharm.mapper;

import me.reolcharm.domain.Member;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
public interface TravellerMapper {
    /**
     * 根据订单 id 查询中间表中 旅客 id
     * 在根据查到的旅客 id 去查旅客表中 旅客 的信息
     */
    @Select("select * from TRAVELLER where id in (select t.travellerid from ORDER_TRAVELLER t where t.orderid = #{orderId})")
    Member findById(String orderId);
}
