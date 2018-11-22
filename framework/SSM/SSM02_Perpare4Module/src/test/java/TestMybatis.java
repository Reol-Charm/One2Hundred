import me.reolcharm.domain.Items;
import me.reolcharm.mapper.ItemsMapper;
import me.reolcharm.service.impl.ItemsServiceImpl;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;
import java.util.List;

/**
 * @Project: SSM02_Perpare4Module
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-08 20:05
 * @Description:
 **/

public class TestMybatis {
    @Test
    public void testMybatis() throws IOException {

        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        ItemsMapper itemsMapper1 = context.getBean(ItemsMapper.class);
        /*mybatis 原生写法*/
//        InputStream is = Resources.getResourceAsStream("applicationContext.xml");
//        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(is);
        /*获取执行对象*/
//        SqlSession sqlSession = factory.openSession();
        /*获取代理对象*/
//        ItemsMapper accountMapper = sqlSession.getMapper(ItemsMapper.class);
        List<Items> all = itemsMapper1.findAll();
        System.out.println("all = " + all);
        /*只需增加 接口方法*/
        Items mapper1ById = itemsMapper1.findById(1);
        System.out.println("mapper1ById = " + mapper1ById);
        System.out.println("----------");
        ItemsServiceImpl service = context.getBean(ItemsServiceImpl.class);
        Items byId = service.findById(2);
        System.out.println("byId = " + byId);
    }
}
