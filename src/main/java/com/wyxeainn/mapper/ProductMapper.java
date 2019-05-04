package com.wyxeainn.mapper;

import com.wyxeainn.pojo.Product;

import java.util.List;

public interface ProductMapper {
    public void insertProduct(Product product);
    public Product getProductById(int id);
    public void updateProduct(Product product);
    public List<Product> getProducts(Product product);
    public List<Product> getProductsByCompId(int compId);
}
