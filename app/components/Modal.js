"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Modal Component
 * A reusable modal dialog component with backdrop and focus management
 */
const Modal = ({ isOpen, onClose, children }) => {
    // Handle escape key press to close modal
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            // Prevent background scrolling when modal is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title">
            {/* Backdrop with fade-in and subtle editorial blur */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-secondary/40 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal content with springy slide up & scale */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
                className="relative z-50 bg-surface-container-lowest border border-outline-variant/70 shadow-2xl rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto text-on-surface"
                role="document">
                {children}
            </motion.div>
        </div>
    );
};

export default Modal;
