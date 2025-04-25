/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SectionHead from "@/components/shared/SectionHead";
import Loading from "@/components/utils/Loading";
import { useGetAllReviewQuery } from "@/redux/features/review/reviewApi";
import { User } from "lucide-react";

const ReviewSection = () => {
const {data: response, isLoading, isError} = useGetAllReviewQuery({});
if (isLoading) {
    return <Loading/>
}
if (isError) {
    return (
        <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
            Something went wrong !
        </h3>
    );
}
    return (
        <div>
            <SectionHead heading="Customer Reviews"/>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12 gap-6 mt-4">
                {response?.data?.map((review: any) => (
                    <div key={review._id} className="bg-gray-200 flex flex-col items-center justify-center p-4 rounded shadow-md">
                        <User className="w-20 h-20"/>
                        <h3 className="text-lg font-semibold">{review.user.name}</h3>
                        <p className="text-gray-600">{review.comment}</p>
                        <p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSection;