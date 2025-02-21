package com.project1.orderproject.ServiceImplementation;

import com.project1.orderproject.POJOs.ChatMessage;
import com.project1.orderproject.POJOs.Complaint;
import com.project1.orderproject.Repositry.ChatRepository;
import com.project1.orderproject.Repositry.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;
    
    @Autowired
    private ComplaintRepository complaintRepository;

    // Save a chat message
    public ChatMessage saveMessage(Long complaintId, String sender, String message) {
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setComplaintId(complaintId);
        chatMessage.setSender(sender);
        chatMessage.setMessage(message);
        chatMessage.setTimestamp(LocalDateTime.now());
        return chatRepository.save(chatMessage);
    }

    // Get all chat messages for a complaint
    public List<ChatMessage> getMessagesByComplaintId(Long complaintId) {
        return chatRepository.findByComplaintId(complaintId);
    }

    // Add chatbot response to complaint chat
    public ChatMessage addChatbotResponse(Long complaintId, String response) {
        Optional<Complaint> complaintOpt = complaintRepository.findById(complaintId);
        if (complaintOpt.isPresent()) {
            saveMessage(complaintId, "Chatbot", response);
            Complaint complaint = complaintOpt.get();
            complaint.setDescription(complaint.getDescription() + "\nChatbot Response: " + response);
            complaintRepository.save(complaint);
            return saveMessage(complaintId, "Chatbot", response);
        }
        return null;
    }
}
