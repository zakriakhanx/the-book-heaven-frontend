"use client";

import { use, useMemo } from "react";
import BookGrid from "@/app/components/BookGrid";
import { useBooksStore } from "@/app/store/useBooksStore";

export const RelatedBooks = ({ params }) => {
    const { booksData } = useBooksStore();
    const param = use(params);
    const id = param.id;

    // Find current book
    const currentBook = useMemo(
        () => booksData?.find((book) => book._id === id),
        [booksData, id],
    );

    // Filter related books
    const relatedBooks = useMemo(() => {
        if (!currentBook) return [];
        return booksData?.filter((book) => book.genre === currentBook.genre);
    }, [currentBook, booksData]);

    // Don't render if there are no related books
    if (!relatedBooks || !relatedBooks.length) return null;
    return (
        <section
            className="w-full h-auto py-2 flex flex-col justify-center"
            aria-labelledby="related-books-heading">
            <div className="flex items-center justify-between mb-6">
                <h2
                    id="related-books-heading"
                    className="font-serif text-2xl font-bold tracking-tight text-secondary">
                    Related Recommendations
                </h2>
                <span className="text-xs font-mono text-tertiary uppercase tracking-widest">
                    {relatedBooks.length} {relatedBooks.length === 1 ? "title" : "titles"}
                </span>
            </div>
            <div className="relative">
                <BookGrid bookData={relatedBooks} />
            </div>
        </section>
    );
};
