import me.reolcharm.day02_DynamicSQL_TableRelation.mapper.UserMapper;
import me.reolcharm.day02_DynamicSQL_TableRelation.domain.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
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
    private InputStream inputStream;
    private SqlSession sqlSession;
    private UserMapper userMapper;

    /**
     * @Param: []
     * @Return: void
     * @Author: Reolcharm
     * @Date: 2018/10/21-12:41
     * @Description: 默认单元测试之前执行的初始化方法
     */
    @Before
    public void init() throws IOException {
        /*加载配置*/
        String resource = "mybatis-config.xml";
        inputStream = Resources.getResourceAsStream(resource);

        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        /*传入输入流, 建造工厂*/
        SqlSessionFactory factory = builder.build(inputStream);
        /*设计图纸*/
        sqlSession = factory.openSession();
        /*映射实现类对象*//* BindingException  */
        userMapper = sqlSession.getMapper(UserMapper.class);
    }

    /**
     * @Param: []
     * @Return: void
     * @Author: Reolcharm
     * @Date: 2018/10/21-12:41
     * @Description: 默认单元测试之后执行的方法
     */
    @After
    public void destroy() throws IOException {
        /*提交事务, 完成增删改操作*/
        sqlSession.commit();
        //6.释放资源
        sqlSession.close();
        inputStream.close();
    }


    /**
     * 查询所有的 user
     *
     * @throws IOException
     */
    @Test
    public void findAll() throws IOException {
        /*执行方法*/
        List<User> users = userMapper.findAll();
        System.out.println("users = " + users);
        for (User user : users) {
            System.out.println(user);
        }
    }

    /**
     * @Param []
     * @Return void
     * @Author Reolcharm
     * @Date 2018/10/21-20:52
     * @Description 简易模糊查询, 包含两种方式, 推荐第一种.
     */
    @Test
    public void findInfoByNameTest() {
        /*@Param("") 注解应该放在接口方法上. */
        List<User> infoByNameList = userMapper.findInfoByConditions("杭州", "女");
//        List<User> infoByNameList = userMapper.findInfoByConditions("王");
        System.out.println("infoByNameList = " + infoByNameList);
    }

    @Test
    public void updateInfoByDynamicSqlTest() {
        User user = new User();
        user.setAddress("温州");
        user.setSex("男");
        user.setUsername("machi");
        user.setId(55);
        Boolean aBoolean = userMapper.updateInfoByDynamicSql(user);
        System.out.println("aBoolean = " + aBoolean);
    }

}
