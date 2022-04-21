import Review from './Review.js';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './Reviews.css';

function Reviews({ reviews }) {
    const [isLoaded, setIsLoaded] = useState(false);
    

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    if (!isLoaded) return null;

    return (
        <div className='reviews-container'>
            {reviews.map(review => (
                <Review key={review.id} review={review} />
            ))}
        </div>
    );
}

export default Reviews;
