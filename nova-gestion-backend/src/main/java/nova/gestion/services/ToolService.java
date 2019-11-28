package nova.gestion.services;

import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.ToolMapper;
import nova.gestion.model.Tool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur') or hasRole('Outilleur') or hasRole('Emballeur')")
    public ArrayList<Tool> getListOfAllTools() {
        ArrayList<Tool> tools = toolMapper.getAllTool();

        if (tools == null)
            throw new RessourceNotFound("No tools available");

        return tools;
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur') or hasRole('Outilleur') or hasRole('Emballeur')")
    public Tool getTool(Integer idTool) {

        Tool tool = toolMapper.getTool(idTool);

        if (tool == null || idTool == 0)
            throw new RessourceNotFound("Tool does not exist");

        return tool;
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public Integer createTool(Tool tool) {

        if (tool == null)
            throw new InvalidRequest("Missing parameters");

        if (tool.getClient() == null)
            throw new InvalidRequest("Missing client");

        if (tool.getName() == null || tool.getStockQuantity() < 0 || tool.getMinimumQuantity() < 0)
            throw new InvalidRequest("Missing tool parameters");

        if (tool.getClient().getName() == null || tool.getClient().getPhoneNumber() == null)
            throw new InvalidRequest("Missing Client parameters");

        toolMapper.insertTool(tool);

        return tool.getIdTool();
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public void updateTool(Tool tool) {
        Tool verifiedTool = toolMapper.getTool(tool.getIdTool());

        if (tool.getIdTool() == 0 || verifiedTool == null)
            throw new InvalidRequest("Missing parameters");

        if(tool.getName() == null && tool.getStockQuantity() < 0 && tool.getMinimumQuantity() < 0 && tool.getClient() ==null){
            throw new InvalidRequest("Missing information");
        }

        if (tool.getName() != null || tool.getStockQuantity() >= 0 || tool.getMinimumQuantity() >= 0 || tool.getClient() != null){
            toolMapper.updateTool(tool);
        }
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public void deleteTool(Integer idTool) {

        Tool loadTool = toolMapper.getTool(idTool);

        if (loadTool == null)
            throw new RessourceNotFound("Invalid idTool");

        toolMapper.deleteTool(loadTool);
    }
}


