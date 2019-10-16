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

        Blank toInsert = new Blank(0, name, stockQuantity, minimumQuantity, diameter, length, grade, coolantHole);

        blankMapper.insertBlank(toInsert);

        return toInsert.getIdBlank();
    }

    @Transactional
    public void updateBlank(Blank blank) {
        Blank verifiedBlank = blankMapper.getBlank(blank.getIdBlank());

        if (blank.getIdBlank() ==0 || verifiedBlank == null)
            throw new InvalidRequest("Missing parameters");

        if (blank.getName() == null && blank.getStockQuantity() == 0 && blank.getMinimumQuantity() == 0 && blank.getDiameter() == 0 && blank.getLength() == 0 && blank.getGrade() == null && blank.getCoolantHole() == null)
            throw new InvalidRequest("Missing information");

        if (blank.getName() != null && blank.getStockQuantity() >= 0 && blank.getMinimumQuantity() >= 0 && blank.getDiameter() >= 0 && blank.getLength() >= 0 && blank.getGrade() != null && blank.getCoolantHole() != null)
            blankMapper.updateBlank(blank);

        if (blank.getCoolantHole() != null){
            if (blank.getCoolantHole().getDiameter() >= 0)
                verifiedBlank.getCoolantHole().setDiameter(blank.getCoolantHole().getDiameter());

            if (blank.getCoolantHole().getQuantity() >= 0)
                verifiedBlank.getCoolantHole().setQuantity(blank.getCoolantHole().getQuantity());

            if (blank.getCoolantHole().getTypeCoolantHole() != null)
                verifiedBlank.getCoolantHole().setTypeCoolantHole(blank.getCoolantHole().getTypeCoolantHole());

            coolantHoleMapper.updateCoolantHole(verifiedBlank.getCoolantHole());
        }
    }

    @Transactional
    public void deleteBlank(Integer idBlank) {

        Blank loadBlank = blankMapper.getBlank(idBlank);

        if (loadBlank == null)
            throw new RessourceNotFound("Invalid idBlank");

        blankMapper.deleteBlank(idBlank);
    }

}

