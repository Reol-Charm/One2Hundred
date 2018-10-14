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
import me.reolcharm.travel.util.JedisUtil;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Tuple;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class CategoryServiceImpl implements CategoryService {
    private CategoryDao dao = new CategoryDaoImpl();

    @Override
    public List<Category> findAllCategory() {
        /* Jedis 优化*/
        /**/
        /*先去 Redis 中查找数据, 有则直接返回, 没有则去 MySQL 中查找*/
        Jedis jedis = JedisUtil.getJedis();
        /*去 Redis 中查找数据*/
        Set<Tuple> tupleSet = jedis.zrangeWithScores("category", 0, -1);
        List<Category> categoryList = null;
        /*感动死了, 原来是写错了: tupleSet.size() == 0 && tupleSet == null*/
        if (tupleSet.size() == 0 || tupleSet == null) {
            categoryList = dao.findAllCategory();
            /*redis 中没有数据, 说明是第一次访问, 去 MySQL 中查*/
            System.out.println("正在查询 MySQL 数据库...");
            /*并将查到的数据保存到 Redis 中*/
            for (Category category : categoryList) {
                /*保存每条内容*/
                /*category:{1:自由行}*/
                jedis.zadd("category", category.getCid(), category.getCname());
            }
            return categoryList;

        } else {
            /*查到了数据, 从 Redis 中返回数据.*/
            /*Wrong !!!将 set 集合转为 list 集合.*/
            /* 将 set的数据存入list */
            /*不知道 Tuple 类中的方法... 无从下手...*/
            /*Iterator<Tuple> tupleIterator = tupleSet.iterator();
            for (Category cate : categoryList) {
                while (tupleIterator.hasNext()) {
                    Tuple next = tupleIterator.next();
                    String element = next.getElement();
                    cate.setCname(element);
                    cate.setCid((int) next.getScore());
                    categoryList.add(cate);
                }
            }*/

            System.out.println("正在从 Redis 中查询数据...");
            categoryList = new ArrayList<Category>();
            for (Tuple tuple : tupleSet) {
                /*新建 实体类 Category 对象*/
                Category category = new Category();
                /*将从 tuple 中获取到的元素设置到 Category 中*/
                category.setCname(tuple.getElement());
                category.setCid((int) tuple.getScore());
                /*将 category 对象添加到 list 集合中*/
                categoryList.add(category);
            }
        }
        return categoryList;
    }
}
