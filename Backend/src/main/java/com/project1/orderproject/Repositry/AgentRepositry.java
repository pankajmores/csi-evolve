package com.project1.orderproject.Repositry;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.project1.orderproject.POJOs.Agent;

import java.util.Optional;


public interface AgentRepositry extends  MongoRepository<Agent,String>{
    Optional<Agent>  findByUsername(String username);
}

