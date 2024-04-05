package pe.edu.upc.TrabajoBackEnd.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.CategoriaMetaDTO;
import pe.edu.upc.TrabajoBackEnd.entities.CategoriaMeta;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.ICategoriaMetaService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/categoriameta")
public class CategoriaMetaController {

    @Autowired
    private ICategoriaMetaService cmS;
    @PostMapping
    public void insertarCategoriameta(@RequestBody CategoriaMetaDTO categoriametaDTO){
        ModelMapper m =new ModelMapper();
        CategoriaMeta ct = m.map(categoriametaDTO, CategoriaMeta.class);
        cmS.insert(ct);
    }
    @GetMapping
    public List<CategoriaMetaDTO> listarCategoriameta(){
        return cmS.list().stream().map(y->{
            ModelMapper m=new ModelMapper();
            return m.map(y, CategoriaMetaDTO.class);
        }).collect(Collectors.toList());
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        cmS.delete(id);
    }
    @GetMapping("/{id}")
    public CategoriaMetaDTO listarId(@PathVariable("id") Integer id){
        ModelMapper m=new ModelMapper();
        CategoriaMetaDTO dto = m.map(cmS.listId(id), CategoriaMetaDTO.class);
        return dto;
    }
    @GetMapping("/buscar")
    public List<CategoriaMetaDTO> buscarNombre(@RequestParam String nombre){
        return cmS.findbyNombre(nombre).stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y, CategoriaMetaDTO.class);
        }).collect(Collectors.toList());
    }

}
