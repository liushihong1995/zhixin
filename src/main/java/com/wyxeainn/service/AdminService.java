package com.wyxeainn.service;

import com.wyxeainn.pojo.Admin;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AdminService {
    public Boolean adminLoginCheck(String phone,String pwd);
    public Boolean accountExist(String phone);
    public void insertAdmin(Admin admin);
    public int recordCount();
    public List<Admin> pageQuery(Integer currentPage);
    public Admin selectById(int id);
    public void deleteById(int id);
    public void updateDepartAndEmail(Admin admin);
    public void updatePassword(Admin admin);
    public void updatePsrc(Admin admin);
    //更新管理员的手机号码
    public void updatePhoneById(Admin admin);
    public Admin selectByPhone(String phone);
    public List<Admin> selectIdAndName();
}
