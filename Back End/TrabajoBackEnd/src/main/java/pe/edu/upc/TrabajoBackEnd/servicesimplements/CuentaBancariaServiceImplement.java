package pe.edu.upc.TrabajoBackEnd.servicesimplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.TrabajoBackEnd.entities.CuentaBancaria;
import pe.edu.upc.TrabajoBackEnd.repositories.ICuentaBancariaRepository;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.ICuentaBancariaService;
import java.util.List;
@Service
public class CuentaBancariaServiceImplement implements ICuentaBancariaService {
    @Autowired
    private ICuentaBancariaRepository cR;
    @Override
    public void insert(CuentaBancaria cuentaBancaria) { cR.save(cuentaBancaria); }
    @Override
    public List<CuentaBancaria> list() { return cR.findAll(); }
    @Override
    public void delete(int id) { cR.deleteById(id); }
    @Override
    public CuentaBancaria listId(int id) { return cR.findById(id).orElse(new CuentaBancaria()); }
}