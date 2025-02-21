import React, { useEffect, useState } from "react";

const SubmitComplaint = ({ complaintId, description }) => {
    const [status] = useState("Pending");

    useEffect(() => {
        const submitComplaint = async () => {
            const complaintData = { complaintId, description, status };

            const response = await fetch("http://localhost:8080/complaints", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(complaintData),
            });

            const data = await response.json();
            console.log("Complaint Submitted:", data);
            alert(`Your complaint ID is: ${complaintId}`);
        };

        submitComplaint();
    }, [complaintId, description]);

    return (
        <div>
            <h2>Complaint Submitted</h2>
            <p>Issue: {description}</p>
            <p>Status: {status}</p>
        </div>
    );
};

export default SubmitComplaint;
