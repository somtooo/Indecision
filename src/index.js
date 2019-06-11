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
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.state={
            options:props.options
        }
    }
    componentDidMount(){
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)

            if (options) {
                this.setState(() => ({options}))
            }
            
        } catch (e) {
            console.log(e)
        }

    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options',json)
            console.log("saving data")
        }
    }

    componentWillUnmount(){
        console.log("fjff")
    }

    handleDeleteOption(option) {
        this.setState((prevState) => ({
            options: prevState.options.filter((word) => !(word === option))
    }))
    }


    handleAddOption(option){
        if (!option){
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }
        this.setState((prevState)=>({options:prevState.options.concat([option])}))
    }

    handlePick(){
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        return alert(this.state.options[randomNum])
    }

    handleDeleteOptions(){
        this.setState(()=>({options:[]}))
    }

    render(){
        const subtitle = "Put your life in the hands of a computer"

        return(
            <div>
                <Header  subtitle={subtitle}/>
                <Action hasOptions={this.state.options.length > 0} handlePick = {this.handlePick} />
                <Options array = {this.state.options} handleDeleteOptions = {this.handleDeleteOptions} handleDeleteOption = {this.handleDeleteOption}/>
                <AddOption handleAddOption = {this.handleAddOption}/>
            </div>
        )
    }
}

IndecisionApp.defaultProps = {
    options: []
}
const Header = (props)=>{
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: 'Indecision'
}


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


const Option = (props)=>{
    return(
        <div>
            {
                props.optionText
            }
            <button
                onClick={(e)=>{
                    props.handleDeleteOption(props.optionText)
                }}
            >
                remove
            </button>
        </div>
    );
}


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
        this.setState(()=>({error}))

        if(!error){
            e.target.elements.option.value = '';
        }

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


ReactDOM.render(<IndecisionApp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
