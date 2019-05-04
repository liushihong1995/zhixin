package com.wyxeainn.service;

import com.wyxeainn.factory.ProjectMapperFac;
import com.wyxeainn.mapper.ProjectMapper;
import com.wyxeainn.pojo.Project;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {
    private ProjectMapper projectMapper;
    public ProjectServiceImpl() {
        projectMapper = ProjectMapperFac.getProjectMapper();
    }
    @Override
    public List<Project> selectProjectByUserId(int userId) {
        return projectMapper.selectProjectByUserId(userId);
    }

    @Override
    public int insertProject(Project project) {
        projectMapper.insertProject(project);
        return project.getId();
    }

    @Override
    public void updateProject(Project project) {
        projectMapper.updateProject(project);
    }
}
