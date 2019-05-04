package com.wyxeainn.mapper;

import com.wyxeainn.pojo.Environment;

import java.util.List;

public interface EnvironmentMapper {
    public List<Environment> getEnvironmentsByCompId(int compId);
    public List<Environment> getEnvironmentsByCompIdAndBossId(Environment environment);
    public void insertEnvironment(Environment environment);
}
