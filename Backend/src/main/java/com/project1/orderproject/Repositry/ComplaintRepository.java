package com.project1.orderproject.Repositry;

import com.project1.orderproject.POJOs.Complaint;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends MongoRepository<Complaint, Long> {
    List<Complaint> findByStatus(String status);
    List<Complaint> findByOrgId(String orgId);
}
