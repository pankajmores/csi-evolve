package com.project1.orderproject.ServiceImplementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project1.orderproject.POJOs.Agent;
import com.project1.orderproject.Repositry.AgentRepositry;
import com.project1.orderproject.Service.AgentService;

@Service
public class AgentServiceImplementation implements AgentService {

    @Autowired
    private AgentRepositry agentRepositry;

    @Override
    public List<Agent> getAllAgents() {
        return agentRepositry.findAll();
    }

    @Override
    public Optional<Agent> getAgentById(String agentId) {
        return agentRepositry.findById(agentId);
    }

    @Override
    public Agent updateAgent(String agentId, Agent updatedAgent) {
        if (agentRepositry.existsById(agentId)) {
            updatedAgent.setAgentId(agentId);
            return agentRepositry.save(updatedAgent);
        }
        return null;
    }

    @Override
    public void deleteAgent(String agentId) {
        agentRepositry.deleteById(agentId);
    }
}