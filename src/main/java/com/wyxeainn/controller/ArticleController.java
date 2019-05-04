package com.wyxeainn.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSONPObject;
import com.wyxeainn.pojo.*;
import com.wyxeainn.service.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ArticleController {

    private ArticleService articleService = new ArticleServiceImpl();
    private CommentService commentService = new CommentServiceImpl();
    private BossService bossService = new BossServiceImpl();
    private SeekerService seekerService = new SeekerServiceImpl();

    @RequestMapping(value = "article/insertArticle.action")
    public @ResponseBody boolean insertArticle(@RequestBody Article article) {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        article.setTime(sdf.format(date));
        //articleService = new ArticleServiceImpl();
        boolean flag = true;
        try {
            articleService.insertArticle(article);
        } catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    /**
     * 分享文章的分页处理。
     * @param params
     * @return
     */
    @RequestMapping(value = "article/getPage.action")
    public @ResponseBody String getPageArticle(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String type = obj.getString("type");
        if(type.equals("全部")){
            type = "%";
        }else {
            type = "%" + type + "%";
        }
        int currentPage = obj.getInteger("currentPage");
       // articleService = new ArticleServiceImpl();
       // seekerService = new SeekerServiceImpl();
       // bossService = new BossServiceImpl();
        int totalPage = articleService.getArticleCount();
        if(totalPage%10==0) {
            totalPage = totalPage/10;
        }else {
            totalPage = totalPage/10 + 1;
        }
        Page page = new Page();
        page.setStart((currentPage-1)*10);
        page.setStep(10);
        page.setType(type);
        List<Article> list = articleService.getOnePageArticle(page);
        List<Integer> seekerIds = new ArrayList<Integer>();
        List<Integer> bossIds = new ArrayList<Integer>();
        for(int i = 0; i < list.size(); i++) {
            String str = list.get(i).getTime();
            int index = str.indexOf(" ");
            list.get(i).setTime(str.substring(0,index));
            if(list.get(i).getStatus().equals("seeker")) {
                seekerIds.add(list.get(i).getUserId());
            }else {
                bossIds.add(list.get(i).getUserId());
            }
        }
        List<Seeker> seekers = new ArrayList<Seeker>();
        if(seekerIds.size()!=0) {
            seekers = seekerService.selectNameAndPhoto(seekerIds);
        }
        List<Boss> bosses = new ArrayList<Boss>();
        if(bossIds.size() != 0) {
            bosses = bossService.selectNickAndPhoto(bossIds);
        }
        for(int i = 0; i < list.size(); i++) {
            for(int j = 0; j < seekers.size(); j++) {
                if(list.get(i).getUserId()==seekers.get(j).getId() && list.get(i).getStatus().equals("seeker")){
                    list.get(i).setUserName(seekers.get(j).getSname());
                    list.get(i).setPhoto(seekers.get(j).getPsrc());
                }
            }
        }
        for(int i = 0; i < list.size(); i++) {
            for(int j = 0; j < bosses.size(); j++) {
                if(list.get(i).getUserId()==bosses.get(j).getId() && list.get(i).getStatus().equals("boss")) {
                    list.get(i).setUserName(bosses.get(j).getNickName());
                    list.get(i).setPhoto(bosses.get(j).getPsrc());
                }
            }
        }
        Map<String,String> map = new HashMap<String,String>();
        map.put("currentPage",String.valueOf(currentPage));
        map.put("totalPage",String.valueOf(totalPage));
        map.put("articles",JSON.toJSONString(list));
        return JSON.toJSONString(map);
    }

    @RequestMapping(value = "article/readArticle.action")
    public ModelAndView readArticle(String id) {
        int num = Integer.parseInt(id);
        /*
        articleService = new ArticleServiceImpl();
        seekerService = new SeekerServiceImpl();
        bossService = new BossServiceImpl();

        */
        Article article = articleService.getArticleById(num);
        int authorId = article.getUserId();
        String authorIdentity = article.getStatus();
        Boss boss;
        Seeker seeker;
        if(authorIdentity.equals("seeker")) {
            seeker = seekerService.selectById(authorId);
            article.setPhoto(seeker.getPsrc());
            article.setUserName(seeker.getSname());
        } else {
            boss = bossService.selectBossById(authorId);
            article.setPhoto(boss.getPsrc());
            article.setUserName(boss.getNickName());
        }
        int visit = article.getVisit();
        visit++;
        article.setVisit(visit);
        articleService.updateVisit(article);
        ModelAndView mav = new ModelAndView();
        mav.addObject("Article",article);
        mav.setViewName("/Common/readArticle.jsp");
        return mav;
    }

    @RequestMapping(value = "article/insertComment.action")
    public @ResponseBody boolean insertComment(@RequestBody Comment comment) {
        boolean flag = true;
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        comment.setTime(sdf.format(date));
        int id = comment.getArticleId();
        //articleService = new ArticleServiceImpl();
        Article article = articleService.getArticleById(id);
        int reply = article.getReply()+1;
        article.setReply(reply);
        //commentService = new CommentServiceImpl();
        try {
            commentService.insertComment(comment);
            articleService.updateReply(article);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }


    @RequestMapping(value = "article/getComment.action")
    public @ResponseBody String getComment(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String articleId = obj.getString("articleId");
        int currentPage = obj.getInteger("currentPage");
        Page page = new Page();
        page.setArticleId(Integer.parseInt(articleId));
        page.setStart((currentPage-1)*10);
        page.setStep(10);
       // commentService = new CommentServiceImpl();
        int totalPage = commentService.recordCount(page);
        if(totalPage%10==0) {
            totalPage = totalPage/10;
        }else {
            totalPage = totalPage/10 + 1;
        }
        if(totalPage==0) {
            return "无数据";
        }else {
            List<Comment> list = commentService.getOnePageComment(page);
            List<Integer> seekerIdList = new ArrayList<>();
            List<Integer> bossIdList = new ArrayList<>();
            for(int i = 0; i < list.size(); i++) {
                if(list.get(i).getStatus().equals("seeker")) {
                    seekerIdList.add(list.get(i).getUserId());
                } else {
                    bossIdList.add(list.get(i).getUserId());
                }
            }
            seekerService = new SeekerServiceImpl();
            List<Seeker> seekers = new ArrayList<>();
            List<Boss> bosses = new ArrayList<>();
            if(seekerIdList.size() > 0) {
                seekers = seekerService.selectNameAndPhoto(seekerIdList);
            }
            if(bossIdList.size() > 0) {
                bosses = bossService.selectNickAndPhoto(bossIdList);
            }
            for(int i = 0; i < list.size(); i++) {
                if(list.get(i).getStatus().equals("seeker")) {
                    for(int j = 0; j < seekers.size(); j++) {
                        if(list.get(i).getUserId() == seekers.get(j).getId()) {
                            list.get(i).setUserName(seekers.get(j).getSname());
                            list.get(i).setPhoto(seekers.get(j).getPsrc());
                        }
                    }
                }
            }
            for(int i = 0; i < list.size(); i++) {
                if(list.get(i).getStatus().equals("boss")) {
                    for(int j = 0; j < bosses.size(); j++) {
                        if(list.get(i).getUserId() == bosses.get(j).getId()) {
                            list.get(i).setUserName(bosses.get(j).getNickName());
                            list.get(i).setPhoto(bosses.get(j).getPsrc());
                        }
                    }
                }
            }
            Map<String,String> map = new HashMap<String,String>();
            map.put("currentPage",String.valueOf(currentPage));
            map.put("totalPage",String.valueOf(totalPage));
            map.put("comments",JSON.toJSONString(list));
            return JSON.toJSONString(map);
        }
    }

    @RequestMapping(value = "article/getHot.action")
    public @ResponseBody String getHot(@RequestBody String params) {
        //articleService = new ArticleServiceImpl();
        List<Article> articles = articleService.getHot();
        return JSON.toJSONString(articles);
    }



}
