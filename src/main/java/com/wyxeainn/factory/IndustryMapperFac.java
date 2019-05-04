package com.wyxeainn.factory;

import com.wyxeainn.mapper.AdminMapper;
import com.wyxeainn.mapper.IndustryMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class IndustryMapperFac {
    public static IndustryMapper getIndustryMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        IndustryMapper industryMapper = (IndustryMapper) ac.getBean("industryMapper");
        return industryMapper;
    }
}
