package sdu.plaza.sduplaza.web.exceptions;

import lombok.Getter;

@Getter
public class UserNotFoundException extends RuntimeException{
    private final int code;
    public UserNotFoundException(String msg, int code){
        super(msg);
        this.code = code;
    }

}
