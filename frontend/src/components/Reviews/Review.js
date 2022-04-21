import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { editReview, deleteReview } from '../../store/reviews';
import StarRatings from 'react-star-ratings';

function Review({ review }) {
    const [isEditing, setIsEditing] = useState(false);
    const [rating, setRating] = useState(review.rating);
    const [content, setContent] = useState(review.review);
    const userId = useSelector(state => state.session.user.id);
    const dispatch = useDispatch();

    const handleEdit = async (e) => {
        e.preventDefault();
        const payload = {
            id: review.id,
            userId: review.userId,
            rideId: review.rideId,
            review: content,
            rating
        }
        await dispatch(editReview(payload, review.id))
        setIsEditing(false);
        setRating(`${review.rating}`);
        setContent(review.review)
    }

    const handleDelete = async () => {
        await dispatch(deleteReview(review.id));
    }

    const hideForm = () => {
        setRating(`${review.rating}`);
        setContent(review.review)
        setIsEditing(!isEditing);
    }

    return (
        <div className="review-container">
            <div>{review.User.username}</div>
            {!isEditing &&
                <>
                    <StarRatings
                        rating={review.rating}
                        starRatedColor="yellow"
                        starHoverColor="yellow"
                        // changeRating={(newRating) => setRating(newRating)}
                        numberOfStars={5}
                        name='rating'
                        starEmptyColor='gray'
                        starDimension='2rem'
                        starSpacing='0.2rem'
                    />
                    <div>{review.review}</div>
                </>
            }
            {userId === review.User.id &&
                <span>
                    <button
                        className="button"
                        onClick={hideForm}>Edit</button>
                    <button
                        className="button"
                        onClick={handleDelete}>Delete</button>
                </span>
            }
            {isEditing &&
                <form onSubmit={(e) => handleEdit(e)}>
                    <StarRatings
                        rating={Number(rating)}
                        starRatedColor="yellow"
                        starHoverColor="yellow"
                        changeRating={(newRating) => setRating(newRating)}
                        numberOfStars={5}
                        name='edit-rating'
                        starEmptyColor='gray'
                        starDimension='2rem'
                        starSpacing='0.2rem'
                    />
                    <textarea
                        type='textarea'
                        value={content}
                        onChange={(e) => setContent(e.target.value)} />
                    <button
                        type="submit"
                        className="button">Submit</button>
                </form>
            }
        </div>
    );
}

export default Review;
