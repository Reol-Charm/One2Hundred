import me.reolcharm.mybatis01_foundation.dao.UserDao;
import me.reolcharm.mybatis01_foundation.domain.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/**
 * @Project: mybatis01
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-20 20:56
 * @Description:
 **/

public class HelloMybatisTest {
    @Test
    public void mybatisTest() throws IOException {
        /*加载配置*/
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);

        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        /*传入输入流, 建造工厂*/
        SqlSessionFactory factory = builder.build(inputStream);
        /*设计图纸*/
        SqlSession sqlSession = factory.openSession();
        /*映射实现类对象*/
        UserDao userDao = sqlSession.getMapper(UserDao.class);
        /*执行方法*/
        List<User> users = userDao.findAll();
        System.out.println("users = " + users);
        for(User user : users){
            System.out.println(user);
        }
        //6.释放资源
        sqlSession.close();
        inputStream.close();

    }
}
