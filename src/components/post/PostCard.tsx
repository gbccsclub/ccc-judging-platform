import { Post } from "../../types";

export interface PostCardProps {
    post: Post;
}

export default function PostCard({
    post,
}: PostCardProps) {
    return <>
        <div className="flex flex-col space-y-2 w-[25rem]">
            <h2 className="text-3xl font-serif font-medium text-blue-700">
                {post.title}
            </h2>
            <p className="text-sm text-gray-500">
                {post.description}
            </p>
            <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
            >
                {post.link}
            </a>
        </div>
    </>
}
