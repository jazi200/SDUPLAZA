package sdu.plaza.sduplaza.users.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import sdu.plaza.sduplaza.users.dto.request.UserRegisterRequest;
import sdu.plaza.sduplaza.users.dto.UserView;
import sdu.plaza.sduplaza.users.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);


    @Mapping(target = "role", expression = "java(sdu.plaza.sduplaza.users.enums.UserRole.ROLE_STUDENT)")
    UserEntity userRequestToUserEntity(UserRegisterRequest request);

    UserView userToView(UserEntity user);
}
