package com.project1.orderproject.Contoller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;
import com.project1.orderproject.POJOs.User;
import com.project1.orderproject.ServiceImplementation.OrganisationServiceImplemetation;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Slf4j
@RestController
@RequestMapping("/org")
public class OrgController {

    @Autowired
    private OrganisationServiceImplemetation organisationServiceImplemetation;

    @PostMapping("/token")
    public ResponseEntity<String> Genrate_Token() {
        //TODO: process POST reque
        Authentication  authentication   =  SecurityContextHolder.getContext().getAuthentication();
        if(authentication instanceof  User) {
            
        }
            String  user_id  =  authentication.getName();
            log.info(authentication.getName());
            log.info(user_id.getClass().getName());
           String  token  =  organisationServiceImplemetation.genrate_Token(user_id);
            return new ResponseEntity<String>(token, HttpStatus.OK);
        //return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/detail")
    public String getOrganizationDetails() {
        // Implementation will be added
        Authentication  authentication   =  SecurityContextHolder.getContext().getAuthentication();
        String  org_id  =  authentication.getName();
        return null;
    }

    @PutMapping("/{orgId}")
    public void updateOrganizationDetails(@PathVariable("orgId") String orgId, @RequestBody String organizationDetails) {
        // Implementation will be added
    }

    @DeleteMapping("/{orgId}")
    public void removeOrganization(@PathVariable("orgId") String orgId) {
        // Implementation will be added
    }

    // @GetMapping("/{orgId}/agents")
    // public List<String> getAllAgentsInOrganization(@PathVariable("orgId") String orgId) {
    //     // Implementation will be added
    //     return null;
    // }

    // @GetMapping("/{orgId}/complaints")
    // public List<String> getAllComplaintsOfOrganization(@PathVariable("orgId") String orgId) {
    //     // Implementation will be added
    //     return null;
    // }
    
}
