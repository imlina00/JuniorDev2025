import './Zivotopis.css';

function Percentage(props) {
    const percentageStyle = {
        width: `${props.percentage}%`,
        backgroundColor: 'var(--main)',
    };

    return (
        <div className='percentage-container'>
            <div className='percentage-fill' style={percentageStyle}>
                <p className='percentage-text'>{props.percentage}%</p>
            </div>
        </div>
    );
}

export default Percentage
