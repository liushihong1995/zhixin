package com.wyxeainn.mapper;

import com.wyxeainn.pojo.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CompanyMapper {
    public List<Company> getCompByFullName(@Param("fullName") String fullName);
    public Company getCompanyById(int id);
    public void updateCompany(Company company);
    public Bussiness getBussinessById(int id);
    public int countCompByIndustryId(List<Integer> idList);
    public void updateIndustryByIndustryId(Industry industry);
    public void deleteCompanyInfor(Page page);
    public String getPhotoNameByPage(Page page);
}
