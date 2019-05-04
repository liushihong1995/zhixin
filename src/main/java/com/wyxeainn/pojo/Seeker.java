package com.wyxeainn.pojo;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 封装求职者信息的类
 */
public class Seeker {
    private int id;
    //手机号码
    private String phone;
    //求职者姓名
    private String sname;
    //求职状态
    private String status;
    //求职者性别
    private Boolean sex;
    //开始工作时间
    private String workExp;
    //生日
    private String birth;
    //微信号
    private String weichat;
    //邮箱
    private String email;
    //最近一次更新时间
    private String updateTime;
    //头像
    private String psrc;
    //短信验证码
    private String code;
    //附件简历路径
    private String cvPath;
    //最高学历
    private String education;
    //优势
    private String advantage;

    public Seeker() {
        this.workExp = "";
        this.birth = "";
        this.code = "";
        this.cvPath = "";
        this.email = "";
        this.phone = "";
        this.psrc = "icon_face.jpg";
        this.sex = true;
        this.sname = "";
        this.status = "离职-随时到岗";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        this.updateTime = sdf.format(date);
        this.weichat = "";
        this.education = "本科";
        this.advantage = "";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getSex() {
        return sex;
    }

    public void setSex(Boolean sex) {
        this.sex = sex;
    }

    public String getWorkExp() {
        return workExp;
    }

    public void setWorkExp(String workExp) {
        this.workExp = workExp;
    }

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }

    public String getWeichat() {
        return weichat;
    }

    public void setWeichat(String weichat) {
        this.weichat = weichat;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getPsrc() {
        return psrc;
    }

    public void setPsrc(String psrc) {
        this.psrc = psrc;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCvPath() {
        return cvPath;
    }

    public void setCvPath(String cvPath) {
        this.cvPath = cvPath;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getAdvantage() {
        return advantage;
    }

    public void setAdvantage(String advantage) {
        this.advantage = advantage;
    }
}
