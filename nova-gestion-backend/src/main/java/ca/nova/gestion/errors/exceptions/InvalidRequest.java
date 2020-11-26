package ca.nova.gestion.errors.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidRequest extends RestControllerException {
    public InvalidRequest(String exception) {
        super(exception);
    }
}
