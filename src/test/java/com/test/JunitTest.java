package com.test;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.wyxeainn.factory.AdminMapperFac;
import com.wyxeainn.factory.NewsMapperFac;
import com.wyxeainn.mapper.AdminMapper;
import com.wyxeainn.mapper.NewsMapper;
import com.wyxeainn.pojo.*;
import com.wyxeainn.service.*;
import org.junit.Test;

import java.io.*;

import java.util.List;

public class JunitTest {

    //测试判断账号是否存在
    @Test
    public void testAccountExist() {
        AdminMapper adminMapper = AdminMapperFac.getAdminMapper();
        int count = adminMapper.accountExist("admin");
        System.out.println(count);
    }

    //测试获取记录条数
    @Test
    public void testGetRecordNum() {
        AdminMapper adminMapper = AdminMapperFac.getAdminMapper();
        int count = adminMapper.recordCount();
        System.out.println(count);
    }

    //测试分页查询
    @Test
    public void testPageQuery() {
        AdminMapper adminMapper = AdminMapperFac.getAdminMapper();
        List<Admin> admins = adminMapper.pageQuery(0);
        for(int i = 0; i < admins.size(); i++) {
            System.out.println(admins.get(i).toString());
        }
    }

    @Test
    public void selectByCondition() {
        String pubTime = "2018%";
        String type = "开心一刻";
        String title = "%";
        int authorId = 3;
        Page page = new Page();
        page.setStep(10);
        page.setStart(0);
        page.setTableName("news_pub");
        page.setAuthorId(authorId);
        page.setTitle(title);
        page.setNewsType(type);
        page.setPubTime(pubTime);
        NewsMapper  newsMapper = NewsMapperFac.getNewsMapper();
        List<News> news = newsMapper.selectByCondition(page);
        for(int i = 0; i < news.size(); i++) {
            type = news.get(i).getNewsType();
            pubTime = news.get(i).getPubTime();
            title = news.get(i).getTitle();
            System.out.println(title + "    " + type + "    " + pubTime);
        }
    }

    @Test
    public void insertCity() throws Exception{
        File file = new File("E:/idea/javawebcode/zhixin/src/main/resources/city.json");
        InputStream in = new FileInputStream(file);
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        StringBuilder sb = new StringBuilder();
        String line = null;
        while((line=reader.readLine()) != null) {
            sb.append(line);
        }
        String content = sb.toString();
        JSONArray array = JSON.parseArray(content);
        JSONObject item,temp;
        CityService cityService = new CityServiceImpl();
        for(int i = 0; i < array.size(); i++) {
            item = array.getJSONObject(i);
            City province = new City();
            province.setProvince(item.getString("name"));
            String str = item.getString("city");
            JSONArray citys = JSON.parseArray(str);
            for(int j = 0; j < citys.size(); j++) {
                temp = citys.getJSONObject(j);
                province.setCity(temp.getString("name"));
                cityService.insertProvince(province);
                City city = new City();
                city.setCity(temp.getString("name"));
                String zoneStr = temp.getString("area");
                JSONArray zoneArray = JSON.parseArray(zoneStr);
                for(int k = 0; k < zoneArray.size(); k++) {
                    city.setZone(zoneArray.getString(k));
                    cityService.insertCity(city);
                }
            }
        }
    }

    @Test
    public void testSocialMapper() {
        SocialService socialService = new SocialServiceImpl();
        /*Social social = new Social();
        social.setPhone("15937561672");
        social.setUrl("https://blog.csdn.net/wyxeainn");
        int id = socialService.insertSocail(social);
        System.out.println(id);
        */
        List<Social> list = socialService.selectSocialByUserId(1);
        for(int i = 0; i < list.size(); i++) {
            System.out.println(list.get(i).toString());
        }
    }

    @Test
    public void testEduMapper() {
        EduService eduService = new EduServiceImpl();
        Education education = new Education();
        education.setUserId(1);
        education.setSchool("哈哈");
        education.setStart(2015);
        education.setEnd(2019);
        education.setMajor("计科");
        education.setLevel("本科");
        int id = eduService.insertEdu(education);
        System.out.println(id);
    }

    @Test
    public void selectJobByCondition() {
        JobService jobService = new JobServiceImpl();
        Condition condition = new Condition();
        condition.setCity("%");
        condition.setZone("%");
        condition.setEdu("%");
        condition.setExp("%");
        condition.setSalary("%");
        condition.setScope("%");
        condition.setStage("%");
        condition.setIndustry("%");
        condition.setCategory("%");
        condition.setStart(0);
        condition.setStep(20);

        List<Item> list = jobService.getJobByCondition(condition);
        System.out.println(list.size());
        for(int i = 0; i < list.size(); i++) {
            Item item = list.get(i);
            if(item==null) {
                System.out.println("哈哈");
            }else {
                Job job = item.getJob();
                System.out.println(job.getName());
            }
        }
    }

}
