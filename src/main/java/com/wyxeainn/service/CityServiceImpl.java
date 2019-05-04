package com.wyxeainn.service;

import com.wyxeainn.factory.CityMapperFac;
import com.wyxeainn.mapper.CityMapper;
import com.wyxeainn.pojo.City;

import java.util.List;

public class CityServiceImpl implements CityService {
    private CityMapper cityMapper;
    public CityServiceImpl(){
        cityMapper = CityMapperFac.getCityMapper();
    }

    @Override
    public void insertProvince(City city) {
        cityMapper.insertProvince(city);
    }

    @Override
    public void insertCity(City city) {
        cityMapper.insertCity(city);
    }

    @Override
    public List<City> getProvince(){
        List<City> list = cityMapper.getProvince();
        return list;
    }

    @Override
    public List<String> getCitys(String city) {
        return cityMapper.getCitys(city);
    }

    @Override
    public List<String> getZones(String city) {
        return cityMapper.getZones(city);
    }
}
