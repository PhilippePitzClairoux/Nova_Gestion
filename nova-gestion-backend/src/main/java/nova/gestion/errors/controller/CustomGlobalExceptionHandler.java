package nova.gestion.errors.controller;

import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.errors.model.Error;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class CustomGlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Error> customHandler(Exception ex, WebRequest request) {

        return new ResponseEntity<Error> (Error.builder()
                .httpStatus(HttpStatus.BAD_REQUEST.value())
                .exception(ex.getMessage())
                .errorMessage(ex.getLocalizedMessage())
                .timestamp(new Date())
                .build(), HttpStatus.BAD_REQUEST);
    }
}
