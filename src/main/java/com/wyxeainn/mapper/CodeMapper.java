package com.wyxeainn.mapper;

import com.wyxeainn.pojo.Code;
import org.apache.ibatis.annotations.Param;

/**
 * 定义操作验证码信息的接口
 */
public interface CodeMapper {
    //插入code
    public void insertCode(Code code);

    //更新验证码的值
    public void updateCode(Code code);

    //获取短信验证码
    public String getCode(@Param("id") String id);

    //删除短信验证码
    public void deleteCode(@Param("id") String id);

    public void deleteItem(@Param("id") String id);

    //更新id
    public void updateId(Code code);

    //判断手机号是否存在
    public Integer phoneExist(@Param("id") String id);
}
