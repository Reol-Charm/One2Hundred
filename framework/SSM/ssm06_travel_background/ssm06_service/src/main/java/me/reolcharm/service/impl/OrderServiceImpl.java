/**
 * @Project: SSM02_Perpare4Module
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-08 20:33
 * @Description:
 **/
package me.reolcharm.service.impl;

import com.github.pagehelper.PageHelper;
import me.reolcharm.domain.Orders;
import me.reolcharm.mapper.OrderMapper;
import me.reolcharm.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public List<Orders> findAll(Integer page, Integer size) {
        PageHelper.startPage(page, size);
        List<Orders> orders = orderMapper.findAll();
        return orders;
    }

    @Override
    public Orders findById(String orderId) {
        Orders orders = orderMapper.findById(orderId);
        return orders;
    }

    /*@Override
    public void save(Orders orders) {
        orderMapper.save(orders);
    }*/

}
