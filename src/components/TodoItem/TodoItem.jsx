import React from 'react';
import cl from "./TodoItem.module.scss"

const TodoItem = ({todo, number}) => {
    return (
        <div className={todo.isAuthorTodo ? cl.author_todo  : {}}>
            <strong>{number}. {todo.title}</strong>
        </div>
    );
};

export default TodoItem;