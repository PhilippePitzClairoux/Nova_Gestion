package nova.gestion.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import nova.gestion.mappers.UserMapper;
import nova.gestion.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value = "/v1/test", produces = MediaType.APPLICATION_JSON_VALUE)
public class InitialClass {

    private final ObjectMapper objectMapper;
    private final UserMapper userMapper;

    @Autowired
    public InitialClass(ObjectMapper objectMapper, UserMapper userMapper) {
        this.objectMapper = objectMapper;
        this.userMapper = userMapper;
    }


    @GetMapping
    public String getTest() throws JsonProcessingException {

        User user = userMapper.getUser(1L);

        return objectMapper.writeValueAsString(user);
    }

}
