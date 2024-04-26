package pe.edu.upc.TrabajoBackEnd.servicesinterfaces;

import pe.edu.upc.TrabajoBackEnd.entities.Transaccion;

import java.time.LocalDate;
import java.util.List;

public interface ITransaccionService {
    public void insert(Transaccion transaccion);
    public List<Transaccion> list();
    public void delete(int id);
    public Transaccion listId(int id);

    public List<String[]> maxMontoByCategoria(LocalDate date1,
                                              LocalDate date2,
                                              int id_usuario,
                                              Boolean es_ingreso);
}
