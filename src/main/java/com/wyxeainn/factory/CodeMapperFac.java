package com.wyxeainn.factory;

import com.wyxeainn.mapper.AdminMapper;
import com.wyxeainn.mapper.CodeMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class CodeMapperFac {
    public static CodeMapper getCodeMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        CodeMapper codeMapper = (CodeMapper) ac.getBean("codeMapper");
        return codeMapper;
    }
}
