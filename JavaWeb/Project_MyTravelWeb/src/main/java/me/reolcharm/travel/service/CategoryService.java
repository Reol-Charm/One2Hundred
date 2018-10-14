package me.reolcharm.travel.service;

import me.reolcharm.travel.domain.Category;
import me.reolcharm.travel.domain.User;

import java.util.List;

public interface CategoryService {
    List<Category> findAllCategory();
}
