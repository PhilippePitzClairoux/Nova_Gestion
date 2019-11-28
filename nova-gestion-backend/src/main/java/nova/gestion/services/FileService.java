package nova.gestion.services;

import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.mappers.FileMapper;
import nova.gestion.model.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {

    private final FileMapper fileMapper;
    //private static final String PATH = "/home/x/program_files/";
    private static final String PATH = "C://Users/lecle/Documents/";

    @Autowired
    public FileService(FileMapper fileMapper) {
        this.fileMapper = fileMapper;
    }

    @Transactional
    public File insertFile(MultipartFile multipartFile, File file) throws IOException {

        if (fileMapper.selectFile(file.getFileName()) == null) {
            //store in database
            fileMapper.insertFile(file);
            //store on the server
            saveFile(multipartFile, file);
        }

        return file;
    }

    @Transactional
    public ByteArrayResource getFile(File file) throws IOException {
        Path desiredFile = Paths.get(PATH + file.getFileName());
        //get file
        return new ByteArrayResource(Files.readAllBytes(desiredFile));
    }

    @Transactional
    public void saveFile(MultipartFile multipartFile, File file) throws IOException {

        if (multipartFile.isEmpty())
            throw new InvalidRequest("File is empty");

        byte[] bytes = multipartFile.getBytes();
        Path path = Paths.get(PATH + file.getFileName());
        System.out.println("Path : " + path.toString());
        //write on server
        Files.write(path, bytes);
    }

    @Transactional
    public void deleteFile(File file) throws IOException {
        Path toDelete = Paths.get(PATH + file.getFileName());
        //delete from server
        Files.delete(toDelete);
    }

}
