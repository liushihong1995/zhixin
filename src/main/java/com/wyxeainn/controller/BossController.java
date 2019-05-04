package com.wyxeainn.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.wyxeainn.pojo.*;
import com.wyxeainn.service.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class BossController {
    private BossService bossService = new BossServiceImpl();
    private SeekerService seekerService = new SeekerServiceImpl();
    private CodeService codeService = new CodeServiceImpl();
    private CompanyService companyService = new CompanyServiceImpl();
    private CityService cityService = new CityServiceImpl();
    private JobService jobService = new JobServiceImpl();
    private ProductService productService = new ProductServiceImpl();
    private SeniorService seniorService = new SeniorServiceImpl();
    private EnvironmentService environmentService = new EnvironmentServiceImpl();
    private IndustryService industryService = new IndustryServiceImpl();


    /*判断招聘者是否注册*/
    @RequestMapping(value = "boss/accountExist.action")
    public @ResponseBody boolean bossAccountExist(@RequestBody String params){
        JSONObject obj = JSON.parseObject(params);
        String phone = obj.getString("phone");
        //bossService = new BossServiceImpl();
        boolean flag = bossService.phoneExist(phone);
        return flag;
    }

    @RequestMapping(value = "boss/searchTalent.action")
    public String searchTalent(HttpSession session) {
        session.setAttribute("Categorys",getCategory());
        session.setAttribute("Industrys",getFullIndustry());
        session.setAttribute("Citys",getCitys());
        return "/Boss/searchTalent.jsp";
    }


    @RequestMapping(value = "boss/register.action")
    public @ResponseBody boolean bossRegister(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String phone = obj.getString("phone");
        boolean flag = true;
        //bossService = new BossServiceImpl();
        //codeService = new CodeServiceImpl();
        //seekerService = new SeekerServiceImpl();
        try {
            if(codeService.phoneExist(phone) == false) {
                Code code = new Code();
                code.setId(phone);
                code.setCode("123456");
                codeService.insertCode(code);
            }
            Boss boss = new Boss();
            boss.setPhone(phone);
            bossService.registerBoss(boss);
            Seeker seeker = new Seeker();
            seeker.setPhone(phone);
            seekerService.insertSeeker(seeker);
        }catch (Exception ex) {
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "boss/searchTalentWithCondition.action")
    public String searchTalentWithCondition(HttpSession session,String cateId,String cateName,String industry,String industryId,String city) {
        session.setAttribute("Categorys",getCategory());
        session.setAttribute("Industrys",getFullIndustry());
        session.setAttribute("Citys",getCitys());
        return "/Boss/searchTalent.jsp";
    }
    @RequestMapping(value = "boss/signOut.action")
    public String bossSignOut(HttpSession session) {
        session.removeAttribute("Categorys");
        session.removeAttribute("Industrys");
        session.removeAttribute("Citys");
        session.removeAttribute("uid");
        session.removeAttribute("identity");
        return "/Common/login.jsp";
    }

    @RequestMapping(value = "boss/homepage.action")
    public String homePage(HttpSession session) {
        session.setAttribute("Categorys",getCategory());
        session.setAttribute("Industrys",getFullIndustry());
        session.setAttribute("Citys",getCitys());
        return "/Boss/homePage.jsp";
    }

    @RequestMapping(value = "boss/getBossBasic.action")
    public @ResponseBody Boss getBossBasic(@RequestBody String id) {
       // bossService = new BossServiceImpl();
        Boss boss = bossService.selectBossById(Integer.parseInt(id));
        return boss;
    }

    @RequestMapping(value = "boss/getCompByFull.action")
    public @ResponseBody String getCompByFull(@RequestBody String fullName){
        fullName = "%" + fullName + "%";
       // companyService = new CompanyServiceImpl();
        List<Company> companies =companyService.getCompByFullName(fullName);
        Map<Integer,String> map = new HashMap<Integer, String>();
        int id;
        String _full,_short,str;
        List<String> list = new ArrayList<>();
        for(int i = 0; i < companies.size(); i++) {
            id = companies.get(i).getId();
            _full = companies.get(i).getFullName();
            _short = companies.get(i).getShortName();
            str = String.valueOf(id) + ";" + _full + ";" + _short;
            list.add(str);
        }
        return JSON.toJSONString(list);
    }

    /**
     *  保存基本信息，分为两种，一种是首次登录的时候，
     *  特征为还没有公司信息。
     * @param
     * @return
     */
    @RequestMapping(value = "boss/saveBasicInfor.action")
    public @ResponseBody boolean saveBasicInfor(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        Boss boss = new Boss();
        int id = Integer.parseInt(obj.getString("id"));
        boss.setId(id);
        boss.setNickName(obj.getString("nickName"));
        boss.setRealName(obj.getString("realName"));
        boss.setCompId(Integer.parseInt(obj.getString("compId")));
        boss.setCompany(obj.getString("company"));
        boss.setJob(obj.getString("job"));
        boss.setEmail(obj.getString("email"));
        boss.setSex(obj.getBoolean("sex"));
        //bossService = new BossServiceImpl();
        try {
            bossService.updateBossBasic(boss);
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
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
    /*获取职位*/
    public List<Category> getCategory(){
       // industryService = new IndustryServiceImpl();
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
       // cityService = new CityServiceImpl();
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

    @RequestMapping(value = "boss/saveStepOne.action")
    public @ResponseBody boolean saveStepOne(@RequestBody Boss boss) {
        boolean flag = true;
      //  bossService = new BossServiceImpl();
        try {
            bossService.updateBossBasic(boss);
        }catch (Exception ex) {
            flag = false;
        }
        return flag;
    }

    /*
    @RequestMapping(value = "boss/uploadCard.action")
    public @ResponseBody boolean bossUploadCard(@RequestBody String params) {
        boolean flag = true;
        bossService = new BossServiceImpl();
        JSONObject obj = JSON.parseObject(params);
        int id = Integer.parseInt(obj.getString("id"));
        String images = obj.getString("image");
        String type = obj.getString("type");
        try {
            Boss boss = new Boss();
            boss.setId(id);
            String cardFront = obj.getString("id") + ".jpeg";
            if(type.equals("front")) {
                String path = "E:\\upload\\cardFront\\" + cardFront;
                File file = new File(path);
                file.deleteOnExit();
                base64ToFile(path,images);
                boss.setCardFront(cardFront);
                bossService.updateBossFront(boss);
            }else if(type.equals("behind")) {
                String path = "E:\\upload\\cardBehind\\" + cardFront;
                File file = new File(path);
                file.deleteOnExit();
                base64ToFile(path,images);
                boss.setCardBehind(cardFront);
                bossService.updateBossBehind(boss);
            }else if(type.equals("card")) {
                String path =  "E:\\upload\\card\\" + cardFront;
                File file = new File(path);
                file.deleteOnExit();
                base64ToFile(path,images);
                boss.setCard(cardFront);
                bossService.updateBossHand(boss);
            }
        }catch (Exception ex) {
            flag = false;
        }
        return flag;
    }
    */


    public File base64ToFile(String path, String image) {
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

    @RequestMapping(value = "boss/getCard.action")
    public @ResponseBody Boss bossGetCard(@RequestBody String id) {
        int num = Integer.parseInt(id);
       // bossService = new BossServiceImpl();
        Boss boss = bossService.selectCardById(num);
        return boss;
    }

    @RequestMapping(value = "boss/getCompany.action")
    public @ResponseBody Company bossGetCompany(@RequestBody String id) {
        int num = Integer.parseInt(id);
       // companyService = new CompanyServiceImpl();
        Company company = companyService.getCompanyById(num);
        return company;
    }
    @RequestMapping(value = "boss/getBossCount.action")
    public @ResponseBody Integer bossGetBossCount(@RequestBody String id) {
        int count = 0;
      // bossService = new BossServiceImpl();
        int compId = Integer.parseInt(id);
        count = bossService.countBossByCompId(compId);
        return count;
    }

    @RequestMapping(value = "boss/getCityList.action")
    public @ResponseBody String getCityList(@RequestBody String city) {
        String str = "%" + city + "%";
      //  cityService = new CityServiceImpl();
        List<String> list = cityService.getCitys(str);
        return JSON.toJSONString(list);
    }

    @RequestMapping(value = "boss/getZones.action")
    public @ResponseBody String getZoneList(@RequestBody String city) {
       // cityService = new CityServiceImpl();
        List<String> list = cityService.getZones(city);
        return JSON.toJSONString(list);
    }

    @RequestMapping(value = "boss/getOnePage.action")
    public @ResponseBody String bossGetPage(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String op = obj.getString("op");
        if(op.equals("delete")) {
            int id = Integer.parseInt(obj.getString("id"));
           // jobService = new JobServiceImpl();
            jobService.deleteJob(id);
        }
        String result = getOnePageJob(params);
        return result;
    }
    public String getOnePageJob(String params) {
        JSONObject obj = JSON.parseObject(params);
        String current = obj.getString("currentPage");
        String bId = obj.getString("bossId");
        String cId = obj.getString("compId");
        int currentPage = Integer.parseInt(current);
        int bossId = Integer.parseInt(bId);
        int compId = Integer.parseInt(cId);
        //jobService = new JobServiceImpl();
        Page page = new Page();
        page.setBossId(bossId);
        page.setCompId(compId);
        int total = jobService.getJobCount(page);
        int totalPage = 0;
        if(total%15==0) {
            totalPage = total/15;
        }else {
            totalPage = total/15+1;
        }
        Map<String,String> map = new HashMap<String,String>();
        if(totalPage==0) {
            map.put("status","无数据");
        }else {
            map.put("status","有数据");
            if(currentPage>totalPage) {
                currentPage = totalPage;
            }
            page.setStart((currentPage-1)*15);
            page.setStep(15);
            List<Job> jobs = jobService.getOnePageJob(page);
            map.put("totalPage",String.valueOf(totalPage));
            map.put("currentPage",String.valueOf(currentPage));
            map.put("jobs",JSON.toJSONString(jobs));
        }
        return JSON.toJSONString(map);
    }

    @RequestMapping(value = "boss/insertJob.action")
    public @ResponseBody boolean bossInsertJob(@RequestBody Job job) {
        //jobService = new JobServiceImpl();
        boolean flag = true;
        try {
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            job.setTime(sdf.format(date));
            jobService.insertJob(job);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "boss/updateJob.action")
    public @ResponseBody boolean bossUpdateJob(@RequestBody Job job) {
      //  jobService = new JobServiceImpl();
        boolean flag = true;
        try {
            jobService.updateJob(job);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "boss/getJob.action")
    public @ResponseBody Job bossGetJob(@RequestBody String id) {
        int num = Integer.parseInt(id);
        jobService = new JobServiceImpl();
        Job job = jobService.getJobById(num);
        return job;
    }

    @RequestMapping(value = "boss/manageComp.action")
    public ModelAndView mangeCompInfor(String pageInput,String operatorInput,String idInput) {
        ModelAndView mav = new ModelAndView();
        String page = pageInput;
        String operator = operatorInput;
        String id = idInput;
        mav.setViewName("/Boss/manageComp.jsp");
        mav.addObject("page",page);
        mav.addObject("operator",operator);
        mav.addObject("myId",id);
        return mav;
    }

    @RequestMapping(value = "boss/updateCompany.action")
    public @ResponseBody boolean bossUpdateCompany(@RequestBody Company company) {
        boolean flag = true;
        String path = "E:\\upload\\compLogo\\";
        String logoName = String.valueOf(company.getId()) + ".jpeg";
        String tempPath = path + logoName;
        File file = new File(tempPath);
        base64ToFile(tempPath,company.getLogo());
        company.setLogo(logoName);
       // companyService = new CompanyServiceImpl();
        try {
            companyService.updateCompany(company);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "boss/getProductByCompId.action")
    public @ResponseBody String getProductByCompId(@RequestBody String id) {
        int compId = Integer.parseInt(id);
       // productService = new ProductServiceImpl();
        List<Product> list = productService.getProductsByCompId(compId);
        String result = JSON.toJSONString(list);
        return result;
    }

    @RequestMapping(value = "boss/getProduct.action")
    public @ResponseBody Product bossGetProduct(@RequestBody String id) {
        int num = Integer.parseInt(id);
        productService = new ProductServiceImpl();
        Product product = productService.getProductById(num);
        return product;
    }

    @RequestMapping(value = "boss/getProducts.action")
    public @ResponseBody String bossGetProducts(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String compId = obj.getString("compId");
        String bossId = obj.getString("bossId");
        Product product = new Product();
        product.setBossId(Integer.parseInt(bossId));
        product.setCompId(Integer.parseInt(compId));
      //  productService = new ProductServiceImpl();
        List<Product> list = productService.getProducts(product);
        return JSON.toJSONString(list);
    }

    @RequestMapping(value = "boss/getBussiness.action")
    public @ResponseBody Bussiness bossGetBussiness(@RequestBody String id) {
        int compId = Integer.parseInt(id);
      //  companyService = new CompanyServiceImpl();
        Bussiness buss = companyService.getBussinessById(compId);
        return buss;
    }

    @RequestMapping(value = "boss/updateProduct.action")
    public @ResponseBody boolean bossUpdateProduct(@RequestBody Product product) {
        String logo = product.getLogo();
        String path = "E:\\upload\\productLogo\\";
        String name = product.getId() + ".jpeg";
        boolean flag = true;
        try {
            File file = new File(path+name);
            base64ToFile(path+name,logo);
            product.setLogo(name);
            //productService = new ProductServiceImpl();
            productService.updateProduct(product);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "boss/insertProduct.action")
    public @ResponseBody boolean bossInsertProduct(@RequestBody Product product) {
        String logo = product.getLogo();
        String path = "E:\\upload\\productLogo\\";
        String name = UUID.randomUUID().toString() + ".jpeg";
        boolean flag = true;
        try {
            File file = new File(path+name);
            file.deleteOnExit();
            base64ToFile(path+name,logo);
            product.setLogo(name);
            //productService = new ProductServiceImpl();
            productService.insertProduct(product);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "boss/getEnvironmentByCompId.action")
    public @ResponseBody String getEnvironmentByCompId(@RequestBody String id) {
        int compId = Integer.parseInt(id);
        //environmentService = new EnvironmentServiceImpl();
        List<Environment> list = environmentService.getEnvironmentsByCompId(compId);
        String result = JSON.toJSONString(list);
        return result;
    }

    @RequestMapping(value = "boss/getSeniorsByCompId.action")
    public @ResponseBody String getSeniorByCompId(@RequestBody String id) {
        int compId = Integer.parseInt(id);
      //  seniorService = new SeniorServiceImpl();
        List<Senior> list = seniorService.getSeniorByCompId(compId);
        String result = JSON.toJSONString(list);
        return result;
    }

    @RequestMapping(value = "boss/getSeniors.action")
    public @ResponseBody String bossGetSeniors(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String compId = obj.getString("compId");
        String bossId = obj.getString("bossId");
     //   seniorService = new SeniorServiceImpl();
        Senior senior = new Senior();
        senior.setBossId(Integer.parseInt(bossId));
        senior.setCompId(Integer.parseInt(compId));
        List<Senior> list = seniorService.getSeniors(senior);
        return JSON.toJSONString(list);
    }

    @RequestMapping(value = "boss/getEnvironments.action")
    public @ResponseBody String getEnvironments(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String compId = obj.getString("compId");
        String bossId = obj.getString("bossId");
       // environmentService = new EnvironmentServiceImpl();
        Environment environment = new Environment();
        environment.setBossId(Integer.parseInt(bossId));
        environment.setCompId(Integer.parseInt(compId));
        List<Environment> environments = environmentService.getEnvironmentsByCompIdAndBossId(environment);
        return JSON.toJSONString(environments);
    }

    /**
     * 删除产品信息，高管信息或公司环境图片
     * @param params
     * @return
     */
    @RequestMapping(value = "boss/deleteCompInfor.action")
    public @ResponseBody boolean deleteCompInfor(@RequestBody String params) {
        boolean flag = true;
        JSONObject obj = JSON.parseObject(params);
        String table = obj.getString("table");
        int id = Integer.parseInt(obj.getString("id"));
        Page page = new Page();
        page.setId(id);
        page.setTableName(table);
        if(table.equals("t_environment")) {
            String path = "E:\\upload\\envirPhoto\\" + String.valueOf(id) + ".jpeg";
            File file = new File(path);
            if(file.exists()) {
                file.deleteOnExit();
            }
        } else if(table.equals("t_product")) {
            String path = "E:\\upload\\productLogo\\" + String.valueOf(id) + ".jpeg";
            File file = new File(path);
            if(file.exists()) {
                file.deleteOnExit();
            }
        } else if(table.equals("t_senior")) {
            String path = "E:\\upload\\seniorPhoto\\" + String.valueOf(id) + ".jpeg";
            File file = new File(path);
            if(file.exists()) {
                file.deleteOnExit();
            }
        }
        try {
            companyService.deleteCompanyInfor(page);
        } catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    //插入公司图片
    @RequestMapping(value = "boss/insertEnvironment.action")
    public @ResponseBody boolean insertEnvironment(@RequestBody String params) {
        boolean flag = true;
        JSONObject obj = JSON.parseObject(params);
        Environment environment = new Environment();
        int compId = Integer.parseInt(obj.getString("compId"));
        int bossId = Integer.parseInt(obj.getString("bossId"));
        String image = obj.getString("image");
        String path = "E:\\upload\\envirPhoto\\";
        String name = UUID.randomUUID().toString() + ".jpeg";
        environment.setBossId(bossId);
        environment.setCompId(compId);
        environment.setPsrc(name);
        base64ToFile(path+name,image);
       // environmentService = new EnvironmentServiceImpl();
        try {
            environmentService.insertEnvironment(environment);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return flag;
    }

    @RequestMapping(value = "boss/getSenior.action")
    public @ResponseBody Senior bossGetSenior(@RequestBody String id) {
        int num = Integer.parseInt(id);
       // seniorService = new SeniorServiceImpl();
        Senior senior = seniorService.getSeniorById(num);
        return senior;
    }

    @RequestMapping(value = "boss/updateSenior.action")
    public @ResponseBody boolean bossUpdateSenior(@RequestBody Senior senior) {
        //seniorService = new SeniorServiceImpl();
        Senior s = seniorService.getSeniorById(senior.getId());
        String psrc = senior.getPsrc();
        String path = "E:\\upload\\seniorPhoto\\";
        String name = String.valueOf(senior.getId()) + ".jpeg";
        boolean flag = true;
        try {
            base64ToFile(path+name,psrc);
            senior.setPsrc(name);
            seniorService.updateSenior(senior);
            File file = new File(path+s.getPsrc());
            file.deleteOnExit();;
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "boss/insertSenior.action")
    public @ResponseBody boolean bossInsertSenior(@RequestBody Senior senior) {
        String psrc = senior.getPsrc();
        String path = "E:\\upload\\seniorPhoto\\";
        String name = UUID.randomUUID().toString() + ".jpeg";
        boolean flag = true;
        //seniorService = new SeniorServiceImpl();
        try {
            senior.setPsrc(name);
            base64ToFile(path+name,psrc);
            seniorService.insertSenior(senior);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

}
