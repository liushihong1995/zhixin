package com.wyxeainn.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.wyxeainn.pojo.Industry;
import com.wyxeainn.pojo.QueryVo;
import com.wyxeainn.service.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;
import java.util.function.IntUnaryOperator;

@Controller
public class IndustryControll {
    private IndustryService industryService = new IndustryServiceImpl();
    private HopeService hopeService = new HopeServiceImpl();
    private CompanyService companyService = new CompanyServiceImpl();
    private JobService jobService = new JobServiceImpl();

    /**
     * 完成删除一级分类
     * @param firstLevel 一级分类名称
     * @return 0成功，1该分类被使用无法删除，2数据库操作异常
     */
    @RequestMapping(value = "industry/deleteFirstLevel.action")
    public @ResponseBody int deleteFirstLevel(@RequestBody String firstLevel) {
        int result = 0;
        //industryService = new IndustryServiceImpl();
        //根据一级分类获取所有的分类
        List<Integer> ids = industryService.getIdByIndustryFirst(firstLevel);
        //到t_hope中查
        //到t_company中查
        //companyService = new CompanyServiceImpl();
        int count = companyService.countCompByIndustryId(ids);
        if(count > 0) {
            result = 1;
        } else {
            hopeService = new HopeServiceImpl();
            count = hopeService.countHopeByIndustryId(ids);
            if(count > 0) {
                result = 1;
            }
        }
        if(result == 0) {
            try {
                industryService.deleteByIdList(ids);
            } catch (Exception ex) {
                ex.printStackTrace();
                result = 2;
            }
        }
        return result;
    }

    /**
     * 修改一级分类，修改成功返回0
     * 1.判断该一级分类是否存在，存在返回1
     * 2.获取所有属于一级分类的分类的id
     * 3.根据id更新行业表的一级分类，发生数据库相关错误返回2
     * @param params
     * @return
     */
    @RequestMapping(value = "industry/modifyFirstClass.action")
    public @ResponseBody int modifyFirstClass(@RequestBody String params) {
        int result = 0;
        JSONObject obj = JSON.parseObject(params);
        String oldFirstName = obj.getString("oldFirstName");
        String newFirstName = obj.getString("newFirstName");
        List<String> firstList = getFirst();
        for(String item : firstList) {
            if(item.equals(newFirstName)) {
                result = 1;
                break;
            }
        }
        if(result == 0) {
            try {
                //industryService = new IndustryServiceImpl();
                List<Integer> ids = industryService.getIdByIndustryFirst(oldFirstName);
                QueryVo queryVo = new QueryVo();
                queryVo.setFirst(newFirstName);
                queryVo.setIdList(ids);
                industryService.updateFirstByIdList(queryVo);
            } catch (Exception ex) {
                ex.printStackTrace();
                result = 2;
            }
        }
        return result;
    }

    /**
     * 修改2级分类，修改成功返回0
     * 获取2级分类id，然后按照id更新行业分类表。
     * 更新公司信息表
     * 更新期望职位表
     * @param params
     * @return
     */
    @RequestMapping(value = "industry/modifySecondClass.action")
    public @ResponseBody int modifySecondClass(@RequestBody String params) {
        int result = 0;
        JSONObject obj = JSON.parseObject(params);
        String firstName = obj.getString("firstName");
        String oldSecondName = obj.getString("oldSecondName");
        String newSecondName = obj.getString("newSecondName");
        //industryService = new IndustryServiceImpl();
        List<String> secondList = getSecond(firstName);
        for(String item : secondList) {
            if(item.equals(newSecondName)) {
                result = 1;
                break;
            }
        }
        if(result == 0) {
            try {
                Industry industry = new Industry();
                industry.setFirst(firstName);
                industry.setSecond(oldSecondName);
                int id = industryService.getIdByFirstAndSecond(industry);
                industry.setId(id);
                industry.setSecond(newSecondName);
                industryService.updateSecondById(industry);
                companyService = new CompanyServiceImpl();
                companyService.updateIndustryByIndustryId(industry);
                hopeService = new HopeServiceImpl();
                hopeService.updateIndustryByIndustryId(industry);
            } catch (Exception ex) {
                ex.printStackTrace();
                result = 2;
            }
        }
        return result;
    }

