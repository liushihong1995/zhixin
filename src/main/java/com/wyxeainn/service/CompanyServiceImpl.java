package com.wyxeainn.service;

import com.wyxeainn.factory.CompanyMapperFac;
import com.wyxeainn.mapper.CompanyMapper;
import com.wyxeainn.pojo.*;

import java.util.List;

public class CompanyServiceImpl implements CompanyService {
    private CompanyMapper companyMapper;
    public CompanyServiceImpl() {
        companyMapper = CompanyMapperFac.getCompanyMapper();
    }

    @Override
    public List<Company> getCompByFullName(String fullName) {
        return companyMapper.getCompByFullName(fullName);
    }

    @Override
    public Company getCompanyById(int id) {
        return companyMapper.getCompanyById(id);
    }

    @Override
    public void updateCompany(Company company) {
        companyMapper.updateCompany(company);
    }

    @Override
    public Bussiness getBussinessById(int id) {
        return companyMapper.getBussinessById(id);
    }

    @Override
    public void updateIndustryByIndustryId(Industry industry) {
        companyMapper.updateIndustryByIndustryId(industry);
    }

    @Override
    public int countCompByIndustryId(List<Integer> idList) {
        return companyMapper.countCompByIndustryId(idList);
    }

    @Override
    public void deleteCompanyInfor(Page page) {
        companyMapper.deleteCompanyInfor(page);
    }
    public String getPhotoNameByPage(Page page){
        return companyMapper.getPhotoNameByPage(page);
    }
}
