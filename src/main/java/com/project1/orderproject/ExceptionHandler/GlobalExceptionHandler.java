package com.project1.orderproject.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project1.orderproject.ExceptionHandler.Exception.UserAlreadyExist;



@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = UserAlreadyExist.class)
    public  ResponseEntity<ApiResponse>  useralreadyexist(UserAlreadyExist exist) {
        Map<String,Object>  map   =  new  HashMap<>();
        map.put("Error" ,exist.getMessage() );
        ApiResponse  apiResponse  = new ApiResponse();
        apiResponse.setError_object(map);
        apiResponse.setMessage("User Erroe");
        apiResponse.setHttpStatus(HttpStatus.CONFLICT.toString());
        return  new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_ACCEPTABLE);


    }
}
