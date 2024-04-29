package sdu.plaza.sduplaza.users.dto.response;

import lombok.*;
import sdu.plaza.sduplaza.users.enums.UserRole;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleResponse {
    private UserRole role;
}
