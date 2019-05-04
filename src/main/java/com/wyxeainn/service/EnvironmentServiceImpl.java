package com.wyxeainn.service;

import com.wyxeainn.factory.EnvironmentMapperFac;
import com.wyxeainn.mapper.EnvironmentMapper;
import com.wyxeainn.pojo.Environment;

import java.util.List;

public class EnvironmentServiceImpl implements EnvironmentService {
    private EnvironmentMapper environmentMapper;
    public EnvironmentServiceImpl() {
        environmentMapper = EnvironmentMapperFac.getEnvironmentMapper();
    }
    @Override
    public List<Environment> getEnvironmentsByCompId(int compId) {
        return environmentMapper.getEnvironmentsByCompId(compId);
    }

    @Override
    public List<Environment> getEnvironmentsByCompIdAndBossId(Environment environment) {
        return environmentMapper.getEnvironmentsByCompIdAndBossId(environment);
    }

    @Override
    public void insertEnvironment(Environment environment) {
        environmentMapper.insertEnvironment(environment);
    }
}
