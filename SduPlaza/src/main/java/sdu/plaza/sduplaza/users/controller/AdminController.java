package sdu.plaza.sduplaza.users.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sdu.plaza.sduplaza.users.dto.UserView;
import sdu.plaza.sduplaza.users.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService service;

    @GetMapping("/get/users")
    public ResponseEntity<List<UserView>> getImage(){
        return ResponseEntity.ok(service.getUsers());
    }
}
