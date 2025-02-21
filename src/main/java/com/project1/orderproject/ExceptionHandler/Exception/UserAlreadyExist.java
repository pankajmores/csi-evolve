package com.project1.orderproject.ExceptionHandler.Exception;

public class UserAlreadyExist extends RuntimeException{
    private  String message;
    public  UserAlreadyExist(String message) {
        super(message);
    }
}
