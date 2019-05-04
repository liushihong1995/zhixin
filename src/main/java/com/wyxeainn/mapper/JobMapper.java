package com.wyxeainn.mapper;

import com.wyxeainn.pojo.*;

import java.util.List;

public interface JobMapper {
    public List<Job> getOnePageJob(Page page);
    public void insertJob(Job job);
    public void updateJob(Job job);
    public void deleteJob(int id);
    public int getJobCount(Page page);
    public Job getJobById(int id);
    public List<Item> selectJobByCondition(Condition condition);
    public int countJobByCondition(Condition condition);
    public int countJobByCompId(int compId);
    public List<Job> getHotJobByCompId(int compId);
    public List<String> getJobTypeByCompId(int compId);
    public int getCountByJobType(Condition condition);
    public List<Item> getJobByCompAndType(Condition condition);
    public int countJobByCateId(List<Integer> idList);
    public void updateCateByCateId(Industry industry);
}
