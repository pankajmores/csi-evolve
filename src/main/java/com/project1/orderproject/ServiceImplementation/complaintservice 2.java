package com.project1.orderproject.ServiceImplementation;

import com.project1.orderproject.POJOs.ChatMessage;
import com.project1.orderproject.POJOs.Complaint;
import com.project1.orderproject.Repositry.ComplaintRepository;
import com.project1.orderproject.Repositry.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private ChatService chatService;

    // Submit a new complaint
    public Complaint createComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    // Get all complaints
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    // Get complaint details by ID
    public Optional<Complaint> getComplaintById(Long complaintId) {
        return complaintRepository.findById(complaintId);
    }

    // Update complaint details
    public Complaint updateComplaint(Long complaintId, Complaint updatedComplaint) {
        return complaintRepository.findById(complaintId)
                .map(existingComplaint -> {
                    existingComplaint.setDescription(updatedComplaint.getDescription());
                    existingComplaint.setStatus(updatedComplaint.getStatus());
                    existingComplaint.setUpdatedAt(updatedComplaint.getUpdatedAt());
                    return complaintRepository.save(existingComplaint);
                }).orElse(null);
    }

    // Delete a complaint
    public void deleteComplaint(Long complaintId) {
        complaintRepository.deleteById(complaintId);
    }

    // Update complaint status
    public Complaint updateStatus(Long complaintId, String status) {
        return complaintRepository.findById(complaintId)
                .map(complaint -> {
                    complaint.setStatus(status);
                    return complaintRepository.save(complaint);
                }).orElse(null);
    }

    // Assign complaint to an agent with chat message confirmation
    public Complaint assignToAgent(Long complaintId, String agentId) {
        return complaintRepository.findById(complaintId)
                .map(complaint -> {
                    complaint.setAgentId(agentId);
                    Complaint updatedComplaint = complaintRepository.save(complaint);
                    
                    // Save chat message indicating the assignment
                    chatService.saveMessage(complaintId, "System", 
                        "Complaint assigned to Agent: " + agentId);
                    
                    return updatedComplaint;
                }).orElse(null);
    }

    // Chatbot auto-response now handled via ChatService
    public ChatMessage addChatbotResponse(Long complaintId, String response) {
        return chatService.addChatbotResponse(complaintId, response);
    }

    // Get complaints by status
    public List<Complaint> getComplaintsByStatus(String status) {
        return complaintRepository.findByStatus(status);
    }

    // Get complaints by organization ID
    public List<Complaint> getComplaintsByOrganization(String orgId) {
        return complaintRepository.findByOrgId(orgId);
    }
}
