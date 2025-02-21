package com.project1.orderproject.ExceptionHandler.Exception;

public class InvalidToken  extends RuntimeException{
    public InvalidToken(String  message) {
        super(message);
    }
}
