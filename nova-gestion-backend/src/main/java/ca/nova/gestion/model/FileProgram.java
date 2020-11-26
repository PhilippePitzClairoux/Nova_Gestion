package ca.nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Data;


@Data
public class FileProgram {
    private Integer idTaFileProgram;
    private File file;
    private Integer idProgram;

    public FileProgram(File file) {
        this.file = file;
    }

    public FileProgram(Integer idTaFileProgram, Integer idProgram) {
        this.idTaFileProgram = idTaFileProgram;
        this.idProgram = idProgram;
    }

    @JsonCreator
    public FileProgram(Integer idTaFileProgram, File file, Integer idProgram) {
        this.idTaFileProgram = idTaFileProgram;
        this.file = file;
        this.idProgram = idProgram;
    }
}
