package cn.itcast.examproject.dao.impl;

import cn.itcast.examproject.dao.Dao;
import cn.itcast.examproject.domain.Customer;
import cn.itcast.examproject.utils.MyJdbcUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class DaoImpl implements Dao {

    private JdbcTemplate jt = new JdbcTemplate(MyJdbcUtils.getDs());

    @Override
    public List<Customer> list() {
        String sql = "select * from customer";
        List<Customer> customerList = null;
        try {
            customerList = jt.query(sql,
                    new BeanPropertyRowMapper<Customer>(Customer.class));
        } catch (DataAccessException e) {
            return null;
        }
        return customerList;
    }

    @Override
    public int add(Customer submitCustomer) {
        String sql = "insert into customer values (null,?,?,?,?)";
        int update = jt.update(sql, submitCustomer.getCust_name(),
                submitCustomer.getCust_source(),
                submitCustomer.getCust_level(),
                submitCustomer.getCust_mobile());
        return update;
    }
}
