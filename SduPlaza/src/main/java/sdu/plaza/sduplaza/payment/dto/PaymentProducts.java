package sdu.plaza.sduplaza.payment.dto;

import lombok.*;
import sdu.plaza.sduplaza.products.dto.ProductView;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentProducts {
    List<ProductView> products;
}
