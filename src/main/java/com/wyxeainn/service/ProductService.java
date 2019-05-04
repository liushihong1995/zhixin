package com.wyxeainn.service;

import com.wyxeainn.pojo.Product;

import java.net.PortUnreachableException;
import java.util.List;

public interface ProductService {
    public void insertProduct(Product product);
    public Product getProductById(int id);
    public void updateProduct(Product product);
    public List<Product> getProducts(Product product);
    public List<Product> getProductsByCompId(int compId);
}
