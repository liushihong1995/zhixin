package com.wyxeainn.service;

import com.wyxeainn.pojo.Environment;

import java.util.List;

public interface EnvironmentService {
    public List<Environment> getEnvironmentsByCompId(int compId);
    public List<Environment> getEnvironmentsByCompIdAndBossId(Environment environment);
    public void insertEnvironment(Environment environment);
}
