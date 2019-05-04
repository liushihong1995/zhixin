package com.wyxeainn.factory;

import com.wyxeainn.mapper.ProductMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class ProductMapperFac {
    public static ProductMapper getProductMapper() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("Config/applicationContext.xml");
        ProductMapper productMapper = (ProductMapper) ac.getBean("productMapper");
        return productMapper;
    }
}
