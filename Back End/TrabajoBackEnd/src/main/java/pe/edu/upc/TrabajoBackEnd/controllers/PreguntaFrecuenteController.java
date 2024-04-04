package pe.edu.upc.TrabajoBackEnd.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.PreguntaFrecuenteDTO;
import pe.edu.upc.TrabajoBackEnd.entities.PreguntaFrecuente;
import pe.edu.upc.TrabajoBackEnd.serviceinterfaces.IPreguntaFrecuenteService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/preguntafrecuente")
public class PreguntaFrecuenteController {
    @Autowired
    IPreguntaFrecuenteService pfS;

    @PostMapping
    public void insertar(@RequestBody PreguntaFrecuenteDTO preguntaFrecuenteDTO){
        ModelMapper m= new ModelMapper();
        PreguntaFrecuente pf=m.map(preguntaFrecuenteDTO,PreguntaFrecuente.class);
        pfS.insert(pf);
    }

    @GetMapping
    public List<PreguntaFrecuenteDTO> listar(){
        return pfS.list()
                .stream()
                .map(pf->{
                    ModelMapper m = new ModelMapper();
                    return m.map(pf,PreguntaFrecuenteDTO.class);
                }).collect(Collectors.toList());
    }
    @DeleteMapping("{id}")
    public void eliminar(@PathVariable("id")Integer id){
        pfS.delete(id);
    }

}
