package com.wyxeainn.mapper;

import com.wyxeainn.pojo.News;
import com.wyxeainn.pojo.Page;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/**
 * 操作新闻资讯的接口
 */
public interface NewsMapper {
    //向发布表插入一条新闻信息
    public void insertNew(News news);

    public News topGetNew(@Param("newsType") String newsType);

    public void topDeleteNew(@Param("newsType") String newsType);

    public void topInsertNew(News news);
    public void draftInsertNew(News news);
    public void trashInsertNew(News news);

    public void pubDeleteById(@Param("id") String id);
    public void draftDeleteById(@Param("id") String id);
    public void trashDeleteById(@Param("id") String id);

    public List<News> selectAllFromTop();

    public List<News> selectOnePageFromPub(Integer start);

    public List<News> selectOnePageFromPubById(Page page);
    public List<News> selectOnePageFromDraftById(Page page);
    public List<News> selectOnePageFromTrashById(Page page);
    public Integer recordCountPub();
    public News selectPubById(@Param("id")String id);
    public News selectDraftById(@Param("id")String id);
    public News selectTrashById(@Param("id")String id);
    public News selectTopById(@Param("id")String id);
    public Integer recordCount(@Param("tableName")String tableName);
    public void updatePubContentById(News news);
    public void updateTopContentById(News news);
    public News pubLastestNewByType(News news);
    public List<News> selectByCondition(Page page);
    public Integer countByCondition(Page page);


}
