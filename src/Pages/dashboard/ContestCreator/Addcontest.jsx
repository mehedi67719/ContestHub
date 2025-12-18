import React from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import Primarybtn from '../../../Component/Primarybtn';
import Swal from 'sweetalert2';
import Useauth from '../../../Component/Useauth';

const Addcontest = () => {

    const {User}=Useauth()
    const { register, handleSubmit, setValue,reset, watch, formState: { errors } } = useForm();
    const deadline = watch("deadline");
    const onSubmit = async (data) => {
        data.entryFee = data.price; 
        data.creatorEmail = User.email;
        data.participantsCount = 0;
        data.winnerId = null;
        data.createdAt = new Date().toISOString();
        data.paymentstatus = "none";
        data.status = "pending";

        try {
            const res = await fetch("http://localhost:3000/All-contests", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: `Contest Added`,
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
            }
        } catch (err) {
            console.log(err);
            Swal.fire("Error!", "Something went wrong.", "error");
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex justify-center py-12">
            <div className="w-full mx-2 lg:mx-8 md:mx-5 bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 md:p-12">
                <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Create New Contest
                </h2>
                <p className="text-center text-gray-500 mb-10">
                    Add a new creative contest and inspire participants
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div>
                        <label className="font-semibold text-gray-700">Contest Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">Required</p>}
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">Contest Image URL</label>
                        <input
                            type="url"
                            {...register("image", { required: true })}
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">Required</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="font-semibold text-gray-700">Contest Description</label>
                        <textarea
                            rows="4"
                            {...register("description", { required: true })}
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">Required</p>}
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">Entry Fee</label>
                        <input
                            type="number"
                            {...register("price", { required: true })}
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">Required</p>}
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">Prize Money</label>
                        <input
                            type="number"
                            {...register("prizeMoney", { required: true })}
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.prizeMoney && <p className="text-red-500 text-sm mt-1">Required</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="font-semibold text-gray-700">Task Instruction</label>
                        <textarea
                            rows="4"
                            {...register("taskInstruction", { required: true })}
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                        {errors.taskInstruction && <p className="text-red-500 text-sm mt-1">Required</p>}
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">Contest Type</label>
                        <select
                            {...register("contestType", { required: true })}
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select Type</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Article">Article</option>
                            <option value="Business">Business</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Video Editing">Video Editing</option>
                        </select>
                        {errors.contestType && <p className="text-red-500 text-sm mt-1">Required</p>}
                    </div>

                    <div className="flex flex-col justify-end">
                        <label className="font-semibold text-gray-700">Deadline</label>
                        <div className="mt-2">
                            <DatePicker
                                selected={deadline}
                                onChange={(date) => setValue("deadline", date)}
                                minDate={new Date()}
                                placeholderText="Select deadline"
                                className="w-full px-4 py-3 h-[52px] rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        {!deadline && <p className="text-red-500 text-sm mt-1">Required</p>}
                    </div>

                    <div className="md:col-span-2 mt-6">
                        <Primarybtn type="submit" className="w-full shadow-lg">
                            Add Contest
                        </Primarybtn>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Addcontest;
