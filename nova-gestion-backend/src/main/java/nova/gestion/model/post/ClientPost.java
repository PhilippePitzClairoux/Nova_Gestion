package nova.gestion.model.post;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class ClientPost {

    public static class Views {
        public interface Insert {}
        public interface Update {}
    }

    @JsonView(UserPost.Views.Update.class)
    private int idClient;

    @JsonView({UserPost.Views.Update.class, UserPost.Views.Insert.class})
    private String name;

    @JsonView({UserPost.Views.Update.class, UserPost.Views.Insert.class})
    private String phoneNumber;
}
