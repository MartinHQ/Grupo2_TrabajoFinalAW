package pe.edu.upc.TrabajoBackEnd.servicesimplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.TrabajoBackEnd.entities.Transaccion;
import pe.edu.upc.TrabajoBackEnd.repositories.ITransaccionRepository;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.ITransaccionService;

import java.time.LocalDate;
import java.util.List;
@Service
public class TransaccionServiceImplement implements ITransaccionService {
    @Autowired
    private ITransaccionRepository tR;
    @Override
    public void insert(Transaccion transaccion) { tR.save(transaccion); }
    @Override
    public List<Transaccion> list() { return tR.findAll(); }
    @Override
    public void delete(int id) { tR.deleteById(id); }
    @Override
    public Transaccion listId(int id) { return tR.findById(id).orElse(new Transaccion()); }

    @Override
    public List<String[]> reporteSaldosporrangoTiempo(LocalDate fechainicio, LocalDate fechafin) {
        return tR.reporteSaldosporrangoTiempo(fechainicio, fechafin);
    }
    @Override
    public List<String[]> maxMontoByCategoria(LocalDate date1, LocalDate date2, int id_usuario,
                                              Boolean es_ingreso) {
        return tR.maxMontoByCategoria(date1, date2, id_usuario, es_ingreso);
    }
    @Override
    public Double obtenerPromedioIngresosPorUsuarioYRangoFechas(int usuarioId, LocalDate fechaInicio, LocalDate fechaFin) {
        return tR.encontrarPromedioIngresosPorUsuarioYRangoFechas(usuarioId, fechaInicio, fechaFin);
    }

    @Override
    public List<Transaccion> obtenerTransaccionesPorUsuarioOrdenadas(int usuarioId) {
        return tR.encontrarTodasPorUsuarioIdOrdenadoPorFechaAsc(usuarioId);
    }

    @Override
    public List<String[]> PromedioTransaccion(LocalDate date1, LocalDate date2) {
        return tR.PromedioTransaccion(date1, date2);
    }

    @Override
    public List<String[]> contarTranxManualyCta() {
        return tR.contarTranxManualyCta();
    }
    @Override
    public List<String[]>promedioegresosporcategoria(int mes)
    {
        return tR.promedioegresosporcategoria(mes);
    }

    @Override
    public List<String[]> promedioingresoegresopormes(int usuarioId) {return tR.promedioingresoegresopormes(usuarioId);}

    @Override
    public Double getahorroacumulado(int usuarioId) {return tR.getahorroacumulado(usuarioId);}

    @Override
    public List<String[]> categoriaspopulares() {return tR.categoriaspopulares();}
}
