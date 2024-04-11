package pe.edu.upc.TrabajoBackEnd.servicesinterfaces;
import pe.edu.upc.TrabajoBackEnd.entities.CuentaBancaria;
import java.util.List;
public interface ICuentaBancariaService {
    public void insert(CuentaBancaria cuentaBancaria);
    public List<CuentaBancaria> list();
    public void delete(int id);
    public CuentaBancaria listId(int id);
}
