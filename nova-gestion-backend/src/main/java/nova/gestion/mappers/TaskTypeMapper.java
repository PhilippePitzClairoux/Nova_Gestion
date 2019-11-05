package nova.gestion.mappers;

import nova.gestion.model.TaskType;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface TaskTypeMapper {

    TaskType getTaskTypeById(int idTaskType);

}
