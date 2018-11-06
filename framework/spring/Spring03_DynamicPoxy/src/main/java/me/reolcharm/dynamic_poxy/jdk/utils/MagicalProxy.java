/**
 * @Project: Spring03_DynamicPoxy
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-28 17:12
 * @Description:
 **/
package me.reolcharm.dynamic_poxy;

import me.reolcharm.dynamic_poxy.impl.Mycat;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * @author Reolcharm
 * @Param
 * @return
 * @date 2018/10/28-17:12
 * @desc do magical things to my cat.
 */
public class MagicalProxy {
    public static SomeoneImplNeed2BeProxied getMyMagicalCat() {
        final Mycat mycat = new Mycat();

        SomeoneImplNeed2BeProxied myMagicalCat = (SomeoneImplNeed2BeProxied) Proxy.newProxyInstance(
                mycat.getClass().getClassLoader(),
                mycat.getClass().getInterfaces(),
                new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        String name = method.getName();
                        Object rtValue = null;

                        if ("singing".equalsIgnoreCase(name)) {
                            /*前置通知*/
                            System.out.println("I am a magic shower.");
                            /* 执行指定方法 */
                            rtValue = method.invoke(mycat, args);
                            System.out.println("I say your cat can singing, and she will Mi to you.");
                            System.out.println("mY cat: " + args[0] + "mimimimi");
                            return rtValue;
                        }
                        if ("talkShow".equalsIgnoreCase(name)) {
                            /*前置通知*/
                            System.out.println("I am a magic shower. I'm back!");
                            /* 执行指定方法 */
                            /*rtValue =*/
                            System.out.println("I say your cat can talk, and she will say hello to you.");
                            System.out.println("mY cat: " + args[0]);
                            method.invoke(Mycat.class.newInstance(), args[0]);
                            //      rtValue = null
//                            System.out.println("rtValue = " + rtValue);
                            return rtValue;
                        }
                        return rtValue;
                    }
                });

        return myMagicalCat;
    }
}
