package nova.gestion.mappers;


import nova.gestion.model.Client;
import nova.gestion.model.Program;
import nova.gestion.model.WorkSheetClientProgram;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface WorkSheetClientProgramMapper {

    WorkSheetClientProgram getWorkSheetClientProgram(int idWorkSheetClientProgram);

    void insertProgramClient(@Param("program")Program program, @Param("client")Client client);

    void updateProgramClient(@Param("program")Program program, @Param("client")Client client);
}
