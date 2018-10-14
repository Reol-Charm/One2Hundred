/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-12 20:17
 * @Description:
 **/
package me.reolcharm.travel.dao;

import me.reolcharm.travel.domain.Category;

import java.util.List;
import java.util.Map;

public interface CategoryDao {
    List<Category> findAllCategory();

}
