//Flyweight interface
interface Shape {
  draw(x: number, y: number): void;
}

// ConcreteFlyweight class
class Circle implements Shape {
  private color: string;

  constructor(color: string) {
    this.color = color;
  }

  public draw(x: number, y: number): void {
    console.log(`Drawing a ${this.color} circle at (${x}, ${y})`);
  }
}

//FlyweightFactory class
class ShapeFactory {
  private circles: { [key: string]: Circle } = {};

  public getCircle(color: string): Circle {
    if (!this.circles[color]) {
      this.circles[color] = new Circle(color);
      console.log(`Creating a new circle of color: ${color}`);
    }
    return this.circles[color];
  }
}

//Client code
function clientCode() {
  const factory = new ShapeFactory();

  const redCircle1 = factory.getCircle("red");
  redCircle1.draw(10, 10);

  const redCircle2 = factory.getCircle("red");
  redCircle2.draw(20, 20);

  const blueCircle = factory.getCircle("blue");
  blueCircle.draw(30, 30);
}

clientCode();

/*
Flyweight Interface (Shape): Định nghĩa phương thức draw mà tất cả các hình phải triển khai.

ConcreteFlyweight Class (Circle): Triển khai giao diện Shape và lưu giữ trạng thái nội tại color (màu sắc của hình tròn).

FlyweightFactory Class (ShapeFactory): Quản lý và cung cấp các đối tượng Circle. Nếu một đối tượng với màu sắc cụ thể chưa tồn tại, nó sẽ tạo mới đối tượng và lưu trữ để dùng lại.

Client Code: Sử dụng ShapeFactory để lấy các đối tượng Circle. Các đối tượng có màu sắc giống nhau sẽ được chia sẻ thay vì tạo mới, giúp tiết kiệm bộ nhớ.
*/
