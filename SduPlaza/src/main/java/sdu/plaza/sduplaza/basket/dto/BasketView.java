package sdu.plaza.sduplaza.basket.dto;

import lombok.*;
import sdu.plaza.sduplaza.products.dto.ProductView;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BasketView {

    private List<ProductView> items;


}
