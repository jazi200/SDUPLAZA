package sdu.plaza.sduplaza.web.handler;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import sdu.plaza.sduplaza.web.dto.ErrorResponse;
import sdu.plaza.sduplaza.web.exceptions.BadRequestException;
import sdu.plaza.sduplaza.web.exceptions.UserNotFoundException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = BadRequestException.class)
    public ErrorResponse badRequestExceptionHandler(BadRequestException ex){
        return new ErrorResponse(LocalDateTime.now(),ex.getMessage(), ex.getCode());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = UserNotFoundException.class)
    public ErrorResponse userNotFoundHandler(UserNotFoundException ex){
        return new ErrorResponse(LocalDateTime.now(),ex.getMessage(), ex.getCode());
    }

}
