interface Builder {
  //reset() : void;
  buildCPU(): void;
  buildRAM(): void;
  buildHDD(): void;
  getComputer(): Computer;
}

class CPU {
  constructor(public brand: string, public cores: number) {}
  toString() {
    return `${this.brand} CPU with ${this.cores} cores`;
  }
}

class RAM {
  constructor(public size: number, public type: string) {}
  toString() {
    return `${this.size}GB ${this.type} RAM`;
  }
}

class HDD {
  constructor(public capacity: number, public type: string) {}
  toString() {
    return `${this.capacity}GB ${this.type} HDD`;
  }
}

class Computer {
  private parts: any[] = [];

  addPart(part: any) {
    this.parts.push(part);
  }

  showConfiguration() {
    console.log("Computer Configuration: ");
    this.parts.forEach((part) => console.log(part.toString()));
  }
}

interface ComputerBuilder {
  buildCPU(): void;
  buildRAM(): void;
  buildHDD(): void;
  getComputer(): Computer;
}

class GamingPCBuilder implements ComputerBuilder {
  private computer = new Computer();

  constructor() {
    this.reset();
  }

  reset() {
    this.computer = new Computer();
  }

  buildCPU() {
    this.computer.addPart(new CPU("Intel", 8));
  }

  buildRAM() {
    this.computer.addPart(new RAM(16, "DDR4"));
  }

  buildHDD() {
    this.computer.addPart(new HDD(1024, "SSD"));
  }

  getComputer() {
    const result = this.computer;
    this.reset();
    return result;
  }
}

class OfficePCBuilder implements ComputerBuilder {
  private computer = new Computer();

  constructor() {
    this.reset();
  }

  reset() {
    this.computer = new Computer();
  }

  buildCPU() {
    this.computer.addPart(new CPU("Intel", 4));
  }
  buildRAM() {
    this.computer.addPart(new RAM(8, "DDR3"));
  }
  buildHDD() {
    this.computer.addPart(new HDD(512, "HDD"));
  }
  getComputer() {
    const result = this.computer;
    this.reset();
    return result;
  }
}

class ServerPCBuilder implements ComputerBuilder {
  private computer = new Computer();

  constructor() {
    this.reset();
  }

  reset() {
    this.computer = new Computer();
  }

  buildCPU() {
    this.computer.addPart(new CPU("AMD", 16));
  }
  buildRAM() {
    this.computer.addPart(new RAM(64, "DDR4"));
  }
  buildHDD() {
    this.computer.addPart(new HDD(4096, "SSD"));
  }
  getComputer() {
    const result = this.computer;
    this.reset();
    return result;
  }
}

class ComputerDirector {
  private builder: ComputerBuilder;

  constructor(builder: ComputerBuilder) {
    this.builder = builder;
  }

  construct() {
    this.builder.buildCPU();
    this.builder.buildRAM();
    this.builder.buildHDD();
  }

  constructRaw() {
    this.builder.buildCPU();
  }

  getComputer() {
    return this.builder.getComputer();
  }
}

const gamingPCBuilder = new GamingPCBuilder();
const officePCBuilder = new OfficePCBuilder();
const serverPCBuilder = new ServerPCBuilder();

let director = new ComputerDirector(officePCBuilder);
director.construct();
const officePC = director.getComputer();
officePC.showConfiguration();

director = new ComputerDirector(gamingPCBuilder);
director.construct();
const gamingPC = director.getComputer();
gamingPC.showConfiguration();
console.log("\n");

director = new ComputerDirector(serverPCBuilder);
director.construct();
const serverPC = director.getComputer();
serverPC.showConfiguration();

console.log("\n");
director = new ComputerDirector(officePCBuilder);
director.constructRaw();
const officePCraw = director.getComputer();
officePCraw.showConfiguration();
