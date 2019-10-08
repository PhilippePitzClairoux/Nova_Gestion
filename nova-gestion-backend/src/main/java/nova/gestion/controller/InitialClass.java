package nova.gestion.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import nova.gestion.mappers.ClientMapper;
import nova.gestion.mappers.EmployeeMapper;
import nova.gestion.mappers.ToolMapper;
import nova.gestion.mappers.UserMapper;
import nova.gestion.model.Client;
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
    private final ToolMapper toolMapper;

    @Autowired
    public InitialClass(ObjectMapper objectMapper, UserMapper userMapper, ToolMapper toolMapper) {
        this.objectMapper = objectMapper;
        this.userMapper = userMapper;
        this.toolMapper = toolMapper;
    }


    @GetMapping
    public String getTest() throws JsonProcessingException {

        return objectMapper.writeValueAsString(toolMapper.getAllTool());
    }


}
