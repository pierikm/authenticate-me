import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview } from '../../store/reviews';


function ReviewForm() {
    const [rating, setRating] = useState('1');
    const [review, setReview] = useState('');
    const userId = useSelector(state => state.session.user.id);
    const { rideId } = useParams()
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            userId,
            rideId: Number(rideId),
            review,
            rating: Number(rating)
        }
        console.log(payload);
        await dispatch(createReview(payload));
    };

    return (
        <>
            <div>Review Form!</div>
            <form onSubmit={(e) => handleSubmit(e)}>
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
                    value={review}
                    onChange={(e) => setReview(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default ReviewForm;
