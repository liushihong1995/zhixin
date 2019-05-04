package com.wyxeainn.pojo;

import java.io.Serializable;

public class Admin implements Serializable {
    //管理员账号
    private int id;
    //管理员手机号
    private String phone;
    //管理员密码
    private String password;
    //加密后的密码
    private String encryption;
    //管理员姓名
    private String name;
    //管理员身份证号
    private String cardNum;
    //管理员所在公司部门
    private String department;
    //管理员邮箱
    private String email;
    //管理员头像路径
    private String psrc;

    public String getPsrc() {
        return psrc;
    }

    public void setPsrc(String psrc) {
        this.psrc = psrc;
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhone() { return phone;}
    public void setPhone(String phone) {this.phone = phone;}
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEncryption() {
        return encryption;
    }

    public void setEncryption(String encryption) {
        this.encryption = encryption;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCardNum() {
        return cardNum;
    }

    public void setCardNum(String cardNum) {
        this.cardNum = cardNum;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String toString() {
        return "[id=" + id + ", password=" + password + ", encryption" + encryption + ", name=" + name +
                ", cardNum=" + cardNum + ", department=" + department + ", email=" + email + "]";
    }
}
