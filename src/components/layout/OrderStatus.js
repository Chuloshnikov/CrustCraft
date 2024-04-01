import { FaMoneyCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { GiCampCookingPot } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCheckSquare } from "react-icons/fa";

export default function OrderStatus({ status }) {

    if (status === "Payment verification") {
        return (
            <div>
                <h4 className="text-xs text-gray-600">Order status:</h4>
                <div className="inProgress mt-2 border border-gray-500 rounded-xl px-6 py-2 flex gap-2 items-center justify-center">
                    <span>Payment verification</span><FaMoneyCheck className="text-gray-600"/>
                </div>
            </div>
        )
    }

    if (status === "In progress") {
        return (
            <div>
                <h4 className="text-xs text-gray-600">Order status:</h4>
                
                <div className="inProgress mt-2 border border-gray-500 rounded-xl px-6 py-2 flex gap-2 items-center justify-center">
                    <span>In progress</span><FaRegClock className="text-gray-600"/>
                </div>
            </div>
        )
    }

    if (status === "Preparing") {
        return (
            <div>
                <h4 className="text-xs text-gray-600">Order status:</h4>
                
                <div className="inProgress mt-2 border border-gray-500 rounded-xl px-6 py-2 flex gap-2 items-center justify-center">
                    <span>Preparing</span><GiCampCookingPot className="text-gray-600"/>
                </div>
            </div>
        )
    }

    if (status === "On delivery") {
        return (
            <div>
                <h4 className="text-xs text-gray-600">Order status:</h4>
                
                <div className="mt-2 border border-gray-500 rounded-xl px-6 py-2 flex gap-2 items-center justify-center">
                    <span>On delivery</span><TbTruckDelivery className="text-gray-600"/>
                </div>
            </div>
        )
    }

    if (status === "Delivered") {
        return (
            <div>
                <h4 className="text-xs text-gray-600">Order status:</h4>
                
                <div className="mt-2 border border-gray-500 rounded-xl px-6 py-2 flex gap-2 items-center justify-center">
                    <span>Delivered</span><FaCheckSquare className="text-gray-600"/>
                </div>
            </div>
        )
    }
}