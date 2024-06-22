package pe.edu.upc.TrabajoBackEnd.dtos;

public class PromedioTransaccionDTO {
    private int mes;
    private double promedio;

    public int getMes() {
        return mes;
    }

    public void setMes(int mes) {
        this.mes = mes;
    }

    public double getPromedio() {
        return promedio;
    }

    public void setPromedio(double promedio) {
        this.promedio = promedio;
    }
}
