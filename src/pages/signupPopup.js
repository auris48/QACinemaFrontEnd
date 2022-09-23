import React from 'react';

export const SignPopup = (props) =>{
    return <div className = "signPopup">
        <h1>{props.content}<button onClick = {props.handleClose}>X</button></h1>
    </div>

}