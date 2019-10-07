package nova.gestion.mappers;

import nova.gestion.model.Tool;

@Mapper
@Repository
public interface ToolMapper {

    Tool getTool(Long idTool);

}
