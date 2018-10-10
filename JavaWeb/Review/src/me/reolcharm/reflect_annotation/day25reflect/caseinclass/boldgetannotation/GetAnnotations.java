package me.reolcharm.reflect_annotation.day25reflect.caseinclass.boldgetannotation;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;


@Anno1(strs = {"a", "b"}, anno = @Anno2(a = 10))
public class GetAnnotations {

    @Anno1(strs = {"c", "d"}, anno = @Anno2(a = 100))
    private String name;

    @Anno1(strs = {"e", "f"}, anno = @Anno2(a = 1000))
    public void getStr() {

    }

    public void getStr(@Anno1(strs = {"g", "h"}, anno = @Anno2(a = 10000)) @Anno2(a = 20) String s) {

    }


    public static void main(String[] args) throws Exception {
        //1. 获取类上的注解；
        Class<GetAnnotations> aClass = GetAnnotations.class;
        /*2. 获取类上的注解,有对应的两个属性值*/
        Anno1 annotation = aClass.getAnnotation(Anno1.class);
        /*2.1  getAnnotation()的效果:
        其实就是在内存中生成了一个该注解接口的子类实现对象,--> 并返回实现类的对象.

        public class ProImpl implements Pro{
            public String className(){
                return "cn.itcast.annotation.Demo1";//全路径名的类名
            }
            public String methodName(){
                return "show";
            }
        }*/
        /*2.2   获取到注解对象后, 直接调用注解内方法*/
        String[] strs = annotation.strs();
        System.out.println("strs = " + Arrays.toString(strs));
        /*2.2   获取到注解对象后, 直接调用注解内方法*/
        Anno2 anno = annotation.anno();

        System.out.println("anno = " + anno.a());

        //获取方法上的注解；
        /*利用类字节码对象, 获取目标方法*/
        Method method = aClass.getMethod("getStr");
        /*利用API调取到注解的对象*/
        Anno1 annotation1 = method.getAnnotation(Anno1.class);
        /*注解对象调用注解内方法*/
        String[] strs1 = annotation1.strs();
        System.out.println(Arrays.toString(strs1));
        Anno2 anno1 = annotation1.anno();
        System.out.println(anno1.a());

        //获取字段上的注解
        /* 1. 利用反射技术获取到类的字节码对象,
        通过类字节码对象获取到字段字节码对象*/
        Field field = aClass.getDeclaredField("name");
        /* 2. 暴力破解, 获取到访问私有*/
        field.setAccessible(true);
        /* 3. 获取到字段上的注解对象, 需传入注解的字节码对象*/
        Anno1 annotation2 = field.getAnnotation(Anno1.class);
        /* 4. 利用到注解对象调用注解内方法.*/
        String[] strs2 = annotation2.strs();
        System.out.println(Arrays.toString(strs2));
        Anno2 anno2 = annotation2.anno();
        System.out.println(anno2.a());

        //获取方法参数上的注解
        /* 1. 获取有参方法的字节码对象: 需传入方法名和参数类型的字节码对象*/
        Method method1 = aClass.getMethod("getStr",String.class);
        /* 2. 新的API: getParameterAnnotations() 获取到参数上的二维注解数组*/
        Annotation[][] parameterAnnotations = method1.getParameterAnnotations();
        /* 3. 遍历, 取出每个注解对象*/
        for (Annotation[] parameterAnnotation : parameterAnnotations) {
            for (Annotation annotation3 : parameterAnnotation) {
                /* 4. 对注解进行判断, 是第一个注解的就执行第一个, 利用 instanceof 来判断.*/
                if(annotation3 instanceof Anno1){
                    Anno1 a = (Anno1) annotation3;
                    Anno2 anno3 = a.anno();
                    String[] strs3 = a.strs();
                }else if (annotation3 instanceof Anno2){
                    Anno2 a2 = (Anno2) annotation3;
                    int a = a2.a();
                }
            }
        }
    }
}
