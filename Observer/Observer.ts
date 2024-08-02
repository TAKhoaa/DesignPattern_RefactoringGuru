interface Subscriber {
  update(productName: string): void;
}

//Giao diện Subject
interface ProductPublisher {
  subscribe(subscriber: Subscriber): void;
  unsubscribe(subscriber: Subscriber): void;
  notifySubscribers(): void;
}

// Lớp ConcreteSubject thực hiện ProductPublisher
class ConcreteProductPublisher implements ProductPublisher {
  private subscribers: Subscriber[] = [];
  private latestProduct!: string;

  public addProduct(productName: string): void {
    this.latestProduct = productName;
    this.notifySubscribers();
  }
  public subscribe(subscriber: Subscriber): void {
    const isExist = this.subscribers.includes(subscriber);
    if (isExist) {
      return console.log("Subscriber already registered.");
    }
    this.subscribers.push(subscriber);
    console.log("Subscriber registered.");
  }

  public unsubscribe(subscriber: Subscriber): void {
    const subscriberIndex = this.subscribers.indexOf(subscriber);
    if (subscriberIndex === -1) {
      return console.log("Subscribed not found.");
    }
    this.subscribers.splice(subscriberIndex, 1);
    console.log("Subscriber unsubscribed.");
  }

  public notifySubscribers(): void {
    console.log(
      `Notifying subscribers about new product: ${this.latestProduct}`
    );
    for (const subscriber of this.subscribers) {
      subscriber.update(this.latestProduct);
    }
  }
}

// Lớp ConcreteObserver thực hiện Subscriber
class ConcreteSubscriber implements Subscriber {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public update(productName: string): void {
    console.log(
      `${this.name} received notification about new product: ${productName}`
    );
  }
}

//Khởi tạo ConcreteProductPublisher
const publisher = new ConcreteProductPublisher();

//khởi tạo ConcreteSubscriber
const subscriber1 = new ConcreteSubscriber("Sub 1");
const subscriber2 = new ConcreteSubscriber("Sub 2");

//Đăng ký các subscriber với nhà xuất bản
publisher.subscribe(subscriber1);
publisher.subscribe(subscriber2);

//thêm sản phẩm mới và thông báo cho các subscriber
publisher.addProduct("New Phone Model");

//Hủy đăng ký subscriber
publisher.unsubscribe(subscriber1);

//Thêm sản phẩm mới khác và thông báo lại
publisher.addProduct("New Laptop Model");
