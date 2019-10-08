package nova.gestion.services;


import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.BlankMapper;
import nova.gestion.mappers.CoolantHoleMapper;
import nova.gestion.mappers.GradeMapper;
import nova.gestion.model.Blank;
import nova.gestion.model.CoolantHole;
import nova.gestion.model.Grade;
import nova.gestion.model.post.BlankPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class BlankService {

    private final BlankMapper blankMapper;
    private final GradeMapper gradeMapper;
    private final CoolantHoleMapper coolantHoleMapper;

    @Autowired
    public BlankService(BlankMapper blankMapper, GradeMapper gradeMapper, CoolantHoleMapper coolantHoleMapper) {
        this.blankMapper = blankMapper;
        this.gradeMapper = gradeMapper;
        this.coolantHoleMapper = coolantHoleMapper;
    }

    @Transactional
    public ArrayList<Blank> getListOfAllBlanks() {
        ArrayList<Blank> blanks = blankMapper.getAllBlanks();

        if (blanks == null)
            throw new RessourceNotFound("No blanks available");

        return blanks;
    }

    @Transactional
    public Blank getBlank(int idBlank){

        Blank blank = blankMapper.getBlank(idBlank);
        if (blank == null || idBlank == 0)
            throw new RessourceNotFound("Blank does not exist");

        return blank;
    }

    @Transactional
    public Integer createBlank(Integer idCoolantHole, Integer codeGrade, String name, int stockQuantity, int minimumQuantity, double diameter, double length) {

        if (idCoolantHole == null || codeGrade == null || name == null || stockQuantity == 0 || minimumQuantity == 0 || diameter == 0 || length == 0)
            throw new InvalidRequest("Missing parameters");

        if (name.isEmpty() || idCoolantHole == 0  || codeGrade == 0 || stockQuantity == 0 || minimumQuantity == 0 || diameter == 0 || length == 0)
            throw new InvalidRequest("Invalid parameters");

        Grade grade = gradeMapper.getGrade(codeGrade);
        CoolantHole coolantHole = coolantHoleMapper.getCoolantHole(idCoolantHole);

        if (grade == null)
            throw new InvalidRequest("Invalid grade");

        if (coolantHole == null)
            throw new InvalidRequest("Invalid coolantHole");


        Blank toInsert = new Blank(0, grade, coolantHole, name, stockQuantity, minimumQuantity, diameter, length);
        //Blank toInsert = new Blank(0)
        blankMapper.insertBlank(toInsert);

        return toInsert.getIdBlank();
    }

    @Transactional
    public void updateBlank(BlankPost blank) {
        if (blank == null)
            throw new InvalidRequest("No arguments passed");

        if (blank.getIdBlank() == 0)
            throw new InvalidRequest("No idBlank");

        Blank loadBlank = blankMapper.getBlank(blank.getIdBlank());

        if (loadBlank == null)
            throw new RessourceNotFound("Blank does not exist");

        if (blank.getCodeGrade() != 0 && loadBlank.getGrade().getCode() != blank.getCodeGrade())
            loadBlank.setGrade(gradeMapper.getGrade(blank.getCodeGrade()));

        if (blank.getIdCoolantHole() != 0 && loadBlank.getCoolantHole().getIdCoolantHole() != blank.getIdCoolantHole())
            loadBlank.setCoolantHole(coolantHoleMapper.getCoolantHole(blank.getIdCoolantHole()));

        if (blank.getName() != null && !loadBlank.getName().equals(blank.getName()) && !blank.getName().isEmpty())
            loadBlank.setName(blank.getName());

        if (blank.getStockQuantity() != 0 && loadBlank.getStockQuantity() != blank.getStockQuantity())
            loadBlank.setStockQuantity(blank.getStockQuantity());

        if (blank.getMinimumQuantity() != 0 && loadBlank.getMinimumQuantity() != blank.getMinimumQuantity())
            loadBlank.setMinimumQuantity(blank.getMinimumQuantity());

        if (blank.getDiameter() != 0 && loadBlank.getDiameter() != blank.getDiameter())
            loadBlank.setDiameter(blank.getDiameter());

        if (blank.getLength() != 0 && loadBlank.getLength() != blank.getLength())
            loadBlank.setLength(blank.getLength());

        blankMapper.updateBlank(loadBlank);
    }

}

