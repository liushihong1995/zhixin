package com.wyxeainn.service;

import com.wyxeainn.factory.ProductMapperFac;
import com.wyxeainn.mapper.ProductMapper;
import com.wyxeainn.pojo.Product;
import com.wyxeainn.pojo.Project;

import java.util.List;

public class ProductServiceImpl implements ProductService {
    private ProductMapper productMapper;

    public ProductServiceImpl() {
        productMapper = ProductMapperFac.getProductMapper();
    }

    @Override
    public void insertProduct(Product product) {
        productMapper.insertProduct(product);
    }

    @Override
    public Product getProductById(int id) {
        return productMapper.getProductById(id);
    }

    @Override
    public void updateProduct(Product product) {
        productMapper.updateProduct(product);
    }

    @Override
    public List<Product> getProducts(Product product) {
        return productMapper.getProducts(product);
    }

    @Override
    public List<Product> getProductsByCompId(int compId) {
        return productMapper.getProductsByCompId(compId);
    }
}
