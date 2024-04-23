package sdu.plaza.sduplaza.products.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.stereotype.Service;
import sdu.plaza.sduplaza.products.dto.ProductView;
import sdu.plaza.sduplaza.products.entity.ProductEntity;
import sdu.plaza.sduplaza.products.enums.ProductType;
import sdu.plaza.sduplaza.products.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Override
    public ProductEntity getProduct(ProductType type) {
        return ProductEntity.builder()
                .products(readFromJson(type.toString()))
                .build();
    }

    private List<ProductView> readFromJson(String type) {

        if(type == null)
            throw new RuntimeException();

        ObjectMapper objectMapper = new ObjectMapper();
        List<ProductView> list = null;
        try(InputStream is = getClass().getClassLoader().getResourceAsStream("products/" + type + ".json")) {

            if (is == null) {
                throw new IOException("File not found");
            }
            list = objectMapper.readValue(is, new TypeReference<>() {
            });

            list.forEach(item -> item.setAmount(1));
        } catch (IOException e) {
            System.out.println("ERROR: " + e.getMessage());
        }
        return list;
    }

}
