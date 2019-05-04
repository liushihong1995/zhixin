package com.wyxeainn.service;

import org.apache.ibatis.annotations.Param;
import com.wyxeainn.pojo.Code;
public interface CodeService {
    //插入code
    public boolean insertCode(Code code);

    //更新验证码的值
    public void updateCode(Code code);

    //获取短信验证码
    public String getCode(String id);

    //删除短信验证码
    public void deleteCode(String id);

    //更新id
    public void updateId(Code code);

    public boolean phoneExist(String id);

    public void deleteItem(String id);

}
