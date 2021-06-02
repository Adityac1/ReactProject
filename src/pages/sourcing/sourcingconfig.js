import React, { Component } from 'react'
import { API } from '../../utils';
import './sourcing.css';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Spinner } from '../../components/Spinner';

export class sourcingconfig extends Component {
    constructor(props) {
        super(props)

        this.state = {
            org: '',
            firstAtt: '',
            secondAtt: '',
            thirdAtt: '',
            loading:false,
            firstAttValues: [
                {
                    title: 'Select Att',
                    value: '',
                    subOpt: ''
                },
                {
                    title: 'Delivery Method',
                    value: 'Delivery Method',
                    subOpt: ''
                },
                {
                    title: 'Organization Code',
                    value: 'Organization Code',
                    subOpt: ''
                },
                {
                    title: 'Order Type',
                    value: 'Order Type',
                    subOpt: ''
                },
                {
                    title: 'Fulfillment Type',
                    value: '',
                    subOpt: ''
                },
                {
                    title: 'Ship To',
                    value: '',
                    subOpt: [{
                        title: 'City',
                        value: 'City'
                    },
                    {
                        title: 'Country',
                        value: 'Country'
                    }]
                }
            ]
        }
    }
    componentDidMount() {
        API.get('posts')
            .then(res => {
                if (res.status === 200) {
                    console.log("get call is successful");
                }
            })
            .catch(error => console.log(error))
       
    }
    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }
    loading(value){
        this.setState({
            loading: value
        })
    }
    addConfig() {
        this.loading(true);
        let input={
            "org_code": this.state.org,
            "config_value" : {
                "attribute1" : `$.`+this.state.firstAtt,
                "attribute2" : `$.`+this.state.secondAtt,
                "attribute3" : `$.`+this.state.thirdAtt
            }
        };
        console.log(input);
        API.post('posts', input).then(res => {
            this.loading(false);
            alert("Sourcing Config Updated successfully");  
    }).catch(error => console.log(error));
        
    }
    render() {
        return (
            <div className='sourcing'>
                {this.state.loading && <Spinner/>}
                <Card className='text'>
                    <Card.Header className='col-gap'>Sourcing Configurations</Card.Header>
                    <Card.Body className='col-gap'>
                        <Row className='margin3p'>
                            <Col >
                                <label>Organization Code</label>
                            </Col>
                            <Col>
                                <input className='custom-file margin2p custom-inputbox-large' placeholder='Type Org' type="text" name="org" value={this.state.org} onChange={this.onChangeHandler} />
                            </Col>
                        </Row>
                        <Row className=' margin3p mt-2'>
                            <Col >
                                <label>First Attribute</label>
                            </Col>
                            <Col>
                                <select className='custom-file margin2p custom-dropdown' placeholder='Select Att' id="dropdown" name='firstAtt' value={this.state.firstAtt} onChange={this.onChangeHandler}>
                                    {this.state.firstAttValues.map((item, index) => {
                                        return (
                                            <option className='margin2p' value={item.title} key={index}>{item.title}</option >
                                        );
                                    })}
                                </select>
                            </Col>
                        </Row>
                        <Row className=' margin3p mt-2'>
                            <Col >
                                <label>Second Attribute</label>
                            </Col>
                            <Col>
                                <select className='custom-file margin2p custom-dropdown' placeholder='Select Att' id="dropdown" name='secondAtt' value={this.state.secondAtt} onChange={this.onChangeHandler}>
                                    {this.state.firstAttValues.map((item, index) => {
                                        return (
                                            <option className='margin2p' value={item.title} key={index}>{item.title}</option >
                                        );
                                    })}
                                </select>
                            </Col>
                        </Row>
                        <Row className=' margin3p mt-2'>
                            <Col >
                                <label>Third Attribute</label>
                            </Col>
                            <Col>
                                <select className='custom-file margin2p custom-dropdown' placeholder='Select Att' id="dropdown" name='thirdAtt' value={this.state.thirdAtt} onChange={this.onChangeHandler}>
                                    {this.state.firstAttValues.map((item, index) => {
                                        return (
                                            <option className='margin2p' value={item.title} key={index}>{item.title}</option >
                                        );
                                    })}
                                </select>
                            </Col>
                        </Row>
                        <div>
                        <Button className="margin2p custom-btn-small" onClick={()=>this.addConfig()}>Add</Button>
                        </div>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default sourcingconfig
