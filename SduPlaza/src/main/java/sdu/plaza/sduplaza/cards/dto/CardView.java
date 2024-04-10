package sdu.plaza.sduplaza.cards.dto;

import lombok.*;
import sdu.plaza.sduplaza.cards.enums.CardType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardView {

    private CardType type;
    private String number;

}
