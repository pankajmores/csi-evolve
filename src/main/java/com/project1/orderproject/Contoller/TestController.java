package com.project1.orderproject.Contoller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    private  AuthenticationManager authenticationManager; 
    
    @GetMapping("/test")
    public ResponseEntity<String> getMethodName() {
       
       String  str = "Hey  Welcome to  teh  App  user ";
       return  new ResponseEntity<String>(str, HttpStatus.OK);
    }
    
}
