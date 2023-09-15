import React, {createContext, useEffect, useState} from "react";
import { TodoContextType } from './TodoContextType';
import { Todo } from "../models/Todo";
import { get, save } from "../service/TodoService";


export const TodoContext = createContext <TodoContextType>({
    
    todos: 
    [  
        //{id: 1, title: 'Ir ao supermercado', done: false},
        //{id: 2, title: 'Ir a academia', done: false}
    ],
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
        const todo: Todo = {id: todos.length + 1, title: title, done: false}
        setTodos([...todos, todo])
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
        console.log('Alterou' + todo.title);
    }

    return(
        <TodoContext.Provider value={
            {todos, addTodo, removeTodo, toggle}
          }>
            {props.children}

        </TodoContext.Provider>
    )
}

export default TodoProvider;