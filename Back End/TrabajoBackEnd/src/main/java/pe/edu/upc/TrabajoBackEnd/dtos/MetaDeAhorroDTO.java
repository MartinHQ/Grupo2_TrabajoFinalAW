package pe.edu.upc.TrabajoBackEnd.dtos;
import pe.edu.upc.TrabajoBackEnd.entities.CategoriaMeta;
import pe.edu.upc.TrabajoBackEnd.entities.Usuario;
import java.time.LocalDate;
public class MetaDeAhorroDTO {
    private int metadeahorro;
    private String titulo_meta;
    private String descripcion;
    private int monto_objetivo;
    private LocalDate fecha_limite;
    private Usuario usuario_id;
    private CategoriaMeta categoria_meta_id;
    public MetaDeAhorroDTO() {
    }
    public MetaDeAhorroDTO(int metadeahorro, Usuario usuario_id, CategoriaMeta categoria_meta_id, String titulo_meta, String descripcion, int monto_objetivo, LocalDate fecha_limite) {
        this.metadeahorro = metadeahorro;
        this.usuario_id = usuario_id;
        this.categoria_meta_id = categoria_meta_id;
        this.titulo_meta = titulo_meta;
        this.descripcion = descripcion;
        this.monto_objetivo = monto_objetivo;
        this.fecha_limite = fecha_limite;
    }
    public int getMetadeahorro() {
        return metadeahorro;
    }

    public void setMetadeahorro(int metadeahorro) {
        this.metadeahorro = metadeahorro;
    }

    public Usuario getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(Usuario usuario_id) {
        this.usuario_id = usuario_id;
    }

    public CategoriaMeta getCategoria_meta_id() {
        return categoria_meta_id;
    }

    public void setCategoria_meta_id(CategoriaMeta categoria_meta_id) {
        this.categoria_meta_id = categoria_meta_id;
    }

    public String getTitulo_meta() {
        return titulo_meta;
    }

    public void setTitulo_meta(String titulo_meta) {
        this.titulo_meta = titulo_meta;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getMonto_objetivo() {
        return monto_objetivo;
    }

    public void setMonto_objetivo(int monto_objetivo) {
        this.monto_objetivo = monto_objetivo;
    }

    public LocalDate getFecha_limite() {
        return fecha_limite;
    }

    public void setFecha_limite(LocalDate fecha_limite) {
        this.fecha_limite = fecha_limite;
    }
}
