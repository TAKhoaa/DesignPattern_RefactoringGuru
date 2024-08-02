//Giao diện cho hình ảnh
interface Image {
  display(): void;
}

// lớp RealImage thực hiện giao diện Image
class RealImage implements Image {
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.loadFromDisk();
  }

  //Phương thức tải ảnh từ đĩa
  private loadFromDisk(): void {
    console.log(`Loading ${this.fileName}`);
  }

  //Phương thức hiển thị hình ảnh
  display(): void {
    console.log(`Display ${this.fileName}`);
  }
}

//Lớp ProxyImage thực hiện giao diện Image
class ProxyImage implements Image {
  private realImage: RealImage | null = null;
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  //Phương thức hiển thị hình ảnh thông qua proxy
  display(): void {
    if (this.realImage === null) {
      this.realImage = new RealImage(this.fileName);
    }
    this.realImage.display();
  }
}

//Client code
function clientCode(image: Image): void {
  console.log("Client request to display the image.");
  image.display();
}

//Sử dụng ProxyImage để hiển thị hình ảnh
const image: Image = new ProxyImage("test_image.jpg");

// sử dụng hàm client code để hiển thị hình ảnh
clientCode(image);
clientCode(image);

//1. interface Image định nghĩa phương thức display() để các lớp khác thực hiện

/*
2. Lớp RealImage
thực hiện interface Image
loadFromImage() để tải hình ảnh từ đĩa
display() để hiển thị hình ảnh
*/

/*
3. Lớp ProxyImage 
implements interface Image
Có một tham chiếu đến RealImage, và chỉ khởi tạo nó khi cần.
Phương thức display() kiểm tra và tạo RealImage nếu chưa tồn tại, rồi gọi phương thức display() của RealImage.
*/

/*
4. Client Code
Nhận một đối tượng Image làm tham số và gọi phương thức display() trên đối tượng đó.
Hàm này đại diện cho mã của khách hàng sử dụng proxy mà không cần biết đó là proxy hay đối tượng thực
*/

/*
5. Sử dụng ProxyImage:
Tạo một đối tượng ProxyImage và sử dụng hàm displayImage() để hiển thị hình ảnh.
Hình ảnh chỉ được tải từ đĩa lần đầu tiên khi display() được gọi.
*/
