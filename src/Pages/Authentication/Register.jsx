import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Primarybtn from "../../Component/Primarybtn";
import Useauth from "../../Component/Useauth";
import { useState } from "react";

const Register = () => {
  const { createaccountbygoogle, createaccountwithemail, updateUserProfileData } = Useauth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters",
      });
      return;
    }

    try {
      const userCredential = await createaccountwithemail(
        formData.email,
        formData.password,
        formData.name,
        formData.photo
      );

      await updateUserProfileData(userCredential.user, formData.name, formData.photo);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `Welcome ${formData.name}!`,
      });

      setFormData({ name: "", email: "", password: "", photo: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await createaccountbygoogle();
      Swal.fire({
        icon: "success",
        title: "Google Sign-in Success!",
        text: `Welcome ${result.user.displayName || result.user.email}!`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Sign-in Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Register for ContestHub
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Enter photo URL"
            className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Primarybtn>Register</Primarybtn>
        </form>

        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          onClick={handleGoogleRegister}
          className="flex items-center justify-center gap-3 border p-3 rounded-xl hover:shadow-lg transition w-full"
        >
          <FcGoogle className="text-2xl" />
          Sign up with Google
        </button>

        <p className="text-center text-gray-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
