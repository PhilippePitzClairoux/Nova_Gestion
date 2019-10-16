package nova.gestion.controller;


import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.Tool;
import nova.gestion.model.post.ToolPost;
import nova.gestion.services.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class ToolController {

    private final ToolService toolService;

    @Autowired
    public ToolController(ToolService toolService) {
        this.toolService = toolService;
    }

    @GetMapping("/v1/tools")
    public ArrayList<Tool> getAllTools() throws JsonProcessingException {
        return toolService.getListOfAllTools();
    }

    @GetMapping("/v1/tool/{idTool}")
    public Tool getTool(@PathVariable @Validated Integer idTool) {
        return toolService.getTool(idTool);
    }

    @PostMapping("/v1/tool")
    public Map<String, Integer> createTool(@RequestBody @Validated Tool tool) {

        Integer id = toolService.createTool(tool);

        return Map.of("idTool", id);
    }

    @PutMapping("/v1/tool")
    public void updateTool(@RequestBody @Valid Tool tool) {
        toolService.updateTool(tool);
    }

    @DeleteMapping("/v1/tool/{idTool}")
    public void deleteTool(@PathVariable @Validated Integer idTool) {
        toolService.deleteTool(idTool);
    }
}
