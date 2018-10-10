package me.reolcharm.reflect_annotation.day25reflect.caseinclass.docheckbuglog;


import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Method;

/**
 * 简单的测试框架
 * <p>
 * 当主方法执行后，会自动自行被检测的所有方法(加了Check注解的方法)，判断方法是否有异常，记录到文件中
 */
public class TestCheck {


    public static void main(String[] args) throws IOException {
        //1.创建计算器对象
        MyCalculator myc = new MyCalculator();
        //2.获取字节码文件对象
        Class<? extends MyCalculator> aClass = myc.getClass();
        //3.获取所有方法
        Method[] methods = aClass.getMethods();

        /* 5.1 要在此处设置计数器.*/
        int count = 0;
        /* 5.2 在此处构建字符输出流*/
        FileWriter fw = new FileWriter(new File("G:\\AllTheExercise\\Magic\\One2Hundred\\Review\\src\\me\\reolcharm\\reflect_annotation\\day25reflect\\Buglog.txt"));
        /* 3.1 遍历方法的字节码对象, */
        for (Method method : methods) {
            //4.判断方法上是否有Check注解
            if (method.isAnnotationPresent(MyCheck.class)) {
                try {
                    /*5. 调用所有的方法, 进行测试*/
                    method.invoke(myc);
                } catch (Exception e) {
                    count++;
                    fw.write(method.getName()+ " 方法出异常了");
                    fw.write(System.lineSeparator());
                    fw.write("异常的名称:" + e.getCause().getClass().getSimpleName());
                    fw.write(System.lineSeparator());
                    fw.write("异常的原因:"+e.getCause().getMessage());
                    fw.write(System.lineSeparator());
                    fw.write("--------------------------");
                    fw.write(System.lineSeparator());
                }
            }
        }

        //6.捕获异常

        //记录到文件中
        fw.write("本次测试一共出现 "+count+" 次异常");

        fw.flush();
        fw.close();
    }

}
