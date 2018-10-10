package me.reolcharm.reflect_annotation.day25reflect.caseinclass.boldgetannotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE,ElementType.METHOD,ElementType.FIELD,ElementType.PARAMETER})
public @interface Anno1 {
    String[] strs();
    Anno2 anno();
}
