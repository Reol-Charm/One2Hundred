package me.reolcharm.redisexercise.util;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class JedisUtils {
    private static JedisPool jedisPool;

    /* 1. 加载 properties 文件, 配置连接池参数 */
    static {
        InputStream is = JedisUtils.class.getClassLoader().getResourceAsStream("jedis.properties");
        /* pro 对象解析文件内中配置 */
        Properties pro = new Properties();
        try {
            /* 读取配置文件 */
            pro.load(is);

        } catch (IOException e) {
            e.printStackTrace();
        }

        /* 配置 JedisPool*/
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        /* 从配置文件中加载 setMaxTotal等连接池设置项*/
        poolConfig.setMaxTotal(Integer.parseInt(pro.getProperty("maxTotal")));
        poolConfig.setMaxTotal(Integer.parseInt(pro.getProperty("maxIdle")));
        /* 创建连接池对象 */
        jedisPool = new JedisPool(poolConfig, pro.getProperty("host"), Integer.parseInt(pro.getProperty("port")));

    }

    /* 2. 提供 连接对象 Jedis*/
    public static Jedis getJedis() {
        Jedis jedis = jedisPool.getResource();
        return jedis;
    }
}

