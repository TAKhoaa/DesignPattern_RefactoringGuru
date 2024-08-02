abstract class Shape {
  public X: number;
  public Y: number;
  public color: string;

  constructor(X: number, Y: number, color: string = "white") {
    this.X = X;
    this.Y = Y;
    this.color = color;
  }

  abstract clone(): Shape;
}

class Circle extends Shape {
  public radius: number;
  public relatedCircle: Circle | null = null;

  constructor(
    radius: number,
    relatedCircle: Circle | null = null,
    X: number,
    Y: number,
    color: string = "white"
  ) {
    super(X, Y, color);
    this.radius = radius;
    this.relatedCircle = relatedCircle
      ? new Circle(
          relatedCircle.radius,
          null,
          relatedCircle.X,
          relatedCircle.Y,
          relatedCircle.color
        )
      : null;

    if (this.relatedCircle) {
      this.relatedCircle.relatedCircle = this;
    }
  }

  clone(): Shape {
    return new Circle(
      this.radius,
      this.relatedCircle,
      this.X,
      this.Y,
      this.color
    );
  }
}

function clientCode() {
  const circle1 = new Circle(15, null, 10, 20, "red");

  const circle2 = new Circle(25, circle1, 30, 40, "blue");
  circle1.relatedCircle = circle2;

  const clonedCircle1 = circle1.clone() as Circle;

  console.log(clonedCircle1);
  console.log(clonedCircle1.relatedCircle);
  console.log(clonedCircle1.relatedCircle?.relatedCircle);
  console.log(clonedCircle1.relatedCircle?.relatedCircle === clonedCircle1); // Should be true

  const test = Object.create(circle1, {
    name: { value: true, enumerable: true },
  });
  const cloneTest = test.clone();
  console.log(cloneTest);
}

clientCode();
