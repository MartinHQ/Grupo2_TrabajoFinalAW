package pe.edu.upc.TrabajoBackEnd.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.MetaDeAhorroDTO;
import pe.edu.upc.TrabajoBackEnd.entities.MetaDeAhorro;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IMetaDeAhorroService;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IUsuarioService;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/metadeahorro")
public class MetaDeAhorroController {
    @Autowired
    private IMetaDeAhorroService uS;
    @PostMapping
    public void insertarMetaDeAhroo(@RequestBody MetaDeAhorroDTO metaDeAhorroDTO) {
        ModelMapper model = new ModelMapper();
        MetaDeAhorro metaDeAhorro = model.map(metaDeAhorroDTO, MetaDeAhorro.class);
        uS.insert(metaDeAhorro);
    }
    @GetMapping
    public List<MetaDeAhorroDTO> listarUsuario() {
        return uS.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y, MetaDeAhorroDTO.class);
        }).collect(Collectors.toList());
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) { uS.delete(id); }
}
