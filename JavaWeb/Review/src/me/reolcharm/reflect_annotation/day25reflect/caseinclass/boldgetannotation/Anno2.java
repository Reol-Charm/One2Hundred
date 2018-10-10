package me.reolcharm.reflect_annotation.day25reflect.caseinclass.boldgetannotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface Anno2 {
    int a();
}
