package pe.edu.upc.TrabajoBackEnd.dtos;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import pe.edu.upc.TrabajoBackEnd.entities.Usuario;

public class TransaccionDTO {
    private int transaccion_id;
    private String nombre_banco;
    private int numero_cuenta;
    private boolean tipo;
    private Usuario usuario_id;
    public TransaccionDTO() {
    }
    public TransaccionDTO(int transaccion_id, String nombre_banco, int numero_cuenta, boolean tipo, Usuario usuario_id) {
        this.transaccion_id = transaccion_id;
        this.nombre_banco = nombre_banco;
        this.numero_cuenta = numero_cuenta;
        this.tipo = tipo;
        this.usuario_id = usuario_id;
    }

    public int getTransaccion_id() {
        return transaccion_id;
    }

    public void setTransaccion_id(int transaccion_id) {
        this.transaccion_id = transaccion_id;
    }

    public String getNombre_banco() {
        return nombre_banco;
    }

    public void setNombre_banco(String nombre_banco) {
        this.nombre_banco = nombre_banco;
    }

    public int getNumero_cuenta() {
        return numero_cuenta;
    }

    public void setNumero_cuenta(int numero_cuenta) {
        this.numero_cuenta = numero_cuenta;
    }

    public boolean isTipo() {
        return tipo;
    }

    public void setTipo(boolean tipo) {
        this.tipo = tipo;
    }

    public Usuario getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(Usuario usuario_id) {
        this.usuario_id = usuario_id;
    }
}
