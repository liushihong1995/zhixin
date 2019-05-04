package com.wyxeainn.mapper;

import com.wyxeainn.pojo.Comment;
import com.wyxeainn.pojo.Page;

import java.util.List;

public interface CommentMapper {
    public void insertComment(Comment comment);
    public List<Comment> getOnePageComment(Page page);
    public int recordCount(Page page);
}
