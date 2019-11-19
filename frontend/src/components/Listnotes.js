import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Note from './Note';

const Listnotes = ({ notes, handleItemClick, is_loading }) => {
  let note_list = notes.map(note => (
    <ListGroup.Item
      key={note.id}
      href="#"
      onClick={id => handleItemClick(note.id, note)}
    >
      <Note title={note.title} />
    </ListGroup.Item>
  ));

  return (
    <React.Fragment>
      <ListGroup>{is_loading ? 'Loading' : note_list}</ListGroup>
    </React.Fragment>
  );
};

export default Listnotes;
