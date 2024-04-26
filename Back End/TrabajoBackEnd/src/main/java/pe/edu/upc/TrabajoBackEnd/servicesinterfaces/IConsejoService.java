package pe.edu.upc.TrabajoBackEnd.servicesinterfaces;
import pe.edu.upc.TrabajoBackEnd.entities.Consejo;

import java.time.LocalDate;
import java.util.List;
public interface IConsejoService {
    public void insert(Consejo consejo);
    public List<Consejo> list();
    public void delete(int id);
    public Consejo listId(int id);
    public List<Consejo> findbyTitulo(String titulo);

    public List<Consejo> listarConsejoPorMaxMontoCategoria(LocalDate date1, LocalDate date2, int id_usuario);
}
