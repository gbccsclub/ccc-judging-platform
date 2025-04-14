import { useState, useEffect } from 'react';
import { NavigatedPost } from "../types";
import { useSession } from "../context/SessionContext";

interface RatingState {
  aesthetic: number;
  originality: number;
  avgAesthetic: number;
  avgOriginality: number;
}

export function usePostRating(post: NavigatedPost): RatingState & {
  setAesthetic: (value: number) => void;
  setOriginality: (value: number) => void;
} {
  const { session } = useSession();
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
      setAvgAesthetic(0);
      setAvgOriginality(0);
      return;
    }
    
    // If Rating is an array
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

  return {
    aesthetic,
    originality,
    avgAesthetic,
    avgOriginality,
    setAesthetic,
    setOriginality
  };
}