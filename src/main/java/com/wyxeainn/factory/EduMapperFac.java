package com.wyxeainn.factory;

import com.wyxeainn.mapper.EducationMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class EduMapperFac {
    public static EducationMapper getEduMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        EducationMapper eduMapper = (EducationMapper) ac.getBean("educationMapper");
        return eduMapper;
    }
}