    //删除二级分类
    @RequestMapping(value = "industry/deleteSecond.action")
    public @ResponseBody int deleteSecondIndustry(@RequestBody String params) {
        int result = 0;
        JSONObject obj = JSON.parseObject(params);
        String first = obj.getString("first");
        String second = obj.getString("second");
        Industry industry = new Industry();
        industry.setFirst(first);
        industry.setSecond(second);
        //industryService = new IndustryServiceImpl();
        int id = industryService.getIdByFirstAndSecond(industry);
        List<Integer> idList = new ArrayList<>();
        idList.add(id);
        //companyService = new CompanyServiceImpl();
        int count = companyService.countCompByIndustryId(idList);
        if (count > 0) {
            result = 1;
        } else {
            hopeService = new HopeServiceImpl();
            count = hopeService.countHopeByIndustryId(idList);
            if(count>0) {
                result = 1;
            }
        }
        if (result == 0) {
            try {
                industryService.deleteByIdList(idList);
            } catch (Exception ex) {
                ex.printStackTrace();
                result = 2;
            }
        }
        return result;
    }

    /**
     * 删除一级分类
     * 根据一级分类简称，获取id列表。
     * 判断hope表是否有属于该分类的记录
     * 判断job表是否有属于该分类的记录
     * @param simple
     * @return
     */
    @RequestMapping(value = "category/deleteFirstCate.action")
    public @ResponseBody int deleteFirstCate(@RequestBody String simple) {
        int result = 0;
        //industryService = new IndustryServiceImpl();
        List<Integer> idList = industryService.getIdByCateSimple(simple);
        jobService = new JobServiceImpl();
        int count = jobService.countJobByCateId(idList);
        if(count>0){
            result = 1;
        } else {
            hopeService = new HopeServiceImpl();
            count = hopeService.countHopeByCateId(idList);
            if(count>0) {
                result = 1;
            }
        }
        if(result == 0) {
            try {
                industryService.deleteCateFirstByIdList(idList);
            } catch (Exception ex) {
                ex.printStackTrace();
                result = 2;
            }
        }
        return result;
    }

    /**
     * 修改职位类型一级分类
     * @param params
     * @return
     */
    @RequestMapping(value = "category/modifyCateFirst.action")
    public @ResponseBody int modifyCateFirst(@RequestBody String params) {
        int result = 0;
        JSONObject obj = JSON.parseObject(params);
        String oldSimple = obj.getString("oldSimple"); //旧简称
        String oldFirst = obj.getString("oldFirst");   //旧全称
        String newSimple = obj.getString("newSimple"); //新简称
        String newFirst = obj.getString("newFirst");   //新全称
        //industryService = new IndustryServiceImpl();
        try {
            List<Integer> idList = industryService.getIdByCateSimple(oldSimple);
            QueryVo queryVo = new QueryVo();
            queryVo.setSimple(newSimple);
            queryVo.setFirst(newFirst);
            queryVo.setIdList(idList);
            industryService.updateSimpleAndFirstByIdList(queryVo);
        } catch (Exception ex) {
            ex.printStackTrace();
            result = 2;
        }
        return result;
    }

    //删除职位类型中的二级分类
    @RequestMapping(value = "category/deleteCateSecond.action")
    public @ResponseBody int deleteCateSecond(@RequestBody String params) {
        int result = 0;
        JSONObject obj = JSON.parseObject(params);
        String simple = obj.getString("simple");
        String second = obj.getString("second");
        //industryService = new IndustryServiceImpl();
        Industry industry = new Industry();
        industry.setSimple(simple);
        industry.setSecond(second);
        List<Integer> idList = industryService.getIdByCateSimpleAndSecond(industry);
        //jobService = new JobServiceImpl();
        int count = jobService.countJobByCateId(idList);
        if(count>0) {
            result = 1;
        } else {
            hopeService = new HopeServiceImpl();
            count = hopeService.countHopeByCateId(idList);
            if(count>0) {
                result = 1;
            }
        }
        if(result == 0) {
            try {
                industryService.deleteCateFirstByIdList(idList);
            } catch (Exception ex) {
                ex.printStackTrace();
                result = 2;
            }
        }
        return result;
    }

    @RequestMapping(value = "category/modifyCateSecond.action")
    public @ResponseBody int modifyCateSecond(@RequestBody String params) {
        int result = 0;
        JSONObject obj = JSON.parseObject(params);
        String simple = obj.getString("simple");
        String oldSecond = obj.getString("oldSecond");
        String newSecond = obj.getString("newSecond");
       // industryService = new IndustryServiceImpl();
        Industry industry = new Industry();
        industry.setSimple(simple);
        industry.setSecond(oldSecond);
        try {
            List<Integer> idList = industryService.getIdByCateSimpleAndSecond(industry);
            QueryVo queryVo = new QueryVo();
            queryVo.setSecond(newSecond);
            queryVo.setIdList(idList);
            industryService.updateCateSecondByIdList(queryVo);
        } catch (Exception ex) {
            ex.printStackTrace();
            result = 2;
        }
        return result;
    }

