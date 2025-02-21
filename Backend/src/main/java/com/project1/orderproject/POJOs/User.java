package com.project1.orderproject.POJOs;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import io.jsonwebtoken.lang.Collections;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User implements UserDetails {

   @Id
    private String id;
    
    private  String username;

    private String password;

    private String  Organization;

    private  String  token;

    private  Set<com.project1.orderproject.POJOs.Enum.Role>  set ;
    
    private Refresh_Token refresh_Token;
    /*
     * cConsidering  all  the  things  for  the   later   about  the   Get_Orde 
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
         return  set.stream()
                .map(role ->  new SimpleGrantedAuthority("ROLE_"+role.name()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return  password;
    }

    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return  username;
    }

}
