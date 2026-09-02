"use client";

import React from "react";

/**
 * BookLoading Component
 * Renders a premium skeleton loading state matching the BookCard grid for "lg" size,
 * or an elegant pure-CSS page-flip book symbol for "sm" and "md" sizes.
 */
const BookLoading = ({ size = "md", isLoading = true }) => {
    if (!isLoading) return null;

    if (size === "lg") {
        // High-end skeleton grid matching final visual grid spacing
        return (
            <div 
                className="w-full"
                role="alert"
                aria-busy="true"
                aria-label="Loading library catalog">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 w-full">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="relative aspect-[3/4.4] w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-3 sm:p-3.5 
                                       overflow-hidden flex flex-col justify-between animate-pulse shadow-xs">
                            <div className="w-full h-full rounded-[4px] bg-surface-container flex flex-col justify-between p-4">
                                {/* Spine mock shadow */}
                                <div className="absolute left-3 top-3 w-3 bottom-3 bg-gradient-to-r from-black/10 to-transparent rounded-l-[4px]" />
                                
                                {/* Title lines mock */}
                                <div className="w-full mt-4 flex flex-col items-center gap-2">
                                    <div className="h-3 bg-surface-container-highest rounded w-4/5" />
                                    <div className="h-3 bg-surface-container-highest rounded w-3/5" />
                                </div>

                                {/* Genre line mock */}
                                <div className="w-1/2 mx-auto h-2 bg-surface-container-high rounded mt-auto mb-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Single elegant page-flip book loader for inline states
    const dimensionClasses = {
        sm: "w-8 h-6",
        md: "w-12 h-9",
    };

    const dotDimension = size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5";

    return (
        <div
            className="flex flex-col items-center justify-center gap-5 py-6"
            role="alert"
            aria-busy="true"
            aria-label="Loading content">
            
            {/* Animated flipping book */}
            <div className={`relative ${dimensionClasses[size]} perspective-500`}>
                <div className="book-shell w-full h-full flex justify-between relative">
                    {/* Left cover page static */}
                    <div className="w-[48%] h-full bg-gradient-to-l from-surface-container-high to-surface-container border-l border-y border-outline-variant rounded-l shadow-xs" />
                    
                    {/* Center book spine */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-primary/80 z-20" />
                    
                    {/* Flipping page */}
                    <div className="flipping-page absolute right-[1%] top-0 w-[49%] h-full bg-surface-container-lowest border-r border-y border-outline-variant rounded-r origin-left z-10" />
                    
                    {/* Right cover page static */}
                    <div className="w-[48%] h-full bg-gradient-to-r from-surface-container-high to-surface-container border-r border-y border-outline-variant rounded-r shadow-xs" />
                </div>
            </div>

            {/* Micro-loading indicators */}
            <div className="flex gap-1.5">
                <div className={`${dotDimension} bg-primary/70 rounded-full animate-bounce-custom-1` } />
                <div className={`${dotDimension} bg-primary/70 rounded-full animate-bounce-custom-2` } />
                <div className={`${dotDimension} bg-primary/70 rounded-full animate-bounce-custom-3` } />
            </div>

            <style jsx global>{`
                .perspective-500 {
                    perspective: 500px;
                }
                .flipping-page {
                    animation: flipPage 1.6s infinite cubic-bezier(0.445, 0.05, 0.55, 0.95);
                    transform-style: preserve-3d;
                }
                
                @keyframes flipPage {
                    0% {
                        transform: rotateY(0deg);
                        background-color: #f5f3ef;
                    }
                    50% {
                        transform: rotateY(-180deg);
                        background-color: #efeeea;
                    }
                    100% {
                        transform: rotateY(-360deg);
                        background-color: #f5f3ef;
                    }
                }

                .animate-bounce-custom-1 {
                    animation: bounceDots 1.2s infinite ease-in-out;
                }
                .animate-bounce-custom-2 {
                    animation: bounceDots 1.2s infinite ease-in-out 0.2s;
                }
                .animate-bounce-custom-3 {
                    animation: bounceDots 1.2s infinite ease-in-out 0.4s;
                }

                @keyframes bounceDots {
                    0%, 100% {
                        transform: translateY(0);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translateY(-4px);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default BookLoading;
