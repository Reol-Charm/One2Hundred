/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-11 20:43
 * @Description:
 **/
package me.reolcharm.travel.service.impl;

import me.reolcharm.travel.dao.CategoryDao;
import me.reolcharm.travel.dao.impl.CategoryDaoImpl;
import me.reolcharm.travel.domain.Category;
import me.reolcharm.travel.domain.User;
import me.reolcharm.travel.service.CategoryService;

import java.util.List;

public class CategoryServiceImpl implements CategoryService {
    private CategoryDao dao = new CategoryDaoImpl();

    @Override
    public List<Category> findAllCategory() {
        return dao.findAllCategory();
    }
}
