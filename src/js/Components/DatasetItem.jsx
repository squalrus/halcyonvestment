import React from 'react';

function DatasetItem(props) {
    let smallClass = props.isSmall ? 'dataset__value--small' : '';

    return (
        <div className="dataset__item">
            <span className={`dataset__value ${smallClass}`}>{props.value}</span>
            <span className="dataset__label">{props.label}</span>
        </div>
    );
}

export default DatasetItem;
