package com.wyxeainn.factory;

import com.wyxeainn.mapper.AdminMapper;
import com.wyxeainn.mapper.EnvironmentMapper;
import com.wyxeainn.pojo.Environment;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class EnvironmentMapperFac {
    public static EnvironmentMapper getEnvironmentMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        EnvironmentMapper environmentMapper = (EnvironmentMapper) ac.getBean("environmentMapper");
        return environmentMapper;
    }
}
