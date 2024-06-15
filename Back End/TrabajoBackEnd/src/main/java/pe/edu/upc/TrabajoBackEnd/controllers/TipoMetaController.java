package pe.edu.upc.TrabajoBackEnd.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.TipoMetaDTO;
import pe.edu.upc.TrabajoBackEnd.entities.TipoMeta;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.ITipoMetaService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tipometa")
public class TipoMetaController {

    @Autowired
    private ITipoMetaService tmS;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public void insertarTipometa(@RequestBody TipoMetaDTO tipoMetaDTO){
        ModelMapper m =new ModelMapper();
        TipoMeta ct = m.map(tipoMetaDTO, TipoMeta.class);
        tmS.insert(ct);
    }
    @PutMapping
    public void modificarTipometa(@RequestBody TipoMetaDTO tipoMetaDTO){
        ModelMapper m =new ModelMapper();
        TipoMeta ct = m.map(tipoMetaDTO, TipoMeta.class);
        tmS.insert(ct);
    }

    @PreAuthorize("hasAuthority('CLIENTE') or hasAuthority('ADMIN')")
    @GetMapping
    public List<TipoMetaDTO> listarTipometa(){
        return tmS.list().stream().map(y->{
            ModelMapper m=new ModelMapper();
            return m.map(y, TipoMetaDTO.class);
        }).collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        tmS.delete(id);
    }

    @GetMapping("/{id}")
    public TipoMetaDTO listarId(@PathVariable("id") Integer id){
        ModelMapper m=new ModelMapper();
        TipoMetaDTO dto = m.map(tmS.listId(id), TipoMetaDTO.class);
        return dto;
    }

    @PreAuthorize("hasAuthority('CLIENTE')")
    @GetMapping("/buscar")
    public List<TipoMetaDTO> buscarNombre(@RequestParam String nombre){
        return tmS.findbyNombre(nombre).stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y, TipoMetaDTO.class);
        }).collect(Collectors.toList());
    }

}
