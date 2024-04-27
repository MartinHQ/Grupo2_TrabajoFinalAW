package pe.edu.upc.TrabajoBackEnd.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.TrabajoBackEnd.entities.Consejo;
import pe.edu.upc.TrabajoBackEnd.repositories.IConsejoRepository;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IConsejoService;

import java.time.LocalDate;
import java.util.List;

@Service
public class ConsejoServiceImplement implements IConsejoService {
    @Autowired
    private IConsejoRepository cR;
    @Override
    public void insert(Consejo consejo){ cR.save(consejo);}
    @Override
    public List<Consejo> list(){return cR.findAll();}
    @Override
    public void delete(int id){cR.deleteById(id);}
    @Override
    public Consejo listId(int id){return cR.findById(id).orElse(new Consejo());}
    @Override
    public List<Consejo> findbyTitulo(String titulo){return cR.findByTitulo(titulo);}

    @Override

    public List<Consejo> listarporKeyword(String keyword) {
        return cR.listarporKeyword(keyword);
    }

    public List<Consejo> listarConsejoPorMaxMontoCategoria(LocalDate date1, LocalDate date2, int id_usuario) {
        return cR.listarConsejoPorMaxMontoCategoria(date1, date2, id_usuario);
    }
}
