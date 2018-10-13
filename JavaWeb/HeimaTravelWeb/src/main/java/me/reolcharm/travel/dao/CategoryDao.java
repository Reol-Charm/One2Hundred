/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-12 20:17
 * @Description:
 **/
package me.reolcharm.travel.dao;

import me.reolcharm.travel.domain.Category;

import java.util.List;

public interface CategoryDao {
    List<Category> findAllCategory();
}
