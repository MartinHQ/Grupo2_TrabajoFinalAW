package pe.edu.upc.TrabajoBackEnd.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "CuentaBancaria")
public class CuentaBancaria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cuentabancaria_id;
    @Column(name = "nombre_banco", length = 50, nullable = false)
    private String nombre_banco;
    @Column(name = "numero_cuenta", nullable = false)
    private int numero_cuenta;
    @Column(name = "tipo", nullable = false)
    private boolean tipo;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario_id;

    public CuentaBancaria() {
    }

    public CuentaBancaria(int cuentabancaria_id, String nombre_banco, int numero_cuenta, boolean tipo, Usuario usuario_id) {
        this.cuentabancaria_id = cuentabancaria_id;
        this.nombre_banco = nombre_banco;
        this.numero_cuenta = numero_cuenta;
        this.tipo = tipo;
        this.usuario_id = usuario_id;
    }

    public int getCuentabancaria_id() {
        return cuentabancaria_id;
    }

    public void setCuentabancaria_id(int cuentabancaria_id) {
        this.cuentabancaria_id = cuentabancaria_id;
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
