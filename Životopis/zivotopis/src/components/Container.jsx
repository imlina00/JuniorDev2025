import './Zivotopis.css';

function Container(props) {
    return (
        <div className='container'>
            <h2>{props.title}</h2>
            <hr color='#b8e9bd'></hr>
            {props.children}
        </div>
    );
}

export default Container
