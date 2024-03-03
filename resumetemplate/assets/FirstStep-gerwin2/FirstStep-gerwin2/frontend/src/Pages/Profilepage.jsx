import { useState } from "react";
import Man from "../images/tommy.png";
import banner from "../images/signBg.jpg";
import NavbarLoggedIn from "../Components/NavbarLoggedIn";
import google from "../images/google.png";
import Footer from "../Components/Footer";

function Create() {
  const [selectedImage, setSelectedImage] = useState(null);
  const placeholderImage = "placeholder.jpg"; // Provide your placeholder image URL here

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <NavbarLoggedIn />
      <div>
        <div
          style={{
            background: "linear-gradient(to bottom, #ffffff,#87ceeb)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        ></div>
        <div className="h-full">
          <img
            src={banner}
            alt=""
            className="w-full h-80 object-cover rounded-xl"
          />
        </div>
        <div className="w-full flex mb-20 h-[1800px] mt-[-50px]">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-col lg:flex-row lg:space-x-5 h-full">
              <div className=" bg-white rounded-2xl sm:w-full lg:w-1/3 sm:h-1/3 lg:h-1/2">
                <div className="p-4 flex flex-col items-center lg:space-y-10">
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <label htmlFor="imageInput" className="cursor-pointer">
                      <img
                        src={selectedImage || placeholderImage}
                        alt=""
                        className="w-60 h-60 rounded-full border-4 border-black mb-4 md:mb-0 md:mr-4"
                      />
                    </label>
                    {!selectedImage && (
                      <div
                        onClick={() =>
                          document.getElementById("imageInput").click()
                        }
                        className="absolute inset-0 cursor-pointer"
                        style={{ zIndex: 1 }}
                      ></div>
                    )}
                  </div>
                  <div class="space-y-2">
                    <h1 className="text-2xl font-semibold">Exmaple Name</h1>
                    <div class="flex items-center">
                      <div>
                        <img src={google} alt="Facebook" class="w-8 h-8" />
                      </div>
                      <div>
                        <img src={google} alt="Twitter" class="w-8 h-8" />
                      </div>
                      <div>
                        <img src={google} alt="Instagram" class="w-8 h-8" />
                      </div>
                    </div>
                    <div>
                      <h1 className="font-semibold text-xl">Bio</h1>
                      <p className="font-base text-base">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Inventore, laudantium. Suscipit veniam omnis
                        mollitia consequuntur deserunt facere quia dolore
                        molestiae?
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg shadow-md mt-4 sm:w-1/4 lg:w-2/3">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-32 h-16 rounded-full flex items-center justify-center">
                        <span className="text-small font-medium">
                          Preferred Jobs
                        </span>
                      </div>
                    </div>
                    <button className="text-2xl bg-[#FFCECE] w-full rounded-full">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full h-full sm:mt-10 lg:mt-0">
                <div className="grid grid-cols-1 gap-4 h-full">
                  <div className="bg-white p-4 rounded-xl text-3xl">
                    <h1>Summary</h1>
                  </div>
                  <div className="bg-white p-4 rounded-xl text-3xl">
                    <h1>Education</h1>
                  </div>
                  <div className="bg-white p-4 rounded-xl text-3xl">
                    <h1>Achievements and Involvements</h1>
                  </div>
                  <div className="bg-white p-4 rounded-xl text-3xl">
                    <h1>Projects</h1>
                  </div>
                  <div className="bg-white p-4 rounded-xl text-3xl">
                    <h1> Awards</h1>
                  </div>
                  <div className="bg-white p-4 rounded-xl text-3xl">
                    <h1>Certificates</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Create;
