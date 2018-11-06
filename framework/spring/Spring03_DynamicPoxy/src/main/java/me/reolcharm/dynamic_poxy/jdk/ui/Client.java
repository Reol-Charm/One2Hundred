/**
 * @Project: Spring03_DynamicPoxy
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-28 18:35
 * @Description:
 **/
package me.reolcharm.dynamic_poxy.jdk.ui;

import me.reolcharm.dynamic_poxy.jdk.utils.MagicalProxy;
import me.reolcharm.dynamic_poxy.jdk.SomeoneImplNeed2BeProxied;

public class Client {
    public static void main(String[] args) {

        SomeoneImplNeed2BeProxied myMagicalCat = MagicalProxy.getMyMagicalCat();
        myMagicalCat.singing("Mi");
        myMagicalCat.talkShow("GET ON YOUR KNEES!");
    }
}
