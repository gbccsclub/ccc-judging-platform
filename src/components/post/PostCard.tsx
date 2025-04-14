import { NavigatedPost } from "../../types";
import { useRef, useState } from "react";
import RatingCard from "./RatingCard";
import { usePostRating } from "../../hooks/usePostRating";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export interface PostCardProps {
    post: NavigatedPost;
    updateMyRating: (postId: number, aesthetic: number, originality: number) => void;
}

export default function PostCard({
    post,
    updateMyRating,
}: PostCardProps) {
    const { ref: cardRef, isVisible } = useIntersectionObserver();
    
    const {
        aesthetic,
        originality,
        avgAesthetic,
        avgOriginality,
        setAesthetic,
        setOriginality
    } = usePostRating(post);

    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (<div className='flex flex-col pb-5 md:pb-0 border-b md:border-none border-gray-200 md:flex-row items-center md:items-start justify-center mb-10 md:mb-0 md:w-[70vw]'>
        <div
            ref={cardRef as React.RefObject<HTMLDivElement>}
            className="relative rounded-lg overflow-hidden border border-gray-200 md:my-5"
        >
            <div className="relative w-90 md:w-100 h-110 bg-gray-100 overflow-hidden">
                {isVisible &&
                    <iframe
                        src={post.link}
                        width="100%"
                        height="100%"
                        className="absolute inset-0"
                    />
                }
                {/* User info overlaid on preview */}
                <div className="absolute bottom-6 left-2 items-center bg-white border border-gray-200 bg-opacity-60 rounded-full px-3 py-1 text-black">
                    <span className="text-sm font-medium">{post.User.username}</span>
                    <span className="mx-2 text-xs opacity-70">•</span>
                    <span className="text-xs opacity-70">{formattedDate}</span>
                </div>
            </div>
        </div>

        <div className="px-5 md:p-5 flex-1">
            <div className="mt-4 flex items-start justify-between mb-2">
                <a
                    className="text-xl font-bold font-serif text-gray-800 hover:text-blue-600 transition group flex items-center gap-2"
                    target="_blank"
                    href={post.link}
                >
                    {post.title}
                    <i className="fa-solid fa-external-link text-xs text-gray-400 group-hover:text-blue-600 transition-colors" />
                </a>
            </div>

            <div className="mt-2">
                {post.description ? (
                    <p className="text-gray-600 leading-relaxed">
                        {post.description}
                    </p>
                ) : (
                    <p className="text-gray-500 italic">
                        No description provided
                    </p>
                )}
            </div>

            <RatingCard
                totalAesthetic={avgAesthetic}
                totalOriginality={avgOriginality}
                aesthetic={aesthetic}
                originality={originality}
                setAesthetic={setAesthetic}
                setOriginality={setOriginality}
                onSubmit={() => updateMyRating(post.id, aesthetic, originality)}
            />
        </div>
    </div>);
}



