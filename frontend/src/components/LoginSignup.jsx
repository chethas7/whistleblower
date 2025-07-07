import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../src/redux/slices/authSlice";
import { loginUser, registerUser, verifyOtp } from "../API/authAPI";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("form"); // 'form' | 'otp'
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      username: "",
      email: "",
      phone: "",
      dob: "",
      password: "",
      confirmPassword: "",
    });
    setError(null);
    setStep("form");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      if (isLogin) {
        const data = await loginUser(formData.email, formData.password, true);
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        navigate("/");
      } else {
        await registerUser({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob,
          password: formData.password,
        });
        setStep("otp"); // Proceed to OTP step
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await verifyOtp({ email: formData.email, otp });
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <div className="mb-2 flex justify-center">
        <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">
          {isLogin
            ? "Welcome back"
            : step === "otp"
            ? "Verify OTP"
            : "Create account"}
        </h2>
        <p className="text-gray-500">
          {step === "otp"
            ? "Enter the OTP sent to your email"
            : isLogin
            ? "Sign in to your account"
            : "Join our platform"}
        </p>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, height: "auto" }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {step === "otp" ? (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 mb-4 border rounded-lg"
              />
              <button
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className={`w-full py-3 ${
                  isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white rounded-lg flex items-center justify-center`}
              >
                {isLoading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg"
                  />

                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg"
                  />

                  <input
                    type="date"
                    name="dob"
                    placeholder="Date of birth"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg"
                  />
                </>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />

              {!isLogin && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg"
                />
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 ${
                  isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white rounded-lg flex items-center justify-center`}
              >
                {isLoading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : isLogin ? (
                  "Sign in"
                ) : (
                  "Sign up"
                )}
              </button>
            </form>
          )}
        </motion.div>
      </AnimatePresence>

      {step !== "otp" && (
        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-blue-600 font-medium hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
