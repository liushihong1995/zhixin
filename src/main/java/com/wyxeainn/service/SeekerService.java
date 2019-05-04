package com.wyxeainn.service;

import com.wyxeainn.pojo.Condition;
import com.wyxeainn.pojo.Page;
import com.wyxeainn.pojo.Seeker;

import java.util.List;

public interface SeekerService {
    public Boolean accountExist(String phone);
    public void insertSeeker(Seeker seeker);
    public Seeker selectSeekerById(Integer id);
    public Seeker selectSeekerByPhone(String phone);
    public void updateSeeker(Seeker seeker);
    public void updateAdvantage(Seeker seeker);
    public Seeker selectById(int id);
    public void updatePsrc(Seeker seeker);
    public void deleteById(Page page);
    public List<Seeker> selectNameAndPhoto(List<Integer> seekerIds);
    public void updatePhoneById(Seeker seeker);
    public List<Seeker> selectSeekerByCondition(Condition condition);
}
