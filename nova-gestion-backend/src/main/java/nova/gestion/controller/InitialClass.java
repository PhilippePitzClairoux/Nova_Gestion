package nova.gestion.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import nova.gestion.mappers.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/v1/test", produces = MediaType.APPLICATION_JSON_VALUE)
public class InitialClass {

    private final ObjectMapper objectMapper;
    private final UserMapper userMapper;
    private final ClientMapper clientMapper;
    private final ToolMapper toolMapper;
    private final BlankMapper blankMapper;

    @Autowired
    public InitialClass(ObjectMapper objectMapper, UserMapper userMapper, ClientMapper clientMapper, ToolMapper toolMapper, BlankMapper blankMapper) {
        this.objectMapper = objectMapper;
        this.userMapper = userMapper;
        this.clientMapper = clientMapper;
        this.toolMapper = toolMapper;
        this.blankMapper = blankMapper;
    }


    @GetMapping
    public String getTest() throws JsonProcessingException {

        return objectMapper.writeValueAsString(blankMapper.getAllBlanks());
    }


}
