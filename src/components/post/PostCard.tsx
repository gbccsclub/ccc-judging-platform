import { Post } from "../../types";
import { useEffect, useRef, useState } from "react";

export interface PostCardProps {
    post: Post;
}

export default function PostCard({
    post,
}: PostCardProps) {
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

    return <>
        <div ref={cardRef} className="flex flex-col space-y-2 w-[25rem]">
            <h2 className="text-3xl font-serif font-medium text-blue-700">
                {post.title}
            </h2>
            <p className="text-sm text-gray-500">
                {post.description}
            </p>
            {isVisible ? (
                <iframe src={post.link} 
                width={"100%"} height={500}
                />
            ) : (
                <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-400">Content will load when visible</p>
                </div>
            )}
        </div>
    </>
}
