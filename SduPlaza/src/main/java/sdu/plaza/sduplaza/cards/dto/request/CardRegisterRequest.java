package sdu.plaza.sduplaza.cards.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CardRegisterRequest {

    private String number;
    private String expirationMonth;
    private String expirationYear;
    private String cvv;

}
