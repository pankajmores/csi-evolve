package com.project1.orderproject.Contoller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project1.orderproject.DTO.UserDTO;
import com.project1.orderproject.DTO.Agent.Agent_Signup_Dto;

import com.project1.orderproject.ServiceImplementation.Refresh_Service;
import com.project1.orderproject.ServiceImplementation.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/auth/agent")
public class Agent_Auth_Controller {
    @Autowired
    private  Refresh_Service  refresh_Service;

    @Autowired
    private  UserServiceImpl userServiceImpl;
    // @GetMapping("/hi")
    // public String getMethodName(@RequestParam String param,HttpServletResponse response) {
    //     Cookie cookie = new Cookie("TEST", "cookieValue");
    //     cookie.setSecure(true); // Secure (HTTPS only)
    //     cookie.setHttpOnly(true); // HttpOnly
    //     cookie.setPath("/"); // Path where the cookie is accessible
    //     cookie.setMaxAge(60 * 60); // Cookie expiration time in seconds
    //    response.addCookie(cookie);
    //    response.setHeader("Spring",param);
    //     return  "Hello";
    // }
    
   
    
    /*
     * eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MTYyOGJlMS02NDMzLTRkNjMtYWQ0YS03ODYwYTQ2ZDdlMjciLCJqdGkiOiJhOTExOTNiMy0zYTZlLTQwNmYtOWVjNS0wMWNkMDM3ZWEwYTYiLCJpYXQiOjE3MzMwODY4ODksImV4cCI6MTczMzI1OTY4OX0.qAjLgmc-_cXtYRiXpBs6hoPK_9dROqVYGGfeTC5P7sc
     */
    

 @PostMapping("/signup")
    public ResponseEntity<Map<String,Object>> signup(@RequestBody  Agent_Signup_Dto agent_Signup_Dto,HttpServletResponse response) {
        //TODO: process POST reque


         // Create a cookie
         UserDTO  userDTO =  new UserDTO(agent_Signup_Dto.getUsername(), agent_Signup_Dto.getPassword(), agent_Signup_Dto.getRole());
        userServiceImpl.AddUser(agent_Signup_Dto);
        log.info(agent_Signup_Dto.toString());
       Map<String,Object>  token_map  =  userServiceImpl.Login_Token(userDTO);
       // Cookie cookie = new Cookie("jtoken",(String)token_map.get("access_Token"));
       // cookie.setSecure(true); // Secure (HTTPS only)
       // cookie.setHttpOnly(true); // HttpOnly
       // cookie.setPath("/"); // Path where the cookie is accessible
       // cookie.setMaxAge(60); // Cookie expiration time in seconds
       // response.addCookie(cookie);
       
   
       return new ResponseEntity<Map<String,Object>>(token_map, HttpStatus.OK);

    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> postMethodName(@RequestBody UserDTO ussDto,HttpServletResponse response) {
        //TODO: process POST request
        
       Map<String,Object>  token_map  =  userServiceImpl.Login_Token(ussDto);
        // Cookie cookie = new Cookie("jtoken",(String)token_map.get("access_Token"));
        // cookie.setSecure(true); // Secure (HTTPS only)
        // cookie.setHttpOnly(true); // HttpOnly
        // cookie.setPath("/"); // Path where the cookie is accessible
        // cookie.setMaxAge(60); // Cookie expiration time in seconds
        // response.addCookie(cookie);
        
    
        return new ResponseEntity<Map<String,Object>>(token_map, HttpStatus.OK);
        
                                
        
    }

    @PostMapping("/refresh")
    public ResponseEntity<String> Refresh_token(HttpServletRequest request) {
        // header  me  client   side   se  ayyega   and   then you  will  pass me   off  with  taking  out  that
        String   brearer_token  =  request.getHeader(HttpHeaders.AUTHORIZATION);
        System.out.println("The  TOken  form  the  header is  the  " +  brearer_token);
        //hey  how will  get  the   Logic  here  
        String  token  =  brearer_token.substring(7);
        System.out.println("The  TOken  form  the  header is  the  " +  brearer_token);
        if(!refresh_Service.validate(token)) {
                System.out.println("THe  TOken that  you  have  Provided  to be  the   Expires  need  to  login  again ");
                return  new ResponseEntity<String>("Need to Login  again  ", HttpStatus.GATEWAY_TIMEOUT);
        }
        String userid =refresh_Service.get_User_id(token);
        if(userid == null) {
            System.out.println("Invalid  token");
            return  new ResponseEntity<String>("Need to Login  again  ", HttpStatus.GATEWAY_TIMEOUT);
        }
        String access_Token = userServiceImpl.genrate_jwt_userid(userid);

        return new ResponseEntity<>(access_Token,HttpStatus.ACCEPTED);
    } 

}
