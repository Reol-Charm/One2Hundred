package cn.itcast.examproject.service;

import cn.itcast.examproject.domain.Customer;

import java.util.List;

public interface Service {
    List<Customer> list();

    int add(Customer submitCustomer);
}
