package com.wyxeainn.pojo;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class Cate {
    private String simple;
    private String first;
    private Set<String> second;
    private Map<String, List<String>> map;
    private int id;
    public String getSimple(){
        return simple;
    }
    public void setSimple(String simple){
        this.simple = simple;
    }

    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }
    public String getFirst(){
        return first;
    }
    public void setFirst(String first){
        this.first = first;
    }

    public void setMap(Map<String,List<String>> map) {
        this.map = map;
    }

    public Map<String,List<String>> getMap(){
        return map;
    }
    public Set<String> getSecond(){
        return second;
    }
    public void setSecond(Set<String> second) {
        this.second = second;
    }
}
