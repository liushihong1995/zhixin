package com.wyxeainn.mapper;

import com.sun.tracing.dtrace.ProviderAttributes;
import com.wyxeainn.pojo.Industry;
import com.wyxeainn.pojo.QueryVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IndustryMapper {
    public List<Industry> selectFromIndustry();
    public void insertFirst(Industry industry);
    public List<String> getSecond(@Param("first") String first);
    public List<Industry> selectFromCategory();
    public void insertCatetory(Industry industry);
    public String getSecondIndustryById(Integer id);
    public String getThirdCateById(Integer id);
    //根据一级分类名称获取行业id
    public List<Integer> getIdByIndustryFirst(@Param("first") String first);
    public void deleteByIdList(List<Integer> idList);
    public void updateFirstByIdList(@Param("qv") QueryVo queryVo);
    public int getIdByFirstAndSecond(Industry industry);
    public void updateSecondById(Industry industry);
    public List<Integer> getIdByCateSimple(@Param("simple") String simple);
    //删除id列表中包含的职类
    public void deleteCateFirstByIdList(List<Integer> idList);
    //根据id列表更新simple和first
    public void updateSimpleAndFirstByIdList(@Param("qv") QueryVo queryVo);
    //根据二级分类下的所有分类的id
    public List<Integer> getIdByCateSimpleAndSecond(Industry industry);
    //根据id更新二级分类名
    public void updateCateSecondByIdList(@Param("qv") QueryVo queryVo);
    //根据一级分类，二级分类，三级分类获取id
    public int getIdByAllInfor(Industry industry);
    //根据id更新三级分类
    public void updateCateThirdById(Industry industry);
}
