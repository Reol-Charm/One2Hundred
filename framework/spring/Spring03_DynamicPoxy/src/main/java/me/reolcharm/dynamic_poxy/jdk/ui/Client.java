/**
 * @Project: Spring03_DynamicPoxy
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-28 18:35
 * @Description:
 **/
package me.reolcharm.dynamic_poxy.ui;

import me.reolcharm.dynamic_poxy.MagicalProxy;
import me.reolcharm.dynamic_poxy.SomeoneImplNeed2BeProxied;
import me.reolcharm.dynamic_poxy.impl.Mycat;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class Client {
    public static void main(String[] args) {

        SomeoneImplNeed2BeProxied myMagicalCat = MagicalProxy.getMyMagicalCat();
        myMagicalCat.singing("Mi");
        myMagicalCat.talkShow("GET ON YOUR KNEES!");
    }
}
