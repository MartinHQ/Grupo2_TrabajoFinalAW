package pe.edu.upc.TrabajoBackEnd.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.TransaccionDTO;
import pe.edu.upc.TrabajoBackEnd.entities.Transaccion;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.ITransaccionService;
import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/transacciones")
public class TransaccionController {
    @Autowired
    private ITransaccionService tS;
    @PostMapping
    public void insertarTransaccion(@RequestBody TransaccionDTO transaccionDTO) {
        ModelMapper m = new ModelMapper();
        Transaccion transaccion = m.map(transaccionDTO, Transaccion.class);
        tS.insert(transaccion);
    }

    @PutMapping
    public void editarTransaccion(@RequestBody TransaccionDTO transaccionDTO) {
        ModelMapper m = new ModelMapper();
        Transaccion transaccion = m.map(transaccionDTO, Transaccion.class);
        tS.insert(transaccion);
    }
    @GetMapping
    public List<TransaccionDTO> listarTransaccion() {
        return tS.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y, TransaccionDTO.class);
        }).collect(Collectors.toList());
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) { tS.delete(id); }
}
