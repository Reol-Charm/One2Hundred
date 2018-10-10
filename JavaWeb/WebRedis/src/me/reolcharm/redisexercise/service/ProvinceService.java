package me.reolcharm.redisexercise.service;

import me.reolcharm.redisexercise.domain.Province;

import java.util.List;

public interface ProvinceService {
    List<Province> findAll();
    String jsonProvince();
}
