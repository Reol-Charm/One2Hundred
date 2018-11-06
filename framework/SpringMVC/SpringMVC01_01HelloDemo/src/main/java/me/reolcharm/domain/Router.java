/**
 * @Project: SpringMVC01_01HelloDemo
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-01 21:17
 * @Description:
 **/
package me.reolcharm.domain;

import java.io.Serializable;

public class Router implements Serializable {
    private String rname;
    private Double rprice;

    @Override
    public String toString() {
        return "Router{" +
                "rname='" + rname + '\'' +
                ", rprice=" + rprice +
                '}';
    }

    public String getRname() {
        return rname;
    }

    public void setRname(String rname) {
        this.rname = rname;
    }

    public Double getRprice() {
        return rprice;
    }

    public void setRprice(Double rprice) {
        this.rprice = rprice;
    }
}
