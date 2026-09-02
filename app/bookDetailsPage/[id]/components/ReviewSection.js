"use client";

import { useState, useEffect, use, useCallback } from "react";
import { useBooksStore } from "@/app/store/useBooksStore";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import EditableStarRating from "./EditableStarRating";
import ReviewCard from "./ReviewCard";
import BookLoading from "@/app/components/BookLoading";
import Pagination from "@/app/components/Pagination";

const ReviewSection = ({ params }) => {
    const { isSignedIn, userName, getToken } = useAuth();
    const isAuthenticated = isSignedIn;
    const { booksData } = useBooksStore();
    const param = use(params);
    const id = param.id;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const [bookStatus, setBookStatus] = useState(null);

    useEffect(() => {
        if (!id) return;

        const storeBook = booksData?.find((b) => b._id === id);
        if (storeBook) {
            setBookStatus(storeBook.status || "allowed");
            return;
        }

        const fetchBookStatus = async () => {
            try {
                const token = await getToken();
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`,
                    token
                        ? {
                              headers: {
                                  Authorization: `Bearer ${token}`,
                              },
                          }
                        : undefined,
                );
                setBookStatus(response.data?.status || null);
            } catch (err) {
                console.error("Error fetching book status:", err);
                setBookStatus(null);
            }
        };

        fetchBookStatus();
    }, [id, booksData, getToken]);

    const isApproved = bookStatus === "allowed";

    const fetchReviews = useCallback(
        async (page = 1) => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}/reviews?page=${page}&limit=5`,
                );
                setReviews(response.data.data);
                setCurrentPage(response.data.pagination.currentPage);
                setTotalPages(response.data.pagination.totalPages);
                setError(null);
            } catch (err) {
                setError("Failed to load reviews. Please try again later.");
                console.error("Error fetching reviews:", err);
            } finally {
                setLoading(false);
            }
        },
        [id],
    );

    useEffect(() => {
        if (booksData) {
            setLoading(false);
        }

        if (id) {
            fetchReviews(1);
        }
    }, [booksData, id, userName, fetchReviews]);

    const handlePageChange = useCallback(
        (page) => {
            setLoading(true);
            fetchReviews(page).then(() => setLoading(false));
        },
        [fetchReviews],
    );

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!comment || rating < 1 || rating > 5) {
            setError("Please fill out all fields correctly.");
            setLoading(false);
            return;
        }

        const newReview = { rating, comment };

        try {
            const token = await getToken();
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}/reviews`,
                newReview,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                },
            );

            await fetchReviews(currentPage);
            console.log("Review submitted successfully");
        } catch (err) {
            console.error("Error submitting review:", err);
            setError("Failed to submit review. Please try again.");
        } finally {
            setLoading(false);
            setRating(1);
            setComment("");
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-secondary">Discussion & Reviews</h2>
                <span className="text-xs font-mono text-tertiary uppercase tracking-widest">
                    {reviews.length > 0 ? `${reviews.length} written` : "Empty"}
                </span>
            </div>

            <div className="space-y-4 mb-8 relative min-h-[60px]">
                {loading && (
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-xs flex justify-center items-center z-10">
                        <BookLoading size="md" />
                    </div>
                )}
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                            setReviews={setReviews}
                        />
                    ))
                ) : (
                    <p className="text-on-surface-variant text-sm italic py-4">
                        No reviews yet. Be the first to share your literary reflection!
                    </p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="mb-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {!isApproved && bookStatus !== null && (
                <div className="p-4 bg-surface-container-low border border-outline-variant/60 rounded-xl">
                    <p className="text-xs sm:text-sm text-on-surface-variant text-center">
                        This book is awaiting moderation approval. Reviews can be added once it is approved.
                    </p>
                </div>
            )}

            {isApproved && !isAuthenticated && (
                <div className="p-4 bg-surface-container-low border border-outline-variant/60 rounded-xl">
                    <p className="text-xs sm:text-sm text-on-surface-variant text-center">
                        Please log in to leave a review.
                    </p>
                </div>
            )}

            {isApproved && isAuthenticated && (
                <form
                    onSubmit={handleReviewSubmit}
                    className="flex flex-col gap-5 border border-outline-variant/70 p-6 sm:p-8 rounded-2xl bg-surface-container-low/70 backdrop-blur-xs shadow-xs"
                    aria-label="Review submission form">
                    <h3 className="font-serif text-lg font-bold text-secondary">Write a Review</h3>

                    {error && (
                        <div
                            className="bg-error-container/30 border border-error/30 text-error px-4 py-3 rounded-xl text-sm"
                            role="alert"
                            aria-live="polite">
                            <span>{error}</span>
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="rating"
                            className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
                            Rating
                        </label>
                        <EditableStarRating
                            rating={rating}
                            onRatingChange={setRating}
                            id="rating"
                            aria-label="Select rating from 1 to 5 stars"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="comment"
                            className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
                            Review Comment
                        </label>
                        <textarea
                            id="comment"
                            placeholder="Write your review and share your thoughts..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/45 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-xs transition-all duration-200 resize-none"
                            rows="4"
                            required
                            aria-label="Review comment"
                            aria-required="true"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="self-start inline-flex items-center justify-center bg-primary hover:bg-[#8e330e] active:scale-[0.98] text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-150 text-sm shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-busy={loading}>
                        {loading ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ReviewSection;
