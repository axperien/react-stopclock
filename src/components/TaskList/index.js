import React from 'react';
import PropTypes from 'prop-types';

import Task from 'components/Task';
import { Label, Input } from 'reactstrap';

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          dropdownOpen: false
        };
      }

      toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    renderTasks = (items) => {
        const { data } = items || this.props;
        let tasksTemplate = null;
        
        if (data.length) {
            tasksTemplate = data.map(function(item, index) {
            return <Task key={index} data={item}/>
          })
        } else {
            tasksTemplate = <p>Задач пока ещё нет</p>
        }
        
        return tasksTemplate
      }

    filteredGroup = () => {
        
    }

    render() {
        const { data } = this.props

        return (
            <div className="task-list">
                {/* <div className="task-list__filter" style={{marginBottom: "20px"}}>
                    <Label for="filter">Фильтр по состоянию</Label>
                    <Input type="select" name="select" id="filter" onChange={this.filteredGroup}>
                        <option>----</option>
                        <option value="execute">Выполнить</option>
                        <option value="execution">Выполняется</option>
                        <option value="completed">Выполнено</option>
                    </Input>
                </div> */}
                {this.renderTasks()}
                {
                data.length ? <strong className={'task-list__count'}>Всего задач: {data.length}</strong> : null
                }
            </div>
        )
    }
}

TaskList.propTypes = {
    data: PropTypes.array.isRequired
}