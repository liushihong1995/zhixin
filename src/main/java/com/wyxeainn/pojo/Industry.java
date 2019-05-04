package com.wyxeainn.pojo;

/*
封装行业，职类的类
*/
public class Industry {
    private int id;
    private String first;
    private String second;
    private String third;
    private String simple;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSimple() {
        return simple;
    }

    public void setSimple(String simple) {
        this.simple = simple;
    }

    public String getFirst() {
        return first;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    public String getSecond() {
        return second;
    }

    public void setSecond(String second) {
        this.second = second;
    }

    public String getThird() {
        return third;
    }

    public void setThird(String third) {
        this.third = third;
    }

    public String toString(){
        return "[" + "first=" + first + ",second=" + second + ",third=" + third + "]";
    }
}
