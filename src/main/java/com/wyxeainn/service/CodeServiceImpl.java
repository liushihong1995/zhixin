package com.wyxeainn.service;

import com.wyxeainn.factory.AdminMapperFac;
import com.wyxeainn.factory.CodeMapperFac;
import com.wyxeainn.mapper.AdminMapper;
import com.wyxeainn.mapper.CodeMapper;
import com.wyxeainn.pojo.Code;

public class CodeServiceImpl implements CodeService {
    private CodeMapper codeMapper;
    public CodeServiceImpl() {
        codeMapper = CodeMapperFac.getCodeMapper();
    }

    /**
     * 插入一条记录
     * @param code
     * @return
     */
    @Override
    public boolean insertCode(Code code) {
        boolean flag = false;
        try {
            codeMapper.insertCode(code);
            flag = true;
        }catch(Exception ex) {
            ex.printStackTrace();
        }
        return flag;
    }


    /**
     * 更新短信动态码的值
     * @param code
     */
    @Override
    public void updateCode(Code code) {
        codeMapper.updateCode(code);
    }

    @Override
    public String getCode(String id) {
        String code = codeMapper.getCode(id);
        return code;
    }

    @Override
    public void deleteCode(String id) {
        codeMapper.deleteCode(id);
    }

    @Override
    public void updateId(Code code) {
        codeMapper.updateId(code);
    }

    public boolean phoneExist(String id) {
        Integer count = codeMapper.phoneExist(id);
        if(count>0) {
            return true;
        }else {
            return false;
        }
    }

    @Override
    public void deleteItem(String id) {
        codeMapper.deleteItem(id);
    }
}
