import Option from "./Option";
import React from "react";

const Options = (props)=>{
    return(
        <div>
            <div className={"widget-header"}>
                <h3 className={"widget-header__title"}>Your Options</h3>
                <button className={"button button--link"} onClick={props.handleDeleteOptions}>Remove All</button>
            </div>

            {props.array.length === 0 && <p className={"widget-header__subtitle"}>Please add an option to get started!</p>}
            {
                props.array.map((option,index) => <Option key={option} handleDeleteOption = {props.handleDeleteOption} optionText = {option} count={index +1}/>)
            }
        </div>
    );
}

export default Options