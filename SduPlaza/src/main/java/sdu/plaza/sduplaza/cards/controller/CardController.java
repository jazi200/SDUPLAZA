package sdu.plaza.sduplaza.cards.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sdu.plaza.sduplaza.cards.dto.CardView;
import sdu.plaza.sduplaza.cards.dto.request.CardRegisterRequest;
import sdu.plaza.sduplaza.cards.service.CardService;
import sdu.plaza.sduplaza.users.dto.response.UserResponse;


@RestController
@RequestMapping("/card")
@RequiredArgsConstructor
public class CardController {

    private final CardService service;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerCard(@RequestHeader("Authorization") String token, @RequestBody CardRegisterRequest request){
        return ResponseEntity.ok(service.registerCard(token, request));
    }

    @GetMapping("/get-card")
    public ResponseEntity<CardView> getCard(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(service.getCard(token));
    }

    @PutMapping("/update-card")
    public ResponseEntity<UserResponse> updateCard(@RequestHeader("Authorization") String token, @RequestBody CardRegisterRequest request){
        return ResponseEntity.ok(service.updateCard(token, request));
    }

}
