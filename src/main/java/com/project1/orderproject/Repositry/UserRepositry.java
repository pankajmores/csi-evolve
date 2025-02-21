package com.project1.orderproject.Repositry;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.project1.orderproject.POJOs.User;

import java.util.Optional;
import java.util.List;


@Repository
public interface UserRepositry extends  MongoRepository<User,String>{

     public Optional<User> findByusername(String  username);
     public  Optional<User>  findByToken(String token);
     
}
