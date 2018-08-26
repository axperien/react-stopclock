import React from 'react';
import PropTypes from 'prop-types';

import Task from 'components/Task';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          filtered: ['none'],
          sort: 'default'
        };
      }

    handlerChangeFilter = (e) => {
        const value = e.target.value;
        const oldState = this.state.filtered;
        let newState;

        if (e.target.checked === false && ~oldState.indexOf(e.target.value)) {
            oldState.splice(oldState.indexOf(e.target.value), 1);
            newState = [...oldState]
        }else{
            newState = [...oldState, value]
        }     

        this.setState(() => ({ filtered: newState }));
    }

    handleSortItems = (e) => {
        const targetOptions = e.target.options;
        this.setState(() => ({ sort: targetOptions[targetOptions.selectedIndex].value }));
    }

    render() {
        const { data } = this.props;
        const { filtered, sort } = this.state;

        let filteredData = data.filter(item => 
            (~filtered.indexOf(item.group) || (filtered.length === 1 && filtered[0] === 'none')));

        if (sort !== 'default') {
            const sortable = filteredData.map((item, index) => 
                ({index, date: new Date(item.date)}));

            sortable.sort(function(a, b){
                return (sort === 'asc')
                    ? a.date - b.date
                    : b.date - a.date;
            });

            filteredData = sortable.map(item => filteredData[item.index]);
        }            

        return (
            <div className="task-list">
                <Row>
                    <Col>
                        <Form>
                            <h4>Фильтр по группе</h4>
                            <FormGroup check>
                                <Label>
                                    <Input 
                                        type="checkbox" 
                                        value="todo" 
                                        onChange={this.handlerChangeFilter}
                                        name="group" 
                                    />
                                    Выполнить
                                </Label>
                            </FormGroup>

                            <FormGroup check>
                                <Label>
                                    <Input 
                                        type="checkbox" 
                                        value="doing" 
                                        onChange={this.handlerChangeFilter} 
                                        name="group"
                                    />
                                    Выполняется
                                </Label>
                            </FormGroup>

                            <FormGroup check>
                                <Label>
                                    <Input 
                                        type="checkbox" 
                                        value="done" 
                                        onChange={this.handlerChangeFilter} 
                                        name="group"
                                    />
                                    Завершено
                                </Label>
                            </FormGroup>
                        </Form>
                    </Col>

                    <Col>
                        <h4>Сортировка по дате</h4>

                        <Form>
                            <FormGroup>
                                <Input type="select" name="select" id="dateSort" onChange={this.handleSortItems}>
                                    <option value="default">Без сортировки</option>
                                    <option value="asc">По возрастанию</option>
                                    <option value="desc">По убыванию</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                
                <Row>
                {
                    filteredData.map((item, index) => {
                        return <Task key={index} data={item}/>
                    })
                }
                </Row>

                {
                data.length ? <strong className={'task-list__count'}>Всего задач: {filteredData.length}</strong> : null
                }
            </div>
        )
    }
}

TaskList.propTypes = {
    data: PropTypes.array.isRequired
}