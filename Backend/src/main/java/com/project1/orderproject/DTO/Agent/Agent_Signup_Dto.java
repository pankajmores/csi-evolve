package com.project1.orderproject.DTO.Agent;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
@AllArgsConstructor
public class Agent_Signup_Dto {

    @Email
    private  String username;
    @NotNull
    private  String   password;
    @NotEmpty
    private  String role;
    @NotEmpty
    private  String  token;
}
