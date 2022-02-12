import { data } from "./data";
import './PageNotFound.css';

const PageNotFound = () => {

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    const index = getRandomIntInclusive(0, data.length - 1);

    return (
        <div className="page-not-found-container">
            <h2 className="page-not-found-title">404: Ride not found</h2>
            <img className="page-not-found-img" alt="ride not found" src={data[index]}></img>
        </div>
    );
}

export default PageNotFound;
