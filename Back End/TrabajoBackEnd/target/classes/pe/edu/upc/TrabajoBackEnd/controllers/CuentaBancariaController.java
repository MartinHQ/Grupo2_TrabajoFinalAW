package pe.edu.upc.TrabajoBackEnd.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) { cS.delete(id); }
    @GetMapping("/{id}")
    public CuentaBancariaDTO listarId(@PathVariable("id") Integer id) {
        ModelMapper m = new ModelMapper();
        CuentaBancariaDTO cuen = m.map(cS.listId(id), CuentaBancariaDTO.class);
        return cuen;
    }

    @GetMapping("/listar{id}")
    public ResponseEntity<CuentaBancariaDTO> listarCuentaBancariaPorId(@PathVariable("id") Integer id) {
        ModelMapper modelMapper = new ModelMapper();
        CuentaBancaria cuentaBancaria = cS.listId(id);

        if (cuentaBancaria != null) {
            CuentaBancariaDTO cuentaBancariaDTO = modelMapper.map(cuentaBancaria, CuentaBancariaDTO.class);
            return new ResponseEntity<>(cuentaBancariaDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
