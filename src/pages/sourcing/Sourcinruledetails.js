import React, { Component } from 'react'
import { API } from '../../utils';
import './sourcing.css';
import { Card, Button, Row, Col, Table, Modal, Container } from 'react-bootstrap';
import { Spinner } from '../../components/Spinner';

export class Sourcinruledetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            show: false,
            searchOrg: "",
            sequences: [],
            details: [],
            optCriteria: []
        }
    }

    componentDidMount() {
        this.setState({
            details: this.props.displayData
        }, () => this.setdata())
    }
    setdata() {
        let seqs = this.state.details.sequences;
        let optCri = this.state.details.optimization_criteria;
        this.setState({
            sequences: seqs,
            optCriteria: optCri
        })
    }
    addSequence() { }
    save() { }
    onChangeHandler(e) { }
    deleteSequence() { }

    compareBy(key) {
        return function (a, b) {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        };
      }

    onSort(event, key){
        let arrayCopy = [...this.state.sequences];
        arrayCopy.sort(this.compareBy(key));
        this.setState({sequences: arrayCopy});
      }
    render() {
        return (
            <div className='sourcing'>
                {this.state.loading && <Spinner />}
                <Card className='text'>
                    <Card.Header >Sourcing Rules Details</Card.Header>
                    <Table>
                        <tr>
                            <th style={{ width: 200 }}>
                                <label className="margin2p disp-Inline-Flex">Organization Code: </label>
                            </th>
                            <th style={{ width: 400 }}>
                                <input className="margin2p" type="text" name="org_code" value={this.state.details.org_code} onChange={this.onChangeHandler} />
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <label className="margin2p disp-Inline-Flex">Sourcing Rule ID: </label>
                            </th>
                            <th>
                                <input className="margin2p" width="auto" type="text" name="sourcing_rule_id" value={this.state.details.sourcing_rule_id} onChange={this.onChangeHandler} />
                            </th>
                            <th />
                        </tr>
                        <tr>
                            <th>
                                <label className="margin2p disp-Inline-Flex">Description: </label>
                            </th>
                            <th>
                                <input className="margin2p" type="text" name="sourcing_rule_description" value={this.state.details.sourcing_rule_description} onChange={this.onChangeHandler} />
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <label className="margin2p disp-Inline-Flex">Maximum Solution: </label>
                            </th>
                            <th>
                                <input className="margin2p" type="text" name="maximum_solutions" value={this.state.details.maximum_solutions} onChange={this.onChangeHandler} />
                            </th>
                            <th />

                        </tr>
                        {/* <tr>
                            <th>
                                <label className="margin2p disp-Inline-Flex">Optimization Criteria:</label>
                            </th>
                            <th>
                                <select className="margin2p" placeholder='Select Att' id="dropdown" name='firstAtt' value={this.state.Opcre} onChange={this.onChangeHandler}>
                                    <option>Distance</option >
                                    <option>Cost</option >
                                </select>
                            </th>
                        </tr> */}
                    </Table>
                    <Table>
                        <Card>
                            <Card.Body>
                                <Card.Header className="margin2p">Sequences </Card.Header>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className="margin2p" onClick={e => this.onSort(e, 'seq_no')}>Sequence No</th>
                                            <th className="margin2p" onClick={e => this.onSort(e, 'seq_description')}>Sequence Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.sequences.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="margin2p">{item.seq_no}</td>
                                                    <td className="margin2p">{item.seq_description}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                                <Row>
                                    <Button className='margin2p custom-btn-medium' onClick={() => this.props.addSeqFun()}>Sequence Details</Button>
                                    <Button className='margin2p custom-btn-medium' onClick={() => this.deleteSequence()}>Delete Sequence</Button>
                                </Row>

                            </Card.Body>
                        </Card>
                    </Table>
                    <Row>
                        <Button className='margin1p custom-btn-medium offset-10' onClick={() => this.save()}>Save</Button>
                        <Button className='margin1p custom-btn-medium ml-xl-1' onClick={() => this.props.openRulesFun()}>Go Back</Button>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default Sourcinruledetails;