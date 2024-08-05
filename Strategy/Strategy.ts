/*Strategy Interface: Định nghĩa một giao diện chung cho tất cả các thuật toán.

Concrete Strategies: Thực hiện các thuật toán khác nhau thông qua giao diện.

Context: Sử dụng đối tượng Strategy để gọi thuật toán cụ thể.
*/

//định nghĩa  strategy interface
interface PaymentStrategy {
  pay(amount: number): void;
}

//Concrete Strategy 1
class CreditCardPayment implements PaymentStrategy {
  constructor(private cardNumber: string) {}

  pay(amount: number): void {
    console.log(`Thanh toán ${amount} bằng thẻ tính dụng: ${this.cardNumber}`);
  }
}

//Concrete Strategy 2
class PaypalPayment implements PaymentStrategy {
  constructor(private email: string) {}

  pay(amount: number): void {
    console.log(`Thanh toán ${amount} qua Paypal: ${this.email}`);
  }
}

//Context
class ShoppingCart {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  checkout(amount: number): void {
    this.strategy.pay(amount);
  }
}

//client code
const cart = new ShoppingCart(new CreditCardPayment("1234-5678-9876-5432"));
cart.checkout(1000);

cart.setPaymentStrategy(new PaypalPayment("user@example.com"));
cart.checkout(2000);
