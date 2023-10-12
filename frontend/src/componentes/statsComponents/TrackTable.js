import React from 'react'
import '../../styles/Table.css'

const TrackTable = (props) => {
    const type = props.type;

    return (
        <table className='track-table'>
            <tbody>
                <tr>
                    <td>Track Name</td>
                    <td>{props.data[type]['Track Name']}</td>
                </tr>
                <tr>
                    <td>Track Artists</td>
                    <td>{props.data[type]['Track Artists']}</td>
                </tr>
                <tr>
                    <td>Album Name</td>
                    <td>{props.data[type]['Album Name']}</td>
                </tr>
                <tr>
                    <td>Track Popularity</td>
                    <td>{props.data[type]['Track Popularity']}</td>
                </tr>
                <tr>
                    <td>Track Duration</td>
                    <td>{props.data[type]['Track Duration']}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default TrackTable