    @RequestMapping(value = "category/deleteCateThree.action")
    public @ResponseBody int deleteCateThree(@RequestBody String params) {
        int result = 0;
        JSONObject obj = JSON.parseObject(params);
        String simple = obj.getString("simple");
        String second = obj.getString("second");
        String third = obj.getString("third");
        Industry industry =new Industry();
        industry.setSimple(simple);
        industry.setSecond(second);
        industry.setThird(third);
        //industryService = new IndustryServiceImpl();
        int id = industryService.getIdByAllInfor(industry);
        List<Integer> idList = new ArrayList<>();
        idList.add(id);
        //jobService = new JobServiceImpl();
        int count = jobService.countJobByCateId(idList);
        if(count>0) {
            result = 1;
        } else {
            hopeService = new HopeServiceImpl();
            count = hopeService.countHopeByCateId(idList);
            if(count>0) {
                result = 1;
            }
        }
        if(result == 0) {
            try {
                industryService.deleteCateFirstByIdList(idList);
            } catch (Exception ex) {
                ex.printStackTrace();
                result = 2;
            }
        }
        return result;
    }

    @RequestMapping(value = "category/modifyCateThird.action")
    public @ResponseBody int modifyCateThird(@RequestBody String params) {
        int result = 0;
        JSONObject obj = JSON.parseObject(params);
        String simple = obj.getString("simple");
        String second = obj.getString("second");
        String oldThird = obj.getString("oldThird");
        String newThird = obj.getString("newThird");
       // industryService = new IndustryServiceImpl();
        Industry industry = new Industry();
        industry.setSimple(simple);
        industry.setSecond(second);
        industry.setThird(oldThird);
        int id = industryService.getIdByAllInfor(industry);
        try {
            industry.setId(id);
            industry.setThird(newThird);
            industryService.updateCateThirdById(industry);
            jobService = new JobServiceImpl();
            jobService.updateCateByCateId(industry);
            hopeService = new HopeServiceImpl();
            hopeService.updateCateByCateId(industry);
        } catch (Exception ex) {
            ex.printStackTrace();
            result = 2;
        }
        return result;
    }

    @RequestMapping(value = "/industry/getAllIndustry.action")
    public @ResponseBody String getAllIndustry(@RequestBody String params) {
        List<String> firstClass = new ArrayList<String>();
        firstClass = getFirst();
        String result = JSON.toJSONString(firstClass);
        return result;
    }

    public List<String> getFirst() {
        //industryService = new IndustryServiceImpl();
        List<Industry> list = industryService.selectFromIndustry();
        List<String> firstClass = new ArrayList<String>();
        Set<String> set = new HashSet<String>();
        String first = "";
        for(int i = 0; i < list.size(); i++) {
            first = list.get(i).getFirst();
            if(!set.contains(first)) {
                set.add(first);
                firstClass.add(first);
            }
        }
        return firstClass;
    }

    @RequestMapping(value = "/industry/existFirst.action")
    public @ResponseBody Boolean existFirst(@RequestBody String params){
        JSONObject obj = JSON.parseObject(params);
        String first = obj.getString("id");
        List<String> firstClass = getFirst();
        Industry industry = new Industry();
        industry.setFirst(first);
        industry.setSecond("default");
        if(firstClass.contains(first)) {
            return false;
        }else {
           // industryService = new IndustryServiceImpl();
            industryService.insertFirst(industry);
            return true;
        }
    }

    /*获取二级分类*/
    @RequestMapping(value = "/industry/getSecond.action")
    public @ResponseBody String getSecondClass(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String first = obj.getString("id");
        List<String> list = new ArrayList<String>();
        list = getSecond(first);
        return JSON.toJSONString(list);
    }


