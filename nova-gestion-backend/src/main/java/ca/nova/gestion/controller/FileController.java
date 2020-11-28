package ca.nova.gestion.controller;

import ca.nova.gestion.model.File;
import ca.nova.gestion.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RestController
public class FileController {

    private final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping(path = "/v1/downloadfile")
    public HttpEntity<?> downloadFile(@RequestParam String filename, HttpServletResponse response) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        response.setHeader("Content-Disposition", "attachment; filename=" + filename);

        return new HttpEntity<>(fileService.getFile(new File(filename)).getByteArray(), headers);
    }

    @PostMapping("/v1/uploadfile")
    public Map<String, String> uploadFile(@RequestParam("file") MultipartFile multipartFile) throws IOException {
        fileService.insertFile(multipartFile, new File(multipartFile.getOriginalFilename()));

        return Map.of("fileName", multipartFile.getOriginalFilename());
    }

}
