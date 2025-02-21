package com.project1.orderproject.POJOs;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Complaint {

    @Id
    private Long complaintId;

    private  String  identification_id; // this is  to be  genrated  by  the  the  Organosziotn  and  they  should  send  then  
    // it  depends upone  the  org  aboitu  how to  amange  them  

    private String description;

    private String status;

    private String agentId;

    private String orgId;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
