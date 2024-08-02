/**
 * The base Component class declares common operations for both simple and complex objects of a composition.
 */
abstract class Component {
  protected parent!: Component | null;

  /**
   * Optionally, the base Component can declare an interface for setting and
   * accessing a parent of the component in a tree structure. It can also
   * provide some default implementation for these methods.
   */
  public setParent(parent: Component | null) {
    this.parent = parent;
  }

  public getParent(): Component | null {
    return this.parent;
  }

  /**
   * In some cases, it would be beneficial to define the child-management
   * operations right in the base Component class. This way, you won't need to
   * expose any concrete component classes to the client code, even during the
   * object tree assembly. The downside is that these methods will be empty
   * for the leaf-level components.
   */

  public add(component: Component): void {}
  public remove(component: Component): void {}

  /**
   * You can provide a method that lets the client code figure out whether a
   * component can bear children.
   */

  public isComposite(): boolean {
    return false;
  }

  // The base Component may implement some default behavior
  public abstract operation(): string;
}
/**
 * The Leaf class represents the end objects of a composition. A leaf can't have
 * any children.
 *
 * Usually, it's the Leaf objects that do the actual work, whereas Composite
 * objects only delegate to their sub-components.
 */
class Leaf extends Component {
  public operation(): string {
    return "Leaf";
  }
}

/**
 * The Composite class represents the complex components that may have children.
 * Usually, the Composite objects delegate the actual work to their children and
 * then "sum-up" the result.
 */

class Composite extends Component {
  protected children: Component[] = [];

  /**
   * A composite object can add or remove other components (both simple or
   * complex) to or from its child list.
   */
  public add(component: Component): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: Component): void {
    const componentIndex = this.children.indexOf(component); //tìm vị trí `component` trong mảng children bằng `indexOf()`
    this.children.splice(componentIndex, 1); // splice() để xóa `component` ra khỏi mảng

    component.setParent(null); // xóa liên kết cha của `component`
  }

  public isComposite(): boolean {
    return true; // trả về true để chỉ ra đây là đối tượng tổng hợp`composite`
  } //Mục đích: Cho phép client code xác định xem đối tượng hiện tại có thể chứa các đối tượng con hay không.

  /**
   * The Composite executes its primary logic in a particular way. It
   * traverses recursively through all its children, collecting and summing
   * their results. Since the composite's children pass these calls to their
   * children and so forth, the whole object tree is traversed as a result.
   */
  public operation(): string {
    const result: string[] = [];
    for (const child of this.children) {
      result.push(child.operation());
    }

    return `Branch(${result.join("+")})`;
  }
}

/**
 * The client code works with all of the components via the base interface.
 */

function clientCode(component: Component) {
  // ...

  console.log(`RESULT: ${component.operation()}`);

  // ...
}

const simple = new Leaf();
console.log("Client: I've got a simple component:");
clientCode(simple);
console.log("");

/**
 * ...as well as the complex composites.
 */
const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log("Client: Now I've got a composite tree:");
clientCode(tree);
console.log("");

function clientCode2(component1: Component, component2: Component) {
  if (component1.isComposite()) {
    component1.add(component2);
  }
  console.log(`RESULT: ${component1.operation()} `);
}

console.log(
  "Client: I don't need to check the components classes even when managing the tree:"
);
clientCode2(tree, simple);

/*Mẫu thiết kế Composite cho phép xử lý các đối tượng đơn giản và tổng hợp theo cùng một cách.
Lớp Component cung cấp một giao diện thống nhất cho tất cả các thành phần.
Lớp Leaf đại diện cho các đối tượng đơn giản, trong khi lớp Composite đại diện cho các đối tượng tổng hợp có thể chứa các thành phần con.
Hàm clientCode và clientCode2 cho thấy cách sử dụng cấu trúc cây mà không cần quan tâm đến chi tiết cụ thể của từng thành phần.*/
