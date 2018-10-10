package me.reolcharm.reflect_annotation.day25reflect.caseinclass.docheckbuglog;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Method;

/**
 * 简单的测试框架
 * <p>
 * 当主方法执行后，会自动自行被检测的所有方法(加了Check注解的方法)，判断方法是否有异常，记录到文件中
 */
public class MyCheckTest {
    public static void main(String[] args) throws IOException {
        /* 1. 创建被检测得对象*/
        MyCalculator mc = new MyCalculator();
        /* 2. 为获取所有方法的字节码对象, 需创建类的字节码对象.*/
        Method[] methods = mc.getClass().getMethods();
        /* 5.1 声明计数器.*/
        int count = 0;
        /* 5.2 创建缓冲字符流, 方便向日志中写入, 并调用特殊 newLine() 方法*/
        BufferedWriter bw = new BufferedWriter(new FileWriter("G:\\AllTheExercise\\Magic\\One2Hundred\\Review\\src\\me\\reolcharm\\reflect_annotation\\day25reflect\\Buglog.txt"));
//        "G:\\AllTheExercise\\Magic\\employ-code\\day25-code\\src\\cn\\itcast\\day25reflect\\caseinclass\\getproperties\\Buglog.txt"
        /* 3. 遍历方法字节码数组, 取得每一个方法字节码*/
        for (Method method : methods) {
            /* 4. 判断, 如果方法上有注解, 就运行方法, 捕获方法报出的异常*/
            if (method.isAnnotationPresent(MyCheck.class)) {
                try {
                    method.invoke(mc);
                } catch (Exception e) {
                    /* 5. 计数器(记录异常次数)增加, 并向异常日志中写入数据*/
                    count++;
                    bw.write("本次异常方法是: " + method.getName());
                    bw.newLine();
                    bw.write("异常名称: "
                            + e.getCause().getClass().getSimpleName());
                    bw.newLine();
//                    bw.write("异常原因: " + e.getMessage());
                    bw.write("异常原因: " + e.getCause().getMessage());

                    bw.newLine();
                    bw.write("---------------------");
                    bw.newLine();
                }
            }
        }
        System.out.println("本次测试共出现: " + count + " 次异常.");
        /* 6. 刷新缓存区, 写入数据*/
        bw.flush();
        bw.close();
    }
}
