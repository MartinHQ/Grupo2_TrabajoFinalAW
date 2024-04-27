package pe.edu.upc.TrabajoBackEnd.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.TrabajoBackEnd.dtos.SaldosPorUsuarioDTO;
import pe.edu.upc.TrabajoBackEnd.dtos.MaxMontoByCategoriaDTO;
import pe.edu.upc.TrabajoBackEnd.dtos.TransaccionDTO;
import pe.edu.upc.TrabajoBackEnd.dtos.contarTranxManualyCtaDTO;
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
    public List<SaldosPorUsuarioDTO> reporteSaldosporrangoTiempo(@RequestParam("fechainicio") LocalDate fechainicio, @RequestParam("fechafin") LocalDate fechafin) {
        List<String[]> listFila = tS.reporteSaldosporrangoTiempo(fechainicio, fechafin);
        List<SaldosPorUsuarioDTO> dtoList = new ArrayList<>();
        for (String[] columna : listFila) {
            SaldosPorUsuarioDTO dto = new SaldosPorUsuarioDTO();
            dto.setIdUsuario(Integer.parseInt(columna[0]));
            dto.setNombreUsuario(columna[1]);
            dto.setSaldoTotal(Float.parseFloat(columna[2]));
            dtoList.add(dto);
        }
        return dtoList;
    }
    @GetMapping("/max-categoria")
    public List<MaxMontoByCategoriaDTO> maxCategoria(@RequestParam LocalDate date1,
                                             @RequestParam LocalDate date2,
                                             @RequestParam Integer id_usuario,
                                                     @RequestParam Boolean es_ingreso) {
        //devolver la lista maxMontoByCategoria con sus parametros
        List<String[]> filalista = tS.maxMontoByCategoria(date1,date2,id_usuario, es_ingreso);
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

    @GetMapping("/cuantasxtipocuenta")
    public List<contarTranxManualyCtaDTO> cuantastranxmanualcta()
    {
        List<String[]> listFila = tS.contarTranxManualyCta();
        List<contarTranxManualyCtaDTO> dtoList = new ArrayList<>();
        for (String[] columna : listFila) {
            contarTranxManualyCtaDTO dto = new contarTranxManualyCtaDTO();
            dto.setNombre_usuario(columna[0]);
            dto.setApellido_usuario(columna[1]);
            dto.setTransacciones_manuales(Integer.parseInt(columna[2]));
            dto.setTransacciones_cuenta(Integer.parseInt(columna[2]));
            dtoList.add(dto);
        }
        return dtoList;
    }
}
