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
    public Integer createBlank(Blank blank){

        if (blank == null)
            throw new InvalidRequest("Missing parameters");

        if (blank.getGrade() == null)
            throw new InvalidRequest("Missing Grade");

        if (blank.getName() == null || blank.getDiameter() < 0 || blank.getLength() < 0 )
            throw new InvalidRequest("Missing Blank parameters");

        if (blank.getCoolantHole() != null)
        {
            if (blank.getCoolantHole().getTypeCoolantHole() == null || blank.getCoolantHole().getQuantity() < 0 || blank.getCoolantHole().getDiameter() < 0)
                throw new InvalidRequest("Missing CoolantHole parameters");
            else
                coolantHoleMapper.insertCoolantHole(blank.getCoolantHole());
        }
        blankMapper.insertBlank(blank);

        return blank.getIdBlank();
    }

    @Transactional
    public void updateBlank(Blank blank) {
        Blank verifiedBlank = blankMapper.getBlank(blank.getIdBlank());

        if (blank.getIdBlank() ==0 || verifiedBlank == null)
            throw new InvalidRequest("Missing parameters");

        if (blank.getName() == null && blank.getMinimumQuantity() == 0 && blank.getDiameter() == 0 && blank.getLength() == 0 && blank.getGrade() == null )
            throw new InvalidRequest("Missing information");

        if (blank.getName() != null || blank.getMinimumQuantity() >= 0 || blank.getDiameter() >= 0 || blank.getLength() >= 0 || blank.getGrade() != null || blank.getCoolantHole() != null)
            blankMapper.updateBlank(blank);

        if (blank.getCoolantHole() != null){
            if (verifiedBlank.getCoolantHole()!=null) {
                if (blank.getCoolantHole().getDiameter() >= 0)
                    verifiedBlank.getCoolantHole().setDiameter(blank.getCoolantHole().getDiameter());

                if (blank.getCoolantHole().getQuantity() >= 0)
                    verifiedBlank.getCoolantHole().setQuantity(blank.getCoolantHole().getQuantity());

                if (blank.getCoolantHole().getTypeCoolantHole() != null)
                    verifiedBlank.getCoolantHole().setTypeCoolantHole(blank.getCoolantHole().getTypeCoolantHole());

                coolantHoleMapper.updateCoolantHole(verifiedBlank.getCoolantHole());
            }else {
                coolantHoleMapper.insertCoolantHole(blank.getCoolantHole());
            }
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

