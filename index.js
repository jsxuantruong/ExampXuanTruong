let btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", function () {
  
  let name = document.getElementById("name").value;
  let listInfo = JSON.parse(localStorage.getItem("listInfo"));
  let exist = false;
  if (listInfo != null) {
    for (const info of listInfo) {
      if (info.listInfo == name) {
        //Đã tồn tại ID
        exist = true;
        break;
      }
    }
  }
  if (exist) {
    //Đã tồn tại
    editInfo();
  } else {
    createInfo();
  }
});

    
      function createInfo() {
        validateForm();
        let listInfo = JSON.parse(localStorage.getItem("listInfo"));
        if (listInfo == null) {
         
          listInfo = [];
        }
       
        let name = document.getElementById("name").value;
        let mail = document.getElementById("mail").value;
        let phone = parseFloat(document.getElementById("phone").value);
        let country = document.getElementById("country").value;
        let sex = document.getElementById("sex").value;
        
    
        let infoNew = {
          name: name,
          mail: mail,
          phone:phone,
          country: country,
          sex: sex,
        };
        
        listInfo.push(infoNew);
        
        localStorage.setItem("listInfo", JSON.stringify(listInfo));
       
        readListInfo();
      }
      function readListInfo() {
        
        let listInfo = JSON.parse(localStorage.getItem("listInfo"));
        if (listInfo == null) {
          listInfo = [];
        }
      
        let tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";
        listInfo.forEach((info, index) => {
          //Hiển thị ra một sản phẩm trong tableBody
          tableBody.innerHTML += `
                      <tr>
                          <td>${index + 1}</td>
                          <td>${info.name}</td>
                          <td>${info.mail}</td>
                          <td>${info.phone}</td>
                          <td>${info.country}</td>
                          <td>${info.sex}</td>

                          <td>
                              <button onclick="updateInfo('${
                                info.name
                              }')">Edit</button>
                              <button onclick="deleteInfo('${
                                info.name
                              }')">Delete</button>
                          </td>
                      </tr>`;
        });
      }
      readListInfo();

      function validateForm() {
        let x = document.forms["myForm"]["name"].value;
        if (x == "") {
          alert("Vui lòng nhập đầy đủ thông tin");
          return false;
        }
      }

      function updateInfo(name) {
      
        let listInfo = JSON.parse(localStorage.getItem("listInfo"));
        
        let infoUpdate = listInfo.filter((info) => {
          if (info.name == name) {
            return info;
          }
        });
        
        document.getElementById("name").value = infoUpdate[0].name;
        document.getElementById("mail").value =infoUpdate[0].mail;
        document.getElementById("phone").value = infoUpdate[0].phone;
        document.getElementById("country").value = infoUpdate[0].country;
      }

      function editInfo() {
       
        let listInfo = JSON.parse(localStorage.getItem("listInfo"));
      
        let name = document.getElementById("name").value;
        let mail = document.getElementById("mail").value;
        let phone = parseFloat(document.getElementById("phone").value);
        let country = document.getElementById("country").value;
        let sex = document.getElementById("sex").value;
        
        let listInfoUpdate = listInfo.map((info) => {
          if (info.name == name) {
            info.mail = mail;
           info.phone,
           info.country,
           info.sex
          }
          return info;
        });
        
        localStorage.setItem("listInfo", JSON.stringify(listInfoUpdate));
       
        readListInfo();
      }

      function deleteInfo(name) {
        
        let listInfo = JSON.parse(localStorage.getItem("listInfo"));
        
        for (let i = 0; i < listInfo.length; i++) {
          if (listInfo[i].name == name) {
            listInfo.splice(i, 1);
            break;
          }
        }
       
        localStorage.setItem("listInfo", JSON.stringify(listInfo));
        
        readListInfo();
      }