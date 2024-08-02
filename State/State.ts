// Giao diện State
interface State {
  insertCoin(): void;
  ejectCoin(): void;
  selectProduct(): void;
  dispense(): void;
}

// Lớp Context (Vending Machine)
class VendingMachine {
  private state: State;

  private hasCoinState: State;
  private noCoinState: State;
  private soldState: State;

  constructor() {
    this.hasCoinState = new HasCoinState(this);
    this.noCoinState = new NoCoinState(this);
    this.soldState = new SoldState(this);

    this.state = this.noCoinState; // Trạng thái ban đầu
  }

  public setState(state: State): void {
    this.state = state;
  }

  public getHasCoinState(): State {
    return this.hasCoinState;
  }

  public getNoCoinState(): State {
    return this.noCoinState;
  }

  public getSoldState(): State {
    return this.soldState;
  }

  public insertCoin(): void {
    this.state.insertCoin();
  }

  public ejectCoin(): void {
    this.state.ejectCoin();
  }

  public selectProduct(): void {
    this.state.selectProduct();
    this.state.dispense();
  }
}

// Trạng thái khi có đồng xu
class HasCoinState implements State {
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  public insertCoin(): void {
    console.log("Coin already inserted.");
  }

  public ejectCoin(): void {
    console.log("Coin returned.");
    this.vendingMachine.setState(this.vendingMachine.getNoCoinState());
  }

  public selectProduct(): void {
    console.log("Product selected.");
    this.vendingMachine.setState(this.vendingMachine.getSoldState());
  }

  public dispense(): void {
    console.log("No product dispensed.");
  }
}

// Trạng thái khi không có đồng xu
class NoCoinState implements State {
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  public insertCoin(): void {
    console.log("Coin inserted.");
    this.vendingMachine.setState(this.vendingMachine.getHasCoinState());
  }

  public ejectCoin(): void {
    console.log("No coin to return.");
  }

  public selectProduct(): void {
    console.log("Insert coin first.");
  }

  public dispense(): void {
    console.log("No product dispensed.");
  }
}

// Trạng thái khi đã bán
class SoldState implements State {
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  public insertCoin(): void {
    console.log("Please wait, already dispensing a product.");
  }

  public ejectCoin(): void {
    console.log("Cannot eject, product already sold.");
  }

  public selectProduct(): void {
    console.log("Already selected product.");
  }

  public dispense(): void {
    console.log("Product dispensed.");
    this.vendingMachine.setState(this.vendingMachine.getNoCoinState());
  }
}
