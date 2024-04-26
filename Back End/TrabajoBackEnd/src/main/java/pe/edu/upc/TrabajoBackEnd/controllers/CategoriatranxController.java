package pe.edu.upc.TrabajoBackEnd.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.CategoriatranxDTO;
import pe.edu.upc.TrabajoBackEnd.entities.Categoriatranx;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.ICategoriatranxService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/categoriatranx")

public class CategoriatranxController {

    @Autowired
    private ICategoriatranxService ctS;
    @PostMapping
    public void insertarCategoriatranx(@RequestBody CategoriatranxDTO categoriatranxDTO){
        ModelMapper m =new ModelMapper();
        Categoriatranx ct = m.map(categoriatranxDTO, Categoriatranx.class);
        ctS.insert(ct);
    }

    @PutMapping
    public void editarCategoriatranx(@RequestBody CategoriatranxDTO categoriatranxDTO){
        ModelMapper m =new ModelMapper();
        Categoriatranx ct = m.map(categoriatranxDTO, Categoriatranx.class);
        ctS.insert(ct);
    }
    @GetMapping
    public List<CategoriatranxDTO> listarCategoriatranx(){
        return ctS.list().stream().map(y->{
            ModelMapper m=new ModelMapper();
            return m.map(y, CategoriatranxDTO.class);
        }).collect(Collectors.toList());
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        ctS.delete(id);
    }
    @GetMapping("/{id}")
    public CategoriatranxDTO listarId(@PathVariable("id") Integer id){
        ModelMapper m=new ModelMapper();
        CategoriatranxDTO dto = m.map(ctS.listId(id), CategoriatranxDTO.class);
        return dto;
    }
    @GetMapping("/buscar")
    public List<CategoriatranxDTO> buscarNombre(@RequestParam String nombre){
        return ctS.findbyNombre(nombre).stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y, CategoriatranxDTO.class);
        }).collect(Collectors.toList());
    }
}
