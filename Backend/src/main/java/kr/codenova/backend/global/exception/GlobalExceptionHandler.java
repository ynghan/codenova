package kr.codenova.backend.global.exception;

import jakarta.persistence.EntityNotFoundException;
import kr.codenova.backend.global.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import static kr.codenova.backend.global.response.ResponseCode.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = CustomException.class)
    protected ResponseEntity<?> handleCustomException(CustomException exception) {

        return ResponseEntity.ok(
                Response.create(exception.getResponseCode(), exception.getContent()));
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, BindException.class})
    public ResponseEntity<?> bindingException(BindException e) {
        BindingResult bindingResult = e.getBindingResult();
        String field = getFieldName(bindingResult);
        String message = getDefaultMessage(bindingResult);

        ExceptionContent content = new ExceptionContent(field, message);
        return new ResponseEntity<>(Response.create(BINDING_ERROR, content), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({RequestRejectedException.class, HttpRequestMethodNotSupportedException.class, IllegalArgumentException.class, MethodArgumentTypeMismatchException.class})
    public ResponseEntity<?> Exception(BindException e) {
        return new ResponseEntity<>(Response.create(BAD_REQUEST, null), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    protected ResponseEntity<?> handleEntityNotFoundException(EntityNotFoundException e) {
        return new ResponseEntity<>(Response.create(ENTITY_NOT_FOUND, null), HttpStatus.NOT_FOUND);
    }

    private String getDefaultMessage(BindingResult bindingResult) {
        String defaultMessage = "";
        try {
            defaultMessage = bindingResult.getFieldError().getDefaultMessage();
        } catch (NullPointerException e) {
        }
        return defaultMessage;
    }

    private String getFieldName(BindingResult bindingResult) {
        String fieldName = "";
        try {
            fieldName = bindingResult.getFieldError().getField();
        } catch (NullPointerException e) {
        }
        return fieldName;
    }
}