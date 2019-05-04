package com.wyxeainn.mapper;

import com.wyxeainn.pojo.Education;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface EducationMapper {
    public List<Education> selectEduByUserId(int userId);
    public Integer insertEdu(Education education);
    public void updateEdu(Education education);
}
