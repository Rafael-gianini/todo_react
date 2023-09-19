import React, {createContext, useEffect, useState} from "react";
import { TodoContextType } from './TodoContextType';
import { Todo } from "../models/Todo";
import { get, save } from "../service/TodoService";


export const TodoContext = createContext <TodoContextType>({
    
    todos: [],
    addTodo: () => {},
    removeTodo: () => {},
    toggle: () => {},
});

const TodoProvider = (props: any) => {
    
    const [todos, setTodos] = useState<Todo[]>(get)

    useEffect(() => {
        save(todos);
    }, [todos]);

    const addTodo = (title: string) => {
        const todo: Todo = {id: todos.length + 1, title: title, done: false};
        setTodos([...todos, todo]);
        //save(todos);
        console.log('Adicionou' + title);
    }
    const removeTodo = (todo: Todo) => {
        const index = todos.indexOf(todo);
        setTodos(todos.filter((_, i) => i !== index))
        console.log('Removeu' + todo.title);
    }
    const toggle = (todo: Todo) => {
        const index = todos.indexOf(todo);
        todos[index].done = !todo.done;
        setTodos([...todos]);
        console.log('Alterou' + todo.title);
    }

    return(
        <TodoContext.Provider value={{todos, addTodo, removeTodo, toggle}}>
            {props.children}

        </TodoContext.Provider>
    )
}

export default TodoProvider;