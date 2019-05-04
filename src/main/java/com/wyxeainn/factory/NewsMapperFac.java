package com.wyxeainn.factory;

import com.wyxeainn.mapper.NewsMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class NewsMapperFac {
    public static NewsMapper getNewsMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        NewsMapper newsMapper = (NewsMapper) ac.getBean("newsMapper");
        return newsMapper;
    }
}
