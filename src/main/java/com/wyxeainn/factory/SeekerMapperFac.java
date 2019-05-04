package com.wyxeainn.factory;

import com.wyxeainn.mapper.SeekerMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SeekerMapperFac {
    public static SeekerMapper getSeekerMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        SeekerMapper seekerMapper = (SeekerMapper) ac.getBean("seekerMapper");
        return seekerMapper;
    }
}
