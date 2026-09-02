"use client";

import { useCallback } from "react";
import Image from "next/image";
import { useBooksStore } from "@/app/store/useBooksStore";
import BookGrid from "./BookGrid";
import BookForm from "./BookForm";
import BookLoading from "./BookLoading";
import Pagination from "./Pagination";
import { useAuth } from "@clerk/nextjs";

const BookList = () => {
    const { isSignedIn } = useAuth();
    const isAuthenticated = isSignedIn;
    const {
        booksData,
        loading,
        currentPage,
        totalPages,
        fetchBooks,
    } = useBooksStore();

    const handlePageChange = useCallback(
        (page) => {
            fetchBooks({ page });
        },
        [fetchBooks],
    );

    return (
        <div className="flex flex-col items-center w-full">
            {/* Full-Width Hero Section matching reference image */}
            <section className="relative w-full flex items-center justify-center min-h-[540px] lg:min-h-[640px] xl:min-h-[700px] py-12 md:py-16 lg:py-20 overflow-hidden border-b border-outline-variant/40">
                {/* Left Bookshelf - Hugs far left edge from top to bottom */}
                <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-48 lg:w-56 xl:w-72 2xl:w-84 pointer-events-none select-none z-0">
                    <Image
                        src="/book_shelf_left.jpg"
                        alt="Left bookshelf"
                        fill
                        sizes="(max-width: 1280px) 224px, (max-width: 1536px) 288px, 336px"
                        className="object-contain object-left mix-blend-multiply"
                        priority
                    />
                </div>

                {/* Center Hero Content */}
                <div className="relative z-10 max-w-2xl px-6 mx-auto text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/60 shadow-2xs">
                        <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        <span className="text-xs font-mono font-semibold tracking-widest text-secondary uppercase">
                            All about literature
                        </span>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-secondary leading-[1.14] mb-6 max-w-xl">
                        Discover Your Next Great Read & Share with the World
                    </h1>
                    
                    <p className="text-base sm:text-lg text-on-surface-variant max-w-lg mx-auto leading-relaxed mb-8">
                        A scholarly yet accessible sanctuary for readers. Explore handpicked recommendations, share your favorite books, and keep abreast of community reviews.
                    </p>

                    {/* Stats & Highlights Banner */}
                    <div className="flex items-center justify-center gap-8 py-3.5 px-8 border-y border-outline-variant/60 mb-8 bg-surface-container-lowest/60 backdrop-blur-xs rounded-xl">
                        <div className="text-center">
                            <span className="font-serif text-2xl font-bold text-secondary">{booksData ? booksData.length : "—"}</span>
                            <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-tertiary mt-0.5">Recommendations</span>
                        </div>
                        <div className="h-7 w-[1px] bg-outline-variant/60" />
                        <div className="text-center">
                            <span className="font-serif text-2xl font-bold text-secondary">100%</span>
                            <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-tertiary mt-0.5">Community Curated</span>
                        </div>
                    </div>

                    {isAuthenticated ? (
                        <BookForm />
                    ) : (
                        <div className="inline-flex flex-col items-center gap-1.5 px-6 py-4 bg-surface-container-lowest border border-outline-variant/70 rounded-xl shadow-xs">
                            <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
                                Please log in to recommend a book to the heaven.
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Bookshelf - Hugs far right edge from top to bottom */}
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-48 lg:w-56 xl:w-72 2xl:w-84 pointer-events-none select-none z-0">
                    <Image
                        src="/book_shelf_right.jpg"
                        alt="Right bookshelf"
                        fill
                        sizes="(max-width: 1280px) 224px, (max-width: 1536px) 288px, 336px"
                        className="object-contain object-right mix-blend-multiply"
                        priority
                    />
                </div>
            </section>

            {/* Catalog Section */}
            <section aria-label="Book Collection" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col">
                <div className="flex items-center justify-between border-b border-outline-variant/60 pb-4 mb-8">
                    <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-secondary">
                        Community Library
                    </h2>
                    <span className="text-xs font-mono text-tertiary uppercase tracking-widest">
                        {booksData ? `${booksData.length} active` : ""}
                    </span>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20" aria-live="polite" role="status">
                        <BookLoading size="lg" />
                    </div>
                ) : booksData && booksData.length > 0 ? (
                    <div className="w-full flex flex-col items-center">
                        <BookGrid bookData={booksData} />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                ) : (
                    <div className="text-center py-20 bg-surface-container-low/50 rounded-2xl border border-dashed border-outline-variant/80">
                        <p className="text-on-surface-variant text-sm font-medium">
                            No books yet. Be the first to recommend one!
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default BookList;
