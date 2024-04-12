package pe.edu.upc.TrabajoBackEnd.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.UsuarioDTO;
import pe.edu.upc.TrabajoBackEnd.entities.Usuario;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IUsuarioService;
import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private IUsuarioService uS;
    @PostMapping
    public void insertarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        ModelMapper m = new ModelMapper();
        Usuario usuario = m.map(usuarioDTO, Usuario.class);
        uS.insert(usuario);
    }
    @GetMapping
    public List<UsuarioDTO> listarUsuario() {
        return uS.list().stream().map(y->{
            ModelMapper model = new ModelMapper();
            return model.map(y, UsuarioDTO.class);
        }).collect(Collectors.toList());
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) { uS.delete(id); }
}
