// Định nghĩa giao diện Mediator
interface Mediator {
  notify(sender: Colleague, event: string): void;
}

// Lớp Colleague
class Colleague {
  protected mediator?: Mediator; // Sử dụng dấu ? để cho phép giá trị undefined

  constructor(mediator?: Mediator) {
    this.mediator = mediator;
  }
}

// Các lớp cụ thể kế thừa Colleague
class Button extends Colleague {
  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  public click(): void {
    console.log("Button clicked.");
    if (this.mediator) {
      this.mediator.notify(this, "click");
    }
  }
}

class TextBox extends Colleague {
  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  public enterText(text: string): void {
    console.log(`Text input: ${text}`);
    if (this.mediator) {
      this.mediator.notify(this, "input");
    }
  }
}

class CheckBox extends Colleague {
  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  public checked: boolean = false;

  public toggle(): void {
    this.checked = !this.checked;
    console.log(`Checkbox state: ${this.checked}`);
    if (this.mediator) {
      this.mediator.notify(this, "toggle");
    }
  }
}

// Lớp Mediator cụ thể
class FormMediator implements Mediator {
  private button: Button;
  private textBox: TextBox;
  private checkBox: CheckBox;

  constructor(button: Button, textBox: TextBox, checkBox: CheckBox) {
    this.button = button;
    this.textBox = textBox;
    this.checkBox = checkBox;
  }

  public notify(sender: Colleague, event: string): void {
    if (event === "click") {
      console.log("Mediator reacts to button click.");
      // Xử lý sự kiện từ button
      if (this.checkBox) {
        console.log("Processing checkbox state...");
      }
    } else if (event === "input") {
      console.log("Mediator reacts to textbox input.");
      // Xử lý sự kiện từ textbox
    } else if (event === "toggle") {
      console.log("Mediator reacts to checkbox toggle.");
      // Xử lý sự kiện thay đổi trạng thái checkbox
    }
  }
}

// Khởi tạo các đối tượng với giá trị undefined (hoặc không truyền mediator)
const button = new Button();
const textBox = new TextBox();
const checkBox = new CheckBox();

// Tạo mediator
const mediator = new FormMediator(button, textBox, checkBox);

// Cập nhật mediator cho các đối tượng
button.setMediator(mediator);
textBox.setMediator(mediator);
checkBox.setMediator(mediator);

// Sử dụng các đối tượng
button.click();
textBox.enterText("Hello world");
checkBox.toggle();
