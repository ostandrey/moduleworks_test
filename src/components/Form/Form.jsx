import React, {useState} from 'react';
import cl from "./Form.module.scss"

const Form = ({create}) => {
    const [todo, setTodo] = useState({ title: ''});

    const addNewTodo = (event) => {
        event.preventDefault();
        const newTodo = {
            ...todo, id: Date.now(), isAuthorTodo: true
        }
        create(newTodo);
        setTodo({ title: ''});
    }

    return (
        <form>
            <input
                type="text"
                placeholder="currently entering..."
                className={cl.form_input}
                value={todo.title}
                onChange={e => setTodo({...todo, title: e.target.value})}
            />
            <p className={cl.form_label}>Press "Enter" to add the new TODO item to the List</p>
            <button onClick={addNewTodo} className={cl.form_button}/>
        </form>
    );
};

export default Form;