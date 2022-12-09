import React from 'react';

const TodoDownload = ({title, download}) => {

    return (
        <button type='button' onClick={download} className="download_button">
            {title}
        </button>
    );
};

export default TodoDownload;