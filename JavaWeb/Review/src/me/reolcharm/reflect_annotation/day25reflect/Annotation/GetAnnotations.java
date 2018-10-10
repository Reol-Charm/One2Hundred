package me.reolcharm.reflect_annotation.day25reflect.Annotation;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Arrays;

@Anno1(strs={"a","b"},anno = @Anno2(a=10))
public class GetAnnotations {

    @Anno1(strs={"c","d"},anno = @Anno2(a=100))
    private String name;

    @Anno1(strs={"e","f"},anno = @Anno2(a=1000))
    public void getStr(){

    }
    public void getStr(@Anno1(strs={"g","h"},anno = @Anno2(a=10000)) @Anno2(a=20) String s){

    }


    public static void main(String[] args) throws Exception {
        //1. 获取类上的注解；
        Class<GetAnnotations> testClass = GetAnnotations.class;
        /*2. 获取类上的注解,有对应的两个属性值*/
        /*2.1  getAnnotation()的效果:
        其实就是在内存中生成了一个该注解接口的子类实现对象,--> 返回实现类的对象.

        public class ProImpl implements Pro{
            public String className(){
                return "cn.itcast.annotation.Demo1";//全路径名的类名
            }
            public String methodName(){
                return "show";
            }
        }*/
        Anno1 annotation = testClass.getAnnotation(Anno1.class);
        /*2.2   获取到注解对象后, 直接调用注解内方法*/
        String[] strs = annotation.strs();
        /*2.2   获取到注解对象后, 直接调用注解内方法*/
        Anno2 anno = annotation.anno();

        System.out.println(Arrays.toString(strs));
        System.out.println(anno.a());
/*
        //获取方法上的注解；
        Method method = testClass.getMethod("getStr");
        Anno1 annotation1 = method.getAnnotation(Anno1.class);
        String[] strs1 = annotation1.strs();
        System.out.println(Arrays.toString(strs1));
        Anno2 anno1 = annotation1.anno();
        System.out.println(anno1.a());

        //获取字段上的注解
        Field field = testClass.getDeclaredField("name");
        field.setAccessible(true);
        Anno1 annotation2 = field.getAnnotation(Anno1.class);
        String[] strs2 = annotation2.strs();
        System.out.println(Arrays.toString(strs2));
        Anno2 anno2 = annotation2.anno();
        System.out.println(anno2.a());
*/
        //获取方法参数上的注解
        Method method1 = testClass.getMethod("getStr",String.class);
//        获取到参数上的注解数组, 多个参数可能有多个.
        Annotation[][] parameterAnnotations = method1.getParameterAnnotations();
        for (Annotation[] parameterAnnotation : parameterAnnotations) {
//
            for (Annotation annota : parameterAnnotation) {
                /* 判断是哪个注解 */
                if (annota instanceof Anno1) {
                    Anno1 a = (Anno1) annota;
                    /* 调用注解内方法 */
                    Anno2 anno3 = a.anno();
                    String[] strs3 = a.strs();
                } else if (annota instanceof Anno2) {
                    Anno2 a2 = (Anno2) annota;
                    int a = a2.a();
                }
            }
        }
    }
}
