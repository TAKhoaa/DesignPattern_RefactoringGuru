interface Chair {
    sitOn(): void;
}

interface Table {
    placeItem(): void,
}

interface Sofa {
    lieOn(): void;
}



class ModernChair implements Chair {
    sitOn() {
        console.log("Sitting on a modern chair");
    }
}

class VictorianChair implements Chair {
    sitOn() {
        console.log("Sittong on a Victorian Chair");
    }
}

class ModernTable implements Table {
    placeItem() {
        console.log("Placing item on a modern table");
    }
}

class VictorianTable implements Table {
    placeItem() {
        console.log("Placing item on a Victorian Table");
    }
}

class ModernSofa implements Sofa {
    lieOn() {
        console.log("Lying on a modern sofa");
    }
}

class VictorianSofa implements Sofa {
    lieOn() {
        console.log("Lying on a Victorian sofa");
    }
}



interface FurnitureFactory {
    createChair(): Chair,
    createTable(): Table,
    createSofa(): Sofa,
}


class ModernFactory implements FurnitureFactory {
    createChair(): Chair {
        return new ModernChair();
    }

    createTable(): Table {
        return new ModernTable();
    }

    createSofa(): Sofa {
        return new ModernSofa();
    }
}

class VictorianFactory implements FurnitureFactory {
    createChair(): Chair {
        return new VictorianChair();
    }

    createTable(): Table {
        return new VictorianTable();
    }

    createSofa(): Sofa {
        return new VictorianSofa();
    }
}


function ClientCode(factory: FurnitureFactory) {
    const chair = factory.createChair();
    const table = factory.createTable();
    const sofa = factory.createSofa();

    chair.sitOn();
    table.placeItem();
    sofa.lieOn();
}

console.log("----------------This is Abstract Factory---------------")

const modern = new ModernFactory();
ClientCode(modern);

const victorian = new VictorianFactory();
ClientCode(victorian);