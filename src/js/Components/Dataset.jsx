import React from 'react';
import DatasetItem from './DatasetItem';

function Dataset(props) {
    const datasets = props.dataset.items.map((item) => {
        return <DatasetItem value={item.value} label={item.label} isSmall={item.isSmall} />;
    });

    return (
        <div className="section">
            <h2>{props.dataset.title}</h2>
            <div className="dataset">{datasets}</div>
        </div>
    );
}

export default Dataset;
