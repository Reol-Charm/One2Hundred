package cn.itcast.examproject.dao;

import cn.itcast.examproject.domain.Customer;

import java.util.List;

public interface Dao {
    List<Customer> list();



    int add(Customer submitCustomer);
}
