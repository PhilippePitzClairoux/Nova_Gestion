package nova.gestion.errors.controller;


import nova.gestion.errors.model.Error;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@ControllerAdvice
@Controller
public class CustomGlobalExceptionHandler implements ErrorController {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Error> customHandler(Exception ex, WebRequest request) {
        return new ResponseEntity<Error> (Error.builder()
                .httpStatus(HttpStatus.BAD_REQUEST.value())
                .exception(ex.getMessage())
                .errorMessage(ex.getLocalizedMessage())
                .timestamp(new Date())
                .build(), HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/error")
    @ResponseBody
    public ResponseEntity<Error> handleError(HttpServletRequest request) {
        return new ResponseEntity<Error> (Error.builder()
                .httpStatus(HttpStatus.NOT_FOUND.value())
                .exception("Page not found")
                .errorMessage("The page you're looking for does not exist")
                .timestamp(new Date())
                .build(), HttpStatus.NOT_FOUND);
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
