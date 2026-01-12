import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import Primarybtn from '../../../Component/Primarybtn';
import Swal from 'sweetalert2';
import Useauth from '../../../Component/Useauth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

const Editcontest = () => {
    const { User } = Useauth();
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const deadline = watch('deadline');

    const { data, isLoading, error } = useQuery({
        queryKey: ['single-contest', id],
        enabled: !!id,
        queryFn: async () => {
            const res = await fetch(`https://contesthub-server-pink.vercel.app/contests/${id}`);
            return res.json();
        }
    });

    useEffect(() => {
        if (data) {
            setValue('name', data.name);
            setValue('image', data.image);
            setValue('description', data.description);
            setValue('price', data.price || data.entryFee);
            setValue('prizeMoney', data.prizeMoney);
            setValue('taskInstruction', data.taskInstruction);
            setValue('contestType', data.contestType);
            setValue('deadline', new Date(data.deadline));
        }
    }, [data, setValue]);

    const onSubmit = async (formData) => {
        const updatedContest = {
            name: formData.name,
            image: formData.image,
            description: formData.description,
            entryFee: Number(formData.price), // price field এর value entryFee ও price এ পাঠানো হচ্ছে
            price: Number(formData.price),
            prizeMoney: Number(formData.prizeMoney),
            taskInstruction: formData.taskInstruction,
            contestType: formData.contestType,
            deadline: formData.deadline
        };

        try {
            const res = await fetch(`https://contesthub-server-pink.vercel.app/contests/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedContest)
            });

            const result = await res.json();
            if (result.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Contest updated successfully',
                    timer: 1500,
                    showConfirmButton: false
                });
                queryClient.invalidateQueries(['single-contest', id]);
                navigate('/dashboard/mycreatedcontest');
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'No Changes',
                    text: 'No updates were made',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong',
                timer: 1500,
                showConfirmButton: false
            });
            console.error(err);
        }
    };

    if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-2xl">Something went wrong!</div>;
    if (isLoading) return <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-blue-600 animate-pulse">Loading ....</div>;

    return (
        <div className="w-full min-h-screen  flex justify-center py-12">
            <div className="w-full mx-2 lg:mx-8 md:mx-5 bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 md:p-12">
                <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Update Your Contest
                </h2>
                <p className="text-center text-gray-500 mb-10">
                    Edit your contest details and update information
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
                        <label className="font-semibold text-gray-700">Price / Entry Fee</label>
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
                            Update Contest
                        </Primarybtn>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Editcontest;
