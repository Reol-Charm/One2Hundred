/**
 * @Project: ssm06_ny_travel_background
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-13 18:41
 * @Description:
 **/
package me.reolcharm.service;

import me.reolcharm.domain.Orders;

import java.util.List;

public interface OrderService {


    /**查询所有订单信息
     * @return
     * @param page
     * @param size
     */
    List<Orders> findAll(Integer page, Integer size);

    Orders findById(String orderId);

    /**保存订单信息
     * @param orders
     */
//    void save(Orders orders);
}
