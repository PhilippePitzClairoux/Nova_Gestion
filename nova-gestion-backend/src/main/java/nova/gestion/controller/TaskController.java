package nova.gestion.controller;

import nova.gestion.model.Task;
import nova.gestion.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * GET /v1/task/{idWorkSheet/ -> retourne la liste des tasks
     * @param idWorkSheet l'id de la work sheet voulu
     * @return ArrayList {@link nova.gestion.model.Task}
     *
     */
    @GetMapping("/v1/task/{idWorkSheet")
    public ArrayList<Task> getTasks(@PathVariable @Validated int idWorkSheet) {
        return taskService.getTasks(idWorkSheet);
    }

    /**
     * POST /v1/task
     * Cree une task dans la base de donnee
     * @param task
     * @return idTask ajoutée
     */
    @PostMapping("/v1/task")
    public Map<String, Integer> insertTask(@RequestBody @Validated Task task) {
        return Map.of("idTask", taskService.insertTask(task));
    }

    /**
     * PUT /v1/task
     * Mis à jour une task dans la BD
     * @param task
     */
    @PutMapping("/v1/task")
    public void updateTask(@RequestBody @Validated Task task) {
        taskService.updateTask(task);
    }

    /**
     * DELETE /v1/task/{idTask}/
     * Supprime un task de la BD avec l'id spécifié
     * @param idTask
     */
    @DeleteMapping("/v1/task/{idTask}")
    public void deleteTask(@PathVariable @Validated int idTask) {
        taskService.deleteTask(idTask);
    }
}
