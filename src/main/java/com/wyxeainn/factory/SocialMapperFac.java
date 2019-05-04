package com.wyxeainn.factory;

import com.wyxeainn.mapper.CityMapper;
import com.wyxeainn.mapper.SocialMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SocialMapperFac {
    public static SocialMapper getSocialMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        SocialMapper socialMapper = (SocialMapper) ac.getBean("socialMapper");
        return socialMapper;
    }
}
