import React, { Component } from 'react'
import { API } from '../../utils';
import './sourcing.css';
import { Card, Button, Row, Col, Table, Modal } from 'react-bootstrap';
import { Spinner } from '../../components/Spinner';

export class sourcingnode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            show: false,
            nodes: [],
            node_id: "",
            org_code: "",
            description: "",
            node_type: "",
            zipcode: "",
            longitude: "",
            latitude: "",
            is_shipping_enabled: "",
            is_pickup_enabled: "",
            is_big_store: "",
            is_shut_down: "",
            is_active:"",
            modal: {
                header: "Update Node Details",
                update: false,
                data: {}
            }
        }
    }
    
    
    componentDidMount() {
        fetch("http://localhost:8084/sourcing/v1/shipnodes/PERF_DEFAULT",
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
                if (result.length > 0) {
                    console.log("get call is successful" +result);
                    this.setState({
                        nodes: result
                    })
                }
            })
            .catch(error => console.log(error))

    }
    addNode() {
        this.setState({
            modal: {
                data: {},
                update: false,
                header: "Add Node"
            }
        })
        this.handalShow();
    }
    
    updateNode() {

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify([{
                node_id: this.selectedData.node_id,
                description: this.selectedData.description,
                zipcode: this.selectedData.zipcode,
                longitude: this.selectedData.latitude,
                latitude: this.selectedData.longitude,
                is_shipping_enabled: this.selectedData.is_shipping_enabled,
                is_pickup_enabled: this.selectedData.is_pickup_enabled,
                is_shut_down: this.selectedData.is_shut_down,
                is_active: this.selectedData.is_active,
                org_code:'PERF_DEFAULT'
            }]),

            headers: { 
                'Content-Type': 'application/json',
                Accept: 'application/json', 
            }
            
        };
        fetch('http://localhost:8084/sourcing/v1/shipnode', requestOptions)
        .then(response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                console.log(error.response)
                return Promise.reject(error);
            } else {
                this.handalClose();
            }
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });

     }
    deleteNode() {
        let delUrl="http://localhost:8084/sourcing/v1/shipnode/"+this.selectedData.node_id+"?orgCode="+this.selectedData.org_code;
        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                Accept: 'application/json', 
            }
            
        };
        fetch(delUrl, requestOptions)
        .then(response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                console.log(error.response)
                return Promise.reject(error);
            } else {
                this.handalClose();
            }
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
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
    onChangeHandler = e => {

        let value = "";
       
        if (e.target.type == "checkbox") {
            value = e.target.defaultChecked;
        } else {
            value = e.target.value;
        };
        if(this.selectedData){
            this.selectedData[e.target.name]=value;
        } else {
            this.state.nodes[0][e.target.name]=value;
        }
        this.setState({
            // [e.target.name]: value,
            
            modal: {
                update: this.state.modal.update,
                header: this.state.modal.header,
                data: { [e.target.name]: e.target.value },
            }
        })
        this.state.modal.data[e.target.name]=value;
    }
    showDetails(item) {
        this.selectedData=item;
        this.setState({
            modal: {
                data: item,
                update: true,
                header: "Node Details"
            }
        })
        this.handalShow();
    }
    saveNode() {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify([{
                node_id: this.state.nodes[0].node_id,
                description: this.state.nodes[0].description,
                zipcode: this.state.nodes[0].zipcode,
                longitude: this.state.nodes[0].latitude,
                latitude: this.state.nodes[0].longitude,
                is_shipping_enabled: this.state.nodes[0].is_shipping_enabled,
                is_pickup_enabled: this.state.nodes[0].is_pickup_enabled,
                is_shut_down: this.state.nodes[0].is_shut_down,
                is_active: this.state.nodes[0].is_active,
                org_code:'PERF_DEFAULT'
            }]),

            headers: { 
                'Content-Type': 'application/json',
                Accept: 'application/json', 
            }
            
        };
        fetch('http://localhost:8084/sourcing/v1/shipnode', requestOptions)
        .then(response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                console.log(error.response)
                return Promise.reject(error);
            } else {
                this.handalClose();
            }
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
        // this.handalClose();
    }
    render() {
        return (
            <div className='sourcing'>
                {this.state.loading && <Spinner />}
                <Card className='text'>
                    <Card.Header>Sourcing Node</Card.Header>
                    <Card.Body >
                        <Table striped bordered hover size='lg'>
                            <thead>
                                <tr className='text-center'>
                                    <th>Node ID</th>
                                    <th>Node Description</th>
                                    <th>Is Active?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.nodes.map((item, index) => {
                                    return (
                                        <tr className='text-center' style= {{backgroundColor: item.is_active.toString() === 'true' ? "white" : "#72959b" }} 
                                                onClickCapture={() => this.showDetails(item)}>
                                            <td>{item.node_id}</td>
                                            <td>{item.description}</td>
                                            <td>{item.is_active.toString()=== 'true' ? "✔" : "✘"}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <Row>
                            <Button className='margin1p custom-btn-medium' variant="primary" onClick={() => this.addNode()}>Add Node</Button>
                        </Row>
                    </Card.Body>
                </Card>
                <Modal size=".5g"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} onHide={() => this.handalClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modal.header}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className='margin3p'>
                            <Col >
                                <label>Node ID</label>
                            </Col>
                            <Col>
                                <input className='custom-inputbox ' type="text" name="node_id" value={this.state.modal.data.node_id} onChange={this.onChangeHandler} />
                            </Col>
                        </Row>
                        <Row className='margin3p'>
                            <Col >
                                <label>Description</label>
                            </Col>
                            <Col>
                                <input className='custom-inputbox ' type="text" name="description" value={this.state.modal.data.description} onChange={this.onChangeHandler} />
                            </Col>
                        </Row>
                        <Row className='margin3p'>
                            <Col >
                                <label>ZipCode</label>
                            </Col>
                            <Col>
                                <input className='custom-inputbox' type="text" name="zipcode" value={this.state.modal.data.zipcode} onChange={this.onChangeHandler} />
                            </Col>
                        </Row>
                        <Row className='margin3p'>
                            <Col >
                                <label>Latitude</label>
                            </Col>
                            <Col>
                                <input className='custom-inputbox' type="text" name="latitude" value={this.state.modal.data.latitude} onChange={this.onChangeHandler} />
                            </Col>
                        </Row>
                        <Row className='margin3p'>
                            <Col >
                                <label>Longitude</label>
                            </Col>
                            <Col>
                                <input className='custom-inputbox' type="text" name="longitude" value={this.state.modal.data.longitude} onChange={this.onChangeHandler} />
                            </Col>
                        </Row>
                        <Row className='margin3p'>
                            <Col >
                                <label>Shipping Enabled</label>
                            </Col>
                            <Col>
                                <input className='custom-file custom-checkbox-small' type="checkbox" name="is_shipping_enabled"
                                    defaultChecked={this.state.modal.data.is_shipping_enabled}
                                    value={this.state.modal.data.is_shipping_enabled}
                                    onChange={this.onChangeHandler} />
                            </Col>
                        </Row>
                        <Row className='margin3p'>
                            <Col >
                                <label>Pickup Enabled</label>
                            </Col>
                            <Col>
                                <input className='custom-file custom-checkbox-small' type="checkbox" name="is_pickup_enabled"
                                    defaultChecked={this.state.modal.data.is_pickup_enabled}
                                    value={this.state.modal.data.is_pickup_enabled}
                                    onChange={this.onChangeHandler} />
                            </Col>
                        </Row>
                        <Row className='margin3p'>
                            <Col >
                                <label>Shutdown</label>
                            </Col>
                            <Col>
                                <input className='custom-file custom-checkbox-small' type="checkbox" name="is_shut_down"
                                    defaultChecked={this.state.modal.data.is_shut_down}
                                    value={this.state.modal.data.is_shut_down}
                                    onChange={this.onChangeHandler} />
                            </Col>
                        </Row>
                        <Row className='margin3p'>
                            <Col >
                                <label>Is Active</label>
                            </Col>
                            <Col>
                                <input className='custom-file custom-checkbox-small' type="checkbox" name="is_active"
                                    defaultChecked={this.state.modal.data.is_active}
                                    value={this.state.modal.data.is_active}
                                    onChange={this.onChangeHandler} />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.modal.update && <Button className='margin1p custom-btn-small' onClick={() => this.updateNode()}>Update</Button>}
                        {this.state.modal.update && <Button className='margin1p custom-btn-small' onClick={() => this.deleteNode()}>Delete</Button>}
                        {!this.state.modal.update && <Button className='margin1p custom-btn-small' onClick={() => this.saveNode()}>Save</Button>}
                        <Button className='margin1p custom-btn-small' onClick={() => this.handalClose()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}