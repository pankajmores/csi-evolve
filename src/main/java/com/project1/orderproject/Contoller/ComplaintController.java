package com.project1.orderproject.Contoller;

import com.project1.orderproject.POJOs.Agent;
import com.project1.orderproject.POJOs.Complaint;
import com.project1.orderproject.ServiceImplementation.ComplaintService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    // Submit a new complaint
    @PostMapping
    public ResponseEntity<Complaint> submitComplaint(@RequestBody Complaint complaint) {
        Complaint savedComplaint = complaintService.createComplaint(complaint);
        return ResponseEntity.ok(savedComplaint);
    }

    // Get all complaints (Admin view)
    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        List<Complaint> complaints = complaintService.getAllComplaints();
        return ResponseEntity.ok(complaints);
    }

    // Get complaint details by ID
    @GetMapping("/{complaintId}")
    public ResponseEntity<?> getComplaintById(@PathVariable Long complaintId) {
        Optional<Complaint> complaint = complaintService.getComplaintById(complaintId);
         if(complaint.isPresent()) {
            return  new  ResponseEntity(complaint.get(), HttpStatus.OK);
        }
        return new ResponseEntity<Complaint>(complaint.get(), HttpStatus.NOT_FOUND);
    }

    // Update complaint details
    @PutMapping("/{complaintId}")
    public ResponseEntity<?> updateComplaint(@PathVariable Long complaintId, @RequestBody Complaint complaint) {
        Complaint updatedComplaint = complaintService.updateComplaint(complaintId, complaint);
        return updatedComplaint != null
                ? ResponseEntity.ok(updatedComplaint)
                : ResponseEntity.status(404).body("Complaint not found or update failed");
    }

    // Delete a complaint
    @DeleteMapping("/{complaintId}")
    public ResponseEntity<String> deleteComplaint(@PathVariable Long complaintId) {
        complaintService.deleteComplaint(complaintId);
        return ResponseEntity.ok("Complaint deleted successfully");
    }

    // Update complaint status
    @PatchMapping("/{complaintId}/status")
    public ResponseEntity<?> updateComplaintStatus(@PathVariable Long complaintId, @RequestBody String status) {
        Complaint updatedComplaint = complaintService.updateStatus(complaintId, status);
        return updatedComplaint != null
                ? ResponseEntity.ok(updatedComplaint)
                : ResponseEntity.status(404).body("Complaint not found");
    }

    // Assign a complaint to an agent
    @PatchMapping("/{complaintId}/assign/{agentId}")
    public ResponseEntity<?> assignComplaintToAgent(@PathVariable Long complaintId, @PathVariable String agentId) {
        Complaint updatedComplaint = complaintService.assignToAgent(complaintId, agentId);
        return updatedComplaint != null
                ? ResponseEntity.ok(updatedComplaint)
                : ResponseEntity.status(404).body("Complaint or Agent not found");
    }

    // Filter complaints by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Complaint>> getComplaintsByStatus(@PathVariable String status) {
        List<Complaint> complaints = complaintService.getComplaintsByStatus(status);
        return ResponseEntity.ok(complaints);
    }

    // Get complaints for a specific organization
    @GetMapping("/org/{orgId}")
    public ResponseEntity<List<Complaint>> getComplaintsByOrganization(@PathVariable String orgId) {
        List<Complaint> complaints = complaintService.getComplaintsByOrganization(orgId);
        return ResponseEntity.ok(complaints);
    }

    // Chatbot auto-response for a complaint
    @PostMapping("/{complaintId}/chatbot-response")
    public ResponseEntity<?> chatbotAutoResponse(@PathVariable Long complaintId, @RequestBody String response) {
        Complaint updatedComplaint = complaintService.addChatbotResponse(complaintId, response);
        return updatedComplaint != null
                ? ResponseEntity.ok(updatedComplaint)
                : ResponseEntity.status(404).body("Complaint not found");
    }
}
