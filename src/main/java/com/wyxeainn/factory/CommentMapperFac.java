package com.wyxeainn.factory;

import com.wyxeainn.mapper.CommentMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class CommentMapperFac {
    public static CommentMapper getCommentMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        CommentMapper commentMapper = (CommentMapper) ac.getBean("commentMapper");
        return commentMapper;
    }
}
