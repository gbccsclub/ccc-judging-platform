import { Button } from "flowbite-react";
import { Post, PostWithUser } from "../../types";
import PostCard from "./PostCard";

export interface PostListProps {
    posts: PostWithUser[];
    loading: boolean;
    loadMore: () => void;
}

export default function PostList({
    posts,
    loading,
    loadMore,
}: PostListProps) {
    return <>
        {posts.map((post) => <PostCard key={post.id} post={post} />)}

        {loading
            ? <div className="text-center">Loading...</div>
            : <Button
                color="transparent"
                size="xs"
                className="text-center mb-20 mt-10"
                onClick={loadMore}
            >
                Load More
            </Button>
        }
    </>
}