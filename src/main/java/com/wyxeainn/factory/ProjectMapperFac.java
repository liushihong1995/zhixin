package com.wyxeainn.factory;

import com.wyxeainn.mapper.ProjectMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class ProjectMapperFac {
    public static ProjectMapper getProjectMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        ProjectMapper projectMapper = (ProjectMapper) ac.getBean("projectMapper");
        return projectMapper;
    }
}
