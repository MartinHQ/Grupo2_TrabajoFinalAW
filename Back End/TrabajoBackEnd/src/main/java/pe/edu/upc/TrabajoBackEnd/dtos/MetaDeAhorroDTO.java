package pe.edu.upc.TrabajoBackEnd.dtos;
import lombok.Data;
import pe.edu.upc.TrabajoBackEnd.entities.TipoMeta;
import pe.edu.upc.TrabajoBackEnd.entities.Usuario;
import java.time.LocalDate;
@Data
public class MetaDeAhorroDTO {
    private int metadeahorro;
    private String titulo_meta;
    private String descripcion;
    private int monto_objetivo;
    private LocalDate fecha_limite;
    private boolean meta_cumplida;
    private Usuario usuario_id;
    private TipoMeta tipo_meta_id;
}
