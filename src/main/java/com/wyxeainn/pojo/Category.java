package com.wyxeainn.pojo;

import java.io.Serializable;
import java.util.Map;
import java.util.Set;

public class Category implements Serializable {

    private String simple;
    private String first;
    private Set<String> second;
    private Map<String,Integer> idMap;
    private Map<String, Map<String,Integer>> map;
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

    public void setMap(Map<String,Map<String,Integer>> map) {
        this.map = map;
    }

    public Map<String, Integer> getIdMap() {
        return idMap;
    }

    public void setIdMap(Map<String, Integer> idMap) {
        this.idMap = idMap;
    }

    public Map<String,Map<String,Integer>> getMap(){
        return map;
    }
    public Set<String> getSecond(){
        return second;
    }
    public void setSecond(Set<String> second) {
        this.second = second;
    }

}
