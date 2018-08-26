import React from 'react';

import { Form, Label, FormGroup, Button, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class AddTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validate: false,
            name: '',
            description: '',
            date: null,
            group: '',
            modalSuccess: false
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        const {name} = this.state;
        const validateFlag = (name.length > 2) ? true : false;

        this.setState({ validate: validateFlag });
    }

    toggle = () => {
        this.setState({ modalSuccess: !this.state.modalSuccess });
    }

    onChangeDate = (newDate) => {
        this.setState({ date: newDate });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let { data } = this.props;
        const {name, description, date, group, validate } = this.state;

        if(validate) {
            data.push({name, description, date, group});
            this.setState({ modalSuccess: !this.state.modalSuccess});
            e.target.reset();
        }
    }

    render() {
        const { validate, date, modalSuccess } = this.state;
        
        return (
            <div>
                <h2 style={{margin: '30px 0px 30px'}}>Добавить задачу</h2>

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Название:</Label>
                        <Input type="text" name="name" onChange={this.onChange} placeholder="Название задачи" />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label>Описание:</Label>
                        <Input type="textarea" name="description" onChange={this.onChange} placeholder="Описание задачи" />
                    </FormGroup>

                    <FormGroup>
                        <Label>Группа:</Label>
                        <Input type="select" name="group" onChange={this.onChange}>
                            <option value="todo" defaultValue>Выполнить</option>
                            <option value="doing">Выполняется</option>
                            <option value="done">Выполнено</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label>Время завершения:</Label>
                        <DatePicker
                            selected={date}
                            onChange={this.onChangeDate}
                            placeholderText="Click to select a date"
                            name="date"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            minDate={moment().add(30, 'minutes')}
                            dateFormat="LLL"
                            timeCaption="time"
                        />
                    </FormGroup>

                    <Button color={validate ? 'success' : 'danger'}>Добавить</Button>
                </Form>

                <Modal isOpen={modalSuccess} toggle={this.toggle} centered={true}>
                    <ModalHeader toggle={this.toggle}>Успешно отправлено!</ModalHeader>
                </Modal>
            </div>
        )
    }
}