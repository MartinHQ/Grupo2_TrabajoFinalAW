package pe.edu.upc.TrabajoBackEnd.servicesinterfaces;
import pe.edu.upc.TrabajoBackEnd.entities.CategoriaMeta;

import java.util.List;
public interface ICategoriaMetaService {
    public void insert (CategoriaMeta categoriaMeta);
    public  List<CategoriaMeta> list();
    public void delete(int id);
    public CategoriaMeta listId(int id);
    public List<CategoriaMeta> findbyNombre(String nombre);

}
