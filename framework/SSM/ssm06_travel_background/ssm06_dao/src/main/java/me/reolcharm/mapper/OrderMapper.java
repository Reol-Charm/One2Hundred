/**
 * @Project: ssm06_ny_travel_background
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-13 18:45
 * @Description:
 **/
package me.reolcharm.mapper;

import me.reolcharm.domain.Member;
import me.reolcharm.domain.Orders;
import me.reolcharm.domain.Product;
import me.reolcharm.domain.Traveller;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderMapper {
    /**
     * 订单和产品多对一的关系,
     * 此处业务: 一个订单只有一个产品, 查询订单的时候去将订单内的产品信息也查询出来
     * <p>
     * 查询一个订单的时候, 查询
     */
    @Select("select * from ORDERS")
    @Results(value = {
            @Result(id = true, property = "id", column = "id"),
            @Result(property = "orderNum", column = "orderNum"),
            @Result(property = "orderTime", column = "orderTime"),
            @Result(property = "orderStatus", column = "orderStatus"),
            @Result(property = "peopleCount", column = "peopleCount"),
            @Result(property = "payType", column = "payType"),
            @Result(property = "orderDesc", column = "orderDesc"),
            @Result(property = "product", column = "productId", javaType = Product.class,
                    one = @One(select = "me.reolcharm.mapper.ProductMapper.findById"))
    })
    List<Orders> findAll();

    /**
     * 查询订单详情
     */
    @Select("select * from ORDERS where id = #{id}")
    @Results({
            @Result(id = true, property = "id", column = "id"),
            @Result(property = "orderNum", column = "orderNum"),
            @Result(property = "orderTime", column = "orderTime"),
            @Result(property = "orderStatus", column = "orderStatus"),
            @Result(property = "peopleCount", column = "peopleCount"),
            @Result(property = "payType", column = "payType"),
            @Result(property = "orderDesc", column = "orderDesc"),
            @Result(property = "product", column = "productId", javaType = Product.class,
                    one = @One(select = "me.reolcharm.mapper.ProductMapper.findById")),
            /* 业务需求是: 查询订单的同时, 将会员和旅客信息查询 */
            @Result(property = "member", column = "memberId", javaType = Member.class,
                    one = @One(select = "me.reolcharm.mapper.MemberMapper.findById")),
            /*根据 订单 'id' 去查中间表中的旅客id, 再去查旅客信息.*/
            @Result(property = "member", column = "id", javaType = Traveller.class,
                    many = @Many(select = "me.reolcharm.mapper.TravellerMapper.findById")),
    })
    Orders findById(String id);

}
