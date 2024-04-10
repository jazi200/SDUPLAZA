package sdu.plaza.sduplaza.products.dto;

import lombok.*;
import sdu.plaza.sduplaza.products.enums.ProductType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductView  {

    private Integer amount;
    private String name;
    private String description;
    private Double price;
    private ProductType type;
    private String menu;
    private String image;

}
