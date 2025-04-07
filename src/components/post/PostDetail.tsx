import { Post } from "../../types";
import RatingCard from "./RatingCard";

export interface PostDetailProps {
    post: Post;
}

export default function PostDetail({
    post,
}: PostDetailProps) {
    return <>
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

            <RatingCard />
        </div>
    </>;
}