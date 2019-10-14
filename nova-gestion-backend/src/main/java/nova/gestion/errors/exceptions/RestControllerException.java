package nova.gestion.errors.exceptions;


//Base exception for when a user hands over an invalid input
public class RestControllerException extends RuntimeException {

    public RestControllerException(String exception) {
        super(exception);
    }
}
