package nova.gestion.mappers;


import nova.gestion.model.WorkSheetClientProgram;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface WorkSheetClientProgramMapper {

    WorkSheetClientProgram getWorkSheetClientProgram(int idWorkSheetClientProgram);

    void insertWorkSheetClientProgram(WorkSheetClientProgram workSheetClientProgram);

}
