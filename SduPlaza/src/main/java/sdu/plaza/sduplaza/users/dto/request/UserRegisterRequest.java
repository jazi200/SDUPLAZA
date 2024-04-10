package sdu.plaza.sduplaza.users.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequest {

    private String userId;
    private String name;
    private String email;
    private String password;

}
