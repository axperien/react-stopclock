import React from 'react';
import PropTypes from 'prop-types';


import moment from 'moment';
import { Button, CardBody, Card, CardTitle, CardSubtitle, Badge, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';

moment.locale("ru");

const colorGroupBadge = {
    'todo': 'warning',
    'doing': 'success',
    'done': 'light'
}

export default class Task extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
        }
    }

    toggle = () => {
        this.setState({ visible: !this.state.visible });
    }

    deleteTask = () => {
        console.log(this.props)
    }

    render() {
        const { name, description, group, date } = this.props.data;
        const { visible } = this.state;

        return (
            <Col xs="6">
                <Card style={{marginBottom: '20px'}}>
                    <div className="close" onClick={this.deleteTask}>Удалить</div>
                    <CardBody>
                        <CardTitle>{name} <Badge color={colorGroupBadge[group]}>{group}</Badge></CardTitle>

                        <CardSubtitle style={{marginBottom: '12px'}}>
                            {date && moment(date).format('Do MMMM YYYY, HH:mm:ss')}
                        </CardSubtitle>
                    
                        { description && <Button color="primary" onClick={this.toggle}>Показать описание</Button>}
                    
                        <Modal isOpen={visible} toggle={this.toggle} centered={true}>
                            <ModalHeader toggle={this.toggle}>{name}</ModalHeader>
                            {description && <ModalBody>{description}</ModalBody>}
                        </Modal>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

Task.PropTypes = {
    data: PropTypes.array.isRequired
}