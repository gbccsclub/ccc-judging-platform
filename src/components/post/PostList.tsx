import { Button } from "flowbite-react";
import { NavigatedPost } from "../../types";
import PostCard from "./PostCard";

export interface PostListProps {
    posts: NavigatedPost[];
    loading: boolean;
    loadMore: () => void;
    updateMyRating: (postId: number, aesthetic: number, originality: number) => void;
}

export default function PostList({
    posts,
    loading,
    loadMore,
    updateMyRating,
}: PostListProps) {
    return <>
        {posts.map((post) =>
            <PostCard
                key={post.id}
                post={post}
                updateMyRating={updateMyRating}/>
        )}

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