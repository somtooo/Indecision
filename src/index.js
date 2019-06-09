import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

class IndecisionApp extends React.Component{
    render(){
        const title = "Indecision"
        const subtitle = "Put your life in the hands of a computer"
        const options = ["Thing one", "Thing Two"]
        return(
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action />
                <Options array = {options} />
                <AddOption />
            </div>
        )
    }
}


class Header extends React.Component{
    render(){
        console.log(this.props.subtitle)
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}


class Action extends React.Component {
    handleButtonClick(){
        return alert("jj")
    }
    render(){
        return(
            <div>
                <button onClick={this.handleButtonClick}>What should I do?</button>
            </div>
        );
    }
}


class Options extends React.Component{
    handleRemoveAll(){
        return alert("kk")
    }
    render(){
        return(
            <div>
                <button onClick={this.handleRemoveAll}>Remove</button>
                {
                this.props.array.map((option) => <Option key={option} optionText = {option}/>)
                }
            </div>
        );
    }
}


class Option extends React.Component{
    render(){
        return(
            <div>
                {
                    this.props.optionText
                }
            </div>
        );
    }
}


class AddOption extends React.Component{
    render(){
        return(
            <div>
                <h1>Add Op</h1>
            </div>
        );
    }
}


ReactDOM.render(<IndecisionApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
