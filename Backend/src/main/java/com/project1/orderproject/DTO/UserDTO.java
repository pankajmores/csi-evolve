package com.project1.orderproject.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
@AllArgsConstructor
public class UserDTO {
    @Email
    private  String username;
    @NotNull
    private  String   password;
    @NotEmpty
    private  String role;
//hey  needv to  throeu  the  erroe 

}
