package me.reolcharm.reflect_annotation.day25reflect.Reflect;


import me.reolcharm.reflect_annotation.day25reflect.caseinclass.mygetproperties.Person;

import java.io.FileInputStream;
import java.lang.reflect.Method;
import java.util.Properties;

public class Case {

    /**
     * 需求：写一个"框架"，不能改变该类的任何代码的前提下，可以帮我们创建任意类的对象，并且执行其中任意方法
     * 实现：
     * 1. 配置文件
     * 2. 反射
     * 步骤：
     * 1. 将需要创建的对象的全类名和需要执行的方法定义在配置文件中
     * 2. 在程序中加载读取配置文件
     * 3. 使用反射技术来加载类文件进内存
     * 4. 创建对象
     * 5. 执行方法
     */
    public static void main(String[] args) throws Exception {

        /* 1. 创建properties 对象*/
        Properties pro = new Properties();

        /*2. 加载相对路径下的 properties 文件.*/
        pro.load(new FileInputStream("/Hello.properties"));

        /*3. 获取 properties 文件内容*/
        String className = pro.getProperty("ClassName");
        String methodName = pro.getProperty("MethodName");

        /*4. 知道类名称后和方法名称后, 获取类字节码对象.*/
        Class<?> aClass = Class.forName(className);
        /*5. 通过类字节码对象调用类中方法, 传入读取到的方法名称, 以及(参数类型.class),有多少参数类型就写出来.*/
        Method method = aClass.getMethod(methodName);
        Person p = new Person();
        //todo 后续操作.调用方法的步骤.查看示例.java文件
        //todo Filed Constructor Method 方法中的参数,查 api.
//        Object o = method.invoke(p, String.class);
//        System.out.println("o = " + o);
        method.invoke(aClass.newInstance());
    }
}
