import React from 'react'
import '../../styles/Table.css'

const TrackTable = (props) => {
    const type = props.type;

    const track_url = props.data[type]['Track URL'];
    const album_url = props.data[type]['Album URL'];

    return (
        <table className='track-table'>
            <tbody>
                <tr>
                    <td>Track Name</td>
                    <td><a href={track_url} target="_blank" rel="noreferrer">{props.data[type]['Track Name']}</a></td>
                </tr>
                <tr>
                    <td>Album Name</td>
                    <td><a href={album_url} target="_blank" rel="noreferrer">{props.data[type]['Album Name']}</a></td>
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