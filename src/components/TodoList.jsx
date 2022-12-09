import React from 'react';
import TodoItem from "./TodoItem/TodoItem";
import cl from "../pages/Todos.module.scss"

const TodoList = ({todos}) => {
    if(!todos.length) {
        return (
            <h1 style={{textAlign: 'center'}}>Todos not found!</h1>
        )
    }

    return (
        <div className={cl.todos_list}>
            {todos.map((todo, index) =>
                <TodoItem key={todo.id} todo={todo} number={index + 1}/>
            )}
        </div>
    );
};

export default TodoList;