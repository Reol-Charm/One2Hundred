import me.reolcharm.domain.Items;
import me.reolcharm.mapper.ItemsMapper;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @Project: SSM03_Modularization_Parent
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-09 15:56
 * @Description:
 **/

public class TestMybatisAndSpring {
    @Test
    public void testMybatisAndSpring() {
        /*从 spring 容器中获取 dao 层的代理对象*/

        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:spring/applicationContext-dao.xml");
        ItemsMapper itemsMapper = context.getBean(ItemsMapper.class);
        Items itemsMapperById = itemsMapper.findById(1);
        System.out.println("itemsMapperById = " + itemsMapperById);
    }
}
