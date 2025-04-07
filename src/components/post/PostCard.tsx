import { PostWithUser } from "../../types";
import { useEffect, useRef, useState } from "react";
import PostDetail from "./PostDetail";

export interface PostCardProps {
    post: PostWithUser;
}

export default function PostCard({ post }: PostCardProps) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

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

        <PostDetail post={post} />
    </div>);
}



