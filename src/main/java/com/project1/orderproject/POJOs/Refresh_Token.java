package com.project1.orderproject.POJOs;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@Document
@Builder
public class Refresh_Token {

    public Refresh_Token() {
        //TODO Auto-generated constructor stub
    }

    @Id
    private  String  token_id;

    private Date date;

    private Long  refershed;

    private  User user;

    private  Agent agent;

}
