package com.project1.orderproject.Service;

import java.util.List;
import java.util.Optional;

import com.project1.orderproject.POJOs.Agent;

public interface AgentService {
    List<Agent> getAllAgents();
    Optional<Agent> getAgentById(String agentId);
    Agent updateAgent(String agentId, Agent agent);
    void deleteAgent(String agentId);
}