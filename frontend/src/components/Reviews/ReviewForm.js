import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview } from '../../store/reviews';
import { reviewValidator } from './utils';
import StarRatings from 'react-star-ratings';


function ReviewForm({ hideForm }) {
    const [rating, setRating] = useState(1);
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const userId = useSelector(state => state.session.user.id);
    const { rideId } = useParams()
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            userId,
            rideId: Number(rideId),
            review: content,
            rating: rating
        }
        if(!errors.length){
            const newReview = await dispatch(createReview(payload));
            if (newReview) hideForm();
        }
    };

    useEffect(() => {
        reviewValidator(content, setErrors);
    }, [content])

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <ul className='review-errors'>
                    {errors.map(error => (
                        <li key={error} className="error">{error}</li>
                    ))}
                </ul>
                {/* <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select> */}
                <StarRatings
                    rating={rating}
                    starRatedColor="yellow"
                    starHoverColor="yellow"
                    changeRating={(newRating) => setRating(newRating)}
                    numberOfStars={5}
                    name='rating'
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
                    className='button review-form-btn'>Submit</button>
            </form>
        </>
    );
}

export default ReviewForm;
