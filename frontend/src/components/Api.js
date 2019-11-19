const URL = 'http://127.0.0.1:8000/api/v1/notes/';
export const FetchNotes = async () => {
  const res = await fetch(URL);
  const data = await res.json();
  const x = data;
  console.log('api');
  console.log(x);
  return data;
};

export const FetchNote = async id => {
  const res = await fetch(`${URL}${id}`, {});
  const fetch_note = res.json();
  return fetch_note;
};

export const AddNote = async note => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  });
  const data = await res.json();
  console.log(data);
  return data;
};

export const UpdateNote = note => {
  console.log(`Updating ${note.title}`);
};