    @RequestMapping(value = "/industry/insertSecond.action")
    public @ResponseBody Boolean insertSecondClass(@RequestBody String params){
        JSONObject obj = JSON.parseObject(params);
        String first = obj.getString("first");
        String second = obj.getString("second");
        Industry industry = new Industry();
        List<String> list = getSecond(first);
        boolean flag = true;
        for(int i = 0; i < list.size(); i++) {
            if(list.get(i).equals(second)) {
                flag = false;
                break;
            }
        }
        if(flag) {
            try {
                industry.setFirst(first);
                industry.setSecond(second);
                //industryService = new IndustryServiceImpl();
                industryService.insertFirst(industry);
            }catch (Exception ex) {
                ex.printStackTrace();
                flag = false;
            }
        }
        return flag;
    }
    public List<String> getSecond(String first){
       // industryService = new IndustryServiceImpl();
        return industryService.getSecond(first);
    }

    @RequestMapping(value = "/category/getFirst.action")
    public @ResponseBody String categoryGetFirst(@RequestBody String params) {
        List<Industry> list = getAllFromCategory();
        Set<String> set = new HashSet<String>();
        Set<String> first = new HashSet<String>();
        Industry item;
        String value = "";
        for(int i = 0; i < list.size(); i++) {
            item = list.get(i);
            if(set.contains(item.getSimple())) {
                continue;
            }else {
                set.add(item.getSimple());
                value = "[" + item.getSimple() + "] " + item.getFirst();
                first.add(value);
            }
        }
        String result = "";
        if(first.size() == 0) {
            result = "无数据";
        }else {
            result = JSON.toJSONString(first);
        }
        return result;
    }

    @RequestMapping(value = "/category/insertCatetory.action")
    public @ResponseBody Boolean insertCatetory(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String simple = obj.getString("simple");
        String first = obj.getString("first");
        Industry industry = new Industry();
        industry.setSimple(simple);
        industry.setFirst(first);
        industry.setSecond("default");
        industry.setThird("default");
        boolean flag = true;
        try {
           // industryService = new IndustryServiceImpl();
            industryService.insertCatetory(industry);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "/category/getCateSecond.action")
    public @ResponseBody String getCateSecond(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String simple = obj.getString("simple");
        List<Industry> list = getAllFromCategory();
        Set<String> set = new HashSet<String>();
        Industry item;
        for(int i = 0; i < list.size(); i++) {
           item = list.get(i);
           if(item.getSimple().equals(simple)) {
               if(!item.getSecond().equals("default") && !set.contains(item.getSecond())) {
                   set.add(item.getSecond());
               }
           }
        }
        String result = JSON.toJSONString(set);
        return result;
    }

    @RequestMapping(value = "/category/insertCateSecond.action")
    public @ResponseBody Boolean insertCateSecond(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String simple = obj.getString("simple");
        String first = obj.getString("first");
        String second = obj.getString("second");
        Industry industry = new Industry();
        industry.setSimple(simple);
        industry.setFirst(first);
        industry.setSecond(second);
        industry.setThird("default");
        boolean flag = true;
        try {
            //industryService = new IndustryServiceImpl();
            industryService.insertCatetory(industry);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @RequestMapping(value = "/category/getCateThird.action")
    public @ResponseBody String getCateThird(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String simple = obj.getString("simple");
        String first = obj.getString("first");
        String second = obj.getString("second");
        System.out.print(simple + "  " + second);
        List<Industry> list = getAllFromCategory();
        Set<String> set = new HashSet<String>();
        Industry item;
        String _simple,_first,_second;
        for(int i = 0; i < list.size(); i++) {
            item = list.get(i);
            _simple = item.getSimple();
            _first = item.getFirst();
            _second = item.getSecond();
          if(_simple.equals(simple)==false) continue;
          if(_second.equals(second)==false) continue;
          if(item.getThird().equals("default")) continue;
          if(set.contains(item.getThird())==false) {
              set.add(item.getThird());
          }

        }
        for(String str : set) {
            System.out.println(str);
        }
        return JSON.toJSONString(set);
    }

    @RequestMapping(value = "category/insertCateThird.action")
    public @ResponseBody Boolean insertCateThird(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String simple = obj.getString("simple");
        String first = obj.getString("first");
        String second = obj.getString("second");
        String third = obj.getString("third");
        Industry industry = new Industry();
        industry.setSimple(simple);
        industry.setFirst(first);
        industry.setSecond(second);
        industry.setThird(third);
        boolean flag = true;
        try {
           // industryService = new IndustryServiceImpl();
            industryService.insertCatetory(industry);
        }catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    public List<Industry> getAllFromCategory(){
        //industryService = new IndustryServiceImpl();
        List<Industry> list = new ArrayList<Industry>();
        list = industryService.selectFromCategory();
        return list;
    }
}

