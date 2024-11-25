import React from 'react';
import './Zivotopis.css';
import Container from './Container';
import Percentage from './Percentage';

function Zivotopis(props) {
    return (
        <div>
            <h1>{props.name}</h1>
            <img src="/images/profilna.jpg" alt="Slika profila" />
            <Container title="Opći podaci">
                <div className='about'>
                    <p>Datum rođenja: <span>{props.dateOfBirth}</span></p>
                    <p>Adresa: <span>{props.address}</span></p>
                    <p>Grad: <span>{props.city}</span></p>
                    <p>Zanimanje: <span>{props.job}</span></p>
                    <p>Omiljena boja: <span style={{ color: props.color }}>{props.color}</span></p>
                    <p>Kontakt: <span>{props.contact}</span></p>
                </div>
            </Container>
            <Container title="Sposobnosti">
                {props.skills.map(skill => (
                    <div key={skill.id}>
                        <p className='abilities'>{skill.skill}:</p>
                        <Percentage percentage={skill.percentage} />
                    </div>
                ))}
            </Container>
        </div>
    );
}

export default Zivotopis;
