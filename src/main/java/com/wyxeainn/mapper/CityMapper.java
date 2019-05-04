package com.wyxeainn.mapper;

import com.wyxeainn.pojo.City;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CityMapper {
    public void insertProvince(City city);
    public void insertCity(City city);
    public List<City> getProvince();
    public List<String> getCitys(@Param("city") String city);
    public List<String> getZones(@Param("city") String city);

}
