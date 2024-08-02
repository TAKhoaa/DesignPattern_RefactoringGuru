class Local {
  public request(): string {
    return "Local: The default local's behavior.";
  }
}

class Adaptee {
  public specificRequest(): string {
    return ".eetpadA eht fo roivaheb laicepS";
  }
}

/**
 * The Adapter makes the Adaptee's interface compatible with the Target's interface.
 */

class Adapter extends Local {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest().split("").reverse().join("");
    return `Adapter: (TRANSLATED) ${result}`;
  }
}

/**
 * The client code supports all classes that follow the Target interface.
 */
function clientCode(local: Local) {
  console.log(local.request());
}

console.log("Client: I can work just fine with the Local objects:");
const local = new Local();
clientCode(local);

console.log("");

const adaptee = new Adaptee();
console.log(
  "Client: The adaptee class has weird interface. See, I don't understand it:"
);
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log("");

console.log("Client: But i can work with it via the Adapter:");
const adapter = new Adapter(adaptee);
clientCode(adapter);
