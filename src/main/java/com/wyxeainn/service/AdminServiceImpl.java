package com.wyxeainn.service;

import com.wyxeainn.factory.AdminMapperFac;
import com.wyxeainn.mapper.AdminMapper;
import com.wyxeainn.pojo.Admin;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
    private AdminMapper adminMapper;
    public AdminServiceImpl() {
        adminMapper = AdminMapperFac.getAdminMapper();
    }

    /**
     * 管理员登录检测
     * @param phone   账号
     * @param pwd  加密后的密码
     * @return     该账号是否存在
     */
    public Boolean adminLoginCheck(String phone,String pwd) {
        Admin admin = new Admin();
        admin.setPhone(phone);
        admin.setEncryption(pwd);
        int count = adminMapper.adminLoginCheck(admin);
        if(count == 1) {
            return true;
        }else {
            return false;
        }
    }

    /**
     * 判断账号是否存在
     * @param phone 手机号
     * @return   true账号存在，false账号不存在
     */
    public Boolean accountExist(String phone) {
        int count = adminMapper.accountExist(phone);
        if(count==1) {
            return true;
        }else {
            return false;
        }
    }

    /**
     * 插入一条管理员记录
     * @param admin 封装了管理员信息的对象
     */
    public void insertAdmin(Admin admin) {
        adminMapper.insertAdmin(admin);
    }

    /**
     * 查询t_admin中记录的条数
     * @return 表中记录条数
     */
    public int recordCount() {
        return adminMapper.recordCount();
    }

    /**
     * 分页查询
     * @param currentPage
     * @return
     */
    public List<Admin> pageQuery(Integer currentPage) {
        int start = (currentPage-1)*10;
        List<Admin> admins = adminMapper.pageQuery(start);
        return admins;
    }

    /**
     * 按照id查询一条管理员记录
     * @param id 管理员账号
     * @return   封装好的管理员
     */
    public Admin selectById(int id) {
        Admin admin = adminMapper.selectById(id);
        return admin;
    }

    /**
     * 按照id删除
     * @param id
     */
    public void deleteById(int id) {
        adminMapper.deleteById(id);
    }

    /**
     * 根据id更新部门和邮箱
     *
     * @param admin
     */
    public void updateDepartAndEmail(Admin admin){
        adminMapper.updateDepartAndEmail(admin);
    }

    /**
     * 更新密码
     * @param admin
     */
    public void updatePassword(Admin admin) {
        adminMapper.updatePassword(admin);
    }

    /**
     * 更新头像
     * @param admin
     */
    public void updatePsrc(Admin admin) {
        adminMapper.updatePsrc(admin);
    }

    /**
     * 更新管理员的手机号码
     * @param admin
     */
    @Override
    public void updatePhoneById(Admin admin) {
        adminMapper.updatePhoneById(admin);
    }

    @Override
    public Admin selectByPhone(String phone) {
        return adminMapper.selectByPhone(phone);
    }

    @Override
    public List<Admin> selectIdAndName() {
        return adminMapper.selectIdAndName();
    }
}
