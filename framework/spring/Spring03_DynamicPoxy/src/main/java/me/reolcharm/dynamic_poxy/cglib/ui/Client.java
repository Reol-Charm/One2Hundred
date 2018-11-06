/**
 * @Project: Spring03_DynamicPoxy
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-28 18:35
 * @Description:
 **/
package me.reolcharm.dynamic_poxy.cglib.ui;

import me.reolcharm.dynamic_poxy.cglib.impl.Mycat;
import me.reolcharm.dynamic_poxy.cglib.utils.MagicalProxy;

public class Client {
    public static void main(String[] args) {
        Mycat myMagicalCat = MagicalProxy.getMyMagicalCat();

        myMagicalCat.singing("Mi");
        myMagicalCat.talkShow("Mi");
    }
}
