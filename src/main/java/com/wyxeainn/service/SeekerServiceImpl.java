package com.wyxeainn.service;

import com.wyxeainn.factory.SeekerMapperFac;
import com.wyxeainn.mapper.SeekerMapper;
import com.wyxeainn.pojo.Condition;
import com.wyxeainn.pojo.Page;
import com.wyxeainn.pojo.Seeker;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeekerServiceImpl implements SeekerService {
    private SeekerMapper seekerMapper;
    public SeekerServiceImpl() {
        seekerMapper = SeekerMapperFac.getSeekerMapper();
    }

    //求职者账号是否存在
    @Override
    public Boolean accountExist(String phone) {
        Integer count = seekerMapper.accountExist(phone);
        if(count>0) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public void insertSeeker(Seeker seeker) {
        seekerMapper.insertSeeker(seeker);
    }

    @Override
    public Seeker selectSeekerById(Integer id) {
        Seeker seeker = seekerMapper.selectSeekerById(id);
        return seeker;
    }

    @Override
    public Seeker selectSeekerByPhone(String phone) {
        Seeker seeker = seekerMapper.selectSeekerByPhone(phone);
        return seeker;
    }

    @Override
    public void updateSeeker(Seeker seeker) {
        seekerMapper.updateSeeker(seeker);
    }

    @Override
    public void updateAdvantage(Seeker seeker) {
        seekerMapper.updateAdvantage(seeker);
    }

    @Override
    public Seeker selectById(int id) {
        return seekerMapper.selectById(id);
    }

    @Override
    public void updatePsrc(Seeker seeker) {
        seekerMapper.updatePsrc(seeker);
    }

    @Override
    public void deleteById(Page page) {
        seekerMapper.deleteById(page);
    }

    @Override
    public List<Seeker> selectNameAndPhoto(List<Integer> seekerIds) {
        return seekerMapper.selectNameAndPhoto(seekerIds);
    }

    @Override
    public void updatePhoneById(Seeker seeker) {
        seekerMapper.updatePhoneById(seeker);
    }

    @Override
    public List<Seeker> selectSeekerByCondition(Condition condition) {
        return seekerMapper.selectSeekerByCondition(condition);
    }
}
