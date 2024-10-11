import java.io.Serializable;

public class EquationSolution implements Serializable {
    public ComplexNumber root1;
    public ComplexNumber root2;

    public EquationSolution(ComplexNumber root1, ComplexNumber root2) {
        this.root1 = root1;
        this.root2 = root2;
    }
}
