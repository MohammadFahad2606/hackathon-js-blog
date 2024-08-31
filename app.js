import {
  createUserWithEmailAndPassword,
  updateDoc,
  getDoc,
  doc,
  deleteDoc,
  getDocs,
  collection,
  addDoc,
  db,
  onAuthStateChanged,
  auth,
} from "./firebas.js";

let loderWrapper = document.querySelector("#loader");

const getpost = async () => {
  boxContener.innerHTML = "";

  loderWrapper.style.display = "block";
  const querySnapshot = await getDocs(collection(db, "blogPost"));

  querySnapshot.forEach((doc) => {
    const { tittle, disruption, categorie, img, postDate } = doc.data();

    boxContener.innerHTML += `
      <div  class="col-span-6 md:col-span-6 sm:col-span-12 ">
                          <div class="mb-7 pb-5 border-b border-[#eeeeee] group">
                              <div class="overflow-hidden relative rounded-[6px]">
                                  <img src="${img}" alt=""
                                      class="boxContener-img w-full grayscale-0 scale-[0.3]
                          rounded-[6px] transition-all group-hover:grayscale-[100%] group-hover:scale-[1.2]">
                                  <div
                                      class="absolute left-[15px] top-[15px] p-[4px_25px_2px] bg-[#3756f7] uppercase text-white text-[14px] rounded-[5px]">
                                      ${categorie}</div>
                              </div>
                              <div class="pt-3">
                                  <h2 onclick="siglePost('${doc.id}')"
                                      class="text-xl font-heading-font mb-8 font-bold mt-3 xl:text-lg xl:mb-2 ">
                                      <a 
                                          class="text-[#444] transition-all hover:text-[#3756f7]">${tittle}</a>
                                  </h2>
                                  <ul class="flex mb-[15px] items-center">
                                      <li class="text-base text-[#3756f7]">
                                          <img src="assets/images/blog/blog-avater/img-1.jpg" alt=""
                                              class="w-[40px] h-[40px] rounded-[50%] mr-2">
                                      </li>
                                      <li class="text-base text-[#3756f7]">By <a
                                              
                                              class="text-[#003aae] transition-all hover:text-[#3756f7]">Admin</a>
                                      </li>
                                      <li
                                          class="text-base text-[#3756f7] relative pl-7 before:absolute before:left-[10px] before:top-[50%]
              before:-translate-y-1/2 before:w-[6px] before:h-[6px] before:bg-[#3756f7] before:rounded-[50%]">
                                          ${postDate}</li>
                                  </ul>
  
                                  <p class="text-[#444444] text-base">${disruption.slice(
                                    0,
                                    150
                                  )}.......
                                  </p>
                              </div>
                          </div>
                      </div>
  
  `;
  });

  loderWrapper.style.display = "none";
};
getpost();

window.siglePost = (id) => {
  localStorage.setItem("post-id", id);
  window.location.href = "./blog-single.html";
};

if (window.location.pathname === "/blog-single.html") {
  let blogPG = document.getElementById("blog-pg");
  let id = localStorage.getItem("post-id");

  const getSinglePost = async () => {
    try {
      let data = await getDoc(doc(db, "blogPost", id));
      const { tittle, disruption, img, postDate } = data.data();

      blogPG.innerHTML = `
      
      
      
      
      
      <div class="wraper">
          <div class="grid grid-cols-12 gap-x-4">
            <div class="col-span-1 md:col-span-12"></div>
            <div class="col-span-10 md:col-span-12">
              <div class="md:mt-[70px]">
                <img class="w-full" src="${img}" alt />
                <div class="overflow-hidden my-[35px]">
                  <ul>
                    <li
                      class="text-[14px] font-medium uppercase float-left col:float-none col:block col:ml-[0px] col:mb-[5px] text-[#687693]"
                    >
                      <i
                        class="relative top-0 mr-[3px] text-[15px] text-[#687693] fi flaticon-user"
                      ></i>
                      By
                      <a
                        class="text-[#687693] transition-all hover:text-[#3756f7]"
                        href="#"
                        >Admin</a
                      >
                    </li>
                    <li
                      class="text-[14px] font-medium uppercase float-left col:float-none col:block col:ml-[0px] col:mb-[5px] text-[#687693] ml-[20px] pl-[20px] relative before:absolute before:left-0 before:top-[50%] before:w-[7px] before:h-[7px] before:rounded-[50%] before:content-[''] before:translate before:-translate-y-1/2 before:bg-[#3756f7] z-10 before:-z-10"
                    >
                      <i
                        class="relative top-0 mr-[3px] text-[15px] text-[#687693] fi flaticon-comment-white-oval-bubble"
                      ></i>
                      Comments 35
                    </li>
                    <li
                      class="text-[14px] font-medium uppercase float-left col:float-none col:block col:ml-[0px] col:mb-[5px] text-[#687693] ml-[20px] pl-[20px] relative before:absolute before:left-0 before:top-[50%] before:w-[7px] before:h-[7px] before:rounded-[50%] before:content-[''] before:translate before:-translate-y-1/2 before:bg-[#3756f7] z-10 before:-z-10"
                    >
                      <i
                        class="relative top-0 mr-[3px] text-[15px] text-[#687693] fi flaticon-calendar-1"
                      ></i>
                      ${postDate}
                    </li>
                  </ul>
                </div>
                <h3
                  class="text-[34px] md:text-[25px] sm:text-[22px] text-[#0a272c] leading-[40px] mb-[20px]"
                >
                  ${tittle}
                </h3>
                <p class="text-[#687693] leading-[24px] text-[16px] mb-[20px]">
                  ${disruption}
                </p>
                
               
                
              </div>
             
            
            </div>
            <div class="col-span-1 md:col-span-12"></div>
          </div>
        </div>`;
    } catch (error) {
      Toastify({
        text: error,
        duration: 3000,
      }).showToast();
    }
  };
  getSinglePost();
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "./auth/dashboard/dashboard.html";
  }
});
