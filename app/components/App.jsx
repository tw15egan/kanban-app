import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn Webpack'
        },
        {
          id: uuid.v4(),
          task: 'Learn React'
        },
        {
          id: uuid.v4(),
          task: 'Do Laundry'
        }
      ]
    }
  }
  render() {    
    const notes = this.state.notes;    
    return (
      <div className="note">
        <h1>Notes</h1>
        <Notes 
          notes={notes} 
          onEdit={this.editNote} 
          onDelete={this.deleteNote} />
        <button className="note__add" onClick={this.addNote}>+</button>
      </div>
    );
  }
  addNote = () => {
    this.setState({
      notes: [...this.state.notes, {id: uuid.v4(), task: 'New Task'}]
    })
  }
  editNote = (id, task) => {
    // Don't modify if trying to set an empty value
    if (!task.trim()) {
      return
    }
    
    const notes = this.state.notes.map(note => {
      if(note.id === id && task) {
        note.task = task;
      }
      
      return note;
    });
    
    this.setState({notes});
  }
  deleteNote = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();
    
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  }
}

