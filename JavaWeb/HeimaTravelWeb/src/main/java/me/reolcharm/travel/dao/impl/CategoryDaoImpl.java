/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-12 20:17
 * @Description:
 **/
package me.reolcharm.travel.dao.impl;

import me.reolcharm.travel.dao.CategoryDao;
import me.reolcharm.travel.domain.Category;
import me.reolcharm.travel.util.JdbcUtils;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;

public class CategoryDaoImpl implements CategoryDao {
    private JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());

    @Override
    public List<Category> findAllCategory() {
        return template.query("select * from tab_category", new BeanPropertyRowMapper<Category>(Category.class));
    }
}
