import me.reolcharm.mybatis01_foundation.dao.User4ResultTypeDao;
import me.reolcharm.mybatis01_foundation.dao.UserDao;
import me.reolcharm.mybatis01_foundation.domain.ConditionPojo;
import me.reolcharm.mybatis01_foundation.domain.User;
import me.reolcharm.mybatis01_foundation.domain.User4ResultType;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
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
    private UserDao userDao;
    /* TEST resultType*/
    private User4ResultTypeDao user4ResultTypeDao;

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
//        userDao = sqlSession.getMapper(UserDao.class);
        /* test resultType */
        user4ResultTypeDao = sqlSession.getMapper(User4ResultTypeDao.class);
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

    /*------------------CRUD测试-------------------------*/

    /**
     * 查询所有的 user
     *
     * @throws IOException
     */
    @Test
    public void findAll() throws IOException {
        /*执行方法*/
        List<User> users = userDao.findAll();
        System.out.println("users = " + users);
        for (User user : users) {
            System.out.println(user);
        }
    }

    /**
     * @Param: []
     * @Return: void
     * @Author: Reolcharm
     * @Date: 2018/10/21-12:42
     * @Description: 新增一条数据
     */
    @Test
    public void addUserTest() {
        User user = new User();
        user.setAddress("杭州");
        user.setBirthday(new Date());
        user.setSex("F");
        user.setUsername("Lolly");
        /*aBoolean = true*/
        Boolean aBoolean = userDao.addUser(user);
        System.out.println("aBoolean = " + aBoolean);
        System.out.println("-----------------------");
//        user = null
//        user = 56
        System.out.println("userId = " + user.getId());
    }

    /**
     * @Param: []
     * @Return: void
     * @Author: Reolcharm
     * @Date: 2018/10/21-20:26
     * @Description: 更改用户信息方法
     */
    @Test
    public void updateUserTest() {
        User user = new User();
        user.setId(51);
        user.setAddress("杭州");
        user.setBirthday(new Date());
        user.setSex("F");
        user.setUsername("Lolly");
        /*aBoolean = true*/
        Boolean aBoolean = userDao.updateUser(user);
//        aInt = 1; 受影响行数.
        System.out.println("aBoolean = " + aBoolean);
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
//        List<User> infoByNameList = userDao.findInfoByName("%王%");
        List<User> infoByNameList = userDao.findInfoByName("王");
        System.out.println("infoByNameList = " + infoByNameList);
    }

    /*----------------------- 深入 ParameterType --> 即条件封装至 POJO 类中------------------------------*/

    /**
     * @Param []
     * @Return void
     * @Author Reolcharm
     * @Date 2018/10/21-23:50
     * @Description
     */
    @Test
    public void findInfoByPojoTest() {
        User user = new User();
        user.setUsername("%王%");
        user.setSex("女");
        ConditionPojo pojo = new ConditionPojo();
        pojo.setUser(user);
        List<User> infoByPojo = userDao.findInfoByPojo(pojo);
        for (User user1 : infoByPojo) {
            System.out.println("user1 = " + user1);
        }
    }

    @Test
    public void ResultTypeTest() {
        /* setting condition */
        User4ResultType user4ResultType = new User4ResultType();
        user4ResultType.setUserName("%王%");
        user4ResultType.setUserSex("女");
        /*wrapper condition*/
        ConditionPojo pojo = new ConditionPojo();
        pojo.setUser4ResultType(user4ResultType);

        List<User4ResultType> infoByPojo = user4ResultTypeDao.findInfoByPojo(pojo);
        for (User4ResultType User4ResultType1 : infoByPojo) {
            System.out.println("User4ResultType1 = " + User4ResultType1);
        }
    }
}
