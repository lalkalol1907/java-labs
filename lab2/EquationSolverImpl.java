import java.rmi.RemoteException;


public class EquationSolverImpl implements EquationSolver {
    @Override
    public EquationSolution solve(double a, double b, double c) throws RemoteException {
        double determinant = b*b - 4*a*c;
        ComplexNumber root1 = ComplexNumber
                .sqrt(determinant)
                .addReal(-b)
                .divideByReal(2 * a);

        ComplexNumber root2 = ComplexNumber
                .sqrt(determinant)
                .negative()
                .addReal(-b)
                .divideByReal(2 * a);

        return new EquationSolution(root1, root2);
    }
}
