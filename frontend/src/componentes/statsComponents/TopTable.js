import React from 'react';

import '../../styles/Table.css'

const TopTable = (props) => {
    return (
        <table className='top-table'>
            <thead>
            <tr>
                <th>{props.top}</th>
                <th>Appearances</th>
                <th>%</th>
            </tr>
            </thead>
            <tbody>
            {props.topTable.map((item, index) => (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.appearances}</td>
                    <td>{item.percentage}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default TopTable;