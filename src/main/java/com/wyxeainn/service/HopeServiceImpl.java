package com.wyxeainn.service;

import com.wyxeainn.factory.HopeMapperFac;
import com.wyxeainn.mapper.HopeMapper;
import com.wyxeainn.pojo.Hope;
import com.wyxeainn.pojo.Industry;
import com.wyxeainn.pojo.QueryVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public class HopeServiceImpl implements HopeService {
    private HopeMapper hopeMapper;
    public HopeServiceImpl(){
        hopeMapper = HopeMapperFac.getHopeMapper();
    }

    @Override
    public List<Hope> selectHopeByUserId(Integer userId) {
        return hopeMapper.selectHopeByUserId(userId);
    }

    @Override
    public Integer insertHope(Hope hope) {
        hopeMapper.insertHope(hope);
        return hope.getId();
    }

    @Override
    public void updateHope(Hope hope) {
        hopeMapper.updateHope(hope);
    }

    @Override
    public void updateIndustryByIndustryId(Industry industry) {
        hopeMapper.updateIndustryByIndustryId(industry);
    }

    @Override
    public Integer countHopeByIndustryId(List<Integer> idList) {
        return hopeMapper.countHopeByIndustryId(idList);
    }

    @Override
    public int countHopeByCateId(List<Integer> idList) {
        return hopeMapper.countHopeByCateId(idList);
    }

    @Override
    public void updateCateByCateId(Industry industry) {
        hopeMapper.updateCateByCateId(industry);
    }

    public List<Hope> pageQueryHopeByQueryVo(@Param("qv") QueryVo queryVo){
        return hopeMapper.pageQueryHopeByQueryVo(queryVo);
    }

    @Override
    public int countHopeByQueryVo(QueryVo queryVo) {
        return hopeMapper.countHopeByQueryVo(queryVo);
    }
}

