package com.wyxeainn.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSONPObject;
import com.wyxeainn.pojo.*;
import com.wyxeainn.service.*;
import jdk.nashorn.internal.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class NewsController {
    private AdminService adminService = new AdminServiceImpl();
    private NewsService newsService = new NewsServiceImpl();

    /**
     * 跳转到编辑新闻界面
     * @param adminId
     * @return
     */
    @RequestMapping(value = "/news/editNews.action")
    public ModelAndView editNews(String adminId) {
        //adminService = new AdminServiceImpl();
        int id = Integer.parseInt(adminId);
        Admin admin = adminService.selectById(id);
        admin.setPassword("");
        admin.setEncryption("");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/Admin/edit_news.jsp");
        mav.addObject("Admin",admin);
        return mav;
    }

    /**
     * 添加一条记录
     * @param
     * @return
     */
    @RequestMapping(value = "news/insertNew.action")
    public @ResponseBody
    Boolean insertNew(@RequestBody News news) {
        //新闻编号
        String id = UUID.randomUUID().toString();
        //封面图片编号
        String psrc = UUID.randomUUID().toString();
        //获取当前时间
        Date current = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = sdf.format(current);
        String image = news.getPsrc();
        news.setId(id);
        news.setPsrc(psrc);
        news.setPubTime(time);
        news.setLastUpdateTime(time);
        //newsService = new NewsServiceImpl();
        //获取指定类型的文章
        boolean flag = true;
        try {
            News another = newsService.topGetNew(news.getNewsType());
            if(another != null) {
                newsService.insertNew(another);
            }
            newsService.topDeleteNew(news.getNewsType());
            newsService.topInsertNew(news);
        } catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        if(flag) {
            String path = "E:\\upload\\newsPhoto\\" + psrc + ".jpeg";
            base64ToFile(path,image);
        }
        return flag;
    }

    private void base64ToFile(String path,String image) {
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            byte[] b = decoder.decodeBuffer(image);
            for(int i = 0; i < b.length; i++) {
                if(b[i]<0) {
                    b[i] += 256;
                }
            }
            OutputStream out = new FileOutputStream(path);
            out.write(b);
            out.flush();
            out.close();
        }catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    /**
     * 查询置顶文章。
     * @return
     */
    @RequestMapping(value = "topNews.action")
    public @ResponseBody String selectAllTopNews(@RequestBody String params) {
        //newsService = new NewsServiceImpl();
        List<News> news = newsService.selectAllFromTop();
        String result = JSON.toJSONString(news);
       return result;
    }

    /**
     * 查询一页新闻
     */
    @RequestMapping(value = "/news/queryPage.action")
    public @ResponseBody String newsQueryPage(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        //newsService = new NewsServiceImpl();
        int currentPage = obj.getInteger("currentPage");  //获取当前页码
        int recoredNumber = newsService.recordCountPub();      //总记录条数
        int totalPage = recoredNumber/10;
        if(recoredNumber%10 != 0) {
            totalPage++;
        }
        int start = (currentPage-1)*10;
        List<News> news = newsService.selectOnePageFromPub(start);
        Map<Integer,String> idAndName = getAdminIdAndName();
        for(int i = 0; i < news.size(); i++) {
            for(Integer id : idAndName.keySet()) {
                if(news.get(i).getAuthorId() == id) {
                    news.get(i).setAuthor(idAndName.get(id));
                }
            }
        }
        Map<String,String> map = new HashMap<String,String>();
        map.put("currentPage",String.valueOf(currentPage));
        map.put("totalPage",String.valueOf(totalPage));
        map.put("news",JSON.toJSONString(news));
        String result = JSON.toJSONString(map);
        return result;
    }

    //获取管理员的id和姓名
    public Map<Integer,String> getAdminIdAndName() {
        Map<Integer,String> map = new HashMap<>();
        AdminService adminService = new AdminServiceImpl();
        List<Admin> list = adminService.selectIdAndName();
        for(int i = 0; i < list.size(); i++) {
            map.put(list.get(i).getId(),list.get(i).getName());
        }
        return map;
    }

    /*
    知心招聘 | 资讯阅读
    * */
    @RequestMapping(value = "/news/readNew.action",method = RequestMethod.GET)
    public ModelAndView readNewById(String id) {
        ModelAndView mav = new ModelAndView();
        //newsService = new NewsServiceImpl();
        News news = newsService.selectTopById(id);
        if(news==null) {
            news = newsService.selectPubById(id);
        }
        int index = news.getPubTime().indexOf(" ");
        String str = news.getPubTime().substring(0,index);
        mav.setViewName("/Common/read_new.jsp");
        mav.addObject("News",news);
        List<News> obj = newsService.selectAllFromTop();
        List<News> list = newsService.selectOnePageFromPub(0);
        for(int i = 0; i < obj.size(); i++) {
            if(obj.get(i).getId().equals(id)) {
                obj.remove(i);
                break;
            }
        }
        int len = Math.min(2,list.size());
        for(int i = 0; i < len; i++) {
            if(list.get(i).equals(id)) {
                continue;
            }else {
                obj.add(list.get(i));
            }
        }
        mav.addObject("itemList",obj);
        return mav;
    }

    /**
     * 分类计数，获取每种新闻的数目信息。
     */
    @RequestMapping(value = "news/classifyCount.action")
    public @ResponseBody String classifyCount(@RequestBody String params){
        JSONObject obj = JSON.parseObject(params);
        String id = obj.getString("authorId");
        int authorId = Integer.parseInt(id);
        String tableName = obj.getString("tableName");
        int currentPage = obj.getInteger("currentPage");
        //newsService = new NewsServiceImpl();
        List<News> temp = new ArrayList<News>();
        temp = newsService.selectAllFromTop();
        int cnt = 0;
        if(temp != null) {
            for(int i = 0; i < temp.size(); i++) {
                if(temp.get(i).getAuthorId() == authorId) {
                    cnt++;
                }
            }
        }
        int pubCount = newsService.recordCount("news_pub") + cnt;
        int draftCount = newsService.recordCount("news_draft");
        int trashCount = newsService.recordCount("news_trash");
        if(tableName.equals("news_pub") && pubCount==0) {
            return "无数据";
        }
        if(tableName.equals("news_draft") && draftCount==0) {
            return "无数据";
        }
        if(tableName.equals("news_trash") && trashCount==0) {
            return "无数据";
        }
        Map<String,String> map = new HashMap<String,String>();
        map.put("news_pub",String.valueOf(pubCount));
        map.put("news_draft",String.valueOf(draftCount));
        map.put("news_trash",String.valueOf(trashCount));
        map.put("current",String.valueOf(currentPage));
        if(tableName.equals("news_pub")) {
            map.put("totalPage",String.valueOf(getTotalPage(pubCount,10)));
        }else if(tableName.equals("news_draft")) {
            map.put("totalPage",String.valueOf(getTotalPage(draftCount,10)));
        }else if(tableName.equals("news_trash")) {
            map.put("totalPage",String.valueOf(getTotalPage(trashCount,10)));
        }
        Page page = new Page();
        currentPage = (currentPage-1)*10;
        page.setStart(currentPage);
        page.setAuthorId(authorId);
        List<News> news = new ArrayList<News>();
        if(tableName.equals("news_pub")) {
            if(cnt>0) {
                for(int i = 0; i < temp.size(); i++) {
                    if(temp.get(i).getAuthorId() == authorId) {
                        news.add(temp.get(i));
                    }
                }
            }
            page.setStep(10-cnt);
            List<News> list = new ArrayList<>();
            list = newsService.selectOnePageFromPubById(page);
            for(int i = 0; i < list.size(); i++) {
                news.add(list.get(i));
            }
        }else if(tableName.equals("news_draft")){
            page.setStep(10);
            news = newsService.selectOnePageFromDraftById(page);
        }else if(tableName.equals("news_trash")) {
            page.setStep(10);
            news = newsService.selectOnePageFromTrashById(page);
        }
        String pubTime = "";
        Set<String> years = new HashSet<String>();
        for(int i = 0; i < news.size(); i++) {
            pubTime = news.get(i).getPubTime();
            years.add(pubTime.substring(0,4));
        }
        map.put("thisPage",String.valueOf(news.size()));
        map.put("years",JSON.toJSONString(years));
        map.put("news",JSON.toJSONString(news));
        String result = JSON.toJSONString(map);
        return result;
    }

    /*获取总页数*/
    public Integer getTotalPage(int all,int step) {
        int count = all/step;
        if(all%step!=0) {
            count++;
        }
        return count;
    }

    /*新闻管理界面，浏览一篇文章*/
    @RequestMapping(value = "/news/browserNew.action")
    public @ResponseBody String browserNew(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String tableName = obj.getString("tableName");
        String id = obj.getString("newId");
        News news = null;
        //newsService = new NewsServiceImpl();
        if(tableName.equals("news_pub")) {
            news = newsService.selectPubById(id);
            if(news == null) {
                news = newsService.selectTopById(id);
            }
        }else if(tableName.equals("news_draft")){
            news = newsService.selectDraftById(id);
        }else if(tableName.equals("news_trash")) {
            news = newsService.selectTrashById(id);
        }
        String result = JSON.toJSONString(news);
        return result;
    }

    /**
     * 更新news_pub,top_news表。
     * @param params
     * @return
     */
    @RequestMapping(value = "/news/updateContent.action")
    public @ResponseBody Boolean updateContent(@RequestBody String params){
        JSONObject obj = JSON.parseObject(params);
        String content = obj.getString("content");
        String id = obj.getString("id");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String lastUpdateTime = sdf.format(new Date());
        News news = new News();
        news.setId(id);
        news.setContent(content);
        news.setLastUpdateTime(lastUpdateTime);
        boolean flag = true;
        try {
            newsService = new NewsServiceImpl();
            newsService.updatePubContentById(news);
            newsService.updateTopContentById(news);
        }catch (Exception ex) {
            flag = false;
        }
        return flag;
    }


    /**
     * 把已发布的文章暂存草稿，逻辑如下：
     * 如果文章类型是top_news
     * 插入news_draft,删除top_news,从news_pub中找最新相同类型的文章，插入top_news，把该文章删除。
     * 如果文章类型news_pub
     * 插入news_draft,删除news_pub
     * 加载新页
     * @param params
     * @return
     */
    @RequestMapping(value = "/news/savePubToDraft.action")
    public @ResponseBody Boolean savePubToDraft(@RequestBody String params) {
        boolean flag = true;
        JSONObject obj = JSON.parseObject(params);
        String id = obj.getString("id");
        String content = obj.getString("content");
        //newsService = new NewsServiceImpl();
        News news = null;
        news = newsService.selectTopById(id);
        /*在news_pub*/
        if(news==null) {
            news = newsService.selectPubById(id);
            news.setContent(content); //更新内容
            System.out.println("在news_pub中");
            try {
                newsService.draftInsertNew(news);  //插入草稿箱
                newsService.pubDeleteById(id);
            }catch (Exception ex) {
                flag = false;
            }
        }else {  /*在top_news*/
            System.out.println("在top_news中");
            news.setContent(content);
            try {
                newsService.draftInsertNew(news); //插入草稿箱
                newsService.topDeleteNew(news.getNewsType()); //从top_news删除
                News n = null;
                n = newsService.pubLastestNewByType(news); //找最新的相同类型的文章
                if(n != null) {
                    newsService.topInsertNew(n);
                    newsService.pubDeleteById(n.getId());
                }
            }catch (Exception ex) {
                flag = false;
            }
        }
        return true;
    }


    @RequestMapping(value = "news/getPage.action")
    public @ResponseBody String getPage(@RequestBody String params) {
        String result = "";
        JSONObject obj = JSON.parseObject(params);
        String tableName = obj.getString("tableName");
        String year = obj.getString("year");
        String month = obj.getString("month");
        String type = obj.getString("type");
        String keyword = obj.getString("keyword");
        String adminId = obj.getString("adminId");
        int current = Integer.parseInt(obj.getString("current"));
        String pubTime;
        if(year.equals("不 限")) {
            pubTime = "%";
        }else {
            pubTime = year;
            if(!month.equals("不 限")) {
                if(Integer.parseInt(month)<10) {
                    pubTime = pubTime + "-0" + month;
                }else {
                    pubTime = pubTime + "-" + month;
                }
            }
            pubTime += "%";
        }
        if(type.equals("全 部")) {
            type = "%";
        }
        if(!keyword.equals("")) {
            keyword = "%" + keyword + "%";
        }else {
            keyword = "%";
        }
        if(tableName.equals("news_pub")) {
            result = dealWithPubPage(pubTime,type,keyword,current,adminId);
        }else if(tableName.equals("news_draft")) {
            result = dealWithDraftPage(pubTime,type,keyword,current,adminId);
        }else if(tableName.equals("news_trash")) {
            result = dealWithTrashPage(pubTime,type,keyword,current,adminId);
        }
        return result;
    }

    /**
     * 处理已发布的文章的分页请求。
     *
     * @author wenyaxin
     * update by 2019/4/21 20:32
     * @param pubTime  发布时间
     * @param type     文章类型
     * @param keyword  关键词
     * @param current  当前页码
     * @param adminId  作者Id
     * @return
     */
    public String dealWithPubPage(String pubTime,String type,String keyword,int current,String adminId) {
        printInfor(pubTime,type,keyword,current,adminId);
        String result = "";
        List<News> temp = new ArrayList<News>();
        List<News> news = new ArrayList<News>();
        Page page = new Page();
        page.setTableName("top_news");
        int authorId = Integer.parseInt(adminId);
        page.setAuthorId(authorId);
        page.setPubTime(pubTime);
        page.setNewsType(type);
        page.setTitle(keyword);
        page.setStart(0);
        page.setStep(3);
        //newsService = new NewsServiceImpl();
        int topCnt = newsService.countByCondition(page);
        if(topCnt!=0) {
            temp = newsService.selectByCondition(page);
        }
        page.setTableName("news_pub");
        int pubCnt = newsService.countByCondition(page);
        int totalCount = topCnt + pubCnt;
        if(totalCount == 0) {
            result = "无数据";
        }else {
            int totalPage = getTotalPage(totalCount,10);
            int currentPage = current;
            //某页只有一项，被删除掉了。
            if(current>totalPage) {
                currentPage = current-1;
            }
            if(currentPage==0) {
                result = "无数据";
            }else {
                page.setStep(10);
                //当前是第一页
                if(currentPage==1) {
                    if (topCnt != 0) {
                        for (int i = 0; i < temp.size(); i++) {
                            news.add(temp.get(i));
                        }
                        page.setStart(0);
                        page.setStep(10 - topCnt);
                    }
                }else {
                    page.setStart((currentPage-1)*10-topCnt);
                    page.setStep(10);
                }
                if(pubCnt!=0) {
                    temp = newsService.selectByCondition(page);
                    for(int i = 0; i < temp.size(); i++) {
                        news.add(temp.get(i));
                    }
                }
                Map<String,String> map = new HashMap<String,String>();
                map.put("news_pub",String.valueOf(totalCount));
                map.put("totalPage",String.valueOf(totalPage));
                map.put("currentPage",String.valueOf(currentPage));
                map.put("thisPage",String.valueOf(news.size()));
                map.put("news",JSON.toJSONString(news));
                int draftCnt = newsService.recordCount("news_draft");
                int trashCnt = newsService.recordCount("news_trash");
                map.put("news_draft",String.valueOf(draftCnt));
                map.put("news_trash",String.valueOf(trashCnt));
                result = JSON.toJSONString(map);
            }
        }
        return result;
    }

    /**
     * @author wenyaxin
     * 2018/12/06 9:24
     * 处理草稿箱新闻的分页请求
     * @param pubTime
     * @param type
     * @param keyword
     * @param current
     * @param adminId
     * @return
     */
    public String dealWithDraftPage(String pubTime,String type,String keyword,int current,String adminId) {
        String result = "";
        Page page = new Page();
        page.setTableName("news_draft");
        int authorId = Integer.parseInt(adminId);
        page.setAuthorId(authorId);
        page.setTitle(keyword);
        page.setNewsType(type);
        page.setPubTime(pubTime);
        //newsService = new NewsServiceImpl();
        int count = newsService.countByCondition(page);
        if(count==0) {
            result = "无数据";
        }else {
            int totalPage = getTotalPage(count,10);
            int currentPage = current;
            if(current>totalPage) {
                currentPage = current-1;
            }
            int start = (currentPage-1)*10;
            page.setStart(start);
            page.setStep(10);
            List<News> news = new ArrayList<News>();
            news = newsService.selectByCondition(page);
            Map<String,String> map = new HashMap<String,String>();
            map.put("news_draft",String.valueOf(count));
            map.put("totalPage",String.valueOf(totalPage));
            map.put("currentPage",String.valueOf(currentPage));
            map.put("thisPage",String.valueOf(news.size()));
            map.put("news",JSON.toJSONString(news));
            int topCnt = newsService.recordCount("top_news");
            int pubCnt = newsService.recordCount("news_pub") + topCnt;
            int trashCnt = newsService.recordCount("news_trash");
            map.put("news_pub",String.valueOf(pubCnt));
            map.put("news_trash",String.valueOf(trashCnt));
            result = JSON.toJSONString(map);
        }
        return result;
    }

    public String dealWithTrashPage(String pubTime,String type,String keyword,int current,String adminId){
        String result = "";
        Page page = new Page();
        page.setTableName("news_trash");
        int authorId = Integer.parseInt(adminId);
        page.setAuthorId(authorId);
        page.setTitle(keyword);
        page.setNewsType(type);
        page.setPubTime(pubTime);
        //newsService = new NewsServiceImpl();
        int count = newsService.countByCondition(page);
        if(count==0) {
            result = "无数据";
        }else {
            int totalPage = getTotalPage(count,10);
            int currentPage = current;
            if(current>totalPage) {
                currentPage = current-1;
            }
            int start = (currentPage-1)*10;
            page.setStart(start);
            page.setStep(10);
            List<News> news = new ArrayList<News>();
            news = newsService.selectByCondition(page);
            Map<String,String> map = new HashMap<String,String>();
            map.put("news_trash",String.valueOf(count));
            map.put("totalPage",String.valueOf(totalPage));
            map.put("currentPage",String.valueOf(currentPage));
            map.put("thisPage",String.valueOf(news.size()));
            map.put("news",JSON.toJSONString(news));
            int topCnt = newsService.recordCount("top_news");
            int draftCnt = newsService.recordCount("news_draft");
            int pubCnt = newsService.recordCount("news_pub") + topCnt;
            map.put("news_draft",String.valueOf(draftCnt));
            map.put("news_pub",String.valueOf(pubCnt));
            result = JSON.toJSONString(map);
        }
        return result;
    }

    public void printInfor(String pubTime,String type,String keyword,int current,String adminId) {
        System.out.println("--Start-------------------------------------");
        System.out.println("pubTime:" + pubTime);
        System.out.println("type:" + type);
        System.out.println("keyword:" + keyword);
        System.out.println("current:" + current);
        System.out.println("adminId:" + adminId);
        System.out.println("--End---------------------------------------");
    }

    /*
    如果是news_pub，插入news_trash，从news_pub中删除
    如果是news_draft,插入news_trash，从news_draft中删除
    如果是news_trash，直接删除
    * */
    @RequestMapping(value = "/news/deleteNew.action")
    public @ResponseBody boolean deleteNew(@RequestBody String params) {
        boolean flag = true;
        JSONObject obj = JSON.parseObject(params);
        String tableName = obj.getString("tableName");
        String id = obj.getString("id");
        //newsService = new NewsServiceImpl();
        if(tableName.equals("news_pub")) {
            News news = null;
            news = newsService.selectTopById(id);
            //在news_pub中。
            if(news==null) {
                try {
                    news = newsService.selectPubById(id);
                    news.setLastUpdateTime("news_pub");
                    newsService.trashInsertNew(news);
                    newsService.pubDeleteById(news.getId());
                } catch (Exception ex) {
                    flag = false;
                }
            }else {
                news.setLastUpdateTime("news_top");
                try{
                    newsService.trashInsertNew(news);              //插入到news_trash
                    newsService.topDeleteNew(news.getNewsType());  //删除信息
                    News n = null;
                    n = newsService.pubLastestNewByType(news);
                    if(n != null) {
                        newsService.topInsertNew(n);
                        newsService.pubDeleteById(n.getId());
                    }
                }catch (Exception ex) {
                   flag = false;
                }
            }
        }else if(tableName.equals("news_draft")) {
            try {
                News news = newsService.selectDraftById(id);
                news.setLastUpdateTime("news_draft");
                newsService.trashInsertNew(news);
                newsService.draftDeleteById(id);
            }catch (Exception ex) {
                flag = false;
            }
        }else if(tableName.equals("news_trash")) {
            try{
                newsService.trashDeleteById(id);
            }catch (Exception ex) {
                flag = false;
            }
        }
        return flag;
    }

    @RequestMapping(value = "/news/publishNew.action")
    public @ResponseBody boolean publishNew(@RequestBody String params) {
        boolean flag = true;
        JSONObject obj = JSON.parseObject(params);
        String id = obj.getString("id");
        //newsService = new NewsServiceImpl();
        try {
            News news = newsService.selectDraftById(id);
            News n = null;
            n = newsService.topGetNew(news.getNewsType());
            if(n == null) {
                flag = false;
                newsService.topInsertNew(news);
            }else {
                //还原的文章比原来的文章更早。
                if(news.getPubTime().compareTo(n.getPubTime())>0) {
                    newsService.insertNew(n);
                    newsService.topDeleteNew(n.getNewsType());
                    newsService.topInsertNew(news);
                    newsService.draftDeleteById(id);
                }else {
                    newsService.insertNew(news);
                    newsService.draftDeleteById(id);
                }
            }
        }catch (Exception ex) {
            flag = false;
        }
        return flag;
    }


    @RequestMapping(value = "/news/recoverNew.action")
    public @ResponseBody boolean recoverNew(@RequestBody String params) {
        boolean flag = true;
        JSONObject obj = JSON.parseObject(params);
        String id = obj.getString("id");
        //newsService = new NewsServiceImpl();
        try {
            News news = newsService.selectTrashById(id);
            String tableName = news.getLastUpdateTime();
            if(tableName.equals("news_draft")) {
                newsService.draftInsertNew(news);
            }else if(tableName.equals("news_pub")) {
                newsService.insertNew(news);
            }else if(tableName.equals("news_top")) {
                News n = null;
                n = newsService.topGetNew(news.getNewsType());
                if(n == null) {
                    newsService.topInsertNew(news);
                    newsService.trashDeleteById(id);
                }else {
                    //还原的比原来的新。
                    if(news.getPubTime().compareTo(n.getPubTime())>0) {
                        newsService.insertNew(n);
                        newsService.topDeleteNew(n.getNewsType());
                        newsService.topInsertNew(news);
                    }else {
                        newsService.insertNew(news);
                    }
                }
            }
            newsService.trashDeleteById(id);
        } catch (Exception ex) {
            flag = false;
        }
        return flag;
    }


}
