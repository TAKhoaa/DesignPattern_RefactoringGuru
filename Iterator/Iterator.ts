interface CustomIterator<T> {
  hasNext(): boolean;
  next(): T;
}

interface IterableCollection<T> {
  createIterator(): CustomIterator<T>;
}

class ConcreteCollection<T> implements IterableCollection<T> {
  private items: T[] = [];

  public add(item: T): void {
    this.items.push(item);
  }

  public getItems(): T[] {
    return this.items;
  }

  public createIterator(): CustomIterator<T> {
    return new ConcreteIterator(this);
  }
}

class ConcreteIterator<T> implements CustomIterator<T> {
  private collection: ConcreteCollection<T>;
  private index: number = 0;

  constructor(collection: ConcreteCollection<T>) {
    this.collection = collection;
  }

  public hasNext(): boolean {
    return this.index < this.collection.getItems().length;
  }

  public next(): T {
    return this.collection.getItems()[this.index++];
  }
}

const stringCollection = new ConcreteCollection<string>();
stringCollection.add("Hello");
stringCollection.add("World");

const stringIterator = stringCollection.createIterator();
while (stringIterator.hasNext()) {
  console.log(stringIterator.next());
}

const numberCollection = new ConcreteCollection<number>();
numberCollection.add(1);
numberCollection.add(2);

const numberIterator = numberCollection.createIterator();
while (numberIterator.hasNext()) {
  console.log(numberIterator.next()); // Output: 1 2
}
