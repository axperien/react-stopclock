import React from 'react';
import PropTypes from 'prop-types';


import moment from 'moment';
import { Collapse, Button, CardBody, Card, CardTitle, CardSubtitle, Badge, Alert } from 'reactstrap';

moment.locale("ru");

const colorGroupbBadge = {
    'execute': 'warning',
    'execution': 'success',
    'completed': 'light'
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

    render() {
        const { name, description, group, date } = this.props.data;
        const { visible } = this.state;

        return (
            <Card style={{marginBottom: '20px'}}>
                <CardBody>
                    <CardTitle>{name} <Badge color={colorGroupbBadge[group]}>{group}</Badge></CardTitle>

                    <CardSubtitle style={{marginBottom: '5px'}}>
                        Выполнить до: {moment(date).format('Do MMMM YYYY, HH:mm:ss')}
                    </CardSubtitle>
                    
                    { description && <Button color="primary" onClick={this.toggle}>Показать описание</Button>}
                    <Collapse isOpen={visible}>
                        <Alert color="info">
                            {description}
                        </Alert>
                    </Collapse> 
                </CardBody>
            </Card>
        )
    }
}