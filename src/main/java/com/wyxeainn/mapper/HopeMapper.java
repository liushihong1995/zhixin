package com.wyxeainn.mapper;

import com.wyxeainn.pojo.Education;
import com.wyxeainn.pojo.Hope;
import com.wyxeainn.pojo.Industry;
import com.wyxeainn.pojo.QueryVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface HopeMapper {
    public List<Hope> selectHopeByUserId(Integer userId);
    public Integer insertHope(Hope hope);
    public void updateHope(Hope hope);
    public Integer countHopeByIndustryId(List<Integer> idList);
    public void updateIndustryByIndustryId(Industry industry);
    public void updateCateByCateId(Industry industry);
    public int countHopeByCateId(List<Integer> idList);
    public List<Hope> pageQueryHopeByQueryVo(@Param("qv") QueryVo queryVo);
    public int countHopeByQueryVo(@Param("qv") QueryVo queryVo);
}
