package pe.edu.upc.TrabajoBackEnd.securities;

import java.io.Serializable;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;

    public String getJwttoken(){return jwttoken;}
    public JwtResponse(String jwttoken){
        super();
        this.jwttoken = jwttoken;
    }
}
