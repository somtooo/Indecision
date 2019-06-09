import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

class IndecisionApp extends React.Component{
    constructor(props){
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state={options:[]}
    }

    handleAddOption(option){
        if (!option){
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }
        this.setState((prevState)=>{
            return{
                options: prevState.options.concat([option])
            }

        })
    }

    handlePick(){
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        return alert(this.state.options[randomNum])
    }

    handleDeleteOptions(){
        this.setState(()=>{
            return {
                options: []
            };
        });
    }

    render(){
        const title = "Indecision"
        const subtitle = "Put your life in the hands of a computer"

        return(
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action hasOptions={this.state.options.length > 0} handlePick = {this.handlePick} />
                <Options array = {this.state.options} handleDeleteOptions = {this.handleDeleteOptions}/>
                <AddOption handleAddOption = {this.handleAddOption}/>
            </div>
        )
    }
}
const Header = (props)=>{
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}

// class Header extends React.Component{
//     render(){
//
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <h2>{this.props.subtitle}</h2>
//             </div>
//         );
//     }
// }

const Action = (props)=>{
    return(
        <div>
            <button onClick={props.handlePick}
                    disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    );
}


// class Action extends React.Component {
//
//     render(){
//         return(
//             <div>
//                 <button onClick={this.props.handlePick}
//                         disabled={!this.props.hasOptions}
//                 >
//                     What should I do?
//                 </button>
//             </div>
//         );
//     }
// }

const Options = (props)=>{
    return(
        <div>
            <button onClick={props.handleDeleteOptions}>Remove</button>
            {
                props.array.map((option) => <Option key={option} optionText = {option}/>)
            }
        </div>
    );
}

// class Options extends React.Component{
//
//     render(){
//         return(
//             <div>
//                 <button onClick={this.props.handleDeleteOptions}>Remove</button>
//                 {
//                 this.props.array.map((option) => <Option key={option} optionText = {option}/>)
//                 }
//             </div>
//         );
//     }
// }

const Option = (props)=>{
    return(
        <div>
            {
                props.optionText
            }
        </div>
    );
}

// class Option extends React.Component{
//     render(){
//         return(
//             <div>
//                 {
//                     this.props.optionText
//                 }
//             </div>
//         );
//     }
// }


class AddOption extends React.Component{
    constructor(props){
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option)

        this.setState(()=>{
            return{error}
        })
    }


    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input  type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

// const User = (props)=>{
//     return(
//         <div>
//             <p>Name: {props.name} </p>
//             <p>Age:{props.age} </p>
//         </div>
//     )
// };
ReactDOM.render(<IndecisionApp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
