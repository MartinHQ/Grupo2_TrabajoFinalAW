package pe.edu.upc.TrabajoBackEnd.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public void insertarRol(@RequestBody RolDTO rolDTO){
        ModelMapper m = new ModelMapper();
        Rol r = m.map(rolDTO, Rol.class);
        rS.insert(r);
    }
    @GetMapping
    public List<RolDTO> listarRoles(){
        return rS.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y,RolDTO.class);
        }).collect(Collectors.toList());
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        rS.delete(id);
    }
}
