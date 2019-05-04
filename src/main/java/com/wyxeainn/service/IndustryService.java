package com.wyxeainn.service;

import com.wyxeainn.pojo.Industry;
import com.wyxeainn.pojo.QueryVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IndustryService {
    public List<Industry> selectFromIndustry();
    public void insertFirst(Industry industry);
    public List<String> getSecond(String first);
    public List<Industry> selectFromCategory();
    public void insertCatetory(Industry industry);
    public String getSecondIndustryById(Integer id);
    public String getThirdCateById(Integer id);
    public List<Integer> getIdByIndustryFirst(String first);
    public void deleteByIdList(List<Integer> idList);
    public void updateFirstByIdList(QueryVo queryVo);
    //根据一级分类和二级分类获取分类id
    public int getIdByFirstAndSecond(Industry industry);
    //根据id更新二级分类
    public void updateSecondById(Industry industry);
    //根据职类的一级简称获取在该分类下的所有职类的id
    public List<Integer> getIdByCateSimple(String simple);
    public void deleteCateFirstByIdList(List<Integer> idList);
    public void updateSimpleAndFirstByIdList(QueryVo queryVo);
    public List<Integer> getIdByCateSimpleAndSecond(Industry industry);
    public void updateCateSecondByIdList(@Param("qv") QueryVo queryVo);
    public int getIdByAllInfor(Industry industry);
    public void updateCateThirdById(Industry industry);
}
