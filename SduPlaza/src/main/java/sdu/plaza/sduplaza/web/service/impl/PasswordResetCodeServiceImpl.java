package sdu.plaza.sduplaza.web.service.impl;

import org.springframework.stereotype.Service;
import sdu.plaza.sduplaza.web.service.PasswordResetCodeService;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

@Service
public class PasswordResetCodeServiceImpl implements PasswordResetCodeService {

    private static final int CODE_LENGTH = 4;
    private static final String ALPHABET = "0123456789";
    private final Map<String, String> resetCodes = new HashMap<>();

    @Override
    public String generateResetCode(String email) {
        String resetCode = generateRandomCode();
        resetCodes.put(email, resetCode);
        return resetCode;
    }

    @Override
    public Boolean verifyResetCode(String email, String code) {
        String storedCode = resetCodes.get(email);
        return storedCode != null && storedCode.equals(code);
    }

    private String generateRandomCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            int index = random.nextInt(ALPHABET.length());
            sb.append(ALPHABET.charAt(index));
        }
        return sb.toString();
    }
}
