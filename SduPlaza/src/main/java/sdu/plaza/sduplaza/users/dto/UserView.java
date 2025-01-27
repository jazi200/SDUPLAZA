package sdu.plaza.sduplaza.users.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;
import sdu.plaza.sduplaza.users.enums.UserRole;

@Getter
@Service
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserView {

    private String userId;
    private String email;
    private String name;
    private UserRole role;
}

