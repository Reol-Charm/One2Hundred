/**
 * @Project: ssm06_ny_travel_background
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-13 18:41
 * @Description:
 **/
package me.reolcharm.service;

import me.reolcharm.domain.Product;

import java.util.List;

public interface ProductService {


    List<Product> findAll();

    void save(Product product);
}
