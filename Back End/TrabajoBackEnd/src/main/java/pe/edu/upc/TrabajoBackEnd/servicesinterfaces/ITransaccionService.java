package pe.edu.upc.TrabajoBackEnd.servicesinterfaces;

import pe.edu.upc.TrabajoBackEnd.entities.Transaccion;

import java.util.List;

public interface ITransaccionService {
    public void insert(Transaccion transaccion);
    public List<Transaccion> list();
    public void delete(int id);
    public Transaccion listId(int id);
}