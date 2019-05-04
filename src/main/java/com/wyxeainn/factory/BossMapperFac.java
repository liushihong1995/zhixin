package com.wyxeainn.factory;

import com.wyxeainn.mapper.ArticleMapper;
import com.wyxeainn.mapper.BossMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class BossMapperFac {
    public static BossMapper getBossMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        BossMapper bossMapper = (BossMapper) ac.getBean("bossMapper");
        return bossMapper;
    }
}
