import { useEffect, useState } from "react"
import Navbar from "../../components/component-doctor/NavBar"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import moment from 'moment';

interface TimeSlot {
    startTime: string;
    endTime: string;
}

const generateTimeOptions = () => {
    const times = [];
    const minute = 0;
    for (let hour = 7; hour < 22; hour++) {
        const time = new Date();
        time.setHours(hour, minute, 0);
        const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        times.push(formattedTime);
    }
    return times;
};

const timeOptions = generateTimeOptions();


function DoctorSlots() {
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [slotStartTime, setslotStartTime] = useState<string>('');
    const [slotEndTime, setslotEndTime] = useState<string>('');
    const [duration, setDuration] = useState<number>(20);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedDays(prevSelected => [...prevSelected, value]);
        } else {
            setSelectedDays(prevSelected => prevSelected.filter(day => day !== value));
        }
    };



    const createTimeSlots = (fromTime: string, toTime: string, duration: number): TimeSlot[] => {
        let startTime = moment(fromTime, 'hh:mm A');
        let endTime = moment(toTime, 'hh:mm A');
        if (endTime.isBefore(startTime)) {
            console.log("end time startr time", startTime, endTime);
            endTime.add(1, 'day');
        }
        let arr: TimeSlot[] = [];
        while (moment(startTime).add(duration, 'minutes') <= moment(endTime).add(0, 'minutes')) {
            arr.push({
                startTime: startTime.format('hh:mm A'),
                endTime: moment(startTime).add(duration, 'minutes').format('hh:mm A')
            });
            console.log(arr);
            startTime.add(duration, 'minutes');
        }
        return arr;
    };

    const handleAddSlot = () => {
        console.log("tims-------------", slotStartTime, slotEndTime, duration);

        const result = createTimeSlots(slotStartTime, slotEndTime, duration);
        setSlots([...slots, ...result]);
        console.log("slots", slots);

        setslotStartTime(slotEndTime);
        setslotEndTime(slotEndTime);
    }


    const navigate = useNavigate();
    const doctorDatas = useSelector(
        (state: any) => state.persisted.doctor.doctorData
    );
    useEffect(() => {
        if (!doctorDatas._id) {
            navigate('/doctor/login');
        }
    });
    return (
        <>
            <Navbar />
            <Toaster position="top-right" reverseOrder={true}></Toaster>
            <div className="flex flex-row ">
                <div className="flex flex-row h-[88vh] bg-green-100">
                    <ul className="menu mt-24 mb-auto  w-[20vw] ml-0 mr-0  bg-blue-50 text-xl text-base-content">
                        <li className="bg-green-200 pt-2 pb-2 rounded-xl font-bold text-xl" onClick={() => { navigate('/doctor/doctor-profile') }}><a>DASHBOARD</a></li>
                        <li className="bg-green-100 pt-2 pb-2 rounded-xl font-bold text-xl" onClick={() => { navigate('/doctor/consultation-slots') }}><a>CONSULTATION SLOTS</a></li>
                        <li className="bg-green-200 pt-2 pb-2 rounded-xl font-bold text-xl" onClick={() => { navigate('/doctor/account-details/') }}><a>UPDATE DETAILS</a></li>
                        <li className="bg-green-100 pt-2 pb-2 rounded-xl font-bold text-xl"><a>WALLET</a></li>
                        <li className="bg-green-200 pt-2 pb-2 rounded-xl font-bold text-xl"><a>ACCOUNT SETTINGS</a></li>
                    </ul>
                </div>
                <div className="flex flex-row w-[80vw] h-[88vh] bg-white">
                    <div className="flex flex-row w-[80vw] h-[88vh] bg-white">

                        <div className="mt-20 ml-20 ">
                            <h2 className="text-3xl underline">Create Time Slots</h2>
                            <div className="pt-10">
                            <span className=" mr-10 text-xl">Select Weekdays</span>
                            <span className="text-xl">
                                <label className="p-5">
                                    <input type="checkbox" value="Monday" onChange={handleCheckboxChange} />
                                    Monday
                                </label>
                                <label className="p-5">
                                    <input type="checkbox" value="Tuesday" onChange={handleCheckboxChange} />
                                    Tuesday
                                </label>
                                <label className="p-5" >
                                    <input type="checkbox" value="Wednesday" onChange={handleCheckboxChange} />
                                    Wednesday
                                </label>
                                <label className="p-5">
                                    <input type="checkbox" value="Thursday" onChange={handleCheckboxChange} />
                                    Thursday
                                </label>
                                <label className="p-5">
                                    <input type="checkbox" value="Friday" onChange={handleCheckboxChange} />
                                    Friday
                                </label>
                                <label className="p-5">
                                    <input type="checkbox" value="Saturday" onChange={handleCheckboxChange} />
                                    Saturday
                                </label>
                                <label className="p-5">
                                    <input type="checkbox" value="Sunday" onChange={handleCheckboxChange} />
                                    Sunday
                                </label>
                            </span>
                        </div>



                            <div className="flex flex-row space-x-5 mt-10">
                                <div className="form-control">
                                    <label className="input-group">
                                        <span>Start time </span>
                                        <select
                                            value={slotStartTime}
                                            onChange={(e) => setslotStartTime(e.target.value)}
                                        >
                                            <option value="" disabled>Select time</option>
                                            {timeOptions.map((time, index) => (
                                                <option key={index} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>

                                <div className="form-control">
                                    <label className="input-group">
                                        <span>End Time: </span>
                                        <select
                                            value={slotEndTime}
                                            onChange={(e) => setslotEndTime(e.target.value)}
                                        >
                                            <option value="" disabled>Select time</option>
                                            {timeOptions.map((time, index) => (
                                                <option key={index} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-row space-x-5 mt-5">
                                <div className="form-control mt-5">
                                    <span>Enter Slot Duration (in minutes)</span>
                                    <label className="input-group">
                                        <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="input input-bordered w-2/21 max-w-xs" />
                                    </label>
                                </div>
                                <button className="btn btn-md ml-14 mt-11 uppercase" onClick={handleAddSlot}>create time Slot</button>
                            </div>
                            {selectedDays.length > 0 && (
                                <p className="mt-5">You selected: {selectedDays.join(', ')}</p>
                            )}
                            {slots.length > 0 && (<>
                                <p className="text-2xl mt-10 mb-10 underline">Time Slots</p>
                                <div className="border p-2">
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                        {slots.map((slot, index) => (
                                            <div key={index} className="border rounded p-2 min-h-20">
                                                {slot.startTime} - {slot.endTime}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </>
                            )}

                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}
export default DoctorSlots