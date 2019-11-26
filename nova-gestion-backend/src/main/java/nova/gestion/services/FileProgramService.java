package nova.gestion.services;

import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.FileMapper;
import nova.gestion.mappers.FileProgramMapper;
import nova.gestion.model.File;
import nova.gestion.model.FileProgram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

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

        if (fileProgram.getIdTaFileProgram() == null || fileProgram.getIdProgram() == null)
            throw new InvalidRequest("Invalid Request");

        if (fileMapper.selectFile(fileProgram.getFile().getFileName()) == null)
            fileMapper.insertFile(fileProgram.getFile());

        fileProgramMapper.insertFileProgram(fileProgram);

        return fileProgram.getIdTaFileProgram();
    }

}
