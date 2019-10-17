package nova.gestion.model.post;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;

@AllArgsConstructor
@Data
public class MachinePost {
    public static class Views {
        public interface Insert {}
        public interface Update {}
        public interface Delete {}
    }

    @JsonView({MachinePost.Views.Update.class, MachinePost.Views.Delete.class})
    private int idMachine;

    @JsonView({MachinePost.Views.Update.class, MachinePost.Views.Insert.class})
    private int idModel;

    @JsonView({MachinePost.Views.Update.class, MachinePost.Views.Insert.class})
    private String name;

    @JsonView({MachinePost.Views.Update.class, MachinePost.Views.Insert.class})
    private String serialNumber;

    @JsonView({MachinePost.Views.Update.class, MachinePost.Views.Insert.class})
    private Date acquisitionDate;

    @JsonView({MachinePost.Views.Update.class, MachinePost.Views.Insert.class})
    private ArrayList maintenances;

}
