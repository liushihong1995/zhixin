package com.wyxeainn.service;

import com.wyxeainn.factory.PracticeMapperFac;
import com.wyxeainn.mapper.PracticeMapper;
import com.wyxeainn.pojo.Practice;

import java.util.List;

public class PracticeServiceImpl implements PracticeService{
    private PracticeMapper practiceMapper;
    public PracticeServiceImpl(){
        practiceMapper = PracticeMapperFac.getPracticeMapper();
    }
    @Override
    public List<Practice> selectPracticeByUserId(int userId) {
        return practiceMapper.selectPracticeByUserId(userId);
    }

    @Override
    public int insertPractice(Practice practice) {
        practiceMapper.insertPractice(practice);
        return practice.getId();
    }

    @Override
    public void updatePractice(Practice practice) {
        practiceMapper.updatePractice(practice);
    }
}
