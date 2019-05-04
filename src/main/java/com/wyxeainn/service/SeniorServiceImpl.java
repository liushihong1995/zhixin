package com.wyxeainn.service;

import com.wyxeainn.factory.SeniorMapperFac;
import com.wyxeainn.mapper.SeniorMapper;
import com.wyxeainn.pojo.Senior;

import java.util.List;

public class SeniorServiceImpl implements SeniorService{
    private SeniorMapper seniorMapper;

    public SeniorServiceImpl() {
        seniorMapper = SeniorMapperFac.getSeniorMapper();
    }

    @Override
    public List<Senior> getSeniors(Senior senior) {
        return seniorMapper.getSeniors(senior);
    }

    @Override
    public Senior getSeniorById(int id) {
        return seniorMapper.getSeniorById(id);
    }

    @Override
    public void insertSenior(Senior senior) {
        seniorMapper.insertSenior(senior);
    }

    @Override
    public void updateSenior(Senior senior) {
        seniorMapper.updateSenior(senior);
    }

    @Override
    public List<Senior> getSeniorByCompId(int compId) {
        return seniorMapper.getSeniorByCompId(compId);
    }
}
