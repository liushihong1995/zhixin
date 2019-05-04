package com.wyxeainn.service;

import com.wyxeainn.factory.ArticleMapperFac;
import com.wyxeainn.mapper.ArticleMapper;
import com.wyxeainn.pojo.Page;
import com.wyxeainn.service.ArticleService;
import com.wyxeainn.pojo.Article;

import java.util.List;

public class ArticleServiceImpl implements ArticleService {

    private ArticleMapper articleMapper;

    public ArticleServiceImpl() {
        articleMapper = ArticleMapperFac.getArticleMapper();
    }

    @Override
    public void insertArticle(Article article) {
        articleMapper.insertArticle(article);
    }

    @Override
    public int getArticleCount() {
        return articleMapper.getArticleCount();
    }

    @Override
    public List<Article> getOnePageArticle(Page page) {
        return articleMapper.getOnePageArticle(page);
    }

    @Override
    public Article getArticleById(Integer id) {
        return articleMapper.getArticleById(id);
    }

    @Override
    public void updateVisit(Article article) {
        articleMapper.updateVisit(article);
    }

    @Override
    public void updateReply(Article article) {
        articleMapper.updateReply(article);
    }

    @Override
    public List<Article> getHot() {
        return articleMapper.getHot();
    }
}
