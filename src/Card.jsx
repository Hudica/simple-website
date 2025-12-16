
import './Card.css';

function Card(props) {
    const { name, objective, skills, takeaway, type = 'project' } = props;

    return (
        <div className={`card card--${type}`}>
            <h3>
            {name}
            </h3>
            <p><b>Objective:</b> {objective}</p>
            <p><b>Skills:</b> {skills}</p>
            <p><b>Takeaway:</b> {takeaway}</p>
        </div>
    );
}

export default Card;