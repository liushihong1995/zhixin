package com.wyxeainn.factory;

import com.wyxeainn.mapper.HopeMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class HopeMapperFac {
    public static HopeMapper getHopeMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        HopeMapper hopeMapper = (HopeMapper) ac.getBean("hopeMapper");
        return hopeMapper;
    }
}
