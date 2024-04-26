package pe.edu.upc.TrabajoBackEnd.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.MaxMontoByCategoriaDTO;
import pe.edu.upc.TrabajoBackEnd.dtos.TransaccionDTO;
import pe.edu.upc.TrabajoBackEnd.entities.Transaccion;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.ITransaccionService;

import java.time.LocalDate;
import java.util.ArrayList;
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
    @GetMapping
    public List<TransaccionDTO> listarTransaccion() {
        return tS.list().stream().map(y->{
            ModelMapper m = new ModelMapper();
            return m.map(y, TransaccionDTO.class);
        }).collect(Collectors.toList());
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) { tS.delete(id); }

    @GetMapping("/max-categoria")
    public List<MaxMontoByCategoriaDTO> maxCategoria(@RequestParam LocalDate date1,
                                             @RequestParam LocalDate date2,
                                             @RequestParam Integer id_usuario) {
        //devolver la lista maxMontoByCategoria con sus parametros
        List<String[]> filalista = tS.maxMontoByCategoria(date1,date2,id_usuario);
        //Crear la lista dto en donde se usará para mostrar los resultados
        List<MaxMontoByCategoriaDTO> dtoLista = new ArrayList<>();

        //un repetidor para generar los datos en cada fila
        for(String[] columna: filalista) {
            MaxMontoByCategoriaDTO temp = new MaxMontoByCategoriaDTO();
            temp.setTituloCategoria(columna[0]); //columna[0]: titulo de la categoria
            temp.setMaxMontoCategoria(Float.parseFloat(columna[1])); //columna[1]: monto max
            dtoLista.add(temp);
        }
        return dtoLista;
    }
}
