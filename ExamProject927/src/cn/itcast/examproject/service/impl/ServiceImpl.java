package cn.itcast.examproject.service.impl;

import cn.itcast.examproject.dao.impl.DaoImpl;
import cn.itcast.examproject.domain.Customer;
import cn.itcast.examproject.service.Service;

import java.util.List;

public class ServiceImpl implements Service {
    private DaoImpl daoImpl = new DaoImpl();

    @Override
    public List<Customer> list() {
        return daoImpl.list();
    }

    @Override
    public int add(Customer submitCustomer) {
        return daoImpl.add(submitCustomer);
    }


}
