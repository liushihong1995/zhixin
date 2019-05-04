package com.wyxeainn.mapper;

import com.wyxeainn.pojo.Boss;
import com.wyxeainn.pojo.Bussiness;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BossMapper {
    public void registerBoss(Boss boss);
    public int phoneExist(@Param("phone") String phone);
    public Boss selectBossByPhone(@Param("phone") String phone);
    public Boss selectBossById(int id);
    public void updateBossBasic(Boss boss);
    public void updateBossFront(Boss boss);
    public void updateBossBehind(Boss boss);
    public void updateBossHand(Boss boss);
    public Boss selectCardById(int id);
    public int countBossByCompId(int bossId);
    public List<Boss> selectNickAndPhoto(List<Integer> bossIds);
    public void updatePsrc(Boss boss);
    public void updatePhoneById(Boss boss);
}
