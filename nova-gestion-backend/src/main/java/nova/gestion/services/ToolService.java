package nova.gestion.services;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.ToolMapper;
import nova.gestion.model.Tool;
import nova.gestion.model.post.ToolPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class ToolService {

    private final ToolMapper toolMapper;

    @Autowired
    public ToolService(ToolMapper toolMapper) {
        this.toolMapper = toolMapper;
    }

    @Transactional
    public ArrayList<Tool> getListOfAllTools() {
        ArrayList<Tool> tools = toolMapper.getAllTool();

        if (tools == null)
            throw new RessourceNotFound("No tools available");

        return tools;
    }

    @Transactional
    public Tool getTool(int idTool) {

        Tool tool = toolMapper.getTool(idTool);

        if (tool == null || idTool == 0)
            throw new RessourceNotFound("Tool does not exist");

        return tool;
    }

    @Transactional
    public Integer createTool(String name, Integer stockQuantity, Integer minimumQuantity) {

        if (name == null || stockQuantity == null || minimumQuantity == null)
            throw new InvalidRequest("Missing parameters");

        if (name.isEmpty() || stockQuantity == 0 || minimumQuantity == 0)
            throw new InvalidRequest("Invalid parameters");

        Tool toInsert = new Tool(0, name, stockQuantity, minimumQuantity);
        toolMapper.insertTool(toInsert);

        return toInsert.getIdTool();
    }

    @Transactional
    public void updateTool(ToolPost tool) {
        if (tool == null)
            throw new InvalidRequest("No arguments passed");

        if (tool.getIdTool() == 0)
            throw new InvalidRequest("No idTool");

        Tool loadTool = toolMapper.getTool(tool.getIdTool());

        if (loadTool == null)
            throw new RessourceNotFound("Tool does not exist");

        if (tool.getName() != null && !loadTool.getName().equals(tool.getName()) && !tool.getName().isEmpty())
            loadTool.setName(tool.getName());

        if (tool.getStockQuantity() != 0 && loadTool.getStockQuantity() != tool.getStockQuantity())
            loadTool.setStockQuantity(tool.getStockQuantity());

        if (tool.getMinimumQuantity() != 0 && loadTool.getMinimumQuantity() != tool.getMinimumQuantity())
            loadTool.setMinimumQuantity(tool.getMinimumQuantity());

        toolMapper.updateTool(loadTool);
    }

    @Transactional
    public void deleteTool(ToolPost tool) {

        Tool loadTool = toolMapper.getTool(tool.getIdTool());

        if (loadTool == null)
            throw new RessourceNotFound("Invalid idTool");

        toolMapper.deleteTool(loadTool);
    }
}
