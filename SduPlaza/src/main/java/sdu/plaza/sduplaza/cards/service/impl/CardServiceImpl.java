package sdu.plaza.sduplaza.cards.service.impl;


import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sdu.plaza.sduplaza.cards.dto.CardView;
import sdu.plaza.sduplaza.cards.dto.request.CardRegisterRequest;
import sdu.plaza.sduplaza.cards.entity.CardEntity;
import sdu.plaza.sduplaza.cards.enums.CardType;
import sdu.plaza.sduplaza.cards.mapper.CardMapper;
import sdu.plaza.sduplaza.cards.repository.CardRepository;
import sdu.plaza.sduplaza.cards.service.CardService;
import sdu.plaza.sduplaza.users.dto.request.UserTokenRequest;
import sdu.plaza.sduplaza.users.dto.response.UserResponse;
import sdu.plaza.sduplaza.users.entity.UserEntity;
import sdu.plaza.sduplaza.users.repository.UserRepository;
import sdu.plaza.sduplaza.users.util.Decoder;
import sdu.plaza.sduplaza.web.service.TokenService;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;

    private final Decoder decoder;

    private final UserRepository userRepository;

    private final TokenService tokenService;


    @Override
    public UserResponse registerCard(String token, CardRegisterRequest request) {


        CardEntity card = CardMapper.INSTANCE.cardRegisterRequestToEntity(request);


        String data = decoder.decodeJwtPayload(token);

        Gson gson = new Gson();

        UserTokenRequest tokenRequest = gson.fromJson(data, UserTokenRequest.class);

        UserEntity entity = userRepository.findByUserId(tokenRequest.getSub())
                .orElseThrow(()->new RuntimeException("User not found"));

        card.setUser(entity);

        cardRepository.save(card);

        String newToken = tokenService.generateToken(entity, false);

        return UserResponse.builder()
                .token(newToken)
                .build();
    }

    @Override
    public CardView getCard(String token) {

        String data = decoder.decodeJwtPayload(token);

        Gson gson = new Gson();

        UserTokenRequest tokenRequest = gson.fromJson(data, UserTokenRequest.class);

        UserEntity entity = userRepository.findByUserId(tokenRequest.getSub())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return cardRepository.getCardByUserId(entity.getId())
                .stream()
                .map(CardMapper.INSTANCE::cardEntityToView)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Card not found for the user"));
    }

    @Override
    public UserResponse updateCard(String token, CardRegisterRequest request) {
        String data = decoder.decodeJwtPayload(token);

        Gson gson = new Gson();

        UserTokenRequest tokenRequest = gson.fromJson(data, UserTokenRequest.class);

        UserEntity entity = userRepository.findByUserId(tokenRequest.getSub())
                .orElseThrow(() -> new RuntimeException("User not found"));

        CardEntity card = cardRepository.getCardByUserId(entity.getId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Card not found for the user"));

        card.setUpdatedAt(LocalDateTime.now());
        card.setCvv(request.getCvv());
        card.setNumber(request.getNumber());
        card.setExpirationMonth(request.getExpirationMonth());
        card.setExpirationYear(request.getExpirationYear());
        card.setType(check(request.getNumber()));
        if(card.getType() == null)
            throw new RuntimeException("UNKNOWN CARD");

        cardRepository.save(card);
        String newToken = tokenService.generateToken(entity, false);

        return UserResponse.builder()
                .token(newToken)
                .build();
    }
    private CardType check(String number){
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
}
