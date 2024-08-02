//Định nghĩa giao diện command
interface Command {
  execute(): void;
}

//Tạo lớp Receiver (Light)
class Light {
  public turnOn(): void {
    console.log("Light is turned on");
  }
  public turnOff(): void {
    console.log("Light is turned off");
  }
}

//Tạo các lớp Command cụ thể
class LightOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  public execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  public execute(): void {
    this.light.turnOff();
  }
}

//tạo lớp invoker
class RemoteControl {
  private command!: Command; //! khẳng định thuộc tính sẽ được khởi tạo sau

  public setCommand(command: Command): void {
    this.command = command;
  }

  public pressButton(): void {
    this.command.execute();
  }
}

//Client code
function clientCode() {
  const light = new Light();
  const lightOnCommand = new LightOnCommand(light);
  const lightOffCommand = new LightOffCommand(light);

  const remoteControl = new RemoteControl();

  //Bật đèn
  remoteControl.setCommand(lightOnCommand);
  remoteControl.pressButton();

  //tắt đèn
  remoteControl.setCommand(lightOffCommand);
  remoteControl.pressButton();
}

clientCode(); // Thực hiện ví dụ
