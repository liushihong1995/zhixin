package com.wyxeainn.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSONPObject;
import com.wyxeainn.pojo.*;
import com.wyxeainn.service.*;
import com.wyxeainn.tools.SMSUtil;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpSession;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.*;
import java.io.File;

@Controller
public class SeekerController {
    private SeekerService seekerService = new SeekerServiceImpl();
    private CodeService codeService = new CodeServiceImpl();
    private IndustryService industryService = new IndustryServiceImpl();
    private CityService cityService = new CityServiceImpl();
    private SocialService socialService = new SocialServiceImpl();
    private EduService eduService = new EduServiceImpl();
    private ProjectService projectService = new ProjectServiceImpl();
    private PracticeService practiceService = new PracticeServiceImpl();
    private HopeService hopeService = new HopeServiceImpl();
    private BossService bossService = new BossServiceImpl();

    /**
     * 判断求职者信息表中手机号码是否存在
     *
     * @param params
     * @return
     */
    @RequestMapping(value = "/jobSeeker/accountExist.action")
    public @ResponseBody boolean accountExist(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String phone = obj.getString("phone");
        //seekerService = new SeekerServiceImpl();
        boolean flag = seekerService.accountExist(phone);
        return flag;
    }

    @RequestMapping(value = "/seeker/updatePhone.action")
    public @ResponseBody boolean updatePhone(@RequestBody String params) {
        boolean flag = true;
        JSONObject obj = JSON.parseObject(params);
        String code = obj.getString("code");
        String oldPhone = obj.getString("oldPhone");
        String newPhone = obj.getString("newPhone");
        String id = obj.getString("id");
        String identity = obj.getString("identity");
        //codeService = new CodeServiceImpl();
        //seekerService = new SeekerServiceImpl();
        String smsCode = codeService.getCode(newPhone);
        if(smsCode.equals(code)) {
            try {
                if (identity.equals("seeker")) {
                    Seeker seeker = new Seeker();
                    seeker.setPhone(newPhone);
                    seeker.setId(Integer.parseInt(id));
                    seekerService.updatePhoneById(seeker);
                } else {
                    Boss boss = new Boss();
                    boss.setPhone(newPhone);
                    boss.setId(Integer.parseInt(id));
                    bossService.updatePhoneById(boss);
                }
            } catch (Exception ex) {
                ex.printStackTrace();
                flag = false;
            }
        } else {
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "/sendMessage/sendToSeeker.action")
    public @ResponseBody boolean sendMessageToSeeker(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String phone = obj.getString("phone");
        String code = "";
        int x;
        for(int i = 0; i < 6; i++) {
            x = (int)(Math.random()*10);
            code += x;
        }
        String content = "您的验证码是" + code + "，在1分钟内输入有效。如非本人操作请忽略本短信。【知心招聘】";
        SMSUtil smsUtil = new SMSUtil();
        boolean flag = smsUtil.send(phone,content);
        //codeService = new CodeServiceImpl();
        if(flag) {
            boolean exist = codeService.phoneExist(phone);
            Code c = new Code();
            c.setId(phone);
            c.setCode(code);
            //存在,更新动态码字段
            if(exist==true) {
                codeService.updateCode(c);
            }else {
                //否则新插入一条记录
                codeService.insertCode(c);
            }
        }
        return flag;
    }

    @RequestMapping(value = "/userRegister/checkCode.action")
    public @ResponseBody Boolean checkCode(@RequestBody String params){
        JSONObject obj = JSON.parseObject(params);
        String phone = obj.getString("phone");
        String code = obj.getString("code");
        //codeService = new CodeServiceImpl();
        String c = codeService.getCode(phone);
        if(code.equals(c)) {
            return true;
        }else {
            return false;
        }
    }


    //注册功能
    @RequestMapping(value = "/jobSeeker/register.action")
    public @ResponseBody boolean jobSeekerRegister(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String phone = obj.getString("phone");
        Seeker seeker = new Seeker();
        seeker.setPhone(phone);
        Boss boss = new Boss();
        boss.setPhone(phone);
        //codeService = new CodeServiceImpl();
        //bossService = new BossServiceImpl();
        //seekerService = new SeekerServiceImpl();
        boolean flag = true;
        try {
            if(codeService.phoneExist(phone)==false) {
                Code code = new Code();
                code.setId(phone);
                code.setCode("123456");
                codeService.insertCode(code);
            }
            seekerService.insertSeeker(seeker);
            bossService.registerBoss(boss);
        }catch(Exception ex) {
            flag = false;
        }
        return flag;
    }

    /**
     * 进入到职位搜索界面
     * @param session
     * @return
     */
    @RequestMapping(value = "seeker/searchJob.action")
    public String searchJob (HttpSession session) {
        setData(session);
        return "/Jobseeker/searchJob.jsp";
    }

    /**
     * 设置需要的数据
     * @param session
     */
    public void setData(HttpSession session) {
        session.setAttribute("Categorys",getCategory());
        session.setAttribute("Industrys",getFullIndustry());
        session.setAttribute("Citys",getCitys());
    }

    /**
     * 求职者首页
     * @param session
     * @return
     */
    @RequestMapping(value = "seeker/homepage.action")
    public String seekerHomepage(HttpSession session) {
        setData(session);
        return "/Common/seeker_homepage.jsp";
    }

    /**
     * 求职者首页导航栏链接。
     * @param session
     * @param cateId
     * @param compName
     * @param city
     * @return
     */
    @RequestMapping(value = "seeker/searchJobWithCondition.action")
    public String searchJobWithCondition(HttpSession session,String cateId,String cateName,String compName,String city) {
        setData(session);
        return "/Jobseeker/searchJob.jsp";
    }

    @RequestMapping(value = "user/login.action")
    public String userLogin(HttpSession session, String chose, String phone) {
        String targetUrl = "";
        if(chose.equals("求职者")) {
            //seekerService = new SeekerServiceImpl();
            Seeker seeker = seekerService.selectSeekerByPhone(phone);
            session.setAttribute("uid",seeker.getId());
            session.setAttribute("Categorys",getCategory());
            session.setAttribute("Industrys",getFullIndustry());
            session.setAttribute("Citys",getCitys());
            session.setAttribute("identity","seeker");
            targetUrl = "/Common/seeker_homepage.jsp";
        }else if(chose.equals("招聘者")){
            //bossService = new BossServiceImpl();
            Boss boss = bossService.selectBossByPhone(phone);
            String company = boss.getCompany();
            session.setAttribute("uid",boss.getId());
            session.setAttribute("Categorys",getCategory());
            session.setAttribute("Industrys",getFullIndustry());
            session.setAttribute("Citys",getCitys());
            session.setAttribute("identity","boss");
            if(company==null || company.equals("")) {
                targetUrl = "/Boss/attestation_second.jsp";
            } else {
                targetUrl = "/Boss/homePage.jsp";
            }
        }
        return targetUrl;
    }


    public List<Category> getFullIndustry() {
        List<Category> cates = new ArrayList<Category>();
        //industryService = new IndustryServiceImpl();
        List<Industry> list = industryService.selectFromIndustry();
        Set<String> firstSet = new HashSet<String>();
        Industry item = new Industry();
        String first,second;
        for(int i = 0; i < list.size(); i++) {
            item = list.get(i);
            first = item.getFirst().trim();
            if(firstSet.contains(first)==false) {
                firstSet.add(first);
            }
        }
        for(String str :  firstSet) {
            Category cate = new Category();
            cate.setFirst(str);
            Map<String,Integer> map = new HashMap<String,Integer>();
            for(int i = 0; i < list.size(); i++) {
                first = list.get(i).getFirst().trim();
                if(first.equals(str)){
                    second = list.get(i).getSecond().trim();
                    if(second.equals("default")) {
                        continue;
                    }else {
                        map.put(second,list.get(i).getId());
                    }
                }
            }
            cate.setIdMap(map);
            cates.add(cate);
        }
        for(int i = 0; i < cates.size(); i++) {
            Category cate = cates.get(i);
            System.out.println(cate.getFirst());
        }
        return cates;
    }

    public Set<String> getIndustry(){
        //industryService = new IndustryServiceImpl();
        List<Industry> list = industryService.selectFromIndustry();
        Set<String> set = new HashSet<String>();
        for(int i = 0; i < list.size(); i++) {
            if(set.contains(list.get(i).getFirst().trim())==false) {
                set.add(list.get(i).getFirst().trim());
            }
        }
        return set;
    }

    /*获取职位*/
    public List<Category> getCategory(){
        //industryService = new IndustryServiceImpl();
        List<Industry> list = industryService.selectFromCategory();
        List<Category> catetorys = new ArrayList<Category>();
        Set<String> firstSet = new HashSet<String>();
        Industry item;
        Map<String,String> sf = new HashMap<String,String>();
        for(int i = 0; i < list.size(); i++) {
            item = list.get(i);
            String first = item.getFirst().trim();
            if(!firstSet.contains(first)) {
                firstSet.add(first);
                sf.put(first,item.getSimple().trim());
            }
        }
        int cnt = 1;
        for(String first : firstSet) {
            Category category = new Category();
            category.setId(cnt);
            cnt++;
            category.setFirst(first);
            category.setSimple(sf.get(first));
            Map<String,Map<String,Integer>> map = new HashMap<String,Map<String,Integer>>();
            category.setMap(map);
            for(int i = 0; i < list.size(); i++) {
                item = list.get(i);
                String str = item.getFirst().trim();
                if(str.equals(first)) {
                    if(item.getSecond().trim().equals("default")) continue;
                    if(item.getThird().trim().equals("default")) continue;
                    if(category.getMap().containsKey(item.getSecond().trim())==false) {
                        Map<String,Integer> temp = new HashMap<String,Integer>();
                        temp.put(item.getThird().trim(),item.getId());
                        category.getMap().put(item.getSecond().trim(),temp);
                    }else {
                        category.getMap().get(item.getSecond().trim()).put(item.getThird().trim(),item.getId());
                    }
                }
            }
            catetorys.add(category);
        }
        if(catetorys.size()<10) {
            for(int i = catetorys.size(); i < 10; i++) {
                Category category = new Category();
                category.setId(i);
                category.setFirst("  ");
                Map<String,Map<String,Integer>> map = new HashMap<String,Map<String,Integer>>();
                category.setMap(map);
            }
        }
        return catetorys;
    }

    public List<City> getCitys() {
        //cityService = new CityServiceImpl();
        List<City> list = cityService.getProvince();
        Set<String> citySet = new HashSet<String>();
        List<City> citys = new ArrayList<City>();
        for (int i = 0; i < list.size(); i++) {
            if (!citySet.contains(list.get(i).getProvince())) {
                citySet.add(list.get(i).getProvince());
            }
        }
        for (String province : citySet) {
            City city = new City();
            city.setProvince(province);
            List<String> temp = new ArrayList<String>();
            for (int i = 0; i < list.size(); i++) {
                if (list.get(i).getProvince().equals(province)) {
                    temp.add(list.get(i).getCity());
                }
            }
            city.setArray(temp);
            citys.add(city);
        }
        return citys;
    }


    @RequestMapping("/seeker/getSeeker.action")
    public @ResponseBody Seeker getSeeker(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String uid = obj.getString("uid");
        int id = Integer.parseInt(uid);
        Seeker seeker = new Seeker();
        //seekerService = new SeekerServiceImpl();
        seeker = seekerService.selectSeekerById(id);
        return seeker;
    }

    @RequestMapping("/seeker/updateSeeker.action")
    public @ResponseBody Boolean updateSeeker(@RequestBody Seeker seeker) {
        boolean flag = true;
        //seekerService = new SeekerServiceImpl();
        try {
            seekerService.updateSeeker(seeker);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @RequestMapping("/seeker/updateAdvange.action")
    public @ResponseBody Boolean updateAdvange(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String phone = obj.getString("phone");
        String advantage = obj.getString("advantage");
        Seeker seeker = new Seeker();
        seeker.setPhone(phone);
        seeker.setAdvantage(advantage);
        //seekerService = new SeekerServiceImpl();
        boolean flag = true;
        try {
            seekerService.updateAdvantage(seeker);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "seeker/getSocialByUserId.action")
    public @ResponseBody String getSocialByPhone(@RequestBody String uid) {
        //socialService = new SocialServiceImpl();
        int userId = Integer.parseInt(uid);
        List<Social> list = socialService.selectSocialByUserId(userId);
        return JSON.toJSONString(list);
    }

    @RequestMapping(value = "seeker/updateSocial.action")
    public @ResponseBody Boolean updateSocial(@RequestBody Social social) {
        //socialService = new SocialServiceImpl();
        boolean flag = true;
        try {
            socialService.updateSocial(social);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "seeker/insertSocial.action")
    public @ResponseBody int insertSocial(@RequestBody Social social) {
        //socialService = new SocialServiceImpl();
        int id = -1;
        id = socialService.insertSocial(social);
        return id;
    }

    @RequestMapping(value = "seeker/getEduByUserId.action")
    public @ResponseBody String getEduByUserId(@RequestBody String uid) {
        //eduService = new EduServiceImpl();
        int userId = Integer.parseInt(uid);
        List<Education> list = eduService.selectEduByUserId(userId);
        return JSON.toJSONString(list);
    }

    @RequestMapping(value = "seeker/updateEdu.action")
    public @ResponseBody Boolean updateEdu(@RequestBody Education edu) {
        boolean flag = true;
        //eduService = new EduServiceImpl();
        try {
            eduService.updateEdu(edu);
        }catch (Exception ex) {
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "seeker/insertEdu.action")
    public @ResponseBody int insertEdu(@RequestBody Education edu) {
        int id = -1;
        //eduService = new EduServiceImpl();
        id = eduService.insertEdu(edu);
        return id;
    }

    @RequestMapping("seeker/getProByUserId.action")
    public @ResponseBody String getProByUserId(@RequestBody String uid) {
        //projectService = new ProjectServiceImpl();
        int id = Integer.parseInt(uid);
        List<Project> list = projectService.selectProjectByUserId(id);
        return JSON.toJSONString(list);
    }

    @RequestMapping("seeker/insertProject.action")
    public @ResponseBody int insertProject(@RequestBody Project project) {
        int id = -1;
        //projectService = new ProjectServiceImpl();
        id = projectService.insertProject(project);
        return id;
    }

    @RequestMapping("seeker/updateProject.action")
    public @ResponseBody boolean updateProject(@RequestBody Project project) {
        boolean flag = true;
        //projectService = new ProjectServiceImpl();
        try {
            projectService.updateProject(project);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "seeker/getIndustry.action")
    public @ResponseBody String resumeGetIndustry(@RequestBody String params){
        Map<String,Set<String>> map = new HashMap<String,Set<String>>();
        Set<String> firstSet = getIndustry();
       for(String first : firstSet) {
           map.put(first,new HashSet<String>());
       }
       //industryService = new IndustryServiceImpl();
       List<Industry> list = industryService.selectFromIndustry();
       Industry item;
       for(int i = 0; i < list.size(); i++) {
         item = list.get(i);
         if(item.getSecond().trim().equals("default")) {
             continue;
         }else {
             String temp = String.valueOf(item.getId()) + "_" + item.getSecond().trim();
             map.get(item.getFirst().trim()).add(temp);
         }
       }
       map.put("header",firstSet);
       return JSON.toJSONString(map);
    }

    @RequestMapping(value = "seeker/getPracticeByUserId.action")
    public @ResponseBody String getPracticeByPhone(@RequestBody String uid) {
        //practiceService = new PracticeServiceImpl();
        int id = Integer.parseInt(uid);
        List<Practice> list = practiceService.selectPracticeByUserId(id);
        return JSON.toJSONString(list);
    }

    @RequestMapping(value = "seeker/insertPractice.action")
    public @ResponseBody int insertPractice(@RequestBody Practice practice) {
        int id = -1;
        //practiceService = new PracticeServiceImpl();
        id = practiceService.insertPractice(practice);
        return id;
    }
    @RequestMapping(value = "seeker/updatePractice.action")
    public @ResponseBody boolean updatePractice(@RequestBody Practice practice) {
        boolean flag = true;
        //practiceService = new PracticeServiceImpl();
        try {
            practiceService.updatePractice(practice);
        }catch (Exception ex) {
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "seeker/getHopeByUserId.action")
    public @ResponseBody String getHopeByPhone(@RequestBody String uid) {
        HopeService hopeService = new HopeServiceImpl();
        int id = Integer.parseInt(uid);
        List<Hope> list = hopeService.selectHopeByUserId(id);
        return JSON.toJSONString(list);
    }

    @RequestMapping(value = "seeker/insertHope.action")
    public @ResponseBody int insertHope(@RequestBody Hope hope) {
        int id = -1;
        //hopeService = new HopeServiceImpl();
        id = hopeService.insertHope(hope);
        return id;
    }

    @RequestMapping(value = "seeker/updateHope.action")
    public @ResponseBody boolean updateHope(@RequestBody Hope hope) {
        boolean flag = true;
        //hopeService = new HopeServiceImpl();
        try {
            hopeService.updateHope(hope);
        }catch (Exception ex) {
            flag = false;
        }
        return flag;
    }



    @RequestMapping(value = "seeker/getCategory.action")
    public @ResponseBody String seekerGetGategory(@RequestBody String params) {
        //industryService = new IndustryServiceImpl();
        List<Cate> list = new ArrayList<Cate>();
        List<Industry> array = industryService.selectFromCategory();
        Set<String> set = new HashSet<>();
        Industry item;
        String simple,first,second,third;
        for(int i = 0; i < array.size(); i++) {
            item = array.get(i);
            simple = item.getSimple().trim();
            first = item.getFirst().trim();
            if(set.contains(simple) == false) {
                set.add(simple);
                Cate cate = new Cate();
                cate.setSimple(simple);
                cate.setFirst(first);
                cate.setSecond(new HashSet<>());
                cate.setMap(new HashMap<String,List<String>>());
                for(int j = 0; j < array.size(); j++) {
                    if(array.get(j).getSimple().trim().equals(simple)) {
                        second = array.get(j).getSecond().trim();
                        third = array.get(j).getThird().trim();
                        if(second.equals("default") || third.equals("default")) continue;
                        cate.getSecond().add(second);
                        if(cate.getMap().containsKey(second)) {
                            third = String.valueOf(array.get(j).getId()) + "_" + third;
                            cate.getMap().get(second).add(third);
                        }else {
                            List<String> temp = new ArrayList<String>();
                            third = String.valueOf(array.get(j).getId()) + "_" + third;
                            temp.add(third);
                            cate.getMap().put(second,temp);
                        }
                    }
                }
                list.add(cate);
            }
        }
        String result = JSON.toJSONString(list);
        return result;
    }

    @RequestMapping(value = "seeker/getCity.action")
    public @ResponseBody String seekerGetCity(@RequestBody String params){
        //cityService = new CityServiceImpl();
        List<City> citys = cityService.getProvince();
        Map<String,Set<String>> map = new HashMap<String,Set<String>>();
        Set<String> set = new HashSet<String>();
        City city;
        for(int i = 0; i < citys.size(); i++) {
            city = citys.get(i);
            if(set.contains(city.getProvince())==false) {
                set.add(city.getProvince());
            }
        }
        for(String item : set){
            Set<String> array = new HashSet<String>();
            for(int j = 0; j < citys.size(); j++) {
                city = citys.get(j);
                if(city.getProvince().equals(item)) {
                    array.add(city.getCity());
                }
            }
            map.put(item,array);
        }
        map.put("header",set);
        return JSON.toJSONString(map);
    }

    //登出
    @RequestMapping(value = "seeker/signOut.action")
    public String seekerSignOut(HttpSession session) {
        session.removeAttribute("uid");
        session.removeAttribute("identity");
        session.removeAttribute("Categorys");
        session.removeAttribute("Industrys");
        session.removeAttribute("Citys");
        return "/Common/login.jsp";
    }

    @RequestMapping(value = "seeker/browerResume.action",method = RequestMethod.GET)
    public ModelAndView browerResume(String id) {
        ModelAndView mav = new ModelAndView();
        //seekerService = new SeekerServiceImpl();
        //hopeService = new HopeServiceImpl();
        //practiceService = new PracticeServiceImpl();
        //projectService = new ProjectServiceImpl();
        //eduService = new EduServiceImpl();
        //socialService = new SocialServiceImpl();
        int num = Integer.parseInt(id);
        Seeker seeker = seekerService.selectById(num);
        mav.addObject("seeker",seeker);
        List<Hope> hopes = hopeService.selectHopeByUserId(seeker.getId());
        for(int i = 0; i < hopes.size(); i++) {
            hopes.get(i).setCategory(getSimpleName(hopes.get(i).getCategory()));
            hopes.get(i).setIndustry(getSimpleName(hopes.get(i).getIndustry()));
        }
        mav.addObject("hopes",hopes);
        List<Practice> practices = practiceService.selectPracticeByUserId(seeker.getId());
        mav.addObject("practices",practices);
        List<Project> projects = projectService.selectProjectByUserId(seeker.getId());
        mav.addObject("projects",projects);
        List<Education> educations = eduService.selectEduByUserId(seeker.getId());
        mav.addObject("educations",educations);
        List<Social> socials = socialService.selectSocialByUserId(seeker.getId());
        mav.addObject("socials",socials);
        mav.setViewName("/Jobseeker/brower_resume.jsp");
        return mav;
    }

    @RequestMapping(value = "boss/browerResume.action",method = RequestMethod.GET)
    public ModelAndView bossBrowerResume(String id) {
        ModelAndView mav = new ModelAndView();
        //seekerService = new SeekerServiceImpl();
        //hopeService = new HopeServiceImpl();
        //practiceService = new PracticeServiceImpl();
        //projectService = new ProjectServiceImpl();
        //eduService = new EduServiceImpl();
        //socialService = new SocialServiceImpl();
        int num = Integer.parseInt(id);
        Seeker seeker = seekerService.selectById(num);
        mav.addObject("seeker",seeker);
        List<Hope> hopes = hopeService.selectHopeByUserId(seeker.getId());
        for(int i = 0; i < hopes.size(); i++) {
            hopes.get(i).setCategory(getSimpleName(hopes.get(i).getCategory()));
            hopes.get(i).setIndustry(getSimpleName(hopes.get(i).getIndustry()));
        }
        mav.addObject("hopes",hopes);
        List<Practice> practices = practiceService.selectPracticeByUserId(seeker.getId());
        mav.addObject("practices",practices);
        List<Project> projects = projectService.selectProjectByUserId(seeker.getId());
        mav.addObject("projects",projects);
        List<Education> educations = eduService.selectEduByUserId(seeker.getId());
        mav.addObject("educations",educations);
        List<Social> socials = socialService.selectSocialByUserId(seeker.getId());
        mav.addObject("socials",socials);
        mav.setViewName("/Boss/brower_resume.jsp");
        return mav;
    }

    public String getSimpleName(String str) {
        int index = str.lastIndexOf("_");
        int len= str.length();
        return str.substring(index+1,len);
    }

    @RequestMapping(value = "seeker/updatePhoto.action")
    public @ResponseBody boolean seekerUpdatePhoto(@RequestBody String params) {
        boolean flag = true;
        JSONObject obj = JSON.parseObject(params);
        String id = obj.getString("id");
        String image = obj.getString("image");
        String identity = obj.getString("identity");
        try {
            String photoName = id + ".jpeg";
            String path = "";
            if(identity.equals("seeker")) {
                path = "E:\\upload\\seekerPhoto\\" + photoName;
            } else if(identity.equals("boss")){
                path = "E:\\upload\\bossPhoto\\" + photoName;
            }
            File newFile = base64ToFile(path,image);
            //seekerService = new SeekerServiceImpl();
            if(identity.equals("seeker")) {
                Seeker seeker = new Seeker();
                seeker.setId(Integer.parseInt(id));
                seeker.setPsrc(photoName);
                seekerService.updatePsrc(seeker);
            } else if(identity.equals("boss")){
                Boss boss = new Boss();
                boss.setId(Integer.parseInt(id));
                boss.setPsrc(photoName);
                bossService.updatePsrc(boss);
            }
        }catch (Exception ex) {
            flag = false;
        }
        return flag;
    }

    public File base64ToFile(String path,String image) {
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            byte[] b = decoder.decodeBuffer(image);
            for (int i = 0; i < b.length; i++) {
                if (b[i] < 0) {
                    b[i] += 256;
                }
            }
            OutputStream out = new FileOutputStream(path);
            out.write(b);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();

        }
        return new File(path);
    }

    @RequestMapping(value = "seeker/deleteInfor.action")
    public @ResponseBody boolean seekerDeleteInfor(@RequestBody String params) {
        boolean flag = true;
        JSONObject obj = JSON.parseObject(params);
        String tableName = obj.getString("tableName");
        String _id = obj.getString("id");
        int id = Integer.parseInt(_id);
        Page page = new Page();
        page.setTableName(tableName);
        page.setId(id);
        //seekerService = new SeekerServiceImpl();
        try {
            seekerService.deleteById(page);
        }catch (Exception ex) {
            flag = false;
            ex.printStackTrace();
        }
        return flag;
    }

    //招聘界面分页查找
    @RequestMapping(value = "seeker/searchSeeker.action")
    public @ResponseBody String searchSeeker(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        Condition condition = new Condition();
        condition.setStatus(obj.getString("status"));
        String edu = obj.getString("edu");
        if(edu==null || edu.equals("") || edu.equals("不限")) {
            edu = "%";
        } else {
            edu = "%" + edu + "%";
        }
        condition.setEducation(edu);
        String exp = obj.getString("exp");
        if(exp==null || exp.equals("") || exp.equals("不限")) {
            exp = "%";
        } else {
            exp = "%" + exp + "%";
        }
        condition.setWorkExp(exp);
        //seekerService = new SeekerServiceImpl();
        List<Seeker> seekers = seekerService.selectSeekerByCondition(condition);
        QueryVo queryVo = new QueryVo();
        List<Integer> idList = new ArrayList<>();
        for(Seeker seeker : seekers) {
            idList.add(seeker.getId());
        }
        if(idList.size() == 0) {
            return "0";
        }
        queryVo.setIdList(idList);
        //industryService = new IndustryServiceImpl();
        String category = obj.getString("category");
        if(category==null || category.equals("")) {
            category = "%";
        } else {
            int id = Integer.parseInt(category);
            category = industryService.getThirdCateById(id);
            category = "%" + category + "%";
        }
        queryVo.setCategory(category);
        String industry = obj.getString("industry");
        if(industry==null  || industry.equals("")) {
            industry = "%";
        } else {
            int id = Integer.parseInt(industry);
            industry = industryService.getSecondIndustryById(id);
            industry = "%" + industry + "%";
        }
        queryVo.setIndustry(industry);
        String salary = obj.getString("salary");
        if(salary==null || salary.equals("") || salary.equals("不限")) {
            salary = "%";
        } else {
            salary = "%" + salary + "%";
        }
        queryVo.setSalary(salary);
        String city = obj.getString("city");
        if(city==null || city.equals("") || city.equals("全国")) {
            city = "%";
        } else {
            city = "%" + city + "%";
        }
        queryVo.setCity(city);
        int start = Integer.parseInt(obj.getString("start"));
        int currentPage = start;
        start = (start-1)*20;
        queryVo.setStart(start);
        queryVo.setStep(Integer.parseInt(obj.getString("step")));
        //hopeService = new HopeServiceImpl();
        int totalCount =hopeService.countHopeByQueryVo(queryVo);
        int totalPage = 0;
        if(totalCount%20 == 0) {
            totalPage = totalCount/20;
        } else {
            totalPage = totalCount/20 + 1;
        }
        List<Hope> hopes = hopeService.pageQueryHopeByQueryVo(queryVo);
        Map<String,String> map = new HashMap<>();
        map.put("currentPage",String.valueOf(currentPage));
        map.put("totalPage",String.valueOf(totalPage));
        List<Talent> talents = new ArrayList<>();
        for(int i = 0; i < hopes.size(); i++) {
            for(int j = 0; j < seekers.size(); j++) {
                if(hopes.get(i).getUserId() == seekers.get(j).getId()) {
                    Talent talent = new Talent();
                    Hope hope = hopes.get(i);
                    Hope anotherHope = new Hope();
                    anotherHope.setId(hope.getId());
                    anotherHope.setIndustry(hope.getIndustry());
                    anotherHope.setCategory(hope.getCategory());
                    anotherHope.setCateId(hope.getCateId());
                    anotherHope.setCity(hope.getCity());
                    anotherHope.setSalary(hope.getSalary());
                    anotherHope.setIndustryId(hope.getIndustryId());
                    anotherHope.setUserId(hope.getUserId());
                    Seeker seeker = seekers.get(j);
                    Seeker anotherSeeker =  new Seeker();
                    anotherSeeker.setSname(seeker.getSname());
                    anotherSeeker.setId(seeker.getId());
                    anotherSeeker.setPsrc(seeker.getPsrc());
                    anotherSeeker.setEducation(seeker.getEducation());
                    anotherSeeker.setWorkExp(seeker.getWorkExp());
                    talent.setHope(anotherHope);
                    talent.setSeeker(anotherSeeker);
                    talents.add(talent);
                }
            }
        }
        map.put("data",JSON.toJSONString(talents));
        String result = JSON.toJSONString(map);
        return result;
    }









}

