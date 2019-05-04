package com.wyxeainn.factory;

import com.wyxeainn.mapper.CompanyMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class CompanyMapperFac {
    public static CompanyMapper getCompanyMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        CompanyMapper companyMapper = (CompanyMapper) ac.getBean("companyMapper");
        return companyMapper;
    }
}
