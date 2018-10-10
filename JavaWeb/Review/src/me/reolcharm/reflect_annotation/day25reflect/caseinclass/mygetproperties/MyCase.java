package me.reolcharm.reflect_annotation.day25reflect.caseinclass.mygetproperties;

import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Properties;

public class MyCase {
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
    public static void main(String[] args) {
        /*1. 创建properties 对象*/
        Properties pro = new Properties();
        try {
            pro.load(new FileInputStream("G:\\AllTheExercise\\Magic\\One2Hundred\\Review\\src\\Hello.properties")/*MyCase.class.getResourceAsStream("./Hello.properties")*/);
            String className = pro.getProperty("ClassName");
            Class<?> aClass = Class.forName(className);
            /* 获取到 method 对象 */
            String methodName = pro.getProperty("MethodName");
            Method method = aClass.getMethod(methodName);
            /* 执行 method 内方法*/
            method.invoke(aClass.newInstance());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
