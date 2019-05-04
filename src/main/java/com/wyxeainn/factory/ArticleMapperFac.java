package com.wyxeainn.factory;

import com.wyxeainn.mapper.ArticleMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class ArticleMapperFac {
    public static ArticleMapper getArticleMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        ArticleMapper articleMapper = (ArticleMapper) ac.getBean("articleMapper");
        return articleMapper;
    }
}
