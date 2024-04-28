package pe.edu.upc.TrabajoBackEnd.dtos;

import lombok.Data;

@Data

public class RolDTO {
    private int idRol;
    private String nombreRol;

    public RolDTO() {
    }

    public RolDTO(int idRol, String nombreRol) {
        this.idRol = idRol;
        this.nombreRol = nombreRol;
    }

    public int getIdRol() {
        return idRol;
    }

    public void setIdRol(int idRol) {
        this.idRol = idRol;
    }

    public String getNombreRol() {
        return nombreRol;
    }

    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }
}
