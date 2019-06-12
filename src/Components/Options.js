import Option from "./Option";
import React from "react";

const Options = (props)=>{
    return(
        <div>
            <button onClick={props.handleDeleteOptions}>Remove</button>
            {props.array.length === 0 && <p>Please add an option to get started!</p>}
            {
                props.array.map((option) => <Option key={option} handleDeleteOption = {props.handleDeleteOption} optionText = {option}/>)
            }
        </div>
    );
}

export default Options