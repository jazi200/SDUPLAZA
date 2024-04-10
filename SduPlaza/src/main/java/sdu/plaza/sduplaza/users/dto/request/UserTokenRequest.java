package sdu.plaza.sduplaza.users.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserTokenRequest {

    private String sub;
    private Long iat;
    private Long exp;

}