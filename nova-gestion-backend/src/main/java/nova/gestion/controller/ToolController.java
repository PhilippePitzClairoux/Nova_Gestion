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
@RequestMapping(value = "/v1/tool", produces = MediaType.APPLICATION_JSON_VALUE)
public class ToolController {

    private final ToolService toolService;

    @Autowired
    public ToolController(ToolService toolService) {
        this.toolService = toolService;
    }

    @GetMapping
    public ArrayList<Tool> getAllTools() throws JsonProcessingException {
        return toolService.getListOfAllTools();
    }

    @GetMapping("/{idTool}/")
    public Tool getTool(@PathVariable @Validated Integer idTool) {
        return toolService.getTool(idTool);
    }

    @PostMapping
    public Map<String, Integer> createTool(@JsonView(ToolPost.Views.Insert.class)
                                           @RequestBody @Validated ToolPost tool) {

        Integer id = toolService.createTool(tool.getName(), tool.getStockQuantity(), tool.getMinimumQuantity());

        return Map.of("id", id);
    }

    @PutMapping
    public void updateTool(@JsonView(ToolPost.Views.Update.class)
                           @RequestBody @Valid ToolPost tool) {
        toolService.updateTool(tool);
    }

    @DeleteMapping
    public void deleteTool(@JsonView(ToolPost.Views.Delete.class)
                           @RequestBody @Validated ToolPost tool) {
        toolService.deleteTool(tool);
    }

}
