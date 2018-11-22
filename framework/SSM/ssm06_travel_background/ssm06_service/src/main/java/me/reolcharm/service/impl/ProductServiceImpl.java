/**
 * @Project: SSM02_Perpare4Module
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-08 20:33
 * @Description:
 **/
package me.reolcharm.service.impl;

import me.reolcharm.domain.Product;
import me.reolcharm.mapper.ProductMapper;
import me.reolcharm.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductMapper productMapper;

    @Override
    public List<Product> findAll() {
        return productMapper.findAll();
    }

    @Override
    public void save(Product product) {
        productMapper.save(product);
    }

}
