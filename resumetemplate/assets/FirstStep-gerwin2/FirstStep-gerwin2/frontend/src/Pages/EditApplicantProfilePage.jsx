import React, { useEffect, useState } from "react";
import Man from "../images/tommy.png";
import banner from "../images/signBg.jpg";
import NavbarLoggedIn from "../Components/NavbarLoggedIn";
import google from "../images/google.png";
import Footer from "../Components/Footer";
import Educ from "../Modals/Educ";
import Achieve from "../Modals/Achieve";
import Awards from "../Modals/Awards";
import Certificates from "../Modals/Certificates";
import axios from "axios";

function EditApplicantProfilePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const placeholderImage = "placeholder.jpg";
  const profileId = JSON.parse(localStorage.getItem('user')).profileId
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  useEffect(()=>{
    getUserProfile()
  }, [])

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

  const [formData, setFormData] = useState();
  const [formIndex, setFormIndex] = useState();

  //education
  const [educationData, setEducationData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleEducSubmit = (data) => {
    console.log(data);
    setEducationData(prevEducationData => {
      const updatedEducationData = [...prevEducationData, data];
      updateProfileElement("education", updatedEducationData);
      return updatedEducationData;
    });
    setShowModal(false);
  };

  const handleEducDelete = (index) => {
    const updatedEducationData = [...educationData];
    updatedEducationData.splice(index, 1);
    updateProfileElement("education", updatedEducationData);
    setEducationData(updatedEducationData);
  };

  const handleEducEdit = (index) => {
    const educationToEdit = educationData[index];
    setFormData(educationToEdit);
    setFormIndex(index)
    setShowModal(true);
  };

  const editEducationData = (index, newValue) => {
    const updatedEducationData = [...educationData];
    updatedEducationData[index] = newValue;
    updateProfileElement("education", updatedEducationData);
    setEducationData(updatedEducationData);
  }

  //activities and involvements
  const [achievementsData, setAchievementsData] = useState([]);
  const [showAchieveModal, setShowAchieveModal] = useState(false);

  const handleSubmitAchieve = (formData) => {
    setAchievementsData( prevAchievementsData => {
      const updatedAchievementsData = [...prevAchievementsData, formData];
      updateProfileElement("activitiesAndInvolvements", updatedAchievementsData);
      return updatedAchievementsData;
    });
    setShowAchieveModal(false);
  };

  const handleDeleteAchievement = (index) => {
    const updatedAchievements = [...achievementsData];
    updatedAchievements.splice(index, 1);
    updateProfileElement("activitiesAndInvolvements", updatedAchievements);
    setAchievementsData(updatedAchievements);
  };

  const handleEditAchievement = (index) => {
    const achievementToEdit = achievementsData[index];
    setFormData(achievementToEdit);
    setFormIndex(index)
    setShowAchieveModal(true);
  };

  const editAchievementsData = (index, newValue) => {
    const updatedAchievementsData = [...achievementsData];
    updatedAchievementsData[index] = newValue;
    updateProfileElement("activitiesAndInvolvements", updatedAchievementsData);
    setAchievementsData(updatedAchievementsData);
  }

  //awards
  const [awardData, setAwardData] = useState([]);
  const [showAwardModal, setShowAwardModal] = useState(false);

  const handleSubmitAward = (formData) => {
    setAwardData( prevAwardData => {
      const updatedAwardsData = [...prevAwardData, formData];
      updateProfileElement("awards", updatedAwardsData);
      return updatedAwardsData;
    }
    );
    setShowAwardModal(false);
  };

  const handleDeleteAward = (index) => {
    const updatedAward = [...awardData];
    updatedAward.splice(index, 1);
    updateProfileElement("awards", updatedAward);
    setAwardData(updatedAward);
  };

  const handleEditAward = (index) => {
    const awardToEdit = awardData[index];
    setFormData(awardToEdit);
    setFormIndex(index)
    setShowAwardModal(true);
  };

  const editAwardData = (index, newValue) => {
    const updatedAwardData = [...awardData];
    updatedAwardData[index] = newValue;
    updateProfileElement("awards", updatedAwardData);
    setAwardData(updatedAwardData)
  }

  //certificates
  const [certData, setCertData] = useState([]);
  const [showCertModal, setShowCertModal] = useState(false);

  const handleSubmitCert = (formData) => {
    console.log("Cert form data:", formData);
    setCertData(prevCertData => {
      const updatedCertData = [...prevCertData, formData];
      updateProfileElement("certs", updatedCertData);
      return updatedCertData;
    }
    );
    setShowCertModal(false);
  };

  const handleDeleteCert = (index) => {
    const updatedCert = [...certData];
    updatedCert.splice(index, 1);
    updateProfileElement("certs", updatedCert);
    setCertData(updatedCert);
  };

  const handleEditCert = (index) => {
    const certToEdit = certData[index];
    setFormData(certToEdit);
    setFormIndex(index);
    setShowCertModal(true);
  };

  const editCertData = (index, newValue) => {
    const updatedCertData = [...certData];
    updatedCertData[index] = newValue;
    updateProfileElement("certs", updatedCertData);
    setCertData(updatedCertData)
  }

  const getUserProfile = () => {
    axios.post('/api/applicantprofile/retrieveone', {profileId},{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      const profileObj = res.data
      setUsername(`${profileObj.firstName} ${profileObj.lastName}`)
      setBio(profileObj.bio)
      setEducationData(profileObj.education)
      setAchievementsData(profileObj.activitiesAndInvolvements)
      setAwardData(profileObj.awards)
      setCertData(profileObj.certs)
    })
  }

  const updateProfileElement = (key, value) => {
    const input = {
      _id: profileId,
      set: {
        [key]: value
      }
    }

    axios.post('/api/applicantprofile/update', input, {
      headers: {
        'Content-Type': 'application/json'
        }
    }).then((res)=>{
      console.log(res.data.message)
    })
  }

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
                  <div className="space-y-2">
                    <h1 className="text-2xl font-semibold">{username}</h1>
                    <div className="flex items-center">
                      <div>
                        <img src={google} alt="Facebook" className="w-8 h-8" />
                      </div>
                      <div>
                        <img src={google} alt="Twitter" className="w-8 h-8" />
                      </div>
                      <div>
                        <img src={google} alt="Instagram" className="w-8 h-8" />
                      </div>
                    </div>
                    <div>
                      <h1 className="font-semibold text-xl">Bio</h1>
                      <p className="font-base text-base">
                        {bio || "..."}
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
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-2 rounded-xl ">
                    <h1 className="text-3xl">Summary</h1>
                    <textarea
                      name="summary"
                      id=""
                      cols="30"
                      rows="10"
                      className="w-full text-lg border-2 outline-none"
                    ></textarea>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <h1 className="text-3xl">Education</h1>
                    <button
                      className="p-3 px-4 bg-blue-200 hover:bg-blue-600 rounded-full text-lg"
                      onClick={() => setShowModal(true)}
                    >
                      Add New +
                    </button>
                    {showModal && (
                      <Educ
                        onClose={() => {
                          setFormData()
                          setShowModal(false)
                        }}
                        onSubmit={handleEducSubmit}
                        onEdit={editEducationData}
                        initialData={formData}
                        formIndex={formIndex}
                        setFormData={setFormData}
                      />
                    )}

                    <div className="mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        {educationData.map((edu, index) => (
                          <div
                            key={index}
                            className="bg-blue-300 p-3 rounded-lg"
                          >
                            <div className="flex">
                              <div className="flex w-full">
                                <div className="flex-col w-4/5">
                                  <p className="text-2xl">{edu.schoolName}</p>
                                  <div className="flex-col">
                                    <div className="flex space-x-2">
                                      <p className="text-lg">{new Date(edu.startDate).toISOString().substring(0, 10)}</p>
                                      <p className="text-lg">-</p>
                                      <p className="text-lg">{new Date(edu.endDate).toISOString().substring(0, 10)}</p>
                                    </div>
                                    <div className="flex space-x-3 items-center">
                                      <p>{edu.degree}</p>
                                      <p>{edu.program}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-1/5">
                                  <p className="text-lg">Grade: {edu.grade}</p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 flex justify-between">
                              <button
                                className="bg-green-300 px-4 py-2 rounded-md"
                                onClick={() => handleEducEdit(index)}
                              >
                                Edit
                              </button>
                              <button
                                className="text-white bg-red-500 px-4 py-2 rounded-md"
                                onClick={() => handleEducDelete(index)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <h1 className="text-3xl">Activities and Involvements</h1>
                    <button
                      onClick={() => setShowAchieveModal(true)}
                      className="text-lg p-3 px-4 rounded-full bg-blue-200 hover:bg-blue-600"
                    >
                      Add New +
                    </button>
                    {showAchieveModal && (
                      <Achieve
                        onClose={() => {
                          setFormData()
                          setShowAchieveModal(false)
                        }}
                        onSubmit={handleSubmitAchieve}
                        onEdit={editAchievementsData}
                        initialData={formData}
                        formIndex={formIndex}
                        setFormData={setFormData}
                      />
                    )}
                    <div className="mt-4 w-full items-center flex">
                      {achievementsData.map((achievement, index) => (
                        <div key={index} className="p-3">
                          <div className="p-5 bg-blue-200 rounded-xl">
                            <p className="text-2xl">{achievement.title}</p>
                            <p className="text-md">{achievement.typeOfActivity}</p>
                            <p className="text-md">
                              {achievement.organizationOrCompanyName}
                            </p>
                            <p className="text-md">{achievement.location}</p>
                            <p className="text-md">
                              Started: {new Date(achievement.startDate).toISOString().substring(0, 10)}
                            </p>
                            <p className="text-md">
                              Ended: {new Date(achievement.endDate).toISOString().substring(0, 10)}
                            </p>
                            <p className="text-md">{achievement.description}</p>
                            <div className="mt-5 flex space-x-5">
                              <button
                                className="bg-green-300 p-2 px-4 rounded-xl"
                                onClick={() => handleEditAchievement(index)}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteAchievement(index)}
                                className="text-white bg-red-500  rounded-md "
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl text-3xl">
                    <h1>Projects</h1>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <h1 className="text-3xl"> Awards</h1>
                    <button
                      onClick={() => setShowAwardModal(true)}
                      className="text-lg p-3 px-4 rounded-full bg-blue-200 hover:bg-blue-600"
                    >
                      Add New +
                    </button>
                    {showAwardModal && (
                      <Awards
                        onClose={() => {
                          setFormData()
                          setShowAwardModal(false)
                        }}
                        onSubmit={handleSubmitAward}
                        onEdit={editAwardData}
                        initialData={formData}
                        formIndex={formIndex}
                        setFormData={setFormData}
                      />
                    )}
                    <div className="mt-4 w-full items-center flex">
                      {awardData.map((award, index) => (
                        <div key={index} className="p-3">
                          <div className="p-5 bg-blue-200 rounded-xl">
                            <p className="text-2xl">{award.title}</p>
                            <p className="text-md">{new Date(award.dateReceived).toISOString().substring(0, 10)}</p>
                            <p className="text-md">{award.description}</p>
                            <div className="mt-5 flex space-x-5">
                              <button
                                className="bg-green-300 p-2 px-4 rounded-xl"
                                onClick={() => handleEditAward(index)}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteAward(index)}
                                className="text-white bg-red-500 px-4 py-2 rounded-md"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl">
                    <h1 className="text-3xl">Certificates</h1>
                    <button
                      onClick={() => setShowCertModal(true)}
                      className="text-lg p-3 px-4 rounded-full bg-blue-200 hover:bg-blue-600"
                    >
                      Add New +
                    </button>
                    {showCertModal && (
                      <Certificates
                        onClose={() => {
                          setFormData()
                          setShowCertModal(false)
                        }}
                        onSubmit={handleSubmitCert}
                        onEdit={editCertData}
                        initialData={formData}
                        formIndex={formIndex}
                        setFormData={setFormData}
                      />
                    )}
                    <div className="mt-4 w-full items-center flex">
                      {certData.map((cert, index) => (
                        <div key={index} className="p-3">
                          <div className="p-5 bg-blue-200 rounded-xl">
                            <p className="text-2xl">{cert.title}</p>
                            <p className="text-md">{new Date(cert.dateReceived).toISOString().substring(0,10)}</p>
                            <p className="text-md">{cert.description}</p>
                            <div className="mt-5 flex space-x-5">
                              <button
                                className="bg-green-300 px-4 rounded-xl"
                                onClick={() => handleEditCert(index)}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCert(index)}
                                className="text-white bg-red-500 px-4 py-2 rounded-md"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default EditApplicantProfilePage;
