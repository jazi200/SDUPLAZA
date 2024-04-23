package sdu.plaza.sduplaza.products.dto;

import lombok.*;
import sdu.plaza.sduplaza.products.enums.ProductMenu;
import sdu.plaza.sduplaza.products.enums.ProductType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductView  {

    private Long id;
    private String name;
    private String description;
    private String price;
    private ProductType type;
    private ProductMenu menu;
    private Integer amount;
    private String image;

}
