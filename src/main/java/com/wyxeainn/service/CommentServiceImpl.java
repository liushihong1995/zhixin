package com.wyxeainn.service;

import com.wyxeainn.factory.CommentMapperFac;
import com.wyxeainn.mapper.CommentMapper;
import com.wyxeainn.pojo.Comment;
import com.wyxeainn.pojo.Page;

import java.util.List;

public class CommentServiceImpl implements CommentService {
    private CommentMapper commentMapper;
    public CommentServiceImpl() {
        commentMapper = CommentMapperFac.getCommentMapper();
    }
    @Override
    public void insertComment(Comment comment) {
        commentMapper.insertComment(comment);
    }

    @Override
    public List<Comment> getOnePageComment(Page page) {
        return commentMapper.getOnePageComment(page);
    }

    @Override
    public int recordCount(Page page) {
        return commentMapper.recordCount(page);
    }
}
