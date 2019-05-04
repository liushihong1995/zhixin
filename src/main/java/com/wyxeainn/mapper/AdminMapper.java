package com.wyxeainn.mapper;

import com.sun.deploy.ui.AboutDialog;
import com.wyxeainn.pojo.Admin;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 和AdminMapper.xml对应的接口
 */
public interface AdminMapper {
    //管理员登录验证
    public Integer adminLoginCheck(Admin admin);

    //判断账号是否存在
    public Integer accountExist(@Param("phone") String phone);

    //插入管理员信息
    public void insertAdmin(Admin admin);

    //获取记录条数
    public Integer recordCount();

    //分页查询
    public List<Admin> pageQuery(Integer start);

    //根据id删除信息
    public void deleteById(int id);

    //查询一条记录
    public Admin selectById(int id);

    /**
     * 根据id更新部门和邮箱
     * @param admin
     */
    public void updateDepartAndEmail(Admin admin);

    /**
     * 更新指定用户的密码
     * @param admin
     */
    public void updatePassword(Admin admin);

    /**
     * 更新管理员的头像
     * @param admin
     */
    public void updatePsrc(Admin admin);

    //更新管理员的手机号码
    public void updatePhoneById(Admin admin);

    public Admin selectByPhone(@Param("phone") String phone);

    public List<Admin> selectIdAndName();

}
