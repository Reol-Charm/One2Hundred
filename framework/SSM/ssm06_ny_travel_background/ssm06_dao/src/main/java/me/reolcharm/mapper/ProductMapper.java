/**
 * @Project: ssm06_ny_travel_background
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-13 18:45
 * @Description:
 **/
package me.reolcharm.mapper;

import me.reolcharm.domain.Product;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductMapper {

    @Insert("insert into product (PRODUCTNUM,PRODUCTNAME, CITYNAME,DEPARTURETIME,PRODUCTPRICE,PRODUCTDESC,PRODUCTSTATUS) " +
            "values (#{productNum},#{productName},#{cityName},#{departureTime},#{productPrice},#{productDesc},#{productStatus})")
    void save(Product product);

    @Select("select * from PRODUCT t")
    List<Product> findAll();

    @Select("select * from PRODUCT t where t.id = #{productId}")
    Product findById(String productId);
}
