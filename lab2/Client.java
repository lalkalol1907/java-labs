import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class Client {
    public static void main(String[] args) {
        try {
            Registry registry = LocateRegistry.getRegistry(null);

            EquationSolver stub = (EquationSolver) registry.lookup("EquationSolver");

            EquationSolution solution = stub.solve(10, 4, 1);
            System.out.println(solution.root1.toString());
            System.out.println(solution.root2.toString());
        } catch (Exception e) {
            System.err.println("Client exception: " + e);
            e.printStackTrace();
        }
    }
}
