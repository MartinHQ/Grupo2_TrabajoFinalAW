package pe.edu.upc.TrabajoBackEnd.dtos;
import pe.edu.upc.TrabajoBackEnd.entities.Usuario;
public class CuentaBancariaDTO {
    private int cuentabancaria_id;
    private String nombre_banco;
    private Long numero_cuenta;
    private boolean tipo;
    private Usuario usuario_id;

    public CuentaBancariaDTO() {
    }

    public CuentaBancariaDTO(int cuentabancaria_id, String nombre_banco, Long numero_cuenta, boolean tipo, Usuario usuario_id) {
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

    public Long getNumero_cuenta() {
        return numero_cuenta;
    }

    public void setNumero_cuenta(Long numero_cuenta) {
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
