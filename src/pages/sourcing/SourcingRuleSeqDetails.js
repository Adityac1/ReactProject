import React, { Component } from 'react'
import { API } from '../../utils';
import './sourcing.css';
import { Card, Button, Row, Col, Table, Modal } from 'react-bootstrap';
import { Spinner } from '../../components/Spinner';
// import { MDBCol, MDBIcon } from "mdbreact";
// import { FaBeer } from "@react-icons/all-files/fa/FaBeer";


export class SourcingRuleSeqDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ruleDetailsScreen: false,
            ruleListScreen: true,
            show: false,
            seqDetails: {},
            noSelCriteria: [],
            NodeList: [],
            group_config: {},
            seqDetails: this.props.displayData.sequences
        }
    }
    componentDidMount() {
        this.setState({
            seqDetails: this.props.displayData.sequences
        })
    }
    setdata() {
        this.setState({
            noSelCriteria: this.state.seqDetails.node_selection_criteria,
            NodeList: this.state.seqDetails.node_list,
            group_config: this.state.seqDetails.group_config
        })
    }
    onChangeHandlerGroupConfig = e => {
        this.setState({
            [e.target.name]: e.target.defaultChecked
        })
    }

    handalClose() {
        this.setState({
            show: false
        })
    }
    handalShow() {
        this.setState({
            show: true
        })
    }
    onChangeHandler(e) { }
    addCriteria() { }
    save() { }
    goBackToDetailsScreen() {
        this.props.openRuleDetailsFun(this.props.displayData);
    }
    addNode() {
        // this.selectedData=item;
        this.setState({
            modal: {
                // data: item,
                show: true,
                update: true,
                header: "Node Details"
            }
        })
        this.handalShow();
    }
    render() {
        return (
            <div className='sourcing'>
                {this.state.loading && <Spinner />}
                <Modal size=".5g"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} onHide={() => this.handalClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Node</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className='margin2p'>
                            <Col className='col-3 mt-md-1'>
                                <label className="margin2p">Organization Code: </label>
                            </Col>
                            <Col>
                                <input className="margin2p" type="text" name="org_code" onChange={this.onChangeHandler} />
                                <Button className='margin1p custom-btn'>Search</Button>
                                {/* <TextField defaultValue="Search Org"/> */}
                                {/* <FaBeer /> */}
                            </Col>
                        </Row>
                        <Row className='margin3p mt-md-2'>
                            <Col className='col-1'>
                                <input className='custom-file custom-checkbox-small2' type="checkbox" name="is_shipping_enabled"
                                    defaultChecked={true}
                                    value={true}
                                />
                            </Col>
                            <Col className='col-3'>
                                <label>Shipping Enabled</label>
                            </Col>
                        </Row>
                        <Row className='margin3p'>
                            <Col className='col-1'>
                                <input className='custom-file custom-checkbox-small2' type="checkbox" name="is_shipping_enabled"
                                    defaultChecked={true}
                                    value={false}
                                />
                            </Col>
                            <Col >
                                <label>Pickup Enabled</label>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        {<Button className='margin1p custom-btn-small' onClick={() => this.deleteNode()}>Add</Button>}
                        <Button className='margin1p custom-btn-small' onClick={() => this.handalClose()}>Close</Button>
                    </Modal.Footer>
                </Modal>
                {this.state.seqDetails.map((seq, index) => {
                    return (
                        <Card key={index} className='text'>
                            <Card.Header >Sourcing Sequence Details</Card.Header>
                            <Card.Body>
                                <Table>
                                    <tr>
                                        <th>
                                            <label className='margin2p disp-Inline-Flex'>Sequence No: </label>
                                        </th>
                                        <th>
                                            <input class="margin2p" type="text" name="seq_no" value={seq.seq_no} onChange={this.onChangeHandler} />
                                        </th>
                                        <th>
                                            <label className='margin2p disp-Inline-Flex'>Sequence Description: </label>
                                        </th>
                                        <th>
                                            <input class="margin2p" type="text" name="seq_description" value={seq.seq_description} onChange={this.onChangeHandler} />
                                        </th>
                                    </tr>
                                </Table>
                                <Row>
                                    <Col>
                                        <Card.Header><label className='margin2p'>Node Sequences Criteria :</label></Card.Header>
                                        <Card className="node-seq-criteria">
                                            <Card.Body>
                                                <Button className='custom-btn-small margin2p offset-9' onClick={() => this.addCriteria()}>Add Criteria</Button>
                                                {seq.node_selection_criteria.map((nodeSelCrit, index) => {
                                                    return (
                                                        <Card key={index} className="w-100 mt-md-3">
                                                            <Row className='margin2p'>
                                                                <Col className="inline-grid">
                                                                    <label className='margin2p disp-Inline-Flex'>Name : </label>
                                                                    <label className='margin2p disp-Inline-Flex'>Query Type : </label>
                                                                    <label className='margin2p disp-Inline-Flex'>Value : </label>
                                                                    <label className='margin2p disp-Inline-Flex'>UOM : </label>
                                                                </Col>
                                                                <Col className="inline-grid">
                                                                    <input type="text" className="margin2p" name="parameter_name" value={nodeSelCrit.parameter_name} onChange={this.onChangeHandler} />
                                                                    <input type="text" className="margin2p" name="query_type" value={nodeSelCrit.query_type} onChange={this.onChangeHandler} />
                                                                    <input type="text" className="margin2p" name="parameter_value" value={nodeSelCrit.parameter_value} onChange={this.onChangeHandler} />
                                                                    <input type="text" className="margin2p" name="parameter_uom" value={nodeSelCrit.parameter_uom} onChange={this.onChangeHandler} />
                                                                </Col>
                                                            </Row>
                                                        </Card>);
                                                })}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card.Header><label className='margin2p'>Nodes</label></Card.Header>
                                        <Card className="node-seq-criteria">
                                            <Card.Body>
                                                <Button className='margin2p custom-btn-small offset-9' variant="primary" onClick={() => this.addNode()}>Add Node</Button>
                                                <Table striped bordered hover className=" mt-md-3">

                                                    <thead>
                                                        <tr className='margin2p text-center'>
                                                            <th>Node ID</th>
                                                            <th>Shipping Enabled</th>
                                                            <th>Pickup Enabled</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {seq.node_list.map((node, index) => {
                                                            return (
                                                                <tr className='text-center' >
                                                                    <td>{node.node_id}</td>
                                                                    <td>{node.is_shipping_enabled.toString() === 'true' ? "✔" : "✘"}</td>
                                                                    <td>{node.is_pickup_enabled.toString() === 'true' ? "✔" : "✘"}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Card.Header><label>Group Configuration :</label></Card.Header>
                                        <Card>
                                            <Card.Body>
                                                <Row className='margin2p field is-horizontal'>
                                                    <tr>
                                                        <Col className="inline-grid">
                                                            <th>
                                                                <input type="checkbox" name="is_shipping_enabled"
                                                                    defaultChecked={seq.group_config.is_shipping_enabled}
                                                                    value={seq.group_config.is_shipping_enabled}
                                                                    onChange={this.onChangeHandlerGroupConfig} />
                                                            </th>
                                                            <th><label className='margin2p'>Shipinng Enabled </label></th>
                                                        </Col>
                                                        <Col className="inline-grid">
                                                            <th>
                                                                <input type="checkbox" name="is_pickup_enabled"
                                                                    defaultChecked={seq.group_config.is_pickup_enabled}
                                                                    value={seq.group_config.is_pickup_enabled}
                                                                    onChange={this.onChangeHandlerGroupConfig} />
                                                            </th>
                                                            <th><label className='margin2p'>Pickup Enabled </label></th>
                                                        </Col>
                                                        <Button className='custom-btn-medium offset-8' variant="primary" onClick={() => this.save()}>Save</Button>
                                                        <Button className='custom-btn-medium ml-xl-1' variant="primary" onClick={() => this.goBackToDetailsScreen()}>Go Back</Button>
                                                    </tr>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        )
    }
}