package com.wyxeainn.service;

import com.wyxeainn.pojo.Boss;
import com.wyxeainn.pojo.Bussiness;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BossService {
    public void registerBoss(Boss boss);
    public boolean phoneExist(String phone);
    public Boss selectBossByPhone(String phone);
    public Boss selectBossById(int id);
    public void updateBossBasic(Boss boss);
    public void updateBossFront(Boss boss);
    public void updateBossBehind(Boss boss);
    public void updateBossHand(Boss boss);
    public Boss selectCardById(int id);
    public int countBossByCompId(int compId);
    public List<Boss> selectNickAndPhoto(List<Integer> bossIds);
    public void updatePsrc(Boss boss);
    public void updatePhoneById(Boss boss);

}
