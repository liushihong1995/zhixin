package com.wyxeainn.service;

import com.wyxeainn.pojo.Senior;

import java.util.List;

public interface SeniorService {
    public List<Senior> getSeniors(Senior senior);
    public Senior getSeniorById(int id);
    public void insertSenior(Senior senior);
    public void updateSenior(Senior senior);
    public List<Senior> getSeniorByCompId(int compId);
}
