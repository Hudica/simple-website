
import './Card.css';

function Card(props) {
    return (
        <div className="card">
            <h3><label>Project:</label> {props.name}</h3>
            <p><b>Objective:</b> {props.objective}</p>
            <p><b>Skills:</b> {props.skills}</p>
            <p><b>Takeaway:</b> {props.takeaway}</p>
        </div>

    )
}

export default Card;