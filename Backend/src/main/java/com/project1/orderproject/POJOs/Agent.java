package com.project1.orderproject.POJOs;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.project1.orderproject.POJOs.Enum.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter@NoArgsConstructor
@AllArgsConstructor
@Document
public class Agent{

    @Id
    private String agentId;

    private String name;

    private String username;

    private String phoneNumber;

    private  String password;

    private String status; // Online, Offline, etc.

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private  String Organization_id;

    private  Set<Role>  set;

    private List<Long>  complaintId;

    private  String  token;


    
}
