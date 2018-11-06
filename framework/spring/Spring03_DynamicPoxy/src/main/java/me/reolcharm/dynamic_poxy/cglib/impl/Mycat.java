/**
 * @Project: Spring03_DynamicPoxy
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-28 17:01
 * @Description:
 **/
package me.reolcharm.dynamic_poxy.cglib.impl;

public class Mycat {

    public Integer singing(String magicalSong) {
        Integer mi = 0;
        System.out.println("---My cat wasn't able to sing a song for me.---");
        System.out.println("---mY cat: " + magicalSong + "!---");
        return mi;
    }

    public void talkShow(String helloStrs) {
        System.out.println("---Sorry, My cat can not talk to me.---");
        System.out.println("---mY cat: \'" + helloStrs + "\'---");
    }
}
