import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import background from "../assets/background.jpeg";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#1F2937] to-gray-900">
      {/* Seção do formulário à esquerda */}
      <div className="flex flex-col justify-center w-full max-w-lg p-10 bg-white/10 backdrop-blur-md rounded-r-2xl shadow-2xl border border-white/20">
        <h2 className="text-4xl font-extrabold text-white mb-8">
          Crie sua conta!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-lg font-medium mb-2 text-gray-200"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 border border-gray-400 rounded-md bg-gray-900 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium mb-2 text-gray-200"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-400 rounded-md bg-gray-900 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-lg font-medium mb-2 text-gray-200"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-400 rounded-md bg-gray-900 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#1F2937] to-gray-700 text-white py-3 rounded-md text-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg"
          >
            Cadastrar
          </button>
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-[#fdfdfd] hover:text-gray-500 transition-colors duration-300"
            >
              Você já tem uma conta? Faça login!
            </Link>
          </div>
        </form>
      </div>

      {/* Seção da imagem à direita */}
      <div className="flex-grow hidden md:flex justify-center items-center p-10">
        <img
          src={background}
          alt="Register Illustration"
          className="w-full h-auto object-cover rounded-l-2xl shadow-2xl"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
