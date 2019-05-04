package com.wyxeainn.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.wyxeainn.pojo.*;
import com.wyxeainn.service.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class JobControll {
    JobService jobService = new JobServiceImpl();
    IndustryService industryService = new IndustryServiceImpl();
    CityService cityService = new CityServiceImpl();
    CompanyService companyService = new CompanyServiceImpl();
    BossService bossService = new BossServiceImpl();

    @RequestMapping(value = "jobs/searchJob.action")
    public @ResponseBody String searchJobByCondition(@RequestBody String params){
        //jobService = new JobServiceImpl();
        JSONObject obj = JSON.parseObject(params);
        Condition condition = new Condition();
        condition.setCategory(obj.getString("category"));
        condition.setCity(obj.getString("city"));
        condition.setCompName(obj.getString("compName"));
        condition.setEdu(obj.getString("edu"));
        condition.setExp(obj.getString("exp"));
        condition.setIndustry(obj.getString("industry"));
        condition.setSalary(obj.getString("salary"));
        condition.setScope(obj.getString("scope"));
        condition.setStage(obj.getString("stage"));
        int start = Integer.parseInt(obj.getString("start"));
        condition.setStart(start);
        condition.setZone(obj.getString("zone"));
        condition = dealCondition(condition);
        condition.setStep(Integer.parseInt(obj.getString("step")));
        int currentPage = condition.getStep();
        condition.setStep(20);
        int totalCount = jobService.countJobByCondition(condition);
        int totalPage = 0;
        if(totalCount%20==0) {
            totalPage = totalCount/20;
        }else {
            totalPage = totalCount/20+1;
        }
        List<Item> list = jobService.getJobByCondition(condition);
        Map<String,String> map = new HashMap<String,String>();
        map.put("currentPage",String.valueOf(currentPage));
        map.put("totalPage",String.valueOf(totalPage));
        map.put("list", JSON.toJSONString(list));
        String result = JSON.toJSONString(map);
        return result;
    }

    public Condition dealCondition(Condition condition) {
        String category = condition.getCategory();
        //industryService = new IndustryServiceImpl();
        int id = 0;
        if(category==null || category.equals("")) {
            condition.setCategory("%");
        }else {
            id = Integer.parseInt(category);
            category = industryService.getThirdCateById(id);
            condition.setCategory("%" + category + "%");
        }
        String industry = condition.getIndustry();
        if(industry==null || industry.equals("")) {
            condition.setIndustry("%");
        }else {
            id = Integer.parseInt(industry);
            industry = industryService.getSecondIndustryById(id);
            condition.setIndustry("%" + industry + "%");
        }
        String city = condition.getCity();
        if(city==null || city.equals("") || city.equals("全国")) {
            condition.setCity("%");
        }else {
            city = "%" + city + "%";
            condition.setCity(city);
        }
        String zone = condition.getZone();
        if(zone==null || zone.equals("")) {
            condition.setZone("%");
        }else {
            zone = "%" + zone + "%";
            condition.setZone(zone);
        }
        String exp = condition.getExp();
        if(exp==null || exp.equals("") || exp.equals("不限")) {
            condition.setExp("%");
        }else {
            exp = "%" + exp + "%";
            condition.setExp(exp);
        }
        String edu = condition.getEdu();
        if(edu==null || edu.equals("") || edu.equals("不限")) {
            condition.setEdu("%");
        }else {
            edu = "%" + edu + "%";
            condition.setEdu(edu);
        }
        String salary = condition.getSalary();
        if(salary==null || salary.equals("") || salary.equals("不限")) {
            condition.setSalary("%");
        }else {
            salary = "%" + salary + "%";
            condition.setSalary(salary);
        }
        String stage = condition.getStage();
        if(salary==null || stage.equals("") || stage.equals("不限")) {
            condition.setStage("%");
        }else {
            stage = "%" + stage + "%";
            condition.setStage(stage);
        }
        String scope = condition.getScope();
        if(scope==null || scope.equals("") || scope.equals("不限")) {
            condition.setScope("%");
        }else {
            scope = "%" + scope + "%";
            condition.setScope(scope);
        }
        String compName = condition.getCompName();
        if(compName==null || compName.equals("")) {
            condition.setCompName("%");
        }else {
            compName = "%" + compName + "%";
            condition.setCompName(compName);
        }
        return condition;
    }
    @RequestMapping(value = "jobs/getZone.action")
    public @ResponseBody String jobsGetZones(@RequestBody String city) {
        cityService = new CityServiceImpl();
        List<String> list = cityService.getZones(city);
        return JSON.toJSONString(list);
    }

    @RequestMapping(value = "jobs/jobDetail.action",method = RequestMethod.GET)
    public ModelAndView showJobDetail(String id) {
        int num = Integer.parseInt(id);
        //jobService = new JobServiceImpl();
        //companyService = new CompanyServiceImpl();
        //bossService = new BossServiceImpl();
        Job job = jobService.getJobById(num);
        Company company = companyService.getCompanyById(job.getCompId());
        Boss boss = bossService.selectBossById(job.getBossId());
        Bussiness bussiness = companyService.getBussinessById(job.getCompId());
        ModelAndView mav = new ModelAndView();
        mav.addObject("job",job);
        mav.addObject("comp",company);
        mav.addObject("buss",bussiness);
        mav.addObject("boss",boss);
        mav.setViewName("/Jobseeker/jobDetail.jsp");
        return mav;
    }

    @RequestMapping(value = "jobs/compDetail.action",method = RequestMethod.GET)
    public ModelAndView showCompDetail(String id) {
        ModelAndView mav = new ModelAndView();
        mav.addObject("compId",id);
        mav.setViewName("/Jobseeker/compDetail.jsp");
        return mav;
    }

    @RequestMapping(value = "jobs/getHotJob.action")
    public @ResponseBody String getHotJob(@RequestBody String id) {
        int compId = Integer.parseInt(id);
        List<Job> list = new ArrayList<>();
        //jobService = new JobServiceImpl();
        list = jobService.getHotJobByCompId(compId);
        String result = JSON.toJSONString(list);
        return result;
    }

    @RequestMapping(value = "jobs/getJobCount.action")
    public @ResponseBody int jobsGetJobCount(@RequestBody String id) {
        int count = 0;
        //jobService = new JobServiceImpl();
        int compId = Integer.parseInt(id);
        count = jobService.countJobByCompId(compId);
        return count;
    }

    @RequestMapping(value = "jobs/getJobType.action")
    public @ResponseBody String jobsGetJobType(@RequestBody String id) {
        int compId = Integer.parseInt(id);
        //jobService = new JobServiceImpl();
        List<String> list = jobService.getJobTypeByCompId(compId);
        Map<String,Integer> map = new HashMap<String,Integer>();
        map.put("全部",list.size());
        String type;
        int count;
        for(int i = 0; i < list.size(); i++) {
            type = list.get(i);
            if(map.containsKey(type)) {
                count = map.get(type);
                count++;
                map.put(type,count);
            }else {
                map.put(type,1);
            }
        }
        List<String> array = new ArrayList<String>();
        for(Map.Entry<String,Integer> entry : map.entrySet()) {
            type = entry.getKey() + ";" + entry.getValue();
            array.add(type);
        }
        return JSON.toJSONString(array);
    }

    @RequestMapping(value = "jobs/getJobByType.action")
    public @ResponseBody String jobsGetJobByType(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String cate = obj.getString("cate");
        if(cate.equals("全部")){
            cate = "%";
        }
        String currentPage = obj.getString("currentPage");
        String compId = obj.getString("compId");
        Condition condition = new Condition();
        int current = Integer.parseInt(currentPage);
        int start = (current-1)*10;
        condition.setStep(10);
        condition.setStart(start);
        condition.setCategory(cate);
        condition.setCompId(Integer.parseInt(compId));
        //jobService = new JobServiceImpl();
        int totalCount = jobService.getCountByJobType(condition);
        int totalPage = 0;
        if(totalCount%10==0) {
            totalPage = totalCount/10;
        }else {
            totalPage = totalCount/10 + 1;
        }
        List<Item> list = jobService.getJobByCompAndType(condition);
        Map<String,String> map = new HashMap<String,String>();
        map.put("currentPage",String.valueOf(currentPage));
        map.put("totalPage",String.valueOf(totalPage));
        map.put("list",JSONObject.toJSONString(list));
        return JSON.toJSONString(map);
    }
}
