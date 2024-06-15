package pe.edu.upc.TrabajoBackEnd.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.PreguntaFrecuenteDTO;
import pe.edu.upc.TrabajoBackEnd.entities.PreguntaFrecuente;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IPreguntaFrecuenteService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/preguntafrecuente")
public class    PreguntaFrecuenteController {
    @Autowired
    private IPreguntaFrecuenteService pfS;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public void insertar(@RequestBody PreguntaFrecuenteDTO preguntaFrecuenteDTO){
        ModelMapper m= new ModelMapper();
        PreguntaFrecuente pf=m.map(preguntaFrecuenteDTO,PreguntaFrecuente.class);
        pfS.insert(pf);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping
    public void modificar(@RequestBody PreguntaFrecuenteDTO preguntaFrecuenteDTO){
        ModelMapper m= new ModelMapper();
        PreguntaFrecuente pf=m.map(preguntaFrecuenteDTO,PreguntaFrecuente.class);
        pfS.insert(pf);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('CLIENTE')")
    @GetMapping
    public List<PreguntaFrecuenteDTO> listar(){
        return pfS.list().stream().map(pf->{
                    ModelMapper m = new ModelMapper();
                    return m.map(pf,PreguntaFrecuenteDTO.class);
                }).collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("{id}")
    public void eliminar(@PathVariable("id")Integer id){
        pfS.delete(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public PreguntaFrecuenteDTO buscarPorId(@PathVariable("id") Integer id){
        ModelMapper m=new ModelMapper();
        return m.map(pfS.findById(id),PreguntaFrecuenteDTO.class);
    }

    @PreAuthorize("hasAuthority('CLIENTE')")
    @GetMapping("/buscarPregunta/")
    public List<PreguntaFrecuenteDTO> buscarPorPregunta(@RequestParam("pregunta")String pregunta){
        return pfS.findByPreguntaPreguntaFrecuente(pregunta)
                .stream()
                .map(pf->{
                    ModelMapper m =new ModelMapper();
                    return m.map(pf,PreguntaFrecuenteDTO.class);
                }).collect(Collectors.toList());
    }
}