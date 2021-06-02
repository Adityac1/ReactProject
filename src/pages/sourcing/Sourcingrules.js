import React, { Component } from 'react'
import { API } from '../../utils';
import './sourcing.css';
import { Card, Button, Row, Col, Table, Modal } from 'react-bootstrap';
import { Spinner } from '../../components/Spinner';
import { GridColumn } from 'semantic-ui-react';

export class Sourcingrules extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            show: false,
            searchOrg: "",
            sourcingRules: [],
            details : [],
            selectedData:[]
        }
    }
    componentDidMount(){
        this.searchSourcingRule();
    }
    searchSourcingRule() {
        fetch("http://localhost:8084/sourcing/v1/getSourcingSequence?sourcingRuleId=STH_KA_BANGALORE&orgCode=PERF_DEFAULT",
            {
                method: 'GET',
                headers: {
                    mode: 'no-cors',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Host:'example.com',
                    Origin:'http://localhost:3000/',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods':'GET, POST',                    
                },
            })
            .then(res => res.json())
            .then(result => {
                    console.log("get call is successful" +result);
                    this.setState({sourcingRules: [result]})
                    this.setState({details: [result]})

            })
            .catch(error => console.log(error))
    }
    onChangeHandlerForSearchParam= e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    openRuleDetailsFun(item) {
        this.props.openRuleDetailsFun(item);
    }
    addSourcingRule() { }
    deleteSourcingRule() { }
    onSort(event, sortKey){
        const data = this.state.sourcingRules;
        data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({sourcingRules:data})
      }
    render() {
        return (
            <div className='sourcing'>
                {this.state.loading && <Spinner />}
                <Card className='text'>
                    <Card.Header className="disp-Inline-Flex">Sourcing Rules
                        <input onChange={this.onChangeHandlerForSearchParam} name="searchOrg" value={this.state.searchOrg} className="searchField offset-7" type="text" placeholder="Org Code" />
                        <Button className='searchField ml-xl-2' size="sm" variant="primary" onClick={() => this.searchSourcingRule()}>Search</Button>
                    </Card.Header>
                    <Card.Body >
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th onClick={e => this.onSort(e, 'ruleid')}>Sourcing Rule ID</th>
                                    <th onClick={e => this.onSort(e, 'ruledesc')}>Rule Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {this.state.data = this.state.sourcingRules} */}
                                {this.state.sourcingRules.map((item, index) => {
                                    
                                    return (
                                        <tr  key={index} onClickCapture={() => this.openRuleDetailsFun(item)} >
                                            <td>{item.sourcing_rule_id}</td>
                                            <td>{item.sourcing_rule_description}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <Row>
                            <Button className='margin2p custom-btn-medium' size="sm" onClick={() => this.addSourcingRule()}>Add</Button>
                            <Button className='margin2p custom-btn-medium' size="sm" onClick={() => this.deleteSourcingRule()}>Delete</Button>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}