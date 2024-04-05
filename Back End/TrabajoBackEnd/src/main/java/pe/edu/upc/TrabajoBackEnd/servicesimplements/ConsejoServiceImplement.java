package pe.edu.upc.TrabajoBackEnd.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.TrabajoBackEnd.entities.Consejo;
import pe.edu.upc.TrabajoBackEnd.repositories.IConsejoRepository;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IConsejoService;

import java.util.List;

@Service
public class ConsejoServiceImplement implements IConsejoService {
    @Autowired
    private IConsejoRepository cR;
    @Override
    public void insert(Consejo consejo){ cR.save(consejo);}
    public List<Consejo> list(){return cR.findAll();}
    public void delete(int id){cR.deleteById(id);}
    public Consejo listId(int id){return cR.findById(id).orElse(new Consejo());}
    public List<Consejo> findbyTitulo(String titulo){return cR.findByTitulo(titulo);}

}