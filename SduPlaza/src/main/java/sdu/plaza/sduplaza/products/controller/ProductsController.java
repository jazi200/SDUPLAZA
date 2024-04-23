package sdu.plaza.sduplaza.products.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sdu.plaza.sduplaza.products.entity.ProductEntity;
import sdu.plaza.sduplaza.products.enums.ProductType;
import sdu.plaza.sduplaza.products.service.ProductService;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductsController {

    private final ProductService service;

    @GetMapping("/get")
    public ResponseEntity<ProductEntity> getProducts(@RequestParam (value = "type") ProductType type) {
        return ResponseEntity.ok(service.getProduct(type));
    }

}

