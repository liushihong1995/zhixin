package com.wyxeainn.pojo;

import java.util.Date;
/**
 * 封装网站资讯对象
 */
public class News {
    //新闻编号
    private String id;
    //新闻标题
    private String title;
    //新闻内容
    private String content;
    //新闻作者ID
    private int authorId;
    //新闻作者
    private String author;
    //文章类型
    private String newsType;
    //文章发布时间
    private String pubTime;
    //文章最后一次修改时间
    private String lastUpdateTime;
    //封面地址
    private String psrc;

    public String getId() {
        return id;
    }

    public void setId(String id ){
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public String getNewsType() {
        return newsType;
    }

    public void setNewsType(String newsType) { this.newsType = newsType; }

    public String getPubTime() {
        return pubTime;
    }

    public void setPubTime(String pubTime) {
        this.pubTime = pubTime;
    }

    public String getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(String lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    public String getPsrc() {
        return psrc;
    }

    public void setPsrc(String psrc) {
        this.psrc = psrc;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
