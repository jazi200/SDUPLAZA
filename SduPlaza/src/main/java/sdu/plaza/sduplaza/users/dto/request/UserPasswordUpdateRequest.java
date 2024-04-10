package sdu.plaza.sduplaza.users.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPasswordUpdateRequest {
    private String email;
    private String password;
    private String rePassword;
    private String code;
}
