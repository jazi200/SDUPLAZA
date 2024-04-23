package sdu.plaza.sduplaza.payment.dto;


import lombok.*;
import sdu.plaza.sduplaza.products.dto.ProductView;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentStatus {

    private Long userId;
    private List<ProductView> products;
    private Integer status;

}