package ca.nova.gestion.mappers;


import ca.nova.gestion.model.Program;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface ProgramMapper {
    Program getProgram(int idProgram);

    ArrayList<Program> getAllPrograms();

    void insertProgram(Program program);

    void updateProgram(Program program);

    void deleteProgram(int idProgram);

}
