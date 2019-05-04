package com.wyxeainn.service;

import com.wyxeainn.pojo.News;
import com.wyxeainn.pojo.Page;

import java.util.List;

public interface NewsService {
    public void insertNew(News news);
    public News topGetNew(String newsType);
    public void topDeleteNew(String newsType);
    public void topInsertNew(News news);
    public void draftInsertNew(News news);
    public void trashInsertNew(News news);
    public void pubDeleteById(String id);
    public void draftDeleteById(String id);
    public void trashDeleteById(String id);
    public List<News> selectAllFromTop();
    public List<News> selectOnePageFromPub(int start);
    public Integer recordCountPub();
    public News selectPubById(String id);
    public News selectDraftById(String id);
    public News selectTrashById(String id);
    public News selectTopById(String id);
    public Integer recordCount(String tableName);
    public List<News> selectOnePageFromPubById(Page page);
    public List<News> selectOnePageFromDraftById(Page page);
    public List<News> selectOnePageFromTrashById(Page page);
    public void updatePubContentById(News news);
    public void updateTopContentById(News news);
    public News pubLastestNewByType(News news);
    public List<News> selectByCondition(Page page);
    public Integer countByCondition(Page page);
}
