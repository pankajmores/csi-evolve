package com.project1.orderproject.ServiceImplementation;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project1.orderproject.POJOs.User;
import com.project1.orderproject.Repositry.UserRepositry;
import com.project1.orderproject.Service.OrganisationService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OrganisationServiceImplemetation implements OrganisationService{

    @Autowired
    private  UserRepositry  repositry;
    @Override
    public String genrate_Token(String user_id) {
        // TODO Auto-generated method stub
        User  user =  repositry.findByusername(user_id).get();
        String  token   =  UUID.randomUUID().toString();
        user.setToken(token);
        repositry.save(user);
        log.info("Hey Token  Genrated  for  the   user "+user.getId()+ " "+token);
        return  token;
        
    }

    

}
