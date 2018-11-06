/**
 * @Project: spring02_pure_annotation_config
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-27 21:02
 * @Description:
 **/
package me.reolcharm.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

/**
 * @author Reolcharm
 * @Param
 * @return
 * @date 2018/10/27-21:03
 * @desc Spring 的配置类，相当于 bean.xml
 */

/**
 * 有了 ComponentScan 后， 上面的 Configuration 也可以省略了
 */

//@Configuration("HelloPureAnnotation")
//    <context:component-scan base-package="me.reolcharm"/>
@ComponentScan("me.reolcharm")
public class SpringConfiguration {

}
