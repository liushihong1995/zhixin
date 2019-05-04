package com.wyxeainn.mapper;

import com.wyxeainn.pojo.Practice;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PracticeMapper {
    public List<Practice> selectPracticeByUserId(int userId);
    public int insertPractice(Practice practice);
    public void updatePractice(Practice practice);
}
