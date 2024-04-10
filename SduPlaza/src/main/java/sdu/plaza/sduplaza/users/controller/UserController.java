package sdu.plaza.sduplaza.users.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sdu.plaza.sduplaza.users.dto.request.*;
import sdu.plaza.sduplaza.users.dto.response.UserResetCodeResponse;
import sdu.plaza.sduplaza.users.dto.response.UserResetResponse;
import sdu.plaza.sduplaza.users.dto.response.UserResponse;
import sdu.plaza.sduplaza.users.service.UserService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserRegisterRequest request){
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody UserLoginRequest request, @RequestParam(required = false) Boolean remember){
        return ResponseEntity.ok(service.login(request, remember));
    }

    @PostMapping("/reset")
    public ResponseEntity<UserResetResponse> reset(@RequestBody UserResetRequest request){
        return ResponseEntity.ok(service.reset(request));
    }

    @PostMapping("/reset/code")
    public ResponseEntity<UserResetCodeResponse> resetCode(@RequestBody UserResetCodeRequest request){
        return ResponseEntity.ok(service.resetCode(request));
    }

    @PutMapping("/reset/code/password")
    public ResponseEntity<UserResponse> resetPassword(@RequestBody UserPasswordUpdateRequest request){
        return ResponseEntity.ok(service.resetPassword(request));
    }
}
