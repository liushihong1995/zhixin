package com.wyxeainn.factory;

import com.wyxeainn.mapper.PracticeMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class PracticeMapperFac {
    public static PracticeMapper getPracticeMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        PracticeMapper practiceMapper = (PracticeMapper) ac.getBean("practiceMapper");
        return practiceMapper;
    }
}
