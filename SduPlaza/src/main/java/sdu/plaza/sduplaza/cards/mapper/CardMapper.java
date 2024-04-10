package sdu.plaza.sduplaza.cards.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import sdu.plaza.sduplaza.cards.dto.CardView;
import sdu.plaza.sduplaza.cards.dto.request.CardRegisterRequest;
import sdu.plaza.sduplaza.cards.entity.CardEntity;
import sdu.plaza.sduplaza.cards.enums.CardType;


@Mapper(componentModel = "spring")
public interface CardMapper {

    CardMapper INSTANCE = Mappers.getMapper(CardMapper.class);

    @Mapping(target = "type", source = "number", qualifiedByName = "checkCardType")
    CardEntity cardRegisterRequestToEntity(CardRegisterRequest request);

    @Named("checkCardType")
    default CardType check(String number){
        String firstDigit = number.substring(0, 1);
        String firstTwoDigits = number.substring(0, 2);

        switch (firstDigit) {
            case "4":
                return CardType.Visa;
            case "5":
                return CardType.MasterCard;
            case "6":
                if (firstTwoDigits.equals("62"))
                    return CardType.UnionPay;
                else
                    return CardType.Maestro;
        }

        if (firstTwoDigits.equals("34") || firstTwoDigits.equals("37")) {
            return CardType.AmericanExpress;
        }
        return null;
    }

    CardView cardEntityToView(CardEntity entity);

}
