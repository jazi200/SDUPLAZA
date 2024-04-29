package sdu.plaza.sduplaza.web.exceptions;

import lombok.Getter;

@Getter
public class BadRequestException extends RuntimeException{
    private final int code;
    public BadRequestException(String msg, int code){
        super(msg);
        this.code = code;
    }

}
