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

        /*先去 Redis 中查找数据, 有则直接返回, 没有则去 MySQL 中查找*/
        Jedis jedis = JedisUtil.getJedis();
        /*去 Redis 中查找数据*/
        Set<Tuple> tupleSet = jedis.zrangeWithScores("category", 0, -1);
        List<Category> categoryList = null;
        /*感动死了, 原来是写错了: tupleSet.size() == 0 && tupleSet == null*/
        /*redis 中没有数据, 说明是第一次访问, 去 MySQL 中查*/
        if (tupleSet.size() == 0 || tupleSet == null) {
            categoryList = dao.findAllCategory();
            System.out.println("正在查询 MySQL 数据库...");
            /*[B]并将查到的数据保存到 Redis 中*/
            for (Category category : categoryList) {
                /*保存每条内容*/
                /*category:{1:自由行}*/
                jedis.zadd("category", category.getCid(), category.getCname());
            }
            /*将数据保存后, 去 Redis 中查排序好的数据
             * 确保第一次和第二次的数据一致.*/
            Set<Tuple> categoryTuple = jedis.zrangeWithScores("category", 0, -1);
            /*将排序好的 json 数据返回给前台, 保证每次都是排序好的分类条.
            和从 MySQL 查出来的是同一个 list 集合, 对其进行了排序*/
            /* BUG: [{"cid":8,"cname":"全球自由行"},{"cid":5,"cname":"国内游"},{"cid":4,"cname":"处境游"},{"cid":7,"cname":"抱团定制"},{"cid":6,"cname":"港澳游"},{"cid":2,"cname":"酒店"},{"cid":1,"cname":"门票"},{"cid":3,"cname":"香港车票"},{"cid":1,"cname":"门票"},{"cid":2,"cname":"酒店"},{"cid":3,"cname":"香港车票"},{"cid":4,"cname":"处境游"},{"cid":5,"cname":"国内游"},{"cid":6,"cname":"港澳游"},{"cid":7,"cname":"抱团定制"},{"cid":8,"cname":"全球自由行"}]*/
            categoryList = new ArrayList<Category>();
            return storeCategory(categoryTuple, categoryList);
        }
        if (tupleSet != null) {
            /*查到了数据, 从 Redis 中返回数据.*/
            /*Wrong !!!将 set 集合转为 list 集合.*/
            /* 将 set的数据存入list */
            /*不知道 Tuple 类中的方法... 无从下手...*/
            System.out.println("正在从 Redis 中查询数据...");
            categoryList = new ArrayList<Category>();
            return storeCategory(tupleSet, categoryList);
        }
        return categoryList;
    }
   /* 另一种写法.
        Iterator<Tuple> tupleIterator = tupleSet.iterator();
            for (Category cate : categoryList) {
                while (tupleIterator.hasNext()) {
                    Tuple next = tupleIterator.next();
                    String element = next.getElement();
                    cate.setCname(element);
                    cate.setCid((int) next.getScore());
                    categoryList.add(cate);
                }
            }*/

    /**
     * @param categoryTuple The result after searched key "category" in Redis withScores.
     * @param categoryList  将排序好的 json 数据返回给前台, 保证每次都是排序好的分类条.
     *                      和从 MySQL 查出来的是同一个 list 集合, 对其进行了排序
     * @return categoryList
     */
    private List<Category> storeCategory(Set<Tuple> categoryTuple, List<Category> categoryList) {

        for (Tuple tuple : categoryTuple) {
            /*instance new object, to store the data of tuple*/
            Category category = new Category();
            category.setCname(tuple.getElement());
            category.setCid((int) tuple.getScore());
            /* save the storage category*/
            categoryList.add(category);
        }
        return categoryList;
    }
}
