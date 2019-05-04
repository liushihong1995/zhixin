package com.wyxeainn.service;

import com.wyxeainn.pojo.Hope;
import com.wyxeainn.pojo.Industry;
import com.wyxeainn.pojo.QueryVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface HopeService {
    public List<Hope> selectHopeByUserId(Integer userId);
    public Integer insertHope(Hope hope);
    public void updateHope(Hope hope);
    public Integer countHopeByIndustryId(List<Integer> idList);
    public void updateIndustryByIndustryId(Industry industry);
    //查找cateId在idList中的职位数目
    public int countHopeByCateId(List<Integer> idList);
    //根据cateId更新cate
    public void updateCateByCateId(Industry industry);
    public List<Hope> pageQueryHopeByQueryVo(@Param("qv") QueryVo queryVo);
    public int countHopeByQueryVo(@Param("qv") QueryVo queryVo);
}
