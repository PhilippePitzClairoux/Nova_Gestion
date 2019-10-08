package nova.gestion.model.post;


import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class BlankPost {

    public static class Views {
        public interface Insert {}
        public interface Update {}
    }

    @JsonView(UserPost.Views.Update.class)
    private int idBlank;

    @JsonView({UserPost.Views.Update.class, UserPost.Views.Insert.class})
    private int idCoolantHole;

    @JsonView({UserPost.Views.Update.class, UserPost.Views.Insert.class})
    private int codeGrade;

    @JsonView({UserPost.Views.Update.class, UserPost.Views.Insert.class})
    private String name;

    @JsonView({UserPost.Views.Update.class, UserPost.Views.Insert.class})
    private int stockQuantity;

    @JsonView({UserPost.Views.Update.class, UserPost.Views.Insert.class})
    private int minimumQuantity;

    @JsonView({UserPost.Views.Update.class, UserPost.Views.Insert.class})
    private double diameter;

    @JsonView({UserPost.Views.Update.class, UserPost.Views.Insert.class})
    private double length;
}
