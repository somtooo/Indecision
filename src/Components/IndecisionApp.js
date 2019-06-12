import React from "react";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import AddOption from "./AddOption";

export default class IndecisionApp extends React.Component{
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