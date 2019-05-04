package com.wyxeainn.service;

import com.wyxeainn.pojo.Article;
import com.wyxeainn.pojo.Page;

import java.util.List;

public interface ArticleService {
    public void insertArticle(Article article);
    public int getArticleCount();
    public List<Article> getOnePageArticle(Page page);
    public Article getArticleById(Integer id);
    public void updateVisit(Article article);
    public void updateReply(Article article);
    public List<Article> getHot();
}
