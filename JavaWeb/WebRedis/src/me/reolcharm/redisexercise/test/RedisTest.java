package me.reolcharm.redisexercise.test;

import me.reolcharm.redisexercise.util.JedisUtils;
import me.reolcharm.redisexercise.util.MyJdbcUtils;
import org.junit.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.util.Map;
import java.util.Set;

public class RedisTest {
    @Test
    public void test01() {
        /* 1. 开启 Redis 服务器 双击...*/
        /* 2. 创建 web 项目.*/
        /* 3. 导入 jedis jar 包*/


        /* 创建 jedis 对象*/
        Jedis jedis = new Jedis("localhost", 6379);
        System.out.println("jedis = " + jedis);
        /* 操作 redis */
        jedis.set("name", "mmm");
        /* String 类型中 定时销毁方法 */
        String activecode = jedis.setex("activecode", 10, "6666");
        /* 获取 */
        String name = jedis.get("name");

        System.out.println("name = " + name);
        System.out.println("activecode = " + activecode);
    }

    /**
     * @Param: []
     * @Return: void
     * @Author: Reolcharm
     * @Date: 2018/10/8-15:49
     * @Description: 最简连接池
     */
    @Test
    public void test02() {
        /* 1. 开启 Redis 服务器 双击...*/
        /* 2. 创建 web 项目.*/
        /* 3. 导入 jedis jar 包*/
        /* 4. 创建 jedisPool 连接池对象, 获取jedis连接对象*/
        JedisPool jedisPool = new JedisPool();
        Jedis jedis = jedisPool.getResource();

        jedis.hset("userinfo", "username", "reol");
        jedis.hset("userinfo", "age", "22");
        jedis.hset("userinfo", "gender", "male");
//        String username = jedis.hget("userinfo", "username");

        Map<String, String> userinfoMap = jedis.hgetAll("userinfo");
        /* 遍历 map 集合*/
        Set<Map.Entry<String, String>> entries = userinfoMap.entrySet();

        for (Map.Entry<String, String> entry : entries) {
            String key = entry.getKey();
            String value = entry.getValue();
            System.out.println("key = " + key);
            System.out.println("value = " + value);
        }
    }

    @Test
    public void test03() {
        /* 1. 开启 Redis 服务器 双击...*/
        /* 2. 创建 web 项目.*/
        /* 3. 导入 jedis jar 包*/
        /* 5. JedisPoolCofig */
        /* 4. 创建 jedisPool 连接池对象, 获取jedis连接对象*/

        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxIdle(10);
        poolConfig.setMaxTotal(60);
        /* 6. 获取配置加载后的连接池 */
        JedisPool jedisPool = new JedisPool(poolConfig, "localhost", 6379);
        Jedis jedis = jedisPool.getResource();


        jedis.hset("userinfo", "username", "reol");
        jedis.hset("userinfo", "age", "22");
        jedis.hset("userinfo", "gender", "male");
        Map<String, String> userinfoMap = jedis.hgetAll("userinfo");
        /* 遍历 map 集合*/
        Set<Map.Entry<String, String>> entries = userinfoMap.entrySet();

        for (Map.Entry<String, String> entry : entries) {
            String key = entry.getKey();
            String value = entry.getValue();
            System.out.println("key = " + key);
            System.out.println("value = " + value);
        }
        /* 关闭连接池 */
        jedis.close();
    }

    /**
     * @Param: []
     * @Return: void
     * @Author: Reolcharm
     * @Date: 2018/10/8-19:06
     * @Description: Redis 工具类测试
     */
    @Test
    public void test04() {
//        JdbcTemplate jdbct = new JdbcTemplate(MyJdbcUtils.getDs());
//        jdbct.query("select * from db4redis")
        Jedis jedis = JedisUtils.getJedis();
        jedis.set("username", "hello");
        String username = jedis.get("username");
        System.out.println("username = " + username);
    }
}
