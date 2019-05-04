package com.wyxeainn.service;

import com.wyxeainn.factory.EduMapperFac;
import com.wyxeainn.mapper.EducationMapper;
import com.wyxeainn.pojo.Education;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EduServiceImpl implements EduService {
    private EducationMapper eduMapper;
    public EduServiceImpl(){
        eduMapper = EduMapperFac.getEduMapper();
    }

    @Override
    public List<Education> selectEduByUserId(int userId) {
        return eduMapper.selectEduByUserId(userId);
    }

    @Override
    public Integer insertEdu(Education edu){
        eduMapper.insertEdu(edu);
        return edu.getId();
    }

    @Override
    public void updateEdu(Education edu) {
        eduMapper.updateEdu(edu);
    }
}
