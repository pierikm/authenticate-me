import { useState } from "react";
import { useDispatch } from 'react-redux';

// import { addImage } from '../../store/images';
import { addImage } from "../../store/rides";

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

const AddImgForm = ({ rideId, hideForm }) => {
    const dispatch = useDispatch();

    const [url, setUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidHttpUrl(url)) {
            const imgPayload = {
                rideId,
                url
            };
            dispatch(addImage(imgPayload));
            // dispatch(getSingleRide(rideId));
            setUrl('');
            hideForm();
        }
    }

    return (
        <form className="add-pic-form" onSubmit={handleSubmit}>
            <div className="add-img-input">
                <input
                    type='text'
                    placeholder="Image URL"
                    value={url ? url : ''}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            <button className="pic-submit-btn ride-btn" type="submit">Submit Pic</button>
        </form>
    )
}

export default AddImgForm;
