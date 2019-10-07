package nova.gestion.model.post;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ToolPost {

    public static class Views {
        public interface Insert {}
        public interface Update {}
    }

    @JsonView(Views.Update.class)
    private int idTool;

    @JsonView({Views.Update.class, Views.Insert.class})
    private String name;

    @JsonView({Views.Update.class, Views.Insert.class})
    private int stockQuantity;

    @JsonView({Views.Update.class, Views.Insert.class})
    private int minimumQuantity;


}
