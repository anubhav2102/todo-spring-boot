package com.example.springboottodoapplication.services;

import com.example.springboottodoapplication.models.TodoItem;
import com.example.springboottodoapplication.repositories.TodoItemRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class TodoItemService {

    private final TodoItemRepository todoItemRepository;

    public TodoItemService(TodoItemRepository todoItemRepository) {
        this.todoItemRepository = todoItemRepository;
    }

public TodoItem createTodoItem(TodoItem todoItem) {
    TodoItem savedTodoItem = todoItemRepository.save(todoItem);
    return savedTodoItem;
}
    public List<TodoItem> getAllTodoItems() {
        return todoItemRepository.findAll();
    }
    public TodoItem updateTodoItem(TodoItem todoItem) {
        return todoItemRepository.save(todoItem);
    }

    public void deleteTodoItemById(Long id) {
        todoItemRepository.deleteById(id);
    }

    public TodoItem getTodoItemById(Long id) {
        Optional<TodoItem> optionalTodoItem = todoItemRepository.findById(id);
        return optionalTodoItem.orElse(null);
    }
    public boolean existsById(Long id) {
        return todoItemRepository.existsById(id);
    }

}
