package com.wyxeainn.mapper;

import com.wyxeainn.pojo.Project;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProjectMapper {
    public List<Project> selectProjectByUserId(int userId);
    public int insertProject(Project project);
    public void updateProject(Project project);
}
