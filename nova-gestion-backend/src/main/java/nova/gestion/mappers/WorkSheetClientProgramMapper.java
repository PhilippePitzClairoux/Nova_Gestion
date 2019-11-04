package nova.gestion.mappers;


import nova.gestion.model.Client;
import nova.gestion.model.Program;
import nova.gestion.model.WorkSheetClientProgram;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface WorkSheetClientProgramMapper {

    WorkSheetClientProgram getWorkSheetClientProgram(int idWorkSheetClientProgram);

    void insertProgramClient(@Param("idProgram")int idProgram, @Param("idClient")int idClient);
   // void updateProgramClient();

    ArrayList<WorkSheetClientProgram> getClientsByProgram(int idProgram);

}
