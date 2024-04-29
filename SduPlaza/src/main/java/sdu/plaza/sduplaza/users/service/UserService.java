package sdu.plaza.sduplaza.users.service;

import sdu.plaza.sduplaza.users.dto.*;
import sdu.plaza.sduplaza.users.dto.request.*;
import sdu.plaza.sduplaza.users.dto.response.UserResetCodeResponse;
import sdu.plaza.sduplaza.users.dto.response.UserResetResponse;
import sdu.plaza.sduplaza.users.dto.response.UserResponse;
import sdu.plaza.sduplaza.users.dto.response.UserRoleResponse;

import java.util.List;

public interface UserService {

    UserResponse register(UserRegisterRequest request);
    UserResponse login(UserLoginRequest request, Boolean remember);
    UserResetResponse reset(UserResetRequest request);
    UserResetCodeResponse resetCode(UserResetCodeRequest request);
    UserResponse resetPassword(UserPasswordUpdateRequest request);
    UserResponse update(String token, String username, String email, String id);

    List<UserView> getUsers();

    UserResponse setAdmin(String token);

    UserView getUserDetails(String token);
}