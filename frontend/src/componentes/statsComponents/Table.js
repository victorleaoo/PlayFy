import React from 'react';

const TableItems = (props) => {
    return (
        <table>
            <thead>
            <tr>
                {props.top === 'artist' ? <th>Artist</th> : <th>Album</th>}
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

export default TableItems;