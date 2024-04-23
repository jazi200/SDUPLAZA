package sdu.plaza.sduplaza.products.entity;

import lombok.*;
import sdu.plaza.sduplaza.products.dto.ProductView;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {
    List<ProductView> products;
}
