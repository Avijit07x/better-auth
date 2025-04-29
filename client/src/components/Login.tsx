import { useState } from "react";
import { authClient } from "../lib/auth-client";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Data:", formData);
		await authClient.signIn.email(
			{
				email: formData.email,
				password: formData.password,
			},
			{ onSuccess: (ctx) => console.log("User registered successfully" + ctx) }
		);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
			>
				<h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
					Login to Your Account
				</h2>

				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-gray-700 font-medium mb-2"
					>
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						value={formData.email}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-6">
					<label
						htmlFor="password"
						className="block text-gray-700 font-medium mb-2"
					>
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						value={formData.password}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
