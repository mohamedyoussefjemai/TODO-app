import React from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';

const NewToDo = () => {
  const [content, setContent] = React.useState('');
  const { addToDo } = useGlobalContext();
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('api/todos', { content }).then((res) => {
      setContent('');
      addToDo(res.data);
    });
  };
  return (
    <form className="new">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="btn"
        type="submit"
        onClick={onSubmit}
        disabled={content.length === 0}
      >
        Add
      </button>
    </form>
  );
};

export default NewToDo;
