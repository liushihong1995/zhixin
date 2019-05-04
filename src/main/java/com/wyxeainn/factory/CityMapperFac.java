package com.wyxeainn.factory;

import com.wyxeainn.mapper.CityMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class CityMapperFac {
    public static CityMapper getCityMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        CityMapper cityMapper = (CityMapper) ac.getBean("cityMapper");
        return cityMapper;
    }
}
