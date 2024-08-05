//Abstract Class
abstract class HouseTemplate {
  //Template method
  public buildHouse(): void {
    this.buildFoundation();
    this.buildStructure();
    this.buildRoof();
    this.paintHouse();
    this.installDoorsAndWindows();
    console.log("Ngôi nhà được xây dựng lên hoàn tất.");
  }

  //Step with default implementations
  protected buildFoundation(): void {
    console.log("Xây dựng móng nhà với xi măng, cốt thép và cát.");
  }

  protected installDoorsAndWindows(): void {
    console.log("Lắp đặt cửa ra vào và cửa sổ.");
  }

  // Abstract methods to be implemented by subclasses
  protected abstract buildStructure(): void;
  protected abstract buildRoof(): void;
  protected abstract paintHouse(): void;
}

//Concrete Classes 1
class WoodenHouse extends HouseTemplate {
  protected buildStructure(): void {
    console.log("Xây dựng cấu trúc gỗ");
  }

  protected buildRoof(): void {
    console.log("Xây dựng mái nhà bằng gỗ.");
  }

  protected paintHouse(): void {
    console.log("Sơn nhà với sơn gỗ");
  }
}

//concrete Classes 2
class GlassHouse extends HouseTemplate {
  protected buildStructure(): void {
    console.log("Xây dựng cấu trúc kính");
  }

  protected buildRoof(): void {
    console.log("Xây dựng mái nhà bằng kính");
  }

  protected paintHouse(): void {
    console.log("Sơn nhà với sơn chống năng cho kính");
  }
}

//Client Code
const woodenHouse = new WoodenHouse();
console.log("Xây dựng nhà gỗ:");
woodenHouse.buildHouse();

console.log("----------------");

const glassHouse = new GlassHouse();
console.log("Xây dựng nhà kính:");
glassHouse.buildHouse();
