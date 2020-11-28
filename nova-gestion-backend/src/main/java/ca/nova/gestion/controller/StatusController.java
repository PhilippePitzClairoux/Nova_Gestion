package ca.nova.gestion.controller;

import ca.nova.gestion.model.Status;
import ca.nova.gestion.services.StatusService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class StatusController {

    private final StatusService statusService;

    @Autowired
    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    /**
     * GET /v1/status -> retourne la liste des status
     * @return ArrayList {@link Status}
     * @throws JsonProcessingException
     */
    @GetMapping("/v1/status")
    public ArrayList<Status> getAllStatus() throws JsonProcessingException {
        return statusService.getAllStatus();
    }
}
