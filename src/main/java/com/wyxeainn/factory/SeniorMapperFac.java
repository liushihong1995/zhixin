package com.wyxeainn.factory;

import com.wyxeainn.mapper.AdminMapper;
import com.wyxeainn.mapper.SeniorMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SeniorMapperFac {
    public static SeniorMapper getSeniorMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        SeniorMapper seniorMapper = (SeniorMapper) ac.getBean("seniorMapper");
        return seniorMapper;
    }
}
