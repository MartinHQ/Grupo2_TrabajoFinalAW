package pe.edu.upc.TrabajoBackEnd.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.TrabajoBackEnd.entities.PreguntaFrecuente;
import pe.edu.upc.TrabajoBackEnd.repositories.IPreguntaFrecuenteRepository;
import pe.edu.upc.TrabajoBackEnd.serviceinterfaces.IPreguntaFrecuenteService;

import java.util.List;

@Service
public class PreguntaFrecuenteServiceImplement implements IPreguntaFrecuenteService {
    @Autowired
    IPreguntaFrecuenteRepository pfR;

    @Override
    public void insert(PreguntaFrecuente preguntafrecuente) {
        pfR.save(preguntafrecuente);
    }

    @Override
    public List<PreguntaFrecuente> list() {
        return pfR.findAll();
    }

    @Override
    public void delete(int id) {
        pfR.deleteById(id);
    }
    @Override
    public PreguntaFrecuente findById(int id) {
        return pfR.findById(id).orElse(new PreguntaFrecuente());
    }
    @Override
    public List<PreguntaFrecuente> findByPreguntaPreguntaFrecuente(String pregunta) {
        return pfR.findByPreguntaPreguntaFrecuente(pregunta);
    }
}
