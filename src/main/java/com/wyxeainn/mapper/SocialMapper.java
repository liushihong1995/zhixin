package com.wyxeainn.mapper;

import com.wyxeainn.pojo.Social;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SocialMapper {
    public List<Social> selectSocialByUserId(int userId);
    public int insertSocial(Social social);
    public void updateSocial(Social social);

}
