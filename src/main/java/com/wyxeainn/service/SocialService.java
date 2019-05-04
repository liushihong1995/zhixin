package com.wyxeainn.service;

import com.wyxeainn.pojo.Social;

import java.util.List;

public interface SocialService {
    public List<Social> selectSocialByUserId(int userId);
    public int insertSocial(Social social);
    public void updateSocial(Social social);
}
