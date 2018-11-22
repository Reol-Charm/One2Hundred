/**
 * @Project: SSM02_Perpare4Module
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-08 20:33
 * @Description:
 **/
package me.reolcharm.service.impl;

import me.reolcharm.domain.Items;
import me.reolcharm.mapper.ItemsMapper;
import me.reolcharm.service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemsServiceImpl implements ItemsService {
    @Autowired
    private ItemsMapper itemsMapper;

    @Override
    public List<Items> findAll() {
        List<Items> all = itemsMapper.findAll();
        return all;
    }

    @Override
    public Items findById(Integer id) {
        Items mapperById = itemsMapper.findById(1);
        System.out.println("mapperById = " + mapperById);
        return mapperById;
    }

    @Override
    public boolean save(Items items) {
        return false;
    }
}
