import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

const Rating = ({ value, text }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", color: "gold" }}>
                {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ display: "flex", alignItems: "center", color: "gold" }}>
                {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ display: "flex", alignItems: "center", color: "gold" }}>
                {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span >
            <span style={{ display: "flex", alignItems: "center", color: "gold" }}>
                {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ display: "flex", alignItems: "center", color: "gold" }}>
                {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>{text && text}</span>
        </div>
    )
}

export default Rating
