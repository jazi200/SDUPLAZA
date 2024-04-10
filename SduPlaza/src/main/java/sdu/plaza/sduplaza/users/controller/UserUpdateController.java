package sdu.plaza.sduplaza.users.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sdu.plaza.sduplaza.users.dto.response.UserResponse;
import sdu.plaza.sduplaza.users.service.UserService;


@RestController
@RequestMapping("/update")
@RequiredArgsConstructor
public class UserUpdateController {

    private final UserService service;


    @PutMapping("/set")
    public ResponseEntity<UserResponse> update(@RequestHeader("Authorization") String token,
                                                    @RequestParam(name = "username", required = false) String username,
                                                    @RequestParam(name = "email", required = false) String email,
                                                    @RequestParam(name = "id", required = false) String id){

        return ResponseEntity.ok(service.update(token, username, email, id));
    }

    @PutMapping("/set/admin")
    public ResponseEntity<UserResponse> setAdmin(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(service.setAdmin(token));
    }

}
