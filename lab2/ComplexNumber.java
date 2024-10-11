import java.io.Serializable;

public class ComplexNumber implements Serializable {
    private final double real;
    private final double imaginary;

    public ComplexNumber() {
        real = 0.0;
        imaginary = 0.0;
    }

    public ComplexNumber(double real, double imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    public static ComplexNumber sqrt(double n) {
        return n < 0 ? new ComplexNumber(0, Math.sqrt(-n)) : new ComplexNumber(Math.sqrt(n), 0);
    }

    public ComplexNumber addReal(double n) {
        return new ComplexNumber(this.real + n, this.imaginary);
    }

    public ComplexNumber divideByReal(double n) {
        return new ComplexNumber(this.real / n, this.imaginary / n);
    }

    public ComplexNumber negative() {
        return new ComplexNumber(-this.real, -this.imaginary);
    }

    @Override
    public String toString() {
        return this.real + (this.imaginary < 0 ? " - " : " + ") + Math.abs(this.imaginary) + "i";
    }
}
