import { Button } from "flowbite-react";
import { Post } from "../../types";
import PostCard from "./PostCard";

export interface PostListProps {
    posts: Post[];
    loading: boolean;
    loadMore: () => void;
}

export default function PostList({
    posts,
    loading,
    loadMore,
}: PostListProps) {
    return <>
        {posts.map((post) =>
            <PostCard
                key={post.id}
                post={post}
            />)
        }

        {loading
            ? <div className="text-center">Loading...</div>
            : <Button
                color="transparent"
                size="xs"
                className="text-center"
                onClick={loadMore}
            >
                Load More
            </Button>
        }
    </>
}