package nova.gestion.model.post;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Data
public class UserPost {

    public static class Views {
        public interface Insert {}
        public interface Update {}
    }

    @JsonView(Views.Update.class)
    private int idUser;

    @JsonView({Views.Update.class, Views.Insert.class})
    private int idUserType;

    @JsonView({Views.Update.class, Views.Insert.class})
    private int idEmployee;

    @JsonView({Views.Update.class, Views.Insert.class})
    private String email;

    @JsonView({Views.Update.class, Views.Insert.class})
    private String password;
}
