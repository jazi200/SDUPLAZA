package sdu.plaza.sduplaza.users.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserResetCodeResponse {
    private Boolean correctCode;
}
