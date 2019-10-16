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
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class BlankController {

    private final BlankService blankService;

    @Autowired
    public BlankController(BlankService blankService) {
        this.blankService = blankService;
    }

    @GetMapping("/v1/blanks")
    public ArrayList<Blank> getAllBlanks() throws JsonProcessingException {
        return blankService.getListOfAllBlanks();
    }

    @GetMapping("/v1/blank/{idBlank}/")
    public Blank getBlank(@PathVariable @Validated int idBlank){
        return blankService.getBlank(idBlank);
    }

    @PostMapping("/v1/blank")
    public Map<String, Integer> createBlank(@JsonView(BlankPost.Views.Insert.class)
                                           @RequestBody @Validated BlankPost blank) {

        Integer id = blankService.createBlank(blank.getIdCoolantHole(),blank.getCodeGrade(),blank.getName(), blank.getStockQuantity(), blank.getMinimumQuantity(), blank.getDiameter(), blank.getLength());

        return Map.of("id", id);
    }

    @PutMapping("/v1/blank")
    public void updateBlank(@RequestBody @Valid Blank blank) {
        blankService.updateBlank(blank);
    }

    @DeleteMapping("/v1/blank/{idBlank}/")
    public void deleteBlank(@PathVariable @Validated Integer idBlank) {
        blankService.deleteBlank(idBlank);
    }
}
