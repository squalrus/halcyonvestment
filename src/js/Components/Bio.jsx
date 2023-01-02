import React from 'react';

function Bio(props) {
    return (
        <div className="section">
            <div className="bio">
                <img className="bio__image" src={`./img/${props.bio.memberId}.jpeg`} alt="" />
                <span className="bio__number">#{props.bio.memberId}</span>
                <span className="bio__name">{props.bio.name}</span>
            </div>
        </div>
    );
}

export default Bio;
