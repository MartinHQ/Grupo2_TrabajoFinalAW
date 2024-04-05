package pe.edu.upc.TrabajoBackEnd.servicesinterfaces;
import pe.edu.upc.TrabajoBackEnd.entities.Categoriatranx;
import pe.edu.upc.TrabajoBackEnd.entities.Consejo;

import java.util.List;
public interface ICategoriatranxService {
    public void insert (Categoriatranx categoriatranx);
    public  List<Categoriatranx> list();
    public void delete(int id);
    public Categoriatranx listId(int id);
    public List<Categoriatranx> findbyNombre(String nombre);

}
