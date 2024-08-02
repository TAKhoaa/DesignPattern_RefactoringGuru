//class child
class Light {
  public turnOn() {
    console.log("Turning on");
  }

  public turnOff() {
    console.log("Turning off");
  }
}

class AirConditioner {
  public turnOn() {
    console.log("Turning on air conditioner");
  }

  public turnOff() {
    console.log("Turning off air conditioner");
  }
}

class Curtain {
  public open() {
    console.log("Opening curtain");
  }

  public close() {
    console.log("Closing curtain");
  }
}

//Facade
class SmartHouseFacade {
  private light: Light;
  private airConditioner: AirConditioner;
  private curtain: Curtain;

  constructor() {
    this.light = new Light();
    this.airConditioner = new AirConditioner();
    this.curtain = new Curtain();
  }

  // activate is public for client call
  public activate() {
    this.light.turnOn();
    this.airConditioner.turnOn();
    this.curtain.open();
  }

  // deactivate is public for client call
  public deactivate() {
    this.light.turnOff();
    this.airConditioner.turnOff();
    this.curtain.close();
  }
}

function clientCode() {
  const smartHouse = new SmartHouseFacade();
  console.log("Activated SmartHouseFacade");
  smartHouse.activate();

  console.log("Deactivated SmartHouseFacade");
  smartHouse.deactivate();
}

clientCode();
