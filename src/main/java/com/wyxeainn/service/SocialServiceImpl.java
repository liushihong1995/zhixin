package com.wyxeainn.service;

import com.wyxeainn.factory.SocialMapperFac;
import com.wyxeainn.mapper.SocialMapper;
import com.wyxeainn.pojo.Social;

import java.util.List;

public class SocialServiceImpl implements SocialService {
    private SocialMapper socialMapper;
    public SocialServiceImpl() {
        this.socialMapper = SocialMapperFac.getSocialMapper();
    }
    @Override
    public List<Social> selectSocialByUserId(int userId) {
        return socialMapper.selectSocialByUserId(userId);
    }

    @Override
    public int insertSocial(Social social) {
        socialMapper.insertSocial(social);
        return social.getId();
    }

    @Override
    public void updateSocial(Social social) {
        socialMapper.updateSocial(social);
    }
}
