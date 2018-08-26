import React from 'react';
import TaskList from 'components/TaskList';
import AddTask from 'components/AddTask';

export default class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const { data } = this.props;

        return (
            <div className="container">
                <h1 style={{marginBottom: '30px'}}>Список задач</h1>
                {<TaskList data={data} />}
                {<AddTask data={data} />}
            </div>
        )
    }
}
