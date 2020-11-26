package ca.nova.gestion.errors.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@Data
public class Error {
    private Date timestamp;
    private String message;
    private String path;
}
