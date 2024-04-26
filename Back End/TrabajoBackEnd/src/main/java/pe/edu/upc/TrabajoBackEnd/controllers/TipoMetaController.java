package pe.edu.upc.TrabajoBackEnd.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
    @PostMapping
    public void insertarTipometa(@RequestBody TipoMetaDTO tipoMetaDTO){
        ModelMapper m =new ModelMapper();
        TipoMeta ct = m.map(tipoMetaDTO, TipoMeta.class);
        tmS.insert(ct);
    }
    @GetMapping
    public List<TipoMetaDTO> listarTipometa(){
        return tmS.list().stream().map(y->{
            ModelMapper m=new ModelMapper();
            return m.map(y, TipoMetaDTO.class);
        }).collect(Collectors.toList());
    }
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
    @GetMapping("/buscar")
    public List<TipoMetaDTO> buscarNombre(@RequestParam String nombre){
        return tmS.findbyNombre(nombre).stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y, TipoMetaDTO.class);
        }).collect(Collectors.toList());
    }

}
