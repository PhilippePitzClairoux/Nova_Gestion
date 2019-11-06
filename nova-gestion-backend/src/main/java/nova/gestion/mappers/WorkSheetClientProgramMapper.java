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

    WorkSheetClientProgram getWorkSheetClientProgram(@Param("idWorkSheet")int idWorkSheet);

    void insertWorkSheetClientProgram(@Param("idWorkSheet")int idWorkSheet, @Param("idProgram")int idProgram, @Param("idClient")int idClient);

    void updateWorkSheetClientProgram(@Param("idWorkSheet")int idWorkSheet, @Param("idProgram")int idProgram, @Param("idClient")int idClient);

    void deleteWorkSheetClientProgram(int idWorkSheet);

    ArrayList<WorkSheetClientProgram> getAllWorkSheetClientPrograms();

    void insertProgramClient(@Param("idProgram")int idProgram, @Param("idClient")int idClient);

    ArrayList<WorkSheetClientProgram> getClientsByProgram(int idProgram);

    void deleteProgramClient(@Param("idProgram")int idProgram, @Param("idClient")int idClient);


}
