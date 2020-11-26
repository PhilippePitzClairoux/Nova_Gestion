package ca.nova.gestion.services;

import ca.nova.gestion.errors.exceptions.InvalidRequest;
import ca.nova.gestion.errors.exceptions.RessourceNotFound;
import ca.nova.gestion.mappers.FileMapper;
import ca.nova.gestion.mappers.FileProgramMapper;
import ca.nova.gestion.model.File;
import ca.nova.gestion.model.FileProgram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FileProgramService {

    private final FileProgramMapper fileProgramMapper;
    private final FileMapper fileMapper;

    @Autowired
    public FileProgramService(FileProgramMapper fileProgramMapper, FileMapper fileMapper) {
        this.fileProgramMapper = fileProgramMapper;
        this.fileMapper = fileMapper;
    }

    @Transactional
    public File getFile(FileProgram fileProgram) {

        if (fileProgram == null)
            throw new InvalidRequest("Invalid Request");

        if (fileProgram.getIdTaFileProgram() == null)
            throw new InvalidRequest("Invalid Request");

        File file = fileProgramMapper.selectFileProgram(fileProgram.getIdTaFileProgram()).getFile();

        if (file == null)
            throw new RessourceNotFound("Ressource Not Found");

        return file;
    }

    @Transactional
    public Integer insertFile(FileProgram fileProgram) {
        if (fileProgram == null)
            throw new InvalidRequest("Invalid Request");

        if (fileProgram.getFile() == null || fileProgram.getIdProgram() == null)
            throw new InvalidRequest("Invalid Request");

        //Check if the file has been uploaded
        if (fileMapper.selectFile(fileProgram.getFile().getFileName()) == null)
            throw new InvalidRequest("Invalid Request");

        fileProgramMapper.insertFileProgram(fileProgram);

        return fileProgram.getIdTaFileProgram();
    }

    @Transactional
    public void removeFile(FileProgram fileProgram) {
        if (fileProgram == null)
            throw new InvalidRequest("Invalid Request");

        if (fileProgram.getIdTaFileProgram() == null)
            throw new InvalidRequest("Invalid Request");

    }

}
