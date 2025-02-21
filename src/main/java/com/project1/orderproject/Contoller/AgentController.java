package com.project1.orderproject.Contoller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project1.orderproject.POJOs.Agent;
import com.project1.orderproject.Repositry.AgentRepositry;
import com.project1.orderproject.ServiceImplementation.AgentServiceImplementation;

@RestController
@RequestMapping("/agent")
public class AgentController {

    @Autowired
    private AgentServiceImplementation agentService;
    
    
    @GetMapping
    public ResponseEntity<List<Agent>> getAllAgents() {
        List<Agent> agents = agentService.getAllAgents();
        return ResponseEntity.ok(agents);
    }

    // Get an agent by ID
    @GetMapping("/{agentId}")
    public ResponseEntity<Agent> getAgentDetails(@PathVariable("agentId") String agentId) {
        Optional<Agent> agent = agentService.getAgentById(agentId);
        if(agent.isPresent()) {
            return  new  ResponseEntity(agent.get(), HttpStatus.OK);
        }
        return new ResponseEntity<Agent>(agent.get(), HttpStatus.NOT_FOUND);

    }

    // Update an agent
    @PutMapping("/{agentId}")
    public ResponseEntity<?> updateAgentDetails(@PathVariable("agentId") String agentId, @RequestBody Agent agent) {
        Agent updatedAgent = agentService.updateAgent(agentId, agent);
        if (updatedAgent != null) {
            return ResponseEntity.ok(updatedAgent);
        } else {
            return ResponseEntity.status(404).body("Agent not found or could not be updated");
        }
    }

    // Delete an agent
    @DeleteMapping("/{agentId}")
    public ResponseEntity<String> removeAgent(@PathVariable("agentId") String agentId) {
        agentService.deleteAgent(agentId);
        return ResponseEntity.ok("Agent deleted successfully");
    }

}