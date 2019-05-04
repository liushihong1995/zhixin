package com.wyxeainn.service;

import com.wyxeainn.pojo.Project;

import java.util.List;

public interface ProjectService {
    public List<Project> selectProjectByUserId(int userId);
    public int insertProject(Project project);
    public void updateProject(Project project);
}
