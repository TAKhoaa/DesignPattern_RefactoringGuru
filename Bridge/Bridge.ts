interface Device {
  name: string;
  isEnabled(): boolean;
  enabled(): void;
  disable(): void;
}

class TV implements Device {
  private on: boolean = false;
  public name: string = "TV";
  isEnabled(): boolean {
    return this.on;
  }

  enabled(): void {
    this.on = true;
  }
  disable(): void {
    this.on = false;
  }
}

class Radio implements Device {
  private on: boolean = false;
  public name: string = "Radio";
  isEnabled(): boolean {
    return this.on;
  }
  enabled(): void {
    this.on = true;
  }
  disable(): void {
    this.on = false;
  }
}

class Remote {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  public TogglePowerButton(): void {
    if (this.device.isEnabled() == true) {
      this.device.disable();
      console.log("Turn off this" + this.device.name);
    } else {
      this.device.enabled();
      console.log("Turn on this" + this.device.name);
    }
  }
}

class AdvancedRemote extends Remote {
  mute(): void {
    console.log(this.device.name + "is muted!");
  }
}

function clientCode() {
  const tv = new TV();
  const remote = new Remote(tv);
  remote.TogglePowerButton();

  const radio = new Radio();
  const advancedRemote = new AdvancedRemote(radio);
  advancedRemote.TogglePowerButton();
  advancedRemote.mute();
  advancedRemote.TogglePowerButton();
  remote.TogglePowerButton();
}

clientCode();

/*Giao diện Device định nghĩa cách các thiết bị sẽ được điều khiển.
Lớp TV và Radio triển khai giao diện Device, cung cấp các thao tác bật/tắt thiết bị.
Lớp Remote có thể điều khiển bất kỳ thiết bị nào triển khai Device, cung cấp chức năng bật/tắt thiết bị thông qua phương thức TogglePowerButton().
Lớp AdvancedRemote mở rộng Remote với chức năng mute bổ sung.
Hàm clientCode cho thấy cách sử dụng các lớp này để điều khiển thiết bị.*/
