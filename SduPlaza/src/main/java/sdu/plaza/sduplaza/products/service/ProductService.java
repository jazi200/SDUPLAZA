package sdu.plaza.sduplaza.products.service;

import sdu.plaza.sduplaza.products.entity.ProductEntity;
import sdu.plaza.sduplaza.products.enums.ProductType;

public interface ProductService {


    ProductEntity getProduct(ProductType type);


}
