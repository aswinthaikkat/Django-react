import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class AddNotex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeContent(event) {
    this.setState({
      content: event.target.value
    });
    console.log(event.target.value);
  }
  handleChangeTitle(event) {
    this.setState({
      title: event.target.value
    });
    console.log(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState({
      title: '',
      content: ''
    });
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter title"
              onChange={this.handleChangeTitle}
              value={this.state.title}
            />
          </Form.Group>
          <Form.Group controlId="formGroupContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter content"
              onChange={this.handleChangeContent}
              value={this.state.content}
            />
            <Button type="submit">Submit</Button>
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}

export default AddNotex;
