package com.project1.orderproject.Repositry;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.project1.orderproject.POJOs.Refresh_Token;

@Repository
public interface Refresh_Token_Repositry extends  MongoRepository<Refresh_Token ,  String>{

}
