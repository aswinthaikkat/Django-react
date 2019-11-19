import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
const EditNoteForm = ({ editable_note, handleChange }) => {
  return (
    <React.Fragment>
      <Form>
        <Form.Group controlId="editNoteFormGroupTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter title"
            value={editable_note.title}
          />
        </Form.Group>
        <Form.Group controlId="editNoteFormGroupContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter content"
            onChange={handleChange}
            value={editable_note.content}
          />
        </Form.Group>
      </Form>
    </React.Fragment>
  );
};
export default EditNoteForm;
