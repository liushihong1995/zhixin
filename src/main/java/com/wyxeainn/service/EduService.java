package com.wyxeainn.service;

import com.wyxeainn.pojo.Education;

import java.util.List;

public interface EduService {
    public List<Education> selectEduByUserId(int userId);
    public Integer insertEdu(Education edu);
    public void updateEdu(Education edu);
}
