function Review({ review }) {
    
    return (
        <>
            <div>{review.rating}</div>
            <div>{review.review}</div>
        </>
    );
}

export default Review;
