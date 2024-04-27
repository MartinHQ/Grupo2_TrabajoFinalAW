package pe.edu.upc.TrabajoBackEnd.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.ConsejoDTO;
import pe.edu.upc.TrabajoBackEnd.entities.Consejo;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IConsejoService;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/consejos")
public class ConsejoController {
    @Autowired
    private IConsejoService cS;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public void insertarConsejo(@RequestBody ConsejoDTO consejoDTO) {
        ModelMapper m =new ModelMapper();
        Consejo c = m.map(consejoDTO, Consejo.class);
        cS.insert(c);
    }

    @PreAuthorize("hasAuthority('CLIENTE')")
    @GetMapping
    public List<ConsejoDTO> listarConsejos(){
        return cS.list().stream().map(y->{
            ModelMapper m=new ModelMapper();
            return m.map(y, ConsejoDTO.class);
        }).collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        cS.delete(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public ConsejoDTO listarId(@PathVariable("id") Integer id){
        ModelMapper m=new ModelMapper();
        ConsejoDTO dto = m.map(cS.listId(id), ConsejoDTO.class);
        return dto;
    }

    @GetMapping("/buscar")
    public List<ConsejoDTO> buscarTitulo(@RequestParam String titulo){
        return cS.findbyTitulo(titulo).stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y, ConsejoDTO.class);
        }).collect(Collectors.toList());
    }

    @GetMapping("/buscarstring")
    public List<ConsejoDTO> buscarKeyword(@Param("keyword") String keyword){
        return cS.listarporKeyword(keyword).stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y, ConsejoDTO.class);
        }).collect(Collectors.toList());
    }

    @GetMapping("/consejos-por-categoria")
    public List<ConsejoDTO> listarPorMaxMontoCategoria(@RequestParam LocalDate date1,
                                                       @RequestParam LocalDate date2,
                                                       @RequestParam int id_usuario){
        return cS.listarConsejoPorMaxMontoCategoria(date1, date2, id_usuario)
                .stream().map(y->{
                    ModelMapper m = new ModelMapper();
                    return m.map(y, ConsejoDTO.class);
                }).collect(Collectors.toList());
    }
}
