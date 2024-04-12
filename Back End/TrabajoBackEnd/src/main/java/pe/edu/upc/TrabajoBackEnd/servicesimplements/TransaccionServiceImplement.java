package pe.edu.upc.TrabajoBackEnd.servicesimplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.TrabajoBackEnd.entities.Transaccion;
import pe.edu.upc.TrabajoBackEnd.repositories.ITransaccionRepository;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.ITransaccionService;
import java.util.List;
@Service
public class TransaccionServiceImplement implements ITransaccionService {
    @Autowired
    private ITransaccionRepository tR;
    @Override
    public void insert(Transaccion transaccion) { tR.save(transaccion); }
    @Override
    public List<Transaccion> list() { return tR.findAll(); }
    @Override
    public void delete(int id) { tR.deleteById(id); }
    @Override
    public Transaccion listId(int id) { return tR.findById(id).orElse(new Transaccion()); }
}
