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
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "./auth/dashboard/dashboard.html";
  }
});

let boxContener = document.querySelector("#boxContener")
console.log(boxContener)







const getpost = async () => {
  
  boxContener.innerHTML = ""


  const querySnapshot = await getDocs(collection(db, "blogPost"));
  querySnapshot.forEach((doc) => {

    const { tittle, disruption,category } = doc.data();

    

    boxContener.innerHTML += `
    <div class="col-span-6 md:col-span-6 sm:col-span-12">
                        <div class="mb-7 pb-5 border-b border-[#eeeeee] group">
                            <div class="overflow-hidden relative rounded-[6px]">
                                <img src="assets/images/foods/img-1.jpg" alt=""
                                    class="w-full grayscale-0 scale-[1]
                        rounded-[6px] transition-all group-hover:grayscale-[100%] group-hover:scale-[1.2]">
                                <div
                                    class="absolute left-[15px] top-[15px] p-[4px_25px_2px] bg-[#3756f7] uppercase text-white text-[14px] rounded-[5px]">
                                    ${category}</div>
                            </div>
                            <div class="pt-3">
                                <h2
                                    class="text-xl font-heading-font mb-8 font-bold mt-3 xl:text-lg xl:mb-2 ">
                                    <a href="blog-single.html"
                                        class="text-[#444] transition-all hover:text-[#3756f7]">${tittle}</a>
                                </h2>
                                <ul class="flex mb-[15px] items-center">
                                    <li class="text-base text-[#3756f7]">
                                        <img src="assets/images/blog/blog-avater/img-1.jpg" alt=""
                                            class="w-[40px] h-[40px] rounded-[50%] mr-2">
                                    </li>
                                    <li class="text-base text-[#3756f7]">By <a
                                            href="blog-single.html"
                                            class="text-[#003aae] transition-all hover:text-[#3756f7]">Admin</a>
                                    </li>
                                    <li
                                        class="text-base text-[#3756f7] relative pl-7 before:absolute before:left-[10px] before:top-[50%]
            before:-translate-y-1/2 before:w-[6px] before:h-[6px] before:bg-[#3756f7] before:rounded-[50%]">
                                        25
                                        Sep 2022</li>
                                </ul>

                                <p class="text-[#444444] text-base">${disruption}
                                </p>
                            </div>
                        </div>
                    </div>

`;

  });
};
getpost();