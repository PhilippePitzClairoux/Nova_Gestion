package ca.nova.gestion.errors.controller;

import ca.nova.gestion.errors.model.Error;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Controller
public class CustomGlobalExceptionHandler implements ErrorController {


    @RequestMapping("/error")
    @ResponseBody
    public ResponseEntity<Error> handleError(HttpServletRequest request, Exception ex) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        String message = (String) request.getAttribute("javax.servlet.error.message");
        String uri = (String) request.getAttribute("javax.servlet.error.request_uri");

        return new ResponseEntity<>(Error.builder()
                .timestamp(new Date())
                .message(message)
                .path(uri)
                .build(), HttpStatus.valueOf(statusCode));
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
