"use client";

import React from "react";
import BookSection from "./BookSection";

const approveAction = {
    action: "approve",
    label: "Approve",
    busyLabel: "Approving...",
    className: "bg-[#2d5c50] hover:bg-[#23493f] text-white shadow-2xs",
};

const denyAction = {
    action: "deny",
    label: "Deny",
    busyLabel: "Denying...",
    className: "bg-error-container/25 text-error border border-error/30 hover:bg-error-container/45",
};

const AdminDashboard = () => {
    return (
        <>
            <BookSection
                title="Pending Books"
                status="pending"
                actions={[approveAction, denyAction]}
            />
            <BookSection
                title="Approved Books"
                status="allowed"
                actions={[denyAction]}
            />
            <BookSection
                title="Denied Books"
                status="denied"
                actions={[approveAction]}
            />
        </>
    );
};

export default AdminDashboard;
