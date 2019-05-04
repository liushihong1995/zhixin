package com.wyxeainn.pojo;

/**
 * 封装验证信息的类
 * @Author 温雅新
 * @Date 2018/12/18
 */

import java.io.Serializable;

public class Code implements Serializable {
    private String id;
    private String code;

    public String getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String toString() {
        return "[id=" + id + " , code=" + code + "]";
    }
}
