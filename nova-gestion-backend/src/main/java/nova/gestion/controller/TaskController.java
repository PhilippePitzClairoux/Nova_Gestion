package nova.gestion.controller;

import nova.gestion.model.Task;
import nova.gestion.services.TaskService;
import nova.gestion.services.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    @Autowired
    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    /**
     * GET /v1/task/{idWorkSheet/ -> retourne la liste des tasks
     * @param idWorkSheet l'id de la work sheet voulu
     * @return ArrayList {@link nova.gestion.model.Task}
     *
     */
    @GetMapping("/v1/task/{idWorkSheet}")
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
    public Map<String, Integer> insertTask(@RequestBody @Validated Task task, Authentication authentication) {
        task.setUser(userService.getUserByEmail(authentication.getName()));
        System.out.println(task);
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
