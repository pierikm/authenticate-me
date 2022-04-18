import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { editReview, deleteReview } from '../../store/reviews';

function Review({ review }) {
    const [isEditing, setIsEditing] = useState(false);
    const [rating, setRating] = useState(`${review.rating}`);
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
        <>
            <div>{review.User.username}</div>
            {!isEditing &&
                <>
                    <div>{review.rating}</div>
                    <div>{review.review}</div>
                </>
            }
            {userId === review.User.id &&
                <span>
                    <button onClick={hideForm}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </span>
            }
            {isEditing &&
                <form onSubmit={(e) => handleEdit(e)}>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <textarea
                        type='textarea'
                        value={content}
                        onChange={(e) => setContent(e.target.value)} />
                    <button type="submit">Submit</button>
                </form>
            }
        </>
    );
}

export default Review;
