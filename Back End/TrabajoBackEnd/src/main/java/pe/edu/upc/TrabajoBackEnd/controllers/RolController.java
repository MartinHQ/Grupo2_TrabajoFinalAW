package pe.edu.upc.TrabajoBackEnd.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.RolDTO;
import pe.edu.upc.TrabajoBackEnd.entities.Rol;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IRolService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/roles")
public class RolController {
    @Autowired
    private IRolService rS;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public void insertarRol(@RequestBody RolDTO rolDTO){
        ModelMapper m = new ModelMapper();
        Rol r = m.map(rolDTO, Rol.class);
        rS.insert(r);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public List<RolDTO> listarRoles(){
        return rS.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y,RolDTO.class);
        }).collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        rS.delete(id);
    }

    @PostMapping("/crearrol")
    public ResponseEntity<?> crearRol(@RequestBody RolDTO rolDTO) {
        if (rolDTO == null || rolDTO.getNombreRol() == null || rolDTO.getNombreRol().isEmpty()) {
            return new ResponseEntity<>("Error: Datos requeridos no proporcionados.", HttpStatus.BAD_REQUEST);
        }

        Rol nuevoRol = rS.crearRol(rolDTO); // Se llama a un método de la interfaz

        if (nuevoRol != null) {
            return new ResponseEntity<>(nuevoRol, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Error: No se pudo crear el rol.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
