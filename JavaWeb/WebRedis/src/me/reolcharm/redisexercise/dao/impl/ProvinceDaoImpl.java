package me.reolcharm.redisexercise.dao.impl;

import me.reolcharm.redisexercise.dao.ProvinceDao;
import me.reolcharm.redisexercise.domain.Province;
import me.reolcharm.redisexercise.util.MyJdbcUtils;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ProvinceDaoImpl implements ProvinceDao {
    /**
     * @Param: 
     * @Return: 
     * @Author: Reolcharm
     * @Date: 2018/10/8-20:27
     * @Description: 忘了传入数据连接池, 一阵好找, fuc!
     */
    private JdbcTemplate jdbcTemplate = new JdbcTemplate(MyJdbcUtils.getDs());

    @Override
    public List<Province> findAll() {
        String sql = "select * from province";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<Province>(Province.class));
    }
}
