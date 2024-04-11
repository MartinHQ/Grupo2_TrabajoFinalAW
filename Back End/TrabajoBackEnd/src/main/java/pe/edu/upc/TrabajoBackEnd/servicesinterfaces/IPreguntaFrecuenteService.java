package pe.edu.upc.TrabajoBackEnd.servicesinterfaces;

import pe.edu.upc.TrabajoBackEnd.entities.PreguntaFrecuente;

import java.util.List;

public interface IPreguntaFrecuenteService {
    public void insert(PreguntaFrecuente preguntafrecuente);
    public List<PreguntaFrecuente> list();
    public void delete(int id);
    public PreguntaFrecuente findById(int id);
    public List<PreguntaFrecuente> findByPreguntaPreguntaFrecuente(String pregunta);
}
