package com.wyxeainn.mapper;

import com.wyxeainn.pojo.Condition;
import com.wyxeainn.pojo.Page;
import com.wyxeainn.pojo.Seeker;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SeekerMapper {
    //判断账号是否存在
    public Integer accountExist(@Param("phone") String phone);
    //插入一个求职者
    public void insertSeeker(Seeker seeker);

    public Seeker selectSeekerById(Integer id);
    public Seeker selectSeekerByPhone(@Param("phone") String phone);

    public void updateSeeker(Seeker seeker);
    public void updateAdvantage(Seeker seeker);
    public Seeker selectById(int id);
    public void updatePsrc(Seeker seeker);
    public void deleteById(Page page);
    public List<Seeker> selectNameAndPhoto(List<Integer> seekerIds);
    public void updatePhoneById(Seeker seeker);
    //根据条件查询求职者
    public List<Seeker> selectSeekerByCondition(Condition condition);
}
