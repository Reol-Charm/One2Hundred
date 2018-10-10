package me.reolcharm.redisexercise.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import me.reolcharm.redisexercise.dao.impl.ProvinceDaoImpl;
import me.reolcharm.redisexercise.domain.Province;
import me.reolcharm.redisexercise.service.ProvinceService;
import me.reolcharm.redisexercise.util.JedisUtils;
import redis.clients.jedis.Jedis;

import java.util.List;
import java.util.Map;

public class ProvinceServiceImpl implements ProvinceService {
    private ProvinceDaoImpl dao = new ProvinceDaoImpl();

    @Override
    public List<Province> findAll() {
        return dao.findAll();
    }

    @Override
    public String jsonProvince() {

        /* redis 缓存 */
        /**思路:
         * 1. 先去 redis 中查找,
         * 2. 有则直接返回字符串,
         * 3. 没有则去 MySQL 中查找, 并将找的数据转换成 json 字符串,
         *      存入 redis 数据库中,
         *      返回给 servlet */

        /* 创建 jedis 对象,  */
        Jedis jedis = JedisUtils.getJedis();
        /* [迷途]: 不知道获取那个作为判断.*/
//        Map<String, String> map = jedis.hgetAll("province");

        /* 从 Redis 中查找 json 字符串键值对: 格式: allOption = [{"id":1,"name":"北京"},{"id":2,"name":"上海"},{"id":3,"name":"广州"},{"id":4,"name":"陕西"}]*/
        String province_json = jedis.get("province");
//        String provinceJson = null;
        try {
//            provinceJson = om.writeValueAsString(map);

            if (province_json == null || province_json.length() == 0) {
                System.out.println(" Redis 数据库没有数据, 正在查询 MySQL 数据库...");
                /* provinceJson 不存在, redis 中没有缓存该数据 */
                /* 去MySQL 中查 */
                List<Province> all = dao.findAll();
                /* 将查到的list 序列化成 json*/
                ObjectMapper om = new ObjectMapper();
                String allOption = om.writeValueAsString(all);

                System.out.println("allOption = " + allOption);

                /* [bold] 将 json 字符串存入 redis. */
                jedis.set("province", allOption);
                return allOption;
            } else {
                /* 找的到, 直接返回给请求的servlet */
                System.out.println("redis中有数据，正查询缓存...");
                System.out.println("province_json = " + province_json);
                return province_json;
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } finally {
            /* 总是关闭jedis 连接*/
            jedis.close();
        }
        return province_json;

    }


}
