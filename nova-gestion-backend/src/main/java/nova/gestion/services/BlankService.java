package nova.gestion.services;


import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.BlankMapper;
import nova.gestion.mappers.CoolantHoleMapper;
import nova.gestion.mappers.GradeMapper;
import nova.gestion.model.Blank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur') or hasRole('Outilleur') or hasRole('Emballeur')")
    public ArrayList<Blank> getListOfAllBlanks() {
        ArrayList<Blank> blanks = blankMapper.getAllBlanks();

        if (blanks == null)
            throw new RessourceNotFound("No blanks available");

        return blanks;
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur') or hasRole('Outilleur') or hasRole('Emballeur')")
    public Blank getBlank(int idBlank) {

        Blank blank = blankMapper.getBlank(idBlank);
        if (blank == null || idBlank == 0)
            throw new RessourceNotFound("Blank does not exist");

        return blank;
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public Integer createBlank(Blank blank) {

        if (blank == null)
            throw new InvalidRequest("Missing parameters");

        if (blank.getGrade() == null)
            throw new InvalidRequest("Missing Grade");

        if (blank.getName() == null || blank.getDiameter() == null || blank.getLength() == null || blank.getCode() == null )
            throw new InvalidRequest("Missing Blank parameters");

        blankMapper.insertBlank(blank);

        return blank.getIdBlank();
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur') or hasRole('Outilleur') or hasRole('Emballeur')")
    public void updateBlank(Blank blank) {
        Blank verifiedBlank = blankMapper.getBlank(blank.getIdBlank());

        if (blank.getIdBlank() == 0 || verifiedBlank == null)
            throw new InvalidRequest("Missing parameters");

        if (blank.getName() == null && blank.getDiameter() == null && blank.getLength() == null && blank.getGrade() == null )
            throw new InvalidRequest("Missing information");

        if (blank.getName() != null || blank.getDiameter() != null || blank.getLength() != null || blank.getCode() != null || blank.getGrade() != null )
            blankMapper.updateBlank(blank);

    }


    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public void deleteBlank(Integer idBlank) {

        Blank loadBlank = blankMapper.getBlank(idBlank);

        if (loadBlank == null)
            throw new RessourceNotFound("Invalid idBlank");

        blankMapper.deleteBlank(idBlank);
    }

}

