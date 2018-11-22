import me.reolcharm.domain.Items;
import me.reolcharm.service.ItemsService;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @Project: SSM03_Modularization_Parent
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-09 15:56
 * @Description:
 **/

public class TestServiceAndSpring {
    @Test
    public void testMybatisAndSpring() {
        /*从 spring 容器中获取 service 层的代理对象*/
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath*:/spring/applicationContext-*.xml");
        ItemsService itemsService = context.getBean(ItemsService.class);
        Items itemsMapperById = itemsService.findById(1);
        System.out.println("itemsMapperById = " + itemsMapperById);
    }
}
