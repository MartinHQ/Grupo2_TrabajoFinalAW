package pe.edu.upc.TrabajoBackEnd.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.UsuarioDTO;
import pe.edu.upc.TrabajoBackEnd.entities.Rol;
import pe.edu.upc.TrabajoBackEnd.entities.Usuario;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IUsuarioService;
import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private IUsuarioService uS;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/registrar-cliente")
    public void insertarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        ModelMapper m = new ModelMapper();
        Usuario usuario = m.map(usuarioDTO, Usuario.class);

        Rol rol = new Rol(2, "CLIENTE");
        usuario.setRol_id(rol);

        String encodedPassword = passwordEncoder.encode(usuario.getContrasenia());
        usuario.setContrasenia(encodedPassword);
        uS.insert(usuario);
    }

    @GetMapping
    public List<UsuarioDTO> listarUsuario() {
        return uS.list().stream().map(y->{
            ModelMapper model = new ModelMapper();
            return model.map(y, UsuarioDTO.class);
        }).collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) { uS.delete(id); }
}
