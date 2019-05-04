package com.wyxeainn.service;

import com.wyxeainn.pojo.Comment;
import com.wyxeainn.pojo.Page;

import java.util.List;

public interface CommentService {
    public void insertComment(Comment comment);
    public List<Comment> getOnePageComment(Page page);
    public int recordCount(Page page);
}
