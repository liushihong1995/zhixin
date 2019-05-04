package com.wyxeainn.service;

import com.wyxeainn.factory.BossMapperFac;
import com.wyxeainn.mapper.BossMapper;
import com.wyxeainn.pojo.Boss;
import com.wyxeainn.pojo.Bussiness;

import java.util.List;

public class BossServiceImpl implements BossService {
    private BossMapper bossMapper;
    public BossServiceImpl(){
        bossMapper = BossMapperFac.getBossMapper();
    }
    @Override
    public void registerBoss(Boss boss) {
        bossMapper.registerBoss(boss);
    }

    @Override
    public boolean phoneExist(String phone) {
        int count = bossMapper.phoneExist(phone);
        if(count>0) {
            return false;
        }else {
            return true;
        }
    }

    @Override
    public Boss selectBossByPhone(String phone) {
       return bossMapper.selectBossByPhone(phone);
    }

    @Override
    public Boss selectBossById(int id) {
        return bossMapper.selectBossById(id);
    }

    @Override
    public void updateBossBasic(Boss boss) {
        bossMapper.updateBossBasic(boss);
    }

    @Override
    public void updateBossFront(Boss boss) {
        bossMapper.updateBossFront(boss);
    }

    @Override
    public void updateBossBehind(Boss boss) {
        bossMapper.updateBossBehind(boss);
    }

    @Override
    public void updateBossHand(Boss boss) {
        bossMapper.updateBossHand(boss);
    }

    @Override
    public Boss selectCardById(int id) {
        return bossMapper.selectCardById(id);
    }

    @Override
    public int countBossByCompId(int compId) {
        return bossMapper.countBossByCompId(compId);
    }

    @Override
    public List<Boss> selectNickAndPhoto(List<Integer> bossIds) {
        return bossMapper.selectNickAndPhoto(bossIds);
    }

    public void updatePsrc(Boss boss){
        bossMapper.updatePsrc(boss);
    }
    public void updatePhoneById(Boss boss){
        bossMapper.updatePhoneById(boss);
    }
}
