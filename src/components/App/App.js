import React from 'react';
import TaskList from 'components/TaskList';
import AddTask from 'components/AddTask';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        }
        this.onAdd = this.onAdd.bind(this)
    }

    onAdd = (item) => {
        let newData = this.state.data;
        newData.push(item);
        this.setState({data: newData});
    }

    render() {
        const { data } = this.state;

        return (
            <div className="container">
                <h1 style={{marginBottom: '30px'}}>Список задач</h1>
                {<TaskList data={data} />}
                {<AddTask data={data} onAdd={item => this.onAdd(item)} />}
            </div>
        )
    }
}
