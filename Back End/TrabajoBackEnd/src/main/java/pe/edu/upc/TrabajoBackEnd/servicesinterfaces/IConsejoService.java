package pe.edu.upc.TrabajoBackEnd.servicesinterfaces;

import pe.edu.upc.TrabajoBackEnd.entities.Consejo;

import java.util.List;

public interface IConsejoService {
    public void insert(Consejo consejo);
    public List<Consejo> list();
    public void delete(int id);
    public Consejo listId(int id);
    public List<Consejo> findbyTitulo(String titulo);
}
