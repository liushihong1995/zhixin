package com.wyxeainn.service;

import com.wyxeainn.pojo.*;

import java.util.List;

public interface CompanyService {
    public List<Company> getCompByFullName(String fullName);
    public Company getCompanyById(int id);
    public void updateCompany(Company company);
    public Bussiness getBussinessById(int id);
    public int countCompByIndustryId(List<Integer> idList);
    public void updateIndustryByIndustryId(Industry industry);
    public void deleteCompanyInfor(Page page);
    public String getPhotoNameByPage(Page page);
}
