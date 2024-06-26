package pe.edu.upc.TrabajoBackEnd.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.TrabajoBackEnd.entities.Categoriatranx;
import pe.edu.upc.TrabajoBackEnd.repositories.ICategoriatranxRepository;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.ICategoriatranxService;


import java.util.List;

@Service
public class CategoriatranxServiceImplement implements ICategoriatranxService {
    @Autowired
    private ICategoriatranxRepository ctR;
    @Override
    public void insert(Categoriatranx categoriatranx){
        ctR.save(categoriatranx);
    }
    @Override
    public List<Categoriatranx> list(){
        return ctR.findAll();
    }
    @Override
    public void delete(int id)
    {ctR.deleteById(id);
    }
    @Override
    public Categoriatranx listId(int id) {
        return ctR.findById(id).orElse(new Categoriatranx());
    }
    @Override
    public List<Categoriatranx> findbyNombre(String nombre){
        return ctR.findByNombre(nombre);
    }
}
