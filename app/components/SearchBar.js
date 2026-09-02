"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SEARCH_CONFIG = {
    MAX_RESULTS: 5,
    MIN_LENGTH: 2,
    DEBOUNCE_MS: 300,
};

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const [matchingBooks, setMatchingBooks] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const abortControllerRef = useRef(null);
    const debounceTimerRef = useRef(null);

    useEffect(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        if (inputValue.length < SEARCH_CONFIG.MIN_LENGTH) {
            setMatchingBooks([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        debounceTimerRef.current = setTimeout(async () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;

            try {
                const response = await axios.get(
                    `${API_URL}/api/books/search?q=${encodeURIComponent(inputValue)}`,
                    { signal: controller.signal },
                );
                setMatchingBooks(response.data.data.slice(0, SEARCH_CONFIG.MAX_RESULTS));
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.error("Search error:", err);
                    setMatchingBooks([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsSearching(false);
                }
            }
        }, SEARCH_CONFIG.DEBOUNCE_MS);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [inputValue]);

    // Handle clicks outside of search component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setIsOpen(false); // Close dropdown when clicking outside
            }
        };

        // Add and remove event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setInputValue(e.target.value);
        setIsOpen(true); // Show dropdown when typing
        setSelectedIndex(-1); // Reset selection
    };

    // Clear search input and reset states
    const handleClear = () => {
        setInputValue("");
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.focus(); // Return focus to input
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        // Skip keyboard navigation if no results
        if (!matchingBooks.length) return;

        const keyboardActions = {
            ArrowDown: () => {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < matchingBooks.length - 1 ? prev + 1 : prev,
                );
            },
            ArrowUp: () => {
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
            },
            Enter: () => {
                if (selectedIndex >= 0) {
                    const selectedBook = matchingBooks[selectedIndex];
                    window.location.href = `/bookDetailsPage/${selectedBook._id}`;
                }
            },
            Escape: () => {
                setIsOpen(false);
                setSelectedIndex(-1);
            },
        };

        // Execute keyboard action if defined
        const action = keyboardActions[e.key];
        if (action) action();
    };

    return (
        <div className="flex items-center justify-center relative w-full">
            {/* Search container */}
            <div
                ref={searchRef}
                className="relative flex flex-col items-center w-full">
                {/* Search input container */}
                <div className="relative flex items-center w-full">
                    {/* Search icon */}
                    <MagnifyingGlassIcon className="absolute left-3.5 h-4 w-4 text-tertiary/70 pointer-events-none" />

                    {/* Search input */}
                    <input
                        ref={inputRef}
                        className="bg-surface-container-lowest border border-outline-variant/80 text-on-surface text-xs sm:text-sm h-9 sm:h-10 rounded-lg 
                                 pl-10 pr-10 w-full placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-4 
                                 focus:ring-primary/15 focus:border-primary shadow-xs transition-all duration-200"
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Search books, authors, genres..."
                        aria-label="Search books"
                        aria-controls="search-results"
                        aria-activedescendant={
                            selectedIndex >= 0
                                ? `result-${selectedIndex}`
                                : undefined
                        }
                    />

                    {/* Clear button - only show when there's input */}
                    {inputValue && (
                        <button
                            onClick={handleClear}
                            className="absolute right-3.5 text-on-surface-variant/60 hover:text-on-surface transition-colors"
                            aria-label="Clear search">
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Search results dropdown */}
                {isOpen && (
                    <div
                        id="search-results"
                        role="listbox"
                        className="absolute top-full mt-2 w-full bg-surface-container-lowest border 
                                 border-outline-variant/80 shadow-xl rounded-xl z-50 max-h-[60vh] overflow-y-auto py-1.5 divide-y divide-surface-container">
                        {isSearching ? (
                            <div className="p-4 text-on-surface-variant text-xs sm:text-sm text-center animate-pulse">
                                Searching library...
                            </div>
                        ) : matchingBooks.length > 0 ? (
                            matchingBooks.map((book, index) => (
                                <Link
                                    key={book._id}
                                    href={`/bookDetailsPage/${book._id}`}
                                    onClick={() => setIsOpen(false)}
                                    className="block">
                                    <div
                                        role="option"
                                        id={`result-${index}`}
                                        aria-selected={selectedIndex === index}
                                        className={`flex flex-col gap-0.5 p-3.5 cursor-pointer transition-all duration-150
                                                  ${selectedIndex === index ? "bg-surface-container-high text-on-surface" : "bg-transparent text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"}`}>
                                        <span className="font-serif font-semibold text-xs sm:text-sm text-on-surface">
                                            {book.title}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-on-surface-variant/80">
                                            <span className="font-medium text-primary">{book.author}</span>
                                            <span>&middot;</span>
                                            <span className="italic text-tertiary">{book.genre}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="p-4 text-on-surface-variant text-xs sm:text-sm text-center">
                                {inputValue.length >= SEARCH_CONFIG.MIN_LENGTH
                                    ? "No matches found in heaven"
                                    : `Type at least ${SEARCH_CONFIG.MIN_LENGTH} characters`}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
