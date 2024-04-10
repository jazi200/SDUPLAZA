package sdu.plaza.sduplaza.users.util;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CodeSender {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String user;

    public void sendCode(String toEmail, String code){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(user);
        mailMessage.setTo(toEmail);
        mailMessage.setSubject("SDU PLAZA | Reset password");
        mailMessage.setText("Your code: " + code);
        mailSender.send(mailMessage);
    }
}
