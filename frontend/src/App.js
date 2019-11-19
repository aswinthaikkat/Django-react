import React, { Component } from 'react';
import WebSocket from 'react-websocket';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Listnotes from './components/Listnotes';
import { FetchNotes, AddNote, FetchNote } from './components/Api';
import AddNotex from './components/AddNotex';
import EditNoteForm from './components/EditNoteForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      current_note: {},
      current_note_id: 0,
      is_creating: true,
      is_loading: true
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async handleItemClick(id, note) {
    let selected_note = await FetchNote(id);
    console.log(id);
    this.setState(prevState => {
      return {
        is_creating: false,
        current_note_id: id,
        current_note: selected_note
      };
    });
  }

  handleCreateClick() {
    this.setState(prevState => {
      return { is_creating: true };
    });
  }

  async getNotes() {
    const data = await FetchNotes();
    this.setState({
      notes: data,
      is_loading: false
    });
    console.log('getNote');
    console.log(data);
  }

  async handleSubmit(submitted_note) {
    console.log(submitted_note);
    await AddNote(submitted_note);
    await this.getNotes();
  }
  componentDidMount() {
    this.getNotes();
  }

  async handleChange(event) {
    let content = event.target.value;
    let current_note = this.state.current_note;
    current_note.content = content;
    this.setState({ current_note: current_note });
    const socket = this.refs.socket;
    socket.state.ws.send(JSON.stringify(current_note));
    console.log('sending to websocket', current_note);
  }

  handleData(data) {
    console.log('recived ', data);
    let result = JSON.parse(data);
    console.log('recived from websocket', result);
    let current_note = this.state.current_note;
    if (current_note.id === result.id) {
      this.setState({ current_note: result });
    }
  }
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={10} className="bg-primary">
              <h2>Real Time Notes</h2>
            </Col>
            <Col xs={2} className="bg-danger">
              <Button variant="primary" onClick={this.handleCreateClick}>
                Create New Note
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={4} className="bg-primary">
              <h3>
                <Listnotes
                  notes={this.state.notes}
                  handleItemClick={this.handleItemClick}
                  is_loading={this.state.is_loading}
                />
              </h3>
            </Col>

            <Col xs={8} className="bg-danger">
              <p>
                {this.state.is_creating ? (
                  <AddNotex handleSubmit={this.handleSubmit} />
                ) : (
                  <EditNoteForm
                    editable_note={this.state.current_note}
                    handleChange={this.handleChange}
                  />
                )}
                <WebSocket
                  ref="socket"
                  url="ws://localhost:8000/ws/notes"
                  onMessage={this.handleData.bind(this)}
                />
              </p>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
