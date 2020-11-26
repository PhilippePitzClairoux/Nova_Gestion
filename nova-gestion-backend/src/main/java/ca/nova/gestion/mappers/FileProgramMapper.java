package ca.nova.gestion.mappers;

import ca.nova.gestion.model.FileProgram;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface FileProgramMapper {

    FileProgram selectFileProgram(Integer idTaFileProgram);

    ArrayList<FileProgram> selectAllFileProgramByIdProgram(Integer idProgram);

    void insertFileProgram(FileProgram fileProgram);

    void deleteFileProgram(Integer idFileProgram);
}
