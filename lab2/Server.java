import java.rmi.registry.Registry;
import java.rmi.registry.LocateRegistry;
import java.rmi.server.UnicastRemoteObject;

public class Server extends EquationSolverImpl {
    public Server() {}

    public static void main(String[] args) {
        try {
            EquationSolverImpl obj = new EquationSolverImpl();

            EquationSolver stub = (EquationSolver) UnicastRemoteObject.exportObject(obj, 0);
            Registry registry = LocateRegistry.getRegistry();
            registry.bind("EquationSolver", stub);
            System.out.println("Server started");
        } catch (Exception e) {
            System.err.println("Server exception: " + e);
            e.printStackTrace();
        }
    }
}
