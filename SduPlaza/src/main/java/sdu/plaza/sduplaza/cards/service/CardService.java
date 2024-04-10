package sdu.plaza.sduplaza.cards.service;

import sdu.plaza.sduplaza.cards.dto.CardView;
import sdu.plaza.sduplaza.cards.dto.request.CardRegisterRequest;
import sdu.plaza.sduplaza.users.dto.response.UserResponse;


public interface CardService {

    UserResponse registerCard(String token, CardRegisterRequest request);

    CardView getCard(String token);

    UserResponse updateCard(String token, CardRegisterRequest request);
}
