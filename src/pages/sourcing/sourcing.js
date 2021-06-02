import React, { Component } from 'react'
import { API } from '../../utils';
import './sourcing.css';
import { Sourcinruledetails } from "./Sourcinruledetails";
import { Sourcingrules } from "./Sourcingrules";
import { SourcingRuleSeqDetails } from "./SourcingRuleSeqDetails";


export class sourcing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ruleDetailsScreen:false,
            ruleListScreen:true,
            show: false,
            screen:"Sourcingrules",
            displayDetails:[],
            displayData:[]
        }
        this.openRuleDetails = this.openRuleDetails.bind(this);
        this.openRulesScreen = this.openRulesScreen.bind(this);
        this.addSeq = this.addSeq.bind(this);
    }
    openRuleDetails(rule){
       this.setState({
           screen:"Sourcinruledetails",
           displayDetails:rule,
           details:rule
       })
    }
    openRulesScreen(parms){
        this.setState({
            screen:"Sourcingrules"
        })
     }
     addSeq(ruleid){
        this.setState({
            screen:"SourcingRuleSeqDetails"
        }) 
     }
    render() {
        return (
        <>
        {this.state.screen=="Sourcinruledetails" && <Sourcinruledetails openRulesFun={this.openRulesScreen} addSeqFun={this.addSeq} displayData={this.state.displayDetails} openRuleDetailsFun={this.openRuleDetails}/>}
        {this.state.screen=="Sourcingrules" && <Sourcingrules openRuleDetailsFun={this.openRuleDetails} displayData={this.displayData}/>}
        {this.state.screen=="SourcingRuleSeqDetails" && <SourcingRuleSeqDetails openRuleDetailsFun={this.openRuleDetails} addSeqFun={this.addSeq} displayData={this.state.displayDetails}/>}
        </>
        )
    }


}