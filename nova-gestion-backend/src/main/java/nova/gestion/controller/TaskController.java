package nova.gestion.controller;

import nova.gestion.model.Task;
import nova.gestion.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@Controller
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/v1/task/{idWorkSheet}")
    public ArrayList<Task> getTasks(@PathVariable @Validated int idWorkSheet) {
        return taskService.getTasks(idWorkSheet);
    }

    @PostMapping("/v1/task")
    public Map<String, Integer> insertTask(@RequestBody @Validated Task task) {
        return Map.of("idTask", taskService.insertTask(task));
    }

    @PutMapping("/v1/task")
    public void updateTask(@RequestBody @Validated Task task) {
        taskService.updateTask(task);
    }

    @DeleteMapping("/v1/task/{idTask}")
    public void deleteTask(@PathVariable @Validated int idTask) {
        taskService.deleteTask(idTask);
    }
}
