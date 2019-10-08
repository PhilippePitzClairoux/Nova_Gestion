package nova.gestion.controller;


import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.Blank;
import nova.gestion.model.post.BlankPost;
import nova.gestion.services.BlankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(value = "/v1/blank", produces = MediaType.APPLICATION_JSON_VALUE)
public class BlankController {

    private final BlankService blankService;

    @Autowired
    public BlankController(BlankService blankService) {
        this.blankService = blankService;
    }

    @GetMapping
    public ArrayList<Blank> getAllBlanks() throws JsonProcessingException {
        return blankService.getListOfAllBlanks();
    }

    @GetMapping("/{idBlank}/")
    public Blank getBlank(@PathVariable @Validated int idBlank){
        return blankService.getBlank(idBlank);
    }

    @PostMapping
    public Map<String, Integer> createBlank(@JsonView(BlankPost.Views.Insert.class)
                                           @RequestBody @Validated BlankPost blank) {

        Integer id = blankService.createBlank(blank.getIdCoolantHole(),blank.getCodeGrade(),blank.getName(), blank.getStockQuantity(), blank.getMinimumQuantity(), blank.getDiameter(), blank.getLength());

        return Map.of("id", id);
    }

    @PutMapping
    public void updateBlank(@JsonView(BlankPost.Views.Update.class)
                           @RequestBody @Valid BlankPost blank) {
        blankService.updateBlank(blank);
    }

}
