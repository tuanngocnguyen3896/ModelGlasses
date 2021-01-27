import { Glasses } from "../models/Glasses.js";
import { Model } from "../models/Model.js";
let arrGlasses = [];

let getData = async function () {
  try {
    let result = await axios({
      url: "/data/data.json", //url backend qui định
      method: "GET", //Phương thức backend qui định
      responseType: "json", //Kiểu dữ liệu server trả về BE qui định
    });
    //Sau khi gọi api có dữ liệu gửi về => Tạo lớp đối tượng chứa thông tin kính
    arrGlasses = result.data;
    renderGlasses(arrGlasses);
  } catch (err) {
    console.log(err);
  }
};

const renderGlasses = (arrResult) => {
  // console.log(arrResult);
  //Từ mảng dữ liệu => tạo giao diện kính cho người dùng chọn
  const contentGlasses = arrResult.reduce((content, item, index) => {
    return (content += `
            <div class="col-4" >
                <img style="width:100%;height:100%;cursor:pointer;" src="${item.src}" alt="${item.src}" onclick="renderGlassModel('${item.id}')" />
            </div>
        `);
  }, "");

  //dom giao diện => in ra màn hình
  document.querySelector("#vglassesList").innerHTML = contentGlasses;
};
getData();

//dữ liệu model sẽ đại diện cho thành phần giao diện người mẫu
let model = new Model();
window.renderGlassModel = (id = 0) => {
  //Từ id kính => lấy ra kính trong mảng
  let newGlasses = arrGlasses.find((gl) => gl.id === id);
  if (newGlasses) {
    //Gọi phương thức thay đổi giá trị thuộc tính Glasses
    model.changeGlasses(newGlasses);
    //Gọi phương thức tạo giao diện
    document.getElementById("glassesDetail").src =
      model.glassesDetail.virtualImg;
    //render info glasses
    //....
    console.log(newGlasses);

    // Cách 1
    let contentInfo = "";
    contentInfo += `<ul style="list-style-type:none">
        <li><span>${newGlasses.id}</span></li>
        <li style="color:red"><span>${newGlasses.name}</span></li>
        <li><span>${newGlasses.price}</span></li>
        <li><span>${newGlasses.color}</span></li>
        <li><span>${newGlasses.description}</span></li>
        </ul>
        `;
    document.getElementById("glassesInfo").innerHTML = contentInfo;
    document.getElementById("glassesInfo").style.display = "block";

    // Cách 2
    // newGlasses = [newGlasses];
    // console.log(newGlasses);
    // const contentGlInfo = newGlasses.reduce((content, item, index) => {
    //     return content += `
    //         <ul style="list-style-type:none">
    //         <li><span>${item.id}</span></li>
    //         <li><span>${item.name}</span></li>
    //         <li><span>${item.brand}</span></li>
    //         <li><span>${item.price}</span></li>
    //         <li><span>${item.color}</span></li>
    //         <li><span>${item.description}</span></li>
    //          </ul>
    //     `
    // }, '');
    // //dom giao diện => in ra màn hình
    // document.getElementById('glassesInfo').innerHTML = contentGlInfo;
    // document.getElementById('glassesInfo').style.display = 'block';
  }
  document.getElementById("glassesInfo").style.display = "block";
};
renderGlassModel();

// Ẩn hiện kính
// window.removeGlasses = (valid) => {
//     let glass = document.getElementById("glassesDetail");
//     if (valid) {
//       glass.style.display = "block";
//       document.getElementById('glassesInfo').style.display = 'block';
//     } else {
//       glass.style.display = "none";
//       document.getElementById('glassesInfo').style.display = 'none';
//     }

// }

window.removeGlasses = (valid)  => {
    // Tạo arr chứa src ảnh
    let result = arrGlasses.map((item)=> item.virtualImg);
    console.log(result);
    
    let imgElement = document.getElementById("glassesDetail");
    let index = 1;
    if(valid){
      if (index < result.length - 1) {
        index++;
      } else {
        index = 0;
      }
      imgElement.src = result[index];
        
    }else{
      if (index > 0) {
        index--;
      } else {
        index = result.length - 1;
      }
      imgElement.src = result[index];
    }

}
