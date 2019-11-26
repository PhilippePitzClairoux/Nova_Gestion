package nova.gestion.controller;

import nova.gestion.model.TaskType;
import nova.gestion.services.TaskTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class TaskTypeController {

    private final TaskTypeService taskTypeService;

    @Autowired
    public TaskTypeController(TaskTypeService taskTypeService) {
        this.taskTypeService = taskTypeService;
    }

    /**
     * GET /v1/tasktypes -> retourne la liste des tasktypes
     * @return ArrayList {@link nova.gestion.model.TaskType}
     *
     */
    @GetMapping("/v1/taskTypes")
    public ArrayList<TaskType> getTaskTypes() {
        return taskTypeService.getAllTaskTypes();
    }

}
