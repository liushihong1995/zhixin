package com.wyxeainn.factory;

import com.wyxeainn.mapper.AdminMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * 产生AdminMapper接口的实现类的工厂
 */
public class AdminMapperFac {
    public static AdminMapper getAdminMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        AdminMapper adminMapper = (AdminMapper) ac.getBean("adminMapper");
        return adminMapper;
    }
}
