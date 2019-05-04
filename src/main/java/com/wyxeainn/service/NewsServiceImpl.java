package com.wyxeainn.service;

import com.wyxeainn.factory.NewsMapperFac;
import com.wyxeainn.mapper.NewsMapper;
import com.wyxeainn.pojo.News;
import com.wyxeainn.pojo.Page;

import java.util.List;

public class NewsServiceImpl implements NewsService {
    private NewsMapper newsMapper;
    public NewsServiceImpl() {
        newsMapper = NewsMapperFac.getNewsMapper();
    }

    @Override
    public void insertNew(News news) {
        newsMapper.insertNew(news);
    }

    @Override
    public News topGetNew(String newsType) {
        return newsMapper.topGetNew(newsType);
    }

    @Override
    public void topDeleteNew(String newsType) {
        newsMapper.topDeleteNew(newsType);
    }

    @Override
    public void topInsertNew(News news) {
        newsMapper.topInsertNew(news);
    }

    //向草稿箱插入一条新闻
    @Override
    public void draftInsertNew(News news) {
        newsMapper.draftInsertNew(news);
    }

    @Override
    public List<News> selectAllFromTop() {
        return newsMapper.selectAllFromTop();
    }

    @Override
    public List<News> selectOnePageFromPub(int start) {
        return newsMapper.selectOnePageFromPub(start);
    }

    @Override
    public List<News> selectOnePageFromPubById(Page page) {
        return newsMapper.selectOnePageFromPubById(page);
    }

    @Override
    public List<News> selectOnePageFromDraftById(Page page) {
        return newsMapper.selectOnePageFromDraftById(page);
    }

    @Override
    public List<News> selectOnePageFromTrashById(Page page) {
        return newsMapper.selectOnePageFromTrashById(page);
    }

    @Override
    public Integer recordCountPub() {
        return newsMapper.recordCountPub();
    }

    @Override
    public News selectPubById(String id) {
        return newsMapper.selectPubById(id);
    }

    @Override
    public News selectDraftById(String id) {
        return newsMapper.selectDraftById(id);
    }

    @Override
    public News selectTrashById(String id) {
        return newsMapper.selectTrashById(id);
    }

    @Override
    public News selectTopById(String id) {
        return newsMapper.selectTopById(id);
    }

    @Override
    public Integer recordCount(String tableName) {
        return newsMapper.recordCount(tableName);
    }

    /**
     * 通过id更新pub表的content
     * @param news
     */
    @Override
    public void updatePubContentById(News news) {
        newsMapper.updatePubContentById(news);
    }

    /*
       通过id更新top表的content
    * */
    @Override
    public void updateTopContentById(News news) {
        newsMapper.updateTopContentById(news);
    }

    /**
     * 根据id从news_pub中删除
     * @param id
     */
    @Override
    public void pubDeleteById(String id) {
        newsMapper.pubDeleteById(id);
    }

    //寻找某个作者某个类型中最新的一篇
    @Override
    public News pubLastestNewByType(News news) {
        return newsMapper.pubLastestNewByType(news);
    }

    /*按照许多条件查询*/
    @Override
    public List<News> selectByCondition(Page page) {
        return newsMapper.selectByCondition(page);
    }

    /*按照许多条件查询记录条数*/
    @Override
    public Integer countByCondition(Page page) {
        return newsMapper.countByCondition(page);
    }

    @Override
    public void draftDeleteById(String id) {
        newsMapper.draftDeleteById(id);
    }

    @Override
    public void trashDeleteById(String id) {
        newsMapper.trashDeleteById(id);
    }

    @Override
    public void trashInsertNew(News news) {
        newsMapper.trashInsertNew(news);
    }
}
