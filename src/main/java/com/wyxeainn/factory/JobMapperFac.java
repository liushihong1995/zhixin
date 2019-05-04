package com.wyxeainn.factory;

import com.wyxeainn.mapper.JobMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class JobMapperFac {
    public static JobMapper getJobMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        JobMapper jobMapper = (JobMapper) ac.getBean("jobMapper");
        return jobMapper;
    }
}
