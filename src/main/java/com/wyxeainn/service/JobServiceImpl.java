package com.wyxeainn.service;

import com.wyxeainn.factory.JobMapperFac;
import com.wyxeainn.mapper.JobMapper;
import com.wyxeainn.pojo.*;

import java.util.List;

public class JobServiceImpl implements JobService{
    private JobMapper jobMapper;

    public JobServiceImpl() {
        jobMapper = JobMapperFac.getJobMapper();
    }

    @Override
    public List<Job> getOnePageJob(Page page) {
        return jobMapper.getOnePageJob(page);
    }

    @Override
    public void insertJob(Job job) {
        jobMapper.insertJob(job);
    }

    @Override
    public void updateJob(Job job) {
        jobMapper.updateJob(job);
    }

    @Override
    public void deleteJob(int id) {
        jobMapper.deleteJob(id);
    }

    @Override
    public int getJobCount(Page page) {
        return jobMapper.getJobCount(page);
    }

    @Override
    public Job getJobById(int id) {
        return jobMapper.getJobById(id);
    }

    @Override
    public List<Item> getJobByCondition(Condition condition) {
        return jobMapper.selectJobByCondition(condition);
    }

    @Override
    public int countJobByCondition(Condition condition) {
        return jobMapper.countJobByCondition(condition);
    }

    @Override
    public int countJobByCompId(int compId) {
        return jobMapper.countJobByCompId(compId);
    }

    @Override
    public List<Job> getHotJobByCompId(int compId) {
        return jobMapper.getHotJobByCompId(compId);
    }

    @Override
    public List<String> getJobTypeByCompId(int compId) {
        return jobMapper.getJobTypeByCompId(compId);
    }

    @Override
    public int getCountByJobType(Condition condition) {
        return jobMapper.getCountByJobType(condition);
    }

    @Override
    public List<Item> getJobByCompAndType(Condition condition) {
        return jobMapper.getJobByCompAndType(condition);
    }

    public int countJobByCateId(List<Integer> idList) {
        return jobMapper.countJobByCateId(idList);
    }

    public void updateCateByCateId(Industry industry){
        jobMapper.updateCateByCateId(industry);
    }
}

