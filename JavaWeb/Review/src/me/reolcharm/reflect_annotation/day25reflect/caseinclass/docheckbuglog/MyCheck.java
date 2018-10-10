package me.reolcharm.reflect_annotation.day25reflect.caseinclass.docheckbuglog;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 元注解
 */
@Target(value = {ElementType.TYPE, ElementType.FIELD, ElementType.PARAMETER, ElementType.METHOD})
/*
@Target(ElementType.TYPE)
*/
@Retention(value = RetentionPolicy.RUNTIME)

public @interface MyCheck {
    String[] value() default "Hello Annotation.";
    //todo 枚举怎么作为注解的属性
//    HelloEnum ENUM;
}
