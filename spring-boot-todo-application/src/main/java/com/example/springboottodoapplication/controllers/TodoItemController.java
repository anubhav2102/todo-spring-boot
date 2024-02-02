package com.example.springboottodoapplication.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboottodoapplication.models.TodoItem;
import com.example.springboottodoapplication.services.TodoItemService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoItemController {
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
    private final TodoItemService todoItemService;

    @Autowired

    private final ObjectMapper objectMapper;

    public TodoItemController(TodoItemService todoItemService, ObjectMapper objectMapper) {
        this.todoItemService = todoItemService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/api/create-task")
    public ResponseEntity<TodoItem> createTodoItem(@RequestBody String requestBody) {
        try {
            TodoItem todoItem = objectMapper.readValue(requestBody, TodoItem.class);
            TodoItem savedTodoItem = todoItemService.createTodoItem(todoItem);
            return new ResponseEntity<>(savedTodoItem, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/api/all-tasks")
    public List<TodoItem> getAllTodoItems() {
        return todoItemService.getAllTodoItems();
    }
    @PutMapping("/api/update-task/{id}")
    public ResponseEntity<TodoItem> updateTodoItem(@PathVariable Long id, @RequestBody TodoItem updatedTodoItem) {
        TodoItem existingTodoItem = todoItemService.getTodoItemById(id);
        if (existingTodoItem == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        existingTodoItem.setTask(updatedTodoItem.getTask());
        existingTodoItem.setDescription(updatedTodoItem.getDescription());
        existingTodoItem.setStatus(updatedTodoItem.getStatus());
        existingTodoItem.setDueDate(updatedTodoItem.getDueDate());
        TodoItem savedTodoItem = todoItemService.updateTodoItem(existingTodoItem);
        return new ResponseEntity<>(savedTodoItem, HttpStatus.OK);
    }

    @DeleteMapping("/api/delete-task/{id}")
    public ResponseEntity<Void> deleteTodoItem(@PathVariable Long id) {
        if (!todoItemService.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        todoItemService.deleteTodoItemById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
