package nova.gestion.authentication.configuration;

import nova.gestion.authentication.CustomAuthenticationProvider;
import nova.gestion.authentication.handlers.RestAuthenticationEntryPoint;
import nova.gestion.authentication.handlers.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;


@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomAuthenticationProvider customAuthenticationProvider;
    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;
    private final SavedRequestAwareAuthenticationSuccessHandler successHandler;

    @Autowired
    public SpringSecurityConfig(CustomAuthenticationProvider customAuthenticationProvider, RestAuthenticationEntryPoint restAuthenticationEntryPoint, SavedRequestAwareAuthenticationSuccessHandler successHandler) {
        this.customAuthenticationProvider = customAuthenticationProvider;
        this.restAuthenticationEntryPoint = restAuthenticationEntryPoint;
        this.successHandler = successHandler;
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(customAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(restAuthenticationEntryPoint)
                .and()
                .authorizeRequests()
                .antMatchers("/v1/**").authenticated()
                .and()
                .formLogin()
                .successHandler(successHandler)
                .failureHandler(new SimpleUrlAuthenticationFailureHandler())
                .and()
                .logout()
                .permitAll()
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
