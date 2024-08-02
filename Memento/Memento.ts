//Lớp Mementor lưu trữ trạng thái
class Memento {
  constructor(private state: string) {}
  public getState(): string {
    return this.state;
  }
}

// Lớp Originator giữ trạng thái và tạo Memento
class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
  }

  public setState(state: string): void {
    this.state = state;
    console.log(`State set to: ${this.state}`);
  }

  public saveStateToMemento(): Memento {
    console.log(`Saving state: ${this.state}`);
    return new Memento(this.state);
  }

  public restoreStateToMemento(memento: Memento): void {
    this.state = memento.getState();
    console.log(`State restored to: ${this.state}`);
  }
}

//lớp Caretaker quản lý các Memento
class Caretaker {
  private mementoList: Memento[] = [];

  public add(memento: Memento): void {
    this.mementoList.push(memento);
    console.log(`Memento added. Total memento ${this.mementoList.length}`);
  }

  public get(index: number): Memento {
    return this.mementoList[index];
  }
}

//Khởi tạo Originator với trạng thái ban đầu
const originator = new Originator("State1");

//Khỏi tạo Caretaker để quản lý các Memento
const caretaker = new Caretaker();

//Lưu trạng thái vào Memento và thêm vào Caretaker
caretaker.add(originator.saveStateToMemento());

//Thay đổi trạng thái
originator.setState("State2");

//Lưu trạng thái mới vào Memento và thêm vào Caretaker
caretaker.add(originator.saveStateToMemento());

//thay đổi trạng thái thêm nữa
originator.setState("State3");

// Khôi phụ trạng thái từ Mementor trước đó
originator.restoreStateToMemento(caretaker.get(0)); // khôi phục trạng thái của State1

//Khôi phục trạng thái của Memento trước nữa
originator.restoreStateToMemento(caretaker.get(1)); // khôi phục trạng thái của State2
