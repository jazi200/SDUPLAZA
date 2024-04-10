package sdu.plaza.sduplaza.users.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sdu.plaza.sduplaza.users.dto.UserView;
import sdu.plaza.sduplaza.users.service.UserService;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class UserPagesController {

    private final UserService service;

    @GetMapping("/home")
    public ResponseEntity<UserView> getUserDetails(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(service.getUserDetails(token));
    }

}
