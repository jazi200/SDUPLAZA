package sdu.plaza.sduplaza.web.service;

public interface PasswordResetCodeService {
    String generateResetCode(String email);

    Boolean verifyResetCode(String email, String code);
}
