package pe.edu.upc.TrabajoBackEnd.servicesinterfaces;

import pe.edu.upc.TrabajoBackEnd.entities.MetaDeAhorro;

import java.util.List;

public interface IMetaDeAhorroService {
    public void insert(MetaDeAhorro metaDeAhorro);
    public List<MetaDeAhorro> list();
    public void delete(int id);
    public MetaDeAhorro listarID(int id);

    List<String[]> listarpormetascumplidas();
    List<MetaDeAhorro> obtenermetasdeahorroporusuario(int usuario_id);
}
