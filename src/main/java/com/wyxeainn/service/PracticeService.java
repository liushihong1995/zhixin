package com.wyxeainn.service;

import com.wyxeainn.pojo.Practice;

import java.util.List;

public interface PracticeService {
    public List<Practice> selectPracticeByUserId(int userId);
    public int insertPractice(Practice practice);
    public void updatePractice(Practice practice);
}
