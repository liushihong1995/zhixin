package com.wyxeainn.service;

import com.wyxeainn.pojo.City;

import java.util.List;

public interface CityService {
    public void insertProvince(City city);
    public void insertCity(City city);
    public List<City> getProvince();
    public List<String> getCitys(String city);
    public List<String> getZones(String city);
}
