function Review({ review }) {

    return (
        <>
            <div>{review.User.username}</div>
            <div>{review.rating}</div>
            <div>{review.review}</div>
        </>
    );
}

export default Review;
