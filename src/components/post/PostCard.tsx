import { NavigatedPost } from "../../types";
import { useEffect, useRef, useState } from "react";
import RatingCard from "./RatingCard";
import { useSession } from "../../context/SessionContext";

export interface PostCardProps {
    post: NavigatedPost;
    updateMyRating: (postId: number, aesthetic: number, originality: number) => void;
}

export default function PostCard({
    post,
    updateMyRating,
}: PostCardProps) {
    const { session } = useSession();
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const [aesthetic, setAesthetic] = useState(0);
    const [originality, setOriginality] = useState(0);

    const [avgAesthetic, setAvgAesthetic] = useState(0);
    const [avgOriginality, setAvgOriginality] = useState(0);

    useEffect(() => {
        if (!post.Rating) {
            setAesthetic(0);
            setOriginality(0);
            return;
        }
        
        // If Rating is a single object (not an array)
        if (!Array.isArray(post.Rating)) {
            setAesthetic((post.Rating as {aesthetic: number})?.aesthetic || 0);
            setOriginality((post.Rating as {originality: number})?.originality || 0);
            // No average to calculate with just one rating
            setAvgAesthetic(0);
            setAvgOriginality(0);
            return;
        }
        
        // If Rating is still an array (during transition)
        if (post.Rating.length > 0) {
            // Calculate averages
            const totalAesthetic = post.Rating.reduce((acc, curr) => acc + curr.aesthetic, 0);
            const totalOriginality = post.Rating.reduce((acc, curr) => acc + curr.originality, 0);
            setAvgAesthetic(Number((totalAesthetic / post.Rating.length).toFixed(1)));
            setAvgOriginality(Number((totalOriginality / post.Rating.length).toFixed(1)));
            
            // Set user's own rating if it exists
            const rating = post.Rating.find(r => r.rate_user_id === session?.user.id);
            if (rating) {
                setAesthetic(rating.aesthetic);
                setOriginality(rating.originality);
            }
        } else {
            setAvgAesthetic(0);
            setAvgOriginality(0);
        }
    }, [post.Rating, session]);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (<div className='flex flex-row items-start justify-center w-[70vw]'>
        <div
            ref={cardRef}
            className="relative rounded-lg overflow-hidden border border-gray-200 my-5"
        >
            <div className="relative w-100 h-110 bg-gray-100 overflow-hidden">
                {isVisible &&
                    <iframe
                        src={`https://editor.p5js.org/sokmontrey/full/${post.link}`}
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

        <div className="p-5 flex-1">
            <div className="mt-4 flex items-start justify-between mb-2">
                <a
                    className="text-2xl font-bold font-serif text-gray-800 hover:text-blue-600 transition group flex items-center gap-2"
                    target="_blank"
                    href={`https://editor.p5js.org/sokmontrey/sketches/${post.link}`}
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



