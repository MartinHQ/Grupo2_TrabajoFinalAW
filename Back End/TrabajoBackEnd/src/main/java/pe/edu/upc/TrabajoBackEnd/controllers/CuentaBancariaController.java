package pe.edu.upc.TrabajoBackEnd.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.CuentaBancariaDTO;
import pe.edu.upc.TrabajoBackEnd.entities.CuentaBancaria;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.ICuentaBancariaService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cuentabancaria")
public class CuentaBancariaController {
    @Autowired
    private ICuentaBancariaService cS;

    @PreAuthorize("hasAuthority('CLIENTE')")
    @PostMapping
    public void insertarCuentaBancaria(@RequestBody CuentaBancariaDTO cuentaBancariaDTO) {
        ModelMapper m = new ModelMapper();
        CuentaBancaria cuenta = m.map(cuentaBancariaDTO, CuentaBancaria.class);
        cS.insert(cuenta);
    }

    @GetMapping
    public List<CuentaBancariaDTO> listarCuentaBancaria() {
        return cS.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y, CuentaBancariaDTO.class);
        }).collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('CLIENTE')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) { cS.delete(id); }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public CuentaBancariaDTO listarId(@PathVariable("id") Integer id) {
        ModelMapper m = new ModelMapper();
        CuentaBancariaDTO cuen = m.map(cS.listId(id), CuentaBancariaDTO.class);
        return cuen;
    }
}
