package nova.gestion.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.Grade;
import nova.gestion.model.TypeUser;
import nova.gestion.services.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class GradeController {

    private final GradeService gradeService;

    @Autowired
    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    /**
     * GET /v1/grades -> retourne la liste des grades
     * @return ArrayList {@link nova.gestion.model.Grade}
     * @throws JsonProcessingException
     */
    @GetMapping("/v1/grades")
    public ArrayList<Grade> getAllGrades() throws JsonProcessingException {
        return gradeService.getAllGrades();
    }
}
