package pe.edu.upc.TrabajoBackEnd.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.TrabajoBackEnd.dtos.RolDTO;
import pe.edu.upc.TrabajoBackEnd.entities.Rol;
import pe.edu.upc.TrabajoBackEnd.repositories.IRolRepository;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IRolService;

import java.util.List;

@Service
public class RolServiceImplement implements IRolService {
    @Autowired
    private IRolRepository rR;

    @Override
    public void insert(Rol rol) {rR.save(rol);}

    @Override
    public List<Rol> list() {return rR.findAll();}

    @Override
    public void delete(int id) {rR.deleteById(id);}
    @Override
    public Rol crearRol(RolDTO rolDTO) {
        Rol rol = new Rol();
        rol.setNombreRol(rolDTO.getNombreRol());
        // Asignar otros atributos si son necesarios
        return rR.save(rol);
    }
}
