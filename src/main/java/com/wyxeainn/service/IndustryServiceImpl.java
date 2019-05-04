package com.wyxeainn.service;

import com.wyxeainn.factory.IndustryMapperFac;
import com.wyxeainn.mapper.IndustryMapper;
import com.wyxeainn.pojo.Industry;
import com.wyxeainn.pojo.QueryVo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IndustryServiceImpl implements IndustryService{
    private IndustryMapper industryMapper;
    public IndustryServiceImpl() {
        industryMapper = IndustryMapperFac.getIndustryMapper();
    }

    @Override
    public List<Industry> selectFromIndustry() {
        return industryMapper.selectFromIndustry();
    }

    @Override
    public void insertFirst(Industry industry) {
        industryMapper.insertFirst(industry);
    }

    @Override
    public List<String> getSecond(String first) {
        return industryMapper.getSecond(first);
    }

    @Override
    public List<Industry> selectFromCategory() {
        return industryMapper.selectFromCategory();
    }

    @Override
    public void insertCatetory(Industry industry) {
        industryMapper.insertCatetory(industry);
    }

    @Override
    public String getSecondIndustryById(Integer id) {
        return industryMapper.getSecondIndustryById(id);
    }

    @Override
    public String getThirdCateById(Integer id) {
        return industryMapper.getThirdCateById(id);
    }

    @Override
    public List<Integer> getIdByIndustryFirst(String first) {
        return industryMapper.getIdByIndustryFirst(first);
    }

    @Override
    public void deleteByIdList(List<Integer> idList) {
        industryMapper.deleteByIdList(idList);
    }

    @Override
    public void updateFirstByIdList(QueryVo queryVo) {
        industryMapper.updateFirstByIdList(queryVo);
    }

    @Override
    public int getIdByFirstAndSecond(Industry industry) {
        return industryMapper.getIdByFirstAndSecond(industry);
    }

    @Override
    public void updateSecondById(Industry industry) {
        industryMapper.updateSecondById(industry);
    }

    @Override
    public List<Integer> getIdByCateSimple(String simple) {
        return industryMapper.getIdByCateSimple(simple);
    }

    public void deleteCateFirstByIdList(List<Integer> idList) {
        industryMapper.deleteCateFirstByIdList(idList);
    }

    @Override
    public void updateSimpleAndFirstByIdList(QueryVo queryVo) {
        industryMapper.updateSimpleAndFirstByIdList(queryVo);
    }

    @Override
    public List<Integer> getIdByCateSimpleAndSecond(Industry industry) {
        return industryMapper.getIdByCateSimpleAndSecond(industry);
    }

    @Override
    public void updateCateSecondByIdList(QueryVo queryVo) {
        industryMapper.updateCateSecondByIdList(queryVo);
    }

    @Override
    public int getIdByAllInfor(Industry industry) {
        return industryMapper.getIdByAllInfor(industry);
    }

    @Override
    public void updateCateThirdById(Industry industry) {
        industryMapper.updateCateThirdById(industry);
    }
}
