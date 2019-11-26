package nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Data;

import java.util.ArrayList;

@Data
public class Program {
    private int idProgram;
    private String name;
    private Machine machine;
    private Tool tool;
    private Blank blank;
    private ArrayList<Client> clients;
    private ArrayList<FileProgram> filePrograms;

    public Program(int idProgram, String name)
    {
        this.idProgram = idProgram;
        this.name = name;
    }

    @JsonCreator
    public Program(int idProgram, String name, Machine machine, Tool tool, Blank blank, ArrayList<Client> clients, ArrayList<FileProgram> filePrograms) {
        this.idProgram = idProgram;
        this.name = name;
        this.machine = machine;
        this.tool = tool;
        this.blank = blank;
        this.clients = clients;
        this.filePrograms = filePrograms;
    }

}
