import React from 'react';

import { Form, Label, FormGroup, Button, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import FormErrors from 'components/FormErrors';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class AddTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            date: null,
            group: '',
            modalSuccess: false,
            formErrors: {name: ''},
            nameValid: false,            
            formValid: false,
            data: this.props.data
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, 
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.emailValid;        
      switch(fieldName) {
          case 'name':
            nameValid = value.length > 3;
            fieldValidationErrors.name = nameValid ? '' : ' is length must be more 3';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
            nameValid: nameValid
        }, this.validateForm);
      }
      validateForm() {
        this.setState({formValid: this.state.nameValid});
      }

    toggle = () => {
        this.setState({ modalSuccess: !this.state.modalSuccess });
    }

    onChangeDate = (newDate) => {
        this.setState({ date: newDate });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {name, description, date, group, formValid } = this.state;
        const id = Math.random().toString(36).substr(2, 9);
        
        if(formValid) {
            const newItem = {name, description, date, group, id}
            this.props.onAdd(newItem);
            console.log(1)
            this.setState({ 
                modalSuccess: !this.state.modalSuccess
            });
            e.target.reset();
        }
    }

    render() {
        const { formValid, date, modalSuccess, name, description, formErrors } = this.state;
        
        return (
            <div>
                <h2 style={{margin: '30px 0px 30px'}}>Добавить задачу</h2>

                <div className="panel panel-default" style={{color: 'red'}}>
                    <FormErrors formErrors={formErrors} />
                </div>

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Название:</Label>
                        <Input type="text" name="name" value={name} onChange={this.onChange} placeholder="Название задачи" />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label>Описание:</Label>
                        <Input type="textarea" name="description" value={description} onChange={this.onChange} placeholder="Описание задачи" />
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

                    <Button color={!formValid ? 'danger' : 'success'} disabled={!formValid}>Добавить</Button>
                </Form>

                <Modal isOpen={modalSuccess} toggle={this.toggle} centered={true}>
                    <ModalHeader toggle={this.toggle}>Успешно отправлено!</ModalHeader>
                </Modal>
            </div>
        )
    }
}