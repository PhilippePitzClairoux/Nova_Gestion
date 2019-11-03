package nova.gestion;

public class AppInitializer
        extends AbstractAnnotationConfigDispatcherServletInitializer {

    protected Class<?>[] getRootConfigClasses() {
        return new Class[] {SecSecurityConfig.class};
    }
}