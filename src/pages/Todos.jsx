import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import TodoService from "../api/TodoService";
import Form from "../components/Form/Form";
import TodoList from "../components/TodoList";
import TodoDownload from "../components/TodoDownload";
import cl from './Todos.module.scss'


const Todos = () => {
    const [todos, setTodos] = useState( []);

    const [fetchTodos, isTodosLoading, todoError] = useFetching(async () => {
        const todos = await TodoService.getAll();
        setTodos(todos);
    });

    useEffect(() => {
        fetchTodos();
    }, []);

    const createTodo = (newTodo) => {
        setTodos([...todos, newTodo])
    }

    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType })

        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        a.click()
        a.remove()
    }

    const exportToJson = e => {
        e.preventDefault()
        downloadFile({
            data: JSON.stringify(todos),
            fileName: 'todos.json',
            fileType: 'text/json',
        })
    }

    const exportToCsv = e => {
        e.preventDefault();

        let headers = ["Id,Title"];

        let usersCsv = todos.reduce((acc, todo, index) => {
            const { title } = todo
            acc.push([index + 1, title].join('. '))
            return acc
        }, [])

        downloadFile({
            data: [...headers, ...usersCsv].join('\n'),
            fileName: 'users.csv',
            fileType: 'text/csv;charset=utf-8',
        })
    }

    if(todoError) {
        return <h1>Something went wrong...</h1>
    }

    return (
        <main>
            <section className={cl.download_wrapper}>
                <TodoDownload title={'Download TODO List in JSON'} download={exportToJson}/>
                <TodoDownload title={'Download TODO List in CSV'} download={exportToCsv}/>
            </section>

            <Form create={createTodo}/>
            {isTodosLoading ? <h1>Loading...</h1> :
                <section className={cl.todos_wrapper}>
                    <TodoList todos={todos}/>
                    <TodoList todos={todos}/>
                </section>
            }
        </main>
    );
};

export default Todos;