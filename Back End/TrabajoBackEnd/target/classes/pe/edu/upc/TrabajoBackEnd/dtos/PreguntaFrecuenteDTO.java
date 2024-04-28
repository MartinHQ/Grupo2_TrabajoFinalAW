package pe.edu.upc.TrabajoBackEnd.dtos;

import lombok.Data;

@Data
public class PreguntaFrecuenteDTO {
    private int idPreguntaFrecuente;
    private String preguntaPreguntaFrecuente;
    private String respuestaAsociadaPreguntaFrecuente;
    public PreguntaFrecuenteDTO(int idPreguntaFrecuente, String preguntaPreguntaFrecuente, String respuestaAsociadaPreguntaFrecuente) {
        this.idPreguntaFrecuente = idPreguntaFrecuente;
        this.preguntaPreguntaFrecuente = preguntaPreguntaFrecuente;
        this.respuestaAsociadaPreguntaFrecuente = respuestaAsociadaPreguntaFrecuente;
    }
    public PreguntaFrecuenteDTO() { super(); }

    public int getIdPreguntaFrecuente() { return idPreguntaFrecuente; }
    public void setIdPreguntaFrecuente(int idPreguntaFrecuente) {
        this.idPreguntaFrecuente = idPreguntaFrecuente;
    }

    public String getPreguntaPreguntaFrecuente() {
        return preguntaPreguntaFrecuente;
    }

    public void setPreguntaPreguntaFrecuente(String preguntaPreguntaFrecuente) {
        this.preguntaPreguntaFrecuente = preguntaPreguntaFrecuente;
    }

    public String getRespuestaAsociadaPreguntaFrecuente() {
        return respuestaAsociadaPreguntaFrecuente;
    }

    public void setRespuestaAsociadaPreguntaFrecuente(String respuestaAsociadaPreguntaFrecuente) {
        this.respuestaAsociadaPreguntaFrecuente = respuestaAsociadaPreguntaFrecuente;
    }


}
