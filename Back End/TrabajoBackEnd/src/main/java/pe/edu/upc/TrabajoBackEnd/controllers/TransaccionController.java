package pe.edu.upc.TrabajoBackEnd.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.SaldosPorUsuarioDTO;
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
    @GetMapping("/reportesaldos")
    public List<SaldosPorUsuarioDTO> reporteSaldosporrangoTiempo(@RequestParam("fechainicio") LocalDate fechainicio, @RequestParam("fechafin") LocalDate fechafin){
        List<String[]> listFila = tS.reporteSaldosporrangoTiempo(fechainicio, fechafin);
        List<SaldosPorUsuarioDTO> dtoList = new ArrayList<>();
        for(String[] columna:listFila){
            SaldosPorUsuarioDTO dto = new SaldosPorUsuarioDTO();
            dto.setIdUsuario(Integer.parseInt(columna[0]));
            dto.setNombreUsuario(columna[1]);
            dto.setSaldoTotal(Float.parseFloat(columna[2]));
            dtoList.add(dto);
        }
        return dtoList;
    }
}
