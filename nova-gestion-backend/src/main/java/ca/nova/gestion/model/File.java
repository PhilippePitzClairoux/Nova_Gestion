package ca.nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Data;

@Data
public class File {
    private String fileName;

    @JsonCreator
    public File(String fileName) {
        this.fileName = fileName;
    }
}
