package nova.gestion.services;

import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.GradeMapper;
import nova.gestion.model.Grade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class GradeService {
    private final GradeMapper gradeMapper;

    @Autowired
    public GradeService(GradeMapper gradeMapper) {
        this.gradeMapper = gradeMapper;
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public ArrayList<Grade> getAllGrades() {
        ArrayList<Grade> grades = gradeMapper.getAllGrades();

        if (grades == null)
            throw new RessourceNotFound("No grades available");

        return grades;
    }
}
