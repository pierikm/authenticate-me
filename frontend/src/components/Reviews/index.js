import Review from './Review.js';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function Reviews() {
    const [isLoaded, setIsLoaded] = useState(false);
    const reviews = useSelector(state => Object.values(state.reviews));

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    if (!isLoaded) return null;

    return (
        <>
            {reviews.map(review => (
                <Review key={review.id} review={review} />
            ))}
        </>
    );
}

export default Reviews;
