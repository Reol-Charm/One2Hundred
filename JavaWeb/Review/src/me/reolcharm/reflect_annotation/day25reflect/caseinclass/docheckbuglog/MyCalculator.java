package me.reolcharm.reflect_annotation.day25reflect.caseinclass.docheckbuglog;

public class MyCalculator {
    //加法
    @MyCheck
    public void add() {
        String str = null;
        str.toString();
        System.out.println("1 + 0 =" + (1 + 0));
    }

    //减法
    @MyCheck
    public void sub() {
        System.out.println( "1 - 0 =" + (1 - 0));
    }

    //乘法
    @MyCheck
    public void mul() {
        System.out.println("1 * 0 =" + (1 * 0));
    }

    //除法
    @MyCheck
    public void div() {
        System.out.println("1 / 0 =" + (1 / 0));
    }


    public void show() {
        System.out.println("永无bug...");
    }
}
