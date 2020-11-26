package ca.nova.gestion.mappers;

import ca.nova.gestion.model.Tool;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface ToolMapper {

    Tool getTool(int idTool);
    ArrayList<Tool> getAllTool();
    void insertTool(Tool tool);
    void updateTool(Tool tool);
    void deleteTool(Tool tool);

}
