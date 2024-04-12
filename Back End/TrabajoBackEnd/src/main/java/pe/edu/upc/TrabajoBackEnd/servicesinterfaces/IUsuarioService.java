package pe.edu.upc.TrabajoBackEnd.servicesinterfaces;

import pe.edu.upc.TrabajoBackEnd.entities.Usuario;

import java.util.List;

public interface IUsuarioService {
    public void insert(Usuario usuario);
    public List<Usuario> list();
    public void delete(int id);
}
