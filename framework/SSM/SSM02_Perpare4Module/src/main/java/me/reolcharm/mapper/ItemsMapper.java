/**
 * @Project: SSM00_HelloSSM
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-04 20:06
 * @Description:
 **/
package me.reolcharm.mapper;

import me.reolcharm.domain.Items;

import java.util.List;

public interface ItemsMapper {

    List<Items> findAll();

    Items findById(Integer id);

    boolean save(Items items);
}
