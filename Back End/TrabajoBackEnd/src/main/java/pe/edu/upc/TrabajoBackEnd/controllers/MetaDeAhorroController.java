package pe.edu.upc.TrabajoBackEnd.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.CantMetaAhorroCumplidaDTO;
import pe.edu.upc.TrabajoBackEnd.dtos.MetaDeAhorroDTO;
import pe.edu.upc.TrabajoBackEnd.entities.MetaDeAhorro;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IMetaDeAhorroService;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IUsuarioService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/metadeahorro")
public class MetaDeAhorroController {
    @Autowired
    private IMetaDeAhorroService mS;

    @PreAuthorize("hasAuthority('CLIENTE')")
    @PostMapping
    public void insertarMetaDeAhorro(@RequestBody MetaDeAhorroDTO metaDeAhorroDTO) {
        ModelMapper model = new ModelMapper();
        MetaDeAhorro metaDeAhorro = model.map(metaDeAhorroDTO, MetaDeAhorro.class);
        mS.insert(metaDeAhorro);
    }
    @PutMapping
    public void modificarMetaDeAhorro(@RequestBody MetaDeAhorroDTO metaDeAhorroDTO) {
        ModelMapper model = new ModelMapper();
        MetaDeAhorro metaDeAhorro = model.map(metaDeAhorroDTO, MetaDeAhorro.class);
        mS.insert(metaDeAhorro);
    }

    @PreAuthorize("hasAuthority('CLIENTE')")
    @GetMapping
    public List<MetaDeAhorroDTO> listarMetas() {
        return mS.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y, MetaDeAhorroDTO.class);
        }).collect(Collectors.toList());
    }
    @GetMapping("/{id}")
    public MetaDeAhorroDTO listarbyId(@PathVariable("id") Integer id) {
        ModelMapper m = new ModelMapper();
        MetaDeAhorroDTO dto = m.map(mS.listarID(id),MetaDeAhorroDTO.class);
        return dto;
    }

    @PreAuthorize("hasAuthority('CLIENTE')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) { mS.delete(id); }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping ("/reportemetascumplidas")
    public List<CantMetaAhorroCumplidaDTO>listarpormetascumplidas(){
        List<String[]> filaLista = mS.listarpormetascumplidas();
        List<CantMetaAhorroCumplidaDTO> dtoLista = new ArrayList<>();

        for (String[] columna : filaLista) {
            CantMetaAhorroCumplidaDTO dto = new CantMetaAhorroCumplidaDTO();
            dto.setNombre(columna[0]);
            dto.setMeta_cumplida(Integer.parseInt(columna[1]));
            dtoLista.add(dto);
        }

        return dtoLista;
    }

   @PreAuthorize("hasAuthority('CLIENTE')")
   @GetMapping("/usuarioactivo/{usuarioId}")
    public List<MetaDeAhorroDTO> obtenermetadeahorroporusuario(@PathVariable("usuarioId")int usuarioId){
        List<MetaDeAhorro> metadeahorros= mS.obtenermetasdeahorroporusuario(usuarioId);
        ModelMapper modelMapper= new ModelMapper();
        return metadeahorros.stream()
        .map(metadeahorro->modelMapper.map(metadeahorro,MetaDeAhorroDTO.class)).collect(Collectors.toList());
    }
}
