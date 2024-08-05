//định nghĩa interface Visitor
interface Visitor {
  visitElectronics(electronics: Electronics): void;
  visitGroceries(groceries: Groceries): void;
}

//Concrete visitor
//lớp DiscountVisitor(Giảm giá ) thực hiện Visitor
class DiscountVisitor implements Visitor {
  visitElectronics(electronics: Electronics): void {
    console.log(`Giảm giá 10% cho sản phẩm điện tử: ${electronics.name}`);
  }

  visitGroceries(groceries: Groceries): void {
    console.log(`Giảm giá 5% cho hàng tạp hóa: ${groceries.name}`);
  }
}
//lớp TaxVisitor(thuế) thực hiện Visitor
class TaxVisitor implements Visitor {
  visitElectronics(electronics: Electronics): void {
    console.log(`Áp thuế 15% cho sản phẩm điện tử: ${electronics.name}`);
  }

  visitGroceries(groceries: Groceries): void {
    console.log(`Áp thuế 7% cho hàng tạp hóa: ${groceries.name}`);
  }
}

//định nghĩa interface Product
interface Product {
  accept(visitor: Visitor): void;
}

//lớp Electronics(thiết bị điện tử) thực hiện product
class Electronics implements Product {
  constructor(public name: string, public price: number) {}

  accept(visitor: Visitor): void {
    visitor.visitElectronics(this);
  }
}

//lớp Groceries(cửa hàng tạp hóa) thực hiện product
class Groceries implements Product {
  constructor(public name: string, public price: number) {}

  accept(visitor: Visitor): void {
    visitor.visitGroceries(this);
  }
}

//lớp ShoppingCart(đơn hàng)
class ShoppingCart {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }

  applyVisitor(visitor: Visitor): void {
    for (const product of this.products) {
      product.accept(visitor);
    }
  }
}

//client code
const cart = new ShoppingCart();
cart.addProduct(new Electronics("TV", 1000));
cart.addProduct(new Groceries("Apple", 2));

const discountVisitor = new DiscountVisitor();
const taxVisitor = new TaxVisitor();

console.log("Áp dụng giảm giá:");
cart.applyVisitor(discountVisitor);

console.log("-------------------------");

console.log("Áp dụng thuế:");
cart.applyVisitor(taxVisitor);
