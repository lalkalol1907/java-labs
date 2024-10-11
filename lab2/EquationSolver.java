import java.rmi.Remote;
import java.rmi.RemoteException;

public interface EquationSolver extends Remote {
    public EquationSolution solve(double a, double b, double c) throws RemoteException;
}
