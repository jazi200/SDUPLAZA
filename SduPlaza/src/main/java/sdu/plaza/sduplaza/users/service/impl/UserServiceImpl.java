package sdu.plaza.sduplaza.users.service.impl;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sdu.plaza.sduplaza.users.dto.*;
import sdu.plaza.sduplaza.users.dto.request.*;
import sdu.plaza.sduplaza.users.dto.response.UserResetCodeResponse;
import sdu.plaza.sduplaza.users.dto.response.UserResetResponse;
import sdu.plaza.sduplaza.users.dto.response.UserResponse;
import sdu.plaza.sduplaza.users.entity.UserEntity;
import sdu.plaza.sduplaza.users.enums.UserRole;
import sdu.plaza.sduplaza.users.mapper.UserMapper;
import sdu.plaza.sduplaza.users.repository.UserRepository;
import sdu.plaza.sduplaza.users.service.UserService;
import sdu.plaza.sduplaza.users.util.CodeSender;
import sdu.plaza.sduplaza.users.util.Decoder;
import sdu.plaza.sduplaza.web.service.PasswordResetCodeService;
import sdu.plaza.sduplaza.web.service.TokenService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final TokenService tokenService;

    private final AuthenticationManager authenticationManager;

    private final PasswordResetCodeService passwordResetCodeService;

    private final Decoder decoder;

    private final CodeSender send;


    @Transactional
    @Override
    public UserResponse register(UserRegisterRequest request) {
        if(request.getUserId() == null || request.getUserId().length() != 9)
            throw new RuntimeException("User ID must have 9 characters");

        if(request.getName() == null || request.getName().isEmpty())
            throw new RuntimeException("User name cannot be empty");

        if(request.getEmail() == null || request.getEmail().isEmpty() || !request.getEmail().contains("sdu.edu.kz"))
            throw new RuntimeException("Use University email");

        if(request.getPassword() == null || request.getPassword().length() < 8 || request.getPassword().length() > 25)
            throw new RuntimeException("Password must be 8-25 characters");

        UserEntity user = UserMapper.INSTANCE.userRequestToUserEntity(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user = repository.save(user);

        String token = tokenService.generateToken(user, false);
        return UserResponse.builder()
                .token(token)
                .build();
    }

    @Transactional
    @Override
    public UserResponse login(UserLoginRequest request, Boolean remember) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUserId(),
                        request.getPassword()
                )
        );
        UserEntity user = repository.findByUserId(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String token = tokenService.generateToken(user, remember);
        return UserResponse.builder()
                .token(token)
                .build();
    }

    @Transactional
    @Override
    public UserResetResponse reset(UserResetRequest request) {
        if(request.getEmail() == null || !request.getEmail().contains("sdu.edu.kz"))
            throw new RuntimeException("Wrong email");

        String code = passwordResetCodeService.generateResetCode(request.getEmail());
        send.sendCode(request.getEmail(), code);
        return UserResetResponse.builder().passwordGenerated(true).build();
    }

    @Transactional
    @Override
    public UserResetCodeResponse resetCode(UserResetCodeRequest request) {
        if(request.getCode() == null || request.getCode().length() != 4)
            throw new RuntimeException("Wrong code");

        if(request.getEmail() == null || !request.getEmail().contains("sdu.edu.kz"))
            throw new RuntimeException("Wrong email");

        return UserResetCodeResponse.builder()
                .correctCode(passwordResetCodeService.verifyResetCode(request.getEmail(), request.getCode()))
                .build();
    }

    @Transactional
    @Override
    public UserResponse resetPassword(UserPasswordUpdateRequest request) {
        if(request.getCode() == null || request.getCode().length() != 4)
            throw new RuntimeException("Wrong code");

        if(request.getEmail() == null || !request.getEmail().contains("sdu.edu.kz"))
            throw new RuntimeException("Wrong email");

        if(!passwordResetCodeService.verifyResetCode(request.getEmail(), request.getCode()))
            throw new RuntimeException("Invalid password reset");

        if(!Objects.equals(request.getPassword(), request.getRePassword()))
            throw new RuntimeException("Password not same");

        if(request.getRePassword() == null || request.getRePassword().length() < 8 || request.getRePassword().length() > 25)
            throw new RuntimeException("Password must be 8-25 characters");

        UserEntity entity = repository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        entity.setPassword(passwordEncoder.encode(request.getPassword()));
        entity = repository.save(entity);

        String token = tokenService.generateToken(entity, true);
        return UserResponse.builder()
                .token(token)
                .build();
    }

    @Transactional
    @Override
    public UserResponse update(String token, String username, String email, String id) {
        if(email != null && !email.isEmpty() && !email.contains("sdu.edu.kz"))
            throw new RuntimeException("Invalid email");

        if(id != null && !id.isEmpty() && id.length() != 9)
            throw new RuntimeException("Invalid id");

        String data = decoder.decodeJwtPayload(token);

        Gson gson = new Gson();
        UserTokenRequest tokenRequest = gson.fromJson(data, UserTokenRequest.class);

        UserEntity entity = repository.findByUserId(tokenRequest.getSub())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!username.isEmpty()) entity.setName(username);
        if (email != null && !email.isEmpty()) entity.setEmail(email);
        if (id != null && !id.isEmpty()) entity.setUserId(id);

        entity.setUpdatedAt(LocalDateTime.now());

        entity = repository.save(entity);

        String newToken = tokenService.generateToken(entity, true);
        return UserResponse.builder()
                .token(newToken)
                .build();
    }


    @Transactional(readOnly = true)
    @Override
    public List<UserView> getUsers() {
        return repository.findAll().stream().map(UserMapper.INSTANCE::userToView).toList();
    }

    @Override
    public UserResponse setAdmin(String request) {
        String data = decoder.decodeJwtPayload(request);

        Gson gson = new Gson();
        UserTokenRequest tokenRequest = gson.fromJson(data, UserTokenRequest.class);

        UserEntity entity = repository.findByUserId(tokenRequest.getSub())
                .orElseThrow(()->new RuntimeException("User not found"));
        entity.setRole(UserRole.Admin);

        entity = repository.save(entity);

        String token = tokenService.generateToken(entity, true);
        return UserResponse.builder()
                .token(token)
                .build();
    }

    @Override
    public UserView getUserDetails(String token) {
        String data = decoder.decodeJwtPayload(token);

        Gson gson = new Gson();
        UserTokenRequest tokenRequest = gson.fromJson(data, UserTokenRequest.class);

        UserEntity entity = repository.findByUserId(tokenRequest.getSub())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserMapper.INSTANCE.userToView(entity);
    }


}
