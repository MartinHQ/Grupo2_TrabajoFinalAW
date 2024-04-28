package pe.edu.upc.TrabajoBackEnd.servicesinterfaces;
import pe.edu.upc.TrabajoBackEnd.entities.TipoMeta;

import java.util.List;
public interface ITipoMetaService {
    public void insert (TipoMeta categoriameta);
    public  List<TipoMeta> list();
    public void delete(int id);
    public TipoMeta listId(int id);
    public List<TipoMeta> findbyNombre(String nombre);

}
