package pe.edu.upc.TrabajoBackEnd.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
}
