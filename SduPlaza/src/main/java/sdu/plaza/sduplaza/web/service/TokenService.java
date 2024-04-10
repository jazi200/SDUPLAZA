package sdu.plaza.sduplaza.web.service;

import io.jsonwebtoken.Claims;
import sdu.plaza.sduplaza.users.entity.UserEntity;

import java.util.Map;
import java.util.function.Function;

public interface TokenService {
    String extractEmail(String token);

    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);
    String generateToken(Map<String, Object> extraClaims, UserEntity userDetails, Boolean remember);

    String generateToken(UserEntity userDetails, Boolean remember);

    Boolean isTokenValid(String token, UserEntity userDetails);

}
