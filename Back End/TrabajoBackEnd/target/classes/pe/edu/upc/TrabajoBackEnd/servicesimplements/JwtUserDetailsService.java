package pe.edu.upc.TrabajoBackEnd.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pe.edu.upc.TrabajoBackEnd.entities.Usuario;
import pe.edu.upc.TrabajoBackEnd.repositories.IUsuarioRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private IUsuarioRepository uR;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario user = uR.findByCorreo(username);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("Usuario no existe", username));
        }

        List<GrantedAuthority> roles = new ArrayList<>();

        roles.add(new SimpleGrantedAuthority(user.getRol_id().getNombreRol()));

        UserDetails ud = new org.springframework.security.core.userdetails.User(
                user.getCorreo(), user.getContrasenia(), true, true,
                true, true, roles);

        return ud;
    }
}