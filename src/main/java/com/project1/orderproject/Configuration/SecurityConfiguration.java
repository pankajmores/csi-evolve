package com.project1.orderproject.Configuration;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.project1.orderproject.Filter.JwtFilter;

import com.project1.orderproject.ServiceImplementation.UserServiceImpl;

@Configuration
@EnableWebSecurity
@CrossOrigin
public class SecurityConfiguration {
    @Lazy
    private JwtFilter jwtFilter;
    @Lazy
    private UserServiceImpl  userServiceImpl;
    private  AppConfiguration appConfiguration;

  

    
    public  SecurityConfiguration(UserServiceImpl  userServiceImpl,AppConfiguration appConfiguration,JwtFilter jwtFilter) {
        this.userServiceImpl  =  userServiceImpl;
        this.jwtFilter  =  jwtFilter;
        this.appConfiguration =appConfiguration;
    }

     @Bean// As  you  should  Surround  with  the  Try  and   the   Catch  
    public  AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    

    @Bean
    public  AuthenticationProvider  daoauthenticationProvider() {
        DaoAuthenticationProvider  daoAuthenticationProvider  =  new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(appConfiguration.passwordEncoder());
        daoAuthenticationProvider.setUserDetailsService(userServiceImpl);
        return  daoAuthenticationProvider;
    }



    @Bean
    public  SecurityFilterChain securityFilterChain(HttpSecurity  httpSecurity) throws Exception {
//  if   you  are  Going  to  adc  th e  FIlter  addd  them  before .
        httpSecurity
        .csrf(csrf-> {
            csrf.disable();
        })
        .cors(cors -> cors.configurationSource(request -> {
            // Allow all origins, headers, and methods for now (can be restricted as needed)
            var config = new org.springframework.web.cors.CorsConfiguration();
            // Replace "http://<friend-ip>:<react-port>" with your friend's actual React app address
            config.setAllowedOrigins(List.of("http://192.168.1.2:3000")); // Use friend's IP address and port here
            config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            config.setAllowedHeaders(List.of("*"));
            config.setAllowCredentials(true); // Allow credentials (cookies, Authorization headers)
            return config;
        }))
        .authorizeHttpRequests(authorizeHttpRequests-> {
            authorizeHttpRequests.requestMatchers("/auth/**","/test/**","/actuator/**").permitAll();//when we   scale  use form the  App  Constans
            authorizeHttpRequests.requestMatchers("/org/**").hasRole("Admin");
            authorizeHttpRequests.requestMatchers("/agent/**").hasRole("Agent");
            authorizeHttpRequests.anyRequest().authenticated();
        })
        .sessionManagement(session -> 
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtFilter  , UsernamePasswordAuthenticationFilter.class)
        ;
        
        return  httpSecurity.build();
    }
}
