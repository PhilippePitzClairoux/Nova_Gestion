package nova.gestion.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.Program;
import nova.gestion.model.User;
import nova.gestion.services.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class ProgramController {
    private final ProgramService programService;

    @Autowired
    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping("/v1/programs")
    public ArrayList<Program> getAllPrograms() throws JsonProcessingException {
        return programService.getAllPrograms();
    }

    @GetMapping("/v1/program/{idProgram}/")
    public Program getProgram(@PathVariable @Validated int idProgram){
        return programService.getProgram(idProgram);
    }

    @PostMapping("/v1/program")
    public Map<String, Integer> createProgram(@RequestBody @Validated Program program) {

        return Map.of("idProgram", programService.createProgram(program));
    }

    @PutMapping("/v1/program")
    public void updateProgram(@RequestBody @Valid Program program) {
        programService.updateProgram(program);
    }


}
