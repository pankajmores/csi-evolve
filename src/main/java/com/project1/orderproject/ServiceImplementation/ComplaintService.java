package com.project1.orderproject.ServiceImplementation;

import com.project1.orderproject.POJOs.Complaint;
import com.project1.orderproject.Repositry.ComplaintRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

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

    // Assign complaint to an agent
    public Complaint assignToAgent(Long complaintId, String agentId) {
        return complaintRepository.findById(complaintId)
                .map(complaint -> {
                    complaint.setAgentId(agentId);
                    return complaintRepository.save(complaint);
                }).orElse(null);
    }

    // Get complaints by status
    public List<Complaint> getComplaintsByStatus(String status) {
        return complaintRepository.findByStatus(status);
    }

    // Get complaints by organization ID
    public List<Complaint> getComplaintsByOrganization(String orgId) {
        return complaintRepository.findByOrgId(orgId);
    }

    // Chatbot auto-response
    public Complaint addChatbotResponse(Long complaintId, String response) {
        return complaintRepository.findById(complaintId)
                .map(complaint -> {
                    complaint.setDescription(complaint.getDescription() + "\nChatbot Response: " + response);
                    return complaintRepository.save(complaint);
                }).orElse(null);
    }
}
