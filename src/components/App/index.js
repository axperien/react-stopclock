import React from 'react';
import TaskList from 'components/TaskList';

export default class App extends React.Component {
    state = {
        tasks: null,
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch('http://localhost:8080/data/tasksData.json')
          .then(response => response.json())
          .then(data => {
            setTimeout(() => {
              this.setState({ isLoading: false, tasks: data });
            }, 1000)
          });
      }

    render() {
        const { tasks, isLoading } = this.state;

        return (
            <div className="container">
                <h3>Список задач</h3>
                {isLoading && <p>Загружаю...</p>}
                {Array.isArray(tasks) && <TaskList data={tasks} />}
            </div>
        )
    }
}
