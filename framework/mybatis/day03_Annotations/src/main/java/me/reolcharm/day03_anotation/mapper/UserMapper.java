/**
 * @Project: mybatis01
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-20 20:27
 * @Description:
 **/
package me.reolcharm.day03_anotation.mapper;

import me.reolcharm.day03_anotation.domain.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface UserMapper {
    /**
     * 查询所有用户数据
     */

    @Select("SELECT" +
            " * " +
            "FROM" +
            "`user` ")
    @Results(
            id = "userResultMap",
            value = {
                    @Result(id = true, column = "id", property = "userId"),
                    @Result(column = "username", property = "userName"),
                    @Result(column = "birthday", property = "userBirthday"),
                    @Result(column = "sex", property = "userSex"),
                    @Result(column = "address", property = "userAddress")
            }
    )
    List<User> findAll();

    /**
     * @return me.reolcharm.day03_anotation.domain.User
     * @Param [uid]
     * @author Reolcharm
     * @date 2018/10/24-19:08
     * @desc 查询一个 User信息
     */
    @Select("SELECT\n" +
            "\t* \n" +
            "FROM\n" +
            "\t`user` \n" +
            "WHERE\n" +
            "\tid = #{id}")
    @ResultMap("userResultMap")
    User findOneUser(Integer uid);

    /**
     * @param condition
     * @Param: []
     * @Return: java.util.List<me.reolcharm.day03_anotation.domain.User>
     * @Author: Reolcharm
     * @Date: 2018/10/21-20:20
     * @Description: 模糊查询, 单条件 和 条件封装
     */
    @Select("SELECT\n" +
            "\t* \n" +
            "FROM\n" +
            "\t`user` \n" +
            "WHERE\n" +
            "\taddress LIKE #{address} \n" +
            "\tAND sex =#{sex} ")
    @ResultMap("userResultMap")
    List<User> findInfoByConditions(@Param("address") String condition, @Param("sex") String condition2);

    /**
     * @return java.lang.Integer
     * @Param [user]
     * @author Reolcharm
     * @date 2018/10/24-19:10
     * @desc 增加一条用户记录
     */
    @Insert("INSERT INTO `user` ( username, birthday, sex, address )\n" +
            "VALUES\n" +
            "\t( #{username}, #{birthday}, #{sex}, #{address} ) ")
    Integer save(User user);

    /**
     * @return java.lang.Integer
     * @Param [uid]
     * @author Reolcharm
     * @date 2018/10/24-19:10
     * @desc 删除一条用户信息
     */
    Integer delet(Integer uid);

    /**
     * @return java.lang.Boolean
     * @Param [user]
     * @author Reolcharm
     * @date 2018/10/24-19:11
     * @desc 修改用户信息
     */
    @Update("UPDATE USER \n" +
            "	SET username = #{username},\n" +
            "	birthday = #{birthday},\n" +
            "	sex = #{sex},\n" +
            "	address = #{address} \n" +
            "WHERE\n" +
            "	id = #{id} ")
    Boolean update(User user);

}

