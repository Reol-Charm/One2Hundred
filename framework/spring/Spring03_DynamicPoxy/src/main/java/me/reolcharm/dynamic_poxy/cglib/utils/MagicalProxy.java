/**
 * @Project: Spring03_DynamicPoxy
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-28 17:12
 * @Description:
 **/
package me.reolcharm.dynamic_poxy.cglib.utils;

import me.reolcharm.dynamic_poxy.cglib.impl.Mycat;
import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * @author Reolcharm
 * @Param
 * @return
 * @date 2018/10/28-17:12
 * @desc do magical things to my cat.
 */
public class MagicalProxy {

    public static Mycat getMyMagicalCat() {
        Mycat mycat = new Mycat();
        /* 接口名 接口代理实现类 = (接口名)Proxy.newProxyInstance() */
//        SomeoneImplNeed2BeProxied myMagicalCat = (SomeoneImplNeed2BeProxied) Proxy.newProxyInstance(
        mycat = (Mycat) Enhancer.create(mycat.getClass(), new MethodInterceptor() {
            @Override
            public Object intercept(Object o, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
                String name = method.getName();
                Object rtValue = null;
                Object[] says = new Object[5];
                System.arraycopy(args, 0, says, 0, 1);
                says[1] = "GET ON YOUR KNEES!";
                if ("singing".equalsIgnoreCase(name)) {
                    /*前置通知*/
                    System.out.println("I am a magician .");
                    /* 执行指定方法 */
                    rtValue = method.invoke(Mycat.class.newInstance(), args);
                    System.out.println("I say your cat can singing, and she will sing for you.");
                    System.out.println("mY cat: " + args[0] + "mimimimi");
                    return rtValue;
                }
                System.out.println("-------------------------");
                if ("talkShow".equalsIgnoreCase(name)) {
                    /*前置通知*/
                    System.out.println("I am a magician. And I'm back!");
                    /* 执行指定方法 */
                    method.invoke(Mycat.class.newInstance(), args);
                    /*rtValue =*/
                    System.out.println("I say your cat can talk, and she will say hello to you.");
                    System.out.println("mY cat Says: " + says[1]);
                    return rtValue;
                }
                return rtValue;
            }
        });
        return mycat;
    }
}